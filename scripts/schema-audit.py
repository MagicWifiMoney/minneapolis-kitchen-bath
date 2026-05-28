#!/usr/bin/env python3
"""Schema audit for Minneapolis Kitchen & Bath.

Walks src/app/ for page.tsx files, extracts JSON-LD from <script type="application/ld+json">
blocks, audits for fraud risk (hardcoded ratings/reviews), checks expected schema coverage
per page type, and generates ready-to-paste suggestions for missing schema.

stdlib only.
"""

import json
import os
import re
import sys
from pathlib import Path

ROOT = Path("/Users/jacobgiebel/code/active/minneapolis-kitchen-bath")
APP_DIR = ROOT / "src" / "app"
RESEARCH = ROOT / "research"

FRAUD_OUT = RESEARCH / "schema-fraud-flags.md"
COVERAGE_OUT = RESEARCH / "schema-coverage-report.md"
SUGGEST_OUT = RESEARCH / "schema-suggestions.md"

# Expected schema per page type
EXPECTED = {
    "blog": ["Article", "Author", "FAQPage", "BreadcrumbList"],
    "service-hub": ["Service", "LocalBusiness", "FAQPage", "BreadcrumbList"],
    "city": ["LocalBusiness", "Place", "BreadcrumbList"],
    "service-city": ["LocalBusiness", "Place", "AreaServed", "FAQPage", "BreadcrumbList"],
    "neighborhood": ["LocalBusiness", "Place", "BreadcrumbList"],
    "calc-tool": ["WebApplication", "BreadcrumbList"],
    "other": [],
}

# Fraud risk keys (hardcoded reviews/ratings)
FRAUD_KEYS = {"aggregaterating", "review", "ratingvalue", "reviewcount", "bestrating", "worstrating", "author"}

# Regex to find JSON-LD blocks. Handles JSX patterns:
#   dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
#   <script type="application/ld+json">{`...`}</script>
JSONLD_SCRIPT_RE = re.compile(
    r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
    re.DOTALL | re.IGNORECASE,
)
DANGEROUS_HTML_RE = re.compile(
    r'dangerouslySetInnerHTML\s*=\s*\{\{\s*__html\s*:\s*JSON\.stringify\(\s*(\{.*?\}|\[.*?\])\s*\)\s*\}\}',
    re.DOTALL,
)
# JSON.stringify on a variable, then we have to find the variable definition above
DANGEROUS_VAR_RE = re.compile(
    r'dangerouslySetInnerHTML\s*=\s*\{\{\s*__html\s*:\s*JSON\.stringify\(\s*([A-Za-z_$][\w$]*)\s*\)\s*\}\}',
)


def classify_page(rel_path: str) -> str:
    """Guess page type from path."""
    p = rel_path.lower()
    if "/blog/" in p or p.startswith("blog/"):
        return "blog"
    if "/calculator" in p or "/tools" in p or "/calc" in p or "/estimator" in p:
        return "calc-tool"
    # service in city: services/<service>/<city>/page.tsx
    parts = [x for x in p.split("/") if x]
    if "services" in parts:
        idx = parts.index("services")
        rest = parts[idx + 1:]
        # last entry is "page.tsx"
        rest = [x for x in rest if x != "page.tsx"]
        if len(rest) >= 2:
            return "service-city"
        if len(rest) == 1:
            return "service-hub"
    if "neighborhoods" in parts or "neighborhood" in parts:
        return "neighborhood"
    if "cities" in parts or "areas" in parts or "city" in parts:
        return "city"
    # Heuristic: /<city>/page.tsx at top of app
    return "other"


def extract_jsonld_blocks(source: str) -> list:
    """Return list of (raw_text, parsed_or_none) tuples."""
    blocks = []

    # 1. <script>...</script> with template literal or plain JSON
    for m in JSONLD_SCRIPT_RE.finditer(source):
        inner = m.group(1).strip()
        # strip {`...`} template wrapper
        tl = re.match(r'^\{\s*`(.*)`\s*\}\s*$', inner, re.DOTALL)
        if tl:
            inner = tl.group(1)
        blocks.append(inner)

    # 2. dangerouslySetInnerHTML with inline object literal
    for m in DANGEROUS_HTML_RE.finditer(source):
        blocks.append(m.group(1))

    # 3. dangerouslySetInnerHTML with variable reference, look up the variable
    for m in DANGEROUS_VAR_RE.finditer(source):
        var = m.group(1)
        # find: const var = { ... };  (greedy-balanced is hard with regex, do a brace-walker)
        decl_re = re.compile(r'(?:const|let|var)\s+' + re.escape(var) + r'\s*[:\w\s\[\]<>,]*=\s*(\{|\[)')
        dm = decl_re.search(source)
        if not dm:
            continue
        start = dm.end() - 1  # at the opening brace/bracket
        text = walk_balanced(source, start)
        if text:
            blocks.append(text)

    return blocks


