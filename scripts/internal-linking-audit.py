#!/usr/bin/env python3
"""Internal linking audit for minneapolis-kitchen-bath.

Walks src/app/ and src/content/ for .tsx files, extracts Next.js Link
href values, builds a graph, and writes a report + suggested fixes.

Stdlib only.
"""
from __future__ import annotations

import json
import os
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path("/Users/jacobgiebel/code/active/minneapolis-kitchen-bath")
APP_DIR = ROOT / "src" / "app"
CONTENT_DIR = ROOT / "src" / "content"
REPORT_PATH = ROOT / "research" / "internal-linking-report.md"
FIXES_PATH = ROOT / "research" / "internal-linking-fixes.json"

# Canonical taxonomy. Adjust slugs if the site uses different ones.
SERVICES = [
    "kitchen-remodeling",
    "bathroom-remodeling",
    "kitchen-design",
    "bathroom-design",
    "cabinet-installation",
    "countertop-installation",
]

CITIES = [
    "minneapolis",
    "saint-paul",
    "edina",
    "bloomington",
    "minnetonka",
    "plymouth",
    "maple-grove",
    "eden-prairie",
    "wayzata",
    "saint-louis-park",
    "richfield",
    "golden-valley",
]

# Regex to find href values inside <Link ...> JSX tags, plus bare href attrs.
LINK_TAG_RE = re.compile(
    r"<Link\b[^>]*?\bhref\s*=\s*(?:\{?\s*[\"'`]([^\"'`]+)[\"'`]\s*\}?|\{`([^`]+)`\})",
    re.DOTALL,
)
HREF_ATTR_RE = re.compile(
    r"\bhref\s*=\s*(?:[\"']([^\"']+)[\"']|\{\s*[\"'`]([^\"'`]+)[\"'`]\s*\})"
)
# Anchor text: text between <Link ...>TEXT</Link>
LINK_BLOCK_RE = re.compile(r"<Link\b([^>]*)>(.*?)</Link>", re.DOTALL)
HREF_INSIDE_RE = re.compile(r"\bhref\s*=\s*(?:[\"']([^\"']+)[\"']|\{\s*[\"'`]([^\"'`]+)[\"'`]\s*\})")


def file_to_url(path: Path) -> str | None:
    """Map an app-router .tsx file to its public URL path.

    Only page.tsx / route.tsx files map to URLs.
    """
    try:
        rel = path.relative_to(APP_DIR)
    except ValueError:
        return None
    if path.name not in ("page.tsx", "page.ts", "page.jsx", "page.js"):
        return None
    segments = []
    for part in rel.parts[:-1]:
        if part.startswith("(") and part.endswith(")"):
            continue  # route group
        if part.startswith("@"):
            continue  # parallel route slot
        # Strip dynamic segment brackets
        seg = part
        if seg.startswith("[") and seg.endswith("]"):
            seg = f":{seg.strip('[]').lstrip('.')}"
        segments.append(seg)
    url = "/" + "/".join(segments)
    if url == "/":
        return "/"
    return url.rstrip("/")


def collect_pages() -> dict[str, Path]:
    """Map URL -> source file for every page in app/."""
    pages: dict[str, Path] = {}
    if not APP_DIR.exists():
        return pages
    for tsx in APP_DIR.rglob("page.tsx"):
        url = file_to_url(tsx)
        if url is not None:
            pages[url] = tsx
    return pages


def extract_links(text: str) -> list[tuple[str, str]]:
    """Return list of (href, anchor_text) for every <Link> in text."""
    out: list[tuple[str, str]] = []
    for m in LINK_BLOCK_RE.finditer(text):
        attrs, inner = m.group(1), m.group(2)
        hm = HREF_INSIDE_RE.search(attrs)
        if not hm:
            continue
        href = hm.group(1) or hm.group(2) or ""
        # Strip JSX tags from anchor text
        anchor = re.sub(r"<[^>]+>", " ", inner)
        anchor = re.sub(r"\s+", " ", anchor).strip()
        out.append((href, anchor[:140]))
    # Also capture self-closing or non-block Link usages
    for m in LINK_TAG_RE.finditer(text):
        href = m.group(1) or m.group(2) or ""
        out.append((href, ""))
    return out


def normalize_href(href: str) -> str | None:
    if not href:
        return None
    if href.startswith(("http://", "https://", "mailto:", "tel:", "#")):
        return None
    h = href.split("#", 1)[0].split("?", 1)[0]
    if not h.startswith("/"):
        return None
    if h != "/":
        h = h.rstrip("/")
    return h


def walk_sources() -> list[Path]:
    files: list[Path] = []
    for base in (APP_DIR, CONTENT_DIR):
        if not base.exists():
            continue
        for p in base.rglob("*.tsx"):
            files.append(p)
        for p in base.rglob("*.mdx"):
            files.append(p)
    return files