def walk_balanced(source: str, start: int) -> str:
    """Walk a balanced {} or [] starting at source[start]."""
    open_ch = source[start]
    close_ch = "}" if open_ch == "{" else "]"
    depth = 0
    in_str = False
    str_ch = ""
    i = start
    while i < len(source):
        c = source[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == str_ch:
                in_str = False
        else:
            if c in ('"', "'", "`"):
                in_str = True
                str_ch = c
            elif c == open_ch:
                depth += 1
            elif c == close_ch:
                depth -= 1
                if depth == 0:
                    return source[start:i + 1]
        i += 1
    return ""


def try_parse(text: str):
    """Try to JSON-parse a block, with light cleanup for JS object literals."""
    candidates = [text]
    # JS object literal cleanup, convert single quotes, strip trailing commas, quote bare keys
    cleaned = text
    cleaned = re.sub(r",(\s*[}\]])", r"\1", cleaned)
    candidates.append(cleaned)
    for c in candidates:
        try:
            return json.loads(c)
        except Exception:
            pass
    return None


def collect_types(node, acc: set):
    """Walk a parsed JSON-LD node collecting @type values."""
    if isinstance(node, dict):
        t = node.get("@type")
        if isinstance(t, str):
            acc.add(t)
        elif isinstance(t, list):
            for x in t:
                if isinstance(x, str):
                    acc.add(x)
        for v in node.values():
            collect_types(v, acc)
    elif isinstance(node, list):
        for v in node:
            collect_types(v, acc)


def scan_fraud(node, path_trail, hits):
    """Detect hardcoded rating/review fields."""
    if isinstance(node, dict):
        for k, v in node.items():
            kl = k.lower()
            if kl in FRAUD_KEYS:
                # Flag if value is a literal (string/number/list/dict) and not a placeholder
                hits.append((".".join(path_trail + [k]), repr(v)[:200]))
            scan_fraud(v, path_trail + [k], hits)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            scan_fraud(v, path_trail + [f"[{i}]"], hits)


def regex_fraud_scan(raw: str):
    """Fallback regex scan if JSON parse failed."""
    hits = []
    for key in ["AggregateRating", "ratingValue", "reviewCount", '"Review"', "bestRating", "worstRating"]:
        for m in re.finditer(re.escape(key) + r'[^,\n}]{0,120}', raw):
            hits.append((key, m.group(0)[:200]))
    return hits


# Suggestion templates
def sugg_breadcrumb():
    return '''{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mnkitchenbath.com/" },
    { "@type": "ListItem", "position": 2, "name": "[Section]", "item": "https://mnkitchenbath.com/[section]/" },
    { "@type": "ListItem", "position": 3, "name": "[Page Title]", "item": "https://mnkitchenbath.com/[section]/[slug]/" }
  ]
}'''


def sugg_localbusiness():
    return '''{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Minneapolis Kitchen & Bath",
  "url": "https://mnkitchenbath.com/",
  "telephone": "[phone]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[street]",
    "addressLocality": "Minneapolis",
    "addressRegion": "MN",
    "postalCode": "[zip]",
    "addressCountry": "US"
  },
  "areaServed": { "@type": "Place", "name": "[City or Neighborhood]" }
}'''


def sugg_place():
    return '''{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "[City or Neighborhood], MN",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "MN",
    "addressCountry": "US"
  }
}'''


def sugg_service():
    return '''{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Service Name]",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Minneapolis Kitchen & Bath",
    "url": "https://mnkitchenbath.com/"
  },
  "areaServed": { "@type": "Place", "name": "Minneapolis-St. Paul Metro" },
  "description": "[1-2 sentence service description]"
}'''


def sugg_areaserved():
    return '''{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "[Service Name]",
  "areaServed": {
    "@type": "Place",
    "name": "[City], MN",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "[City]",
      "addressRegion": "MN",
      "addressCountry": "US"
    }
  },
  "provider": {
    "@type": "LocalBusiness",
    "name": "Minneapolis Kitchen & Bath"
  }
}'''


def sugg_faqpage():
    return '''{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 1]" }
    },
    {
      "@type": "Question",
      "name": "[Question 2]",
      "acceptedAnswer": { "@type": "Answer", "text": "[Answer 2]" }
    }
  ]
}'''


def sugg_article():
    return '''{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "author": { "@type": "Person", "name": "[Author Name placeholder]" },
  "publisher": {
    "@type": "Organization",
    "name": "Minneapolis Kitchen & Bath",
    "url": "https://mnkitchenbath.com/"
  },
  "mainEntityOfPage": "https://mnkitchenbath.com/blog/[slug]/"
}'''


def sugg_author():
    return '''{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Author Name placeholder]",
  "jobTitle": "[Title]",
  "worksFor": { "@type": "Organization", "name": "Minneapolis Kitchen & Bath" }
}'''


def sugg_webapp():
    return '''{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "[Tool Name]",
  "url": "https://mnkitchenbath.com/[tool-path]/",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}'''


SUGGESTIONS = {
    "BreadcrumbList": sugg_breadcrumb,
    "LocalBusiness": sugg_localbusiness,
    "Place": sugg_place,
    "Service": sugg_service,
    "AreaServed": sugg_areaserved,
    "FAQPage": sugg_faqpage,
    "Article": sugg_article,
    "Author": sugg_author,
    "WebApplication": sugg_webapp,
}


def main():
    if not APP_DIR.exists():
        print(f"ERROR: {APP_DIR} not found", file=sys.stderr)
        sys.exit(1)
    RESEARCH.mkdir(parents=True, exist_ok=True)

    pages = []
    for path in APP_DIR.rglob("page.tsx"):
        rel = path.relative_to(APP_DIR)
        pages.append((path, str(rel)))

    fraud_rows = []
    coverage_rows = []
    suggestion_rows = []

    for path, rel in sorted(pages, key=lambda x: x[1]):
        try:
            src = path.read_text(encoding="utf-8", errors="replace")
        except Exception as e:
            coverage_rows.append((rel, "ERROR", str(e), [], [], []))
            continue

        page_type = classify_page(rel)
        blocks_raw = extract_jsonld_blocks(src)
        found_types = set()
        page_fraud = []

        for raw in blocks_raw:
            parsed = try_parse(raw)
            if parsed is not None:
                collect_types(parsed, found_types)
                hits = []
                scan_fraud(parsed, [], hits)
                for h in hits:
                    page_fraud.append(h)
            else:
                # Fall back to regex
                for m in re.finditer(r'"@type"\s*:\s*"([A-Za-z]+)"', raw):
                    found_types.add(m.group(1))
                for h in regex_fraud_scan(raw):
                    page_fraud.append(h)

        expected = EXPECTED.get(page_type, [])
        missing = [t for t in expected if t not in found_types and not (t == "Author" and "Person" in found_types)]

        coverage_rows.append((rel, page_type, "ok", sorted(found_types), expected, missing))

        if page_fraud:
            fraud_rows.append((rel, page_fraud))

        if missing:
            suggestion_rows.append((rel, page_type, missing))

    # Write fraud report
    with FRAUD_OUT.open("w", encoding="utf-8") as f:
        f.write("# Schema Fraud Risk Flags\n\n")
        f.write("Hardcoded ratings, reviews, or author fields in JSON-LD. These can be flagged by Google as deceptive structured data if values are fabricated.\n\n")
        f.write(f"Pages scanned: {len(pages)}\n")
        f.write(f"Pages with potential fraud risk: {len(fraud_rows)}\n\n")
        if not fraud_rows:
            f.write("No fraud risk findings.\n")
        for rel, hits in fraud_rows:
            f.write(f"## {rel}\n\n")
            for key_path, val in hits:
                f.write(f"- `{key_path}` -> `{val}`\n")
            f.write("\n")

    # Write coverage report
    with COVERAGE_OUT.open("w", encoding="utf-8") as f:
        f.write("# Schema Coverage Report\n\n")
        f.write(f"Pages scanned: {len(pages)}\n\n")
        f.write("| Page | Page Type | Found Types | Expected | Missing |\n")
        f.write("|------|-----------|-------------|----------|---------|\n")
        for rel, ptype, _status, found, expected, missing in coverage_rows:
            f.write(
                f"| `{rel}` | {ptype} | {', '.join(found) or '(none)'} | "
                f"{', '.join(expected) or '(n/a)'} | {', '.join(missing) or 'none'} |\n"
            )

    # Write suggestions
    with SUGGEST_OUT.open("w", encoding="utf-8") as f:
        f.write("# Schema Suggestions (ready to paste)\n\n")
        f.write("Drop these JSON-LD blocks into a `<script type=\"application/ld+json\">` tag (or `dangerouslySetInnerHTML` with `JSON.stringify`). Replace bracket [placeholders] with real values, never fabricate ratings or review counts.\n\n")
        if not suggestion_rows:
            f.write("All pages have expected schema coverage.\n")
        for rel, ptype, missing in suggestion_rows:
            f.write(f"## {rel}  ({ptype})\n\n")
            for t in missing:
                fn = SUGGESTIONS.get(t)
                if not fn:
                    continue
                f.write(f"### Missing: {t}\n\n")
                f.write("```json\n")
                f.write(fn())
                f.write("\n```\n\n")

    print(f"Scanned {len(pages)} pages")
    print(f"Fraud flags: {len(fraud_rows)}")
    print(f"Pages with missing schema: {len(suggestion_rows)}")
    print(f"Wrote: {FRAUD_OUT}")
    print(f"Wrote: {COVERAGE_OUT}")
    print(f"Wrote: {SUGGEST_OUT}")


if __name__ == "__main__":
    main()