def detect_page_kind(url: str) -> str:
    parts = [p for p in url.split("/") if p]
    if not parts:
        return "home"
    if parts[0] == "services" and len(parts) == 2:
        return "service"
    if parts[0] == "service-areas" and len(parts) == 2:
        return "city"
    if parts[0] == "areas" and len(parts) == 2:
        return "city"
    if parts[0] == "cities" and len(parts) == 2:
        return "city"
    if parts[0] in ("blog", "guides", "resources") and len(parts) >= 2:
        return "blog"
    if parts[0] in ("calculator", "calculators", "tools") and len(parts) >= 2:
        return "calculator"
    return "other"


def service_url_candidates(slug: str, pages: set[str]) -> str | None:
    for cand in (f"/services/{slug}", f"/{slug}"):
        if cand in pages:
            return cand
    return None


def city_url_candidates(slug: str, pages: set[str]) -> str | None:
    for cand in (
        f"/service-areas/{slug}",
        f"/areas/{slug}",
        f"/cities/{slug}",
        f"/{slug}",
    ):
        if cand in pages:
            return cand
    return None


def main() -> None:
    pages = collect_pages()
    page_urls = set(pages.keys())

    out_edges: dict[str, list[tuple[str, str]]] = defaultdict(list)  # src -> [(dst, anchor)]
    in_edges: dict[str, list[str]] = defaultdict(list)

    # Map source file -> owning page URL (closest ancestor page.tsx)
    def owner_url(path: Path) -> str | None:
        try:
            rel_parts = path.relative_to(APP_DIR).parts
        except ValueError:
            return None
        # Walk up directories looking for a page file
        cur = path.parent
        while True:
            for name in ("page.tsx", "page.ts", "page.jsx", "page.js"):
                candidate = cur / name
                if candidate.exists():
                    return file_to_url(candidate)
            if cur == APP_DIR or cur.parent == cur:
                return None
            cur = cur.parent

    files = walk_sources()
    for f in files:
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        src_url = owner_url(f) if f.is_relative_to(APP_DIR) else None
        if src_url is None:
            # content/ file: try to match by filename stem to a blog URL
            stem = f.stem
            guess = f"/blog/{stem}"
            if guess in page_urls:
                src_url = guess
            else:
                # Skip files we can't attribute to a page
                continue
        for href, anchor in extract_links(text):
            dst = normalize_href(href)
            if dst is None:
                continue
            out_edges[src_url].append((dst, anchor))
            in_edges[dst].append(src_url)

    # Stats
    in_count = {u: len(set(in_edges.get(u, []))) for u in page_urls}
    out_count = {u: len({d for d, _ in out_edges.get(u, [])}) for u in page_urls}

    orphans = sorted(u for u in page_urls if in_count.get(u, 0) == 0 and u != "/")
    hubs = sorted(page_urls, key=lambda u: out_count.get(u, 0), reverse=True)[:10]
    spokes = sorted(page_urls, key=lambda u: in_count.get(u, 0), reverse=True)[:10]

    # Hub/spoke completeness: services -> all cities, cities -> all services
    service_urls = {s: service_url_candidates(s, page_urls) for s in SERVICES}
    city_urls = {c: city_url_candidates(c, page_urls) for c in CITIES}

    missing_pairs: list[tuple[str, str, str]] = []  # (src, dst, anchor)

    for s_slug, s_url in service_urls.items():
        if not s_url:
            continue
        linked = {d for d, _ in out_edges.get(s_url, [])}
        for c_slug, c_url in city_urls.items():
            if not c_url:
                continue
            if c_url not in linked:
                anchor = f"{s_slug.replace('-', ' ').title()} in {c_slug.replace('-', ' ').title()}"
                missing_pairs.append((s_url, c_url, anchor))

    for c_slug, c_url in city_urls.items():
        if not c_url:
            continue
        linked = {d for d, _ in out_edges.get(c_url, [])}
        for s_slug, s_url in service_urls.items():
            if not s_url:
                continue
            if s_url not in linked:
                anchor = f"{s_slug.replace('-', ' ').title()} in {c_slug.replace('-', ' ').title()}"
                missing_pairs.append((c_url, s_url, anchor))

    # Blog posts with <3 internal links
    blogs = [u for u in page_urls if detect_page_kind(u) == "blog"]
    thin_blogs = []
    for b in sorted(blogs):
        outs = {d for d, _ in out_edges.get(b, []) if d in page_urls}
        if len(outs) < 3:
            thin_blogs.append((b, len(outs)))

    # Calculators not linked from relevant blogs.
    # Heuristic: a blog is "relevant" to a calculator if their slugs share
    # a keyword token (e.g. "cost", "budget", "remodel", "kitchen", "bathroom").
    calc_urls = [u for u in page_urls if detect_page_kind(u) == "calculator"]
    KEYWORDS = ["cost", "budget", "price", "estimate", "kitchen", "bathroom", "remodel", "cabinet", "countertop"]

    calc_gaps: list[tuple[str, str, str]] = []  # (calc, blog, suggested anchor)
    for calc in calc_urls:
        calc_tokens = set(calc.lower().split("/")[-1].split("-"))
        calc_kw = calc_tokens & set(KEYWORDS)
        if not calc_kw:
            continue
        for blog in blogs:
            blog_tokens = set(blog.lower().split("/")[-1].split("-"))
            if not (blog_tokens & calc_kw):
                continue
            linked = {d for d, _ in out_edges.get(blog, [])}
            if calc not in linked:
                anchor = "Try the " + calc.rstrip("/").split("/")[-1].replace("-", " ") + " calculator"
                calc_gaps.append((blog, calc, anchor))

    # Build fixes JSON
    fixes = {
        "generated_for": "minneapolis-kitchen-bath",
        "missing_hub_spoke": [
            {"from": a, "to": b, "anchor": c} for (a, b, c) in missing_pairs
        ],
        "thin_blogs_need_links": [
            {"page": b, "current_internal_links": n, "suggested_targets": [
                t for t in (
                    service_urls.get("kitchen-remodeling"),
                    service_urls.get("bathroom-remodeling"),
                    city_urls.get("minneapolis"),
                ) if t
            ]} for (b, n) in thin_blogs
        ],
        "calculator_link_gaps": [
            {"from": a, "to": b, "anchor": c} for (a, b, c) in calc_gaps
        ],
        "orphans": [{"page": u, "suggested_source": "/"} for u in orphans],
    }

    FIXES_PATH.parent.mkdir(parents=True, exist_ok=True)
    FIXES_PATH.write_text(json.dumps(fixes, indent=2), encoding="utf-8")

    # Build markdown report
    lines: list[str] = []
    lines.append("# Internal Linking Audit")
    lines.append("")
    lines.append(f"Pages discovered: {len(page_urls)}")
    lines.append(f"Total internal edges: {sum(len(v) for v in out_edges.values())}")
    lines.append("")
    lines.append("## Orphans (no internal inbound links)")
    if orphans:
        for u in orphans:
            lines.append(f"- {u}")
    else:
        lines.append("- None")
    lines.append("")
    lines.append("## Top 10 Hubs (most outbound internal links)")
    for u in hubs:
        lines.append(f"- {u} ({out_count.get(u, 0)} outbound)")
    lines.append("")
    lines.append("## Top 10 Spokes (most inbound internal links)")
    for u in spokes:
        lines.append(f"- {u} ({in_count.get(u, 0)} inbound)")
    lines.append("")
    lines.append("## Missing Hub-Spoke Pairs")
    lines.append("Every service should link to all 12 cities, and every city to all 6 services.")
    lines.append("")
    if missing_pairs:
        lines.append(f"Missing pairs: {len(missing_pairs)}")
        lines.append("")
        lines.append("| From | To | Suggested Anchor |")
        lines.append("|------|----|------------------|")
        for a, b, c in missing_pairs[:200]:
            lines.append(f"| {a} | {b} | {c} |")
        if len(missing_pairs) > 200:
            lines.append("")
            lines.append(f"(showing first 200 of {len(missing_pairs)}, see JSON for full list)")
    else:
        lines.append("- None")
    lines.append("")
    lines.append("## Blog Posts With Fewer Than 3 Internal Links")
    if thin_blogs:
        for b, n in thin_blogs:
            lines.append(f"- {b} ({n} internal links)")
    else:
        lines.append("- None")
    lines.append("")
    lines.append("## Calculators Not Linked From Relevant Blogs")
    if calc_gaps:
        lines.append("| Blog | Calculator | Suggested Anchor |")
        lines.append("|------|------------|------------------|")
        for a, b, c in calc_gaps:
            lines.append(f"| {a} | {b} | {c} |")
    else:
        lines.append("- None")
    lines.append("")
    lines.append("## Taxonomy Resolution")
    lines.append("")
    lines.append("Services resolved:")
    for s, u in service_urls.items():
        lines.append(f"- {s}: {u or '[not found]'}")
    lines.append("")
    lines.append("Cities resolved:")
    for c, u in city_urls.items():
        lines.append(f"- {c}: {u or '[not found]'}")
    lines.append("")

    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")

    print(f"Wrote {REPORT_PATH}")
    print(f"Wrote {FIXES_PATH}")


if __name__ == "__main__":
    main()
