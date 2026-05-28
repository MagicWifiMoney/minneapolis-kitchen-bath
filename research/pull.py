#!/usr/bin/env python3
"""DataForSEO pull for MNKB keyword universe + SERP teardown.

Outputs CSV + JSON in this dir. Run from anywhere.
"""
import csv, json, os, sys, time, base64, urllib.request, urllib.error
from pathlib import Path

USER = "jakegiebel@fermatcommerce.com"
PASSWORD = "fdfa2690ca8fff85"
OUT = Path(__file__).parent
LOCATION_NAME = "Minneapolis,Minnesota,United States"  # Google Ads location
LOCATION_CODE = 2840  # United States — Labs only accepts country-level
LANGUAGE = "en"

AUTH = "Basic " + base64.b64encode(f"{USER}:{PASSWORD}".encode()).decode()

def post(path, body):
    req = urllib.request.Request(
        f"https://api.dataforseo.com/v3{path}",
        data=json.dumps(body).encode(),
        headers={"Authorization": AUTH, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)

# ---------------------------------------------------------------------------
# SEED KEYWORD UNIVERSE
# ---------------------------------------------------------------------------
CITIES = [
    "minneapolis", "saint paul", "st paul", "edina", "minnetonka", "wayzata",
    "eden prairie", "bloomington", "plymouth", "maple grove", "eagan",
    "burnsville", "richfield",
]
HEAD_SERVICES = [
    "kitchen remodel", "kitchen remodeling", "kitchen renovation",
    "bathroom remodel", "bathroom remodeling", "bathroom renovation",
    "kitchen contractor", "bathroom contractor", "kitchen designer",
    "custom cabinets", "kitchen cabinets", "countertop installation",
    "quartz countertops", "tile installer", "shower remodel",
    "tub to shower conversion", "basement remodel", "whole house remodel",
    "design build remodeler", "general contractor",
]
# Commercial-local: service × city
seeds = set()
for s in HEAD_SERVICES:
    for c in CITIES:
        seeds.add(f"{s} {c}")
        seeds.add(f"{s} {c} mn")

# Cost / research / ROI / financing
seeds.update([
    "kitchen remodel cost minneapolis", "bathroom remodel cost minneapolis",
    "average kitchen remodel cost twin cities", "kitchen remodel cost mn",
    "bathroom renovation cost minnesota", "small bathroom remodel cost",
    "tub to shower conversion cost", "kitchen island cost",
    "cost to remodel kitchen 10x10", "kitchen remodel financing",
    "kitchen remodel roi minneapolis", "is a kitchen remodel worth it",
    "average cost bathroom remodel mn", "how much new kitchen cabinets",
    "cost vs value report minneapolis", "kitchen remodel budget breakdown",
    "minneapolis kitchen remodel financing", "remodeling loans minnesota",
])

# Comparison + brand
seeds.update([
    "quartz vs granite", "quartz vs granite countertops",
    "cambria vs silestone", "cambria countertops review",
    "schuler vs diamond cabinets", "diamond vs kraftmaid cabinets",
    "wellborn cabinets review", "crystal cabinets minnesota",
    "showplace cabinets review", "kraftmaid review",
    "ikea kitchen vs custom", "semi custom vs custom cabinets",
    "design build vs general contractor", "bath fitter vs remodel",
    "remodel vs renovation", "best kitchen cabinet brands",
    "best quartz brand", "ikea sektion review",
])

# How-to / specific scope
seeds.update([
    "how long kitchen remodel takes", "kitchen remodel timeline",
    "kitchen remodel order of operations", "diy kitchen remodel",
    "open up galley kitchen", "remove wall between kitchen and dining",
    "add kitchen island", "kitchen pantry ideas",
    "primary bathroom remodel ideas", "small bathroom layout",
    "walk in shower no door", "curbless shower",
    "wet room design", "heated bathroom floor cost",
    "schluter shower system", "kerdi shower install",
    "bungalow kitchen remodel", "rambler kitchen remodel",
    "tudor kitchen remodel", "victorian bathroom remodel",
    "1920s house kitchen remodel", "split level kitchen remodel",
])

# Long-tail neighborhood + lake
seeds.update([
    "linden hills kitchen remodel", "kenwood mn kitchen remodel",
    "northeast minneapolis remodeler", "highland park st paul remodel",
    "crocus hill st paul remodel", "summit hill kitchen remodel",
    "summit avenue victorian remodel", "edina country club tudor remodel",
    "lake minnetonka kitchen", "wayzata lakefront remodel",
    "saint anthony park remodel",
])

# Permits / local
seeds.update([
    "minneapolis remodel permit", "saint paul kitchen permit",
    "edina building permit", "minnetonka remodel permit",
    "do i need permit kitchen remodel mn", "minneapolis cped permit",
])

# Niche / Schluter-style technical
seeds.update([
    "schluter shower installer minneapolis", "kerdi shower contractor mn",
    "tile shower waterproofing", "best tile installer twin cities",
    "heated tile floor installer mn",
])

seeds = sorted(seeds)
print(f"Seeded {len(seeds)} keywords")

# ---------------------------------------------------------------------------
# 1. Keyword overview (live) — search volume, KD, intent, CPC
# ---------------------------------------------------------------------------
def chunked(lst, n):
    for i in range(0, len(lst), n): yield lst[i:i+n]

overview_rows = []
print("\n=== Pulling keyword_overview ===")
for batch in chunked(seeds, 700):
    body = [{
        "keywords": batch,
        "location_code": LOCATION_CODE,
        "language_code": LANGUAGE,
        "include_serp_info": False,
        "include_clickstream_data": False,
    }]
    resp = post("/dataforseo_labs/google/keyword_overview/live", body)
    task = resp["tasks"][0]
    if task.get("status_code") != 20000:
        print("ERR overview:", task.get("status_message"), file=sys.stderr)
        continue
    for item in (task.get("result") or [{}])[0].get("items") or []:
        kw_info = item.get("keyword_info") or {}
        kd_info = item.get("keyword_properties") or {}
        intent = (item.get("search_intent_info") or {}).get("main_intent")
        overview_rows.append({
            "keyword": item.get("keyword"),
            "search_volume": kw_info.get("search_volume"),
            "competition": kw_info.get("competition_level"),
            "cpc": kw_info.get("cpc"),
            "low_top_bid": kw_info.get("low_top_of_page_bid"),
            "high_top_bid": kw_info.get("high_top_of_page_bid"),
            "keyword_difficulty": (item.get("keyword_properties") or {}).get("keyword_difficulty"),
            "search_intent": intent,
            "monthly_trend": json.dumps(kw_info.get("monthly_searches") or []),
        })
print(f"Got {len(overview_rows)} keyword rows")

# ---------------------------------------------------------------------------
# 2. Keyword suggestions — expand 8 head terms
# ---------------------------------------------------------------------------
print("\n=== Pulling keyword_suggestions ===")
sugg_rows = []
head_for_expansion = [
    "kitchen remodel minneapolis", "bathroom remodel minneapolis",
    "kitchen remodel cost", "custom cabinets minneapolis",
    "quartz countertops minneapolis", "tub to shower conversion",
    "design build remodeler minneapolis", "bungalow kitchen remodel",
]
for kw in head_for_expansion:
    body = [{
        "keyword": kw,
        "location_code": LOCATION_CODE,
        "language_code": LANGUAGE,
        "include_serp_info": False,
        "limit": 200,
        "filters": [["keyword_info.search_volume", ">", 10]],
        "order_by": ["keyword_info.search_volume,desc"],
    }]
    resp = post("/dataforseo_labs/google/keyword_suggestions/live", body)
    task = resp["tasks"][0]
    if task.get("status_code") != 20000:
        print("ERR suggestions:", kw, task.get("status_message"), file=sys.stderr)
        continue
    for item in (task.get("result") or [{}])[0].get("items") or []:
        kw_info = item.get("keyword_info") or {}
        sugg_rows.append({
            "seed": kw,
            "keyword": item.get("keyword"),
            "search_volume": kw_info.get("search_volume"),
            "competition": kw_info.get("competition_level"),
            "cpc": kw_info.get("cpc"),
            "keyword_difficulty": (item.get("keyword_properties") or {}).get("keyword_difficulty"),
        })
print(f"Got {len(sugg_rows)} suggestion rows")

# ---------------------------------------------------------------------------
# 3. SERP teardown — top 25 commercial terms, full top 10
# ---------------------------------------------------------------------------
SKIP_SERP = os.environ.get("SKIP_SERP") == "1"
print("\n=== Pulling SERP top-10 for 25 head terms ===")
priority_serp_disabled = SKIP_SERP
priority_serp = [
    "kitchen remodel minneapolis", "kitchen remodeling minneapolis",
    "bathroom remodel minneapolis", "bathroom remodeling minneapolis",
    "kitchen remodel saint paul", "bathroom remodel saint paul",
    "kitchen remodel edina", "bathroom remodel edina",
    "kitchen remodel minnetonka", "kitchen remodel wayzata",
    "kitchen remodel eden prairie", "kitchen remodel bloomington",
    "kitchen remodel plymouth", "kitchen remodel maple grove",
    "kitchen contractor minneapolis", "bathroom contractor minneapolis",
    "design build remodeler minneapolis",
    "custom cabinets minneapolis", "quartz countertops minneapolis",
    "kitchen remodel cost minneapolis", "bathroom remodel cost minneapolis",
    "tub to shower conversion minneapolis", "bungalow kitchen remodel",
    "tudor kitchen remodel", "schluter shower installer minneapolis",
]
serp_rows = []
for kw in (priority_serp if not SKIP_SERP else []):
    body = [{
        "keyword": kw,
        "location_name": LOCATION_NAME,
        "language_code": LANGUAGE,
        "device": "desktop",
        "depth": 10,
    }]
    try:
        resp = post("/serp/google/organic/live/advanced", body)
    except urllib.error.HTTPError as e:
        print("HTTP ERR serp:", kw, e, file=sys.stderr); continue
    task = resp["tasks"][0]
    if task.get("status_code") != 20000:
        print("ERR serp:", kw, task.get("status_message"), file=sys.stderr); continue
    result = (task.get("result") or [{}])[0]
    items = result.get("items") or []
    rank = 0
    for it in items:
        t = it.get("type")
        if t == "organic":
            rank += 1
            serp_rows.append({
                "keyword": kw,
                "rank": rank,
                "type": "organic",
                "domain": it.get("domain"),
                "url": it.get("url"),
                "title": it.get("title"),
                "description": it.get("description"),
            })
        elif t in ("local_pack", "map"):
            serp_rows.append({
                "keyword": kw, "rank": 0, "type": t,
                "domain": it.get("domain") or "",
                "url": it.get("url") or "",
                "title": it.get("title") or "",
                "description": "",
            })
        elif t == "people_also_ask":
            for q in it.get("items") or []:
                serp_rows.append({
                    "keyword": kw, "rank": 0, "type": "paa",
                    "domain": "", "url": "",
                    "title": q.get("title") or "",
                    "description": q.get("description") or "",
                })
    print(f"  {kw}: {rank} organic + extras")

# ---------------------------------------------------------------------------
# Write CSVs
# ---------------------------------------------------------------------------
def write_csv(name, rows):
    if not rows: print(f"(skip {name}: empty)"); return
    p = OUT / name
    cols = list(rows[0].keys())
    with p.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=cols); w.writeheader(); w.writerows(rows)
    print(f"Wrote {p} ({len(rows)} rows)")

write_csv("keywords_overview.csv", overview_rows)
write_csv("keywords_suggestions.csv", sugg_rows)
write_csv("serp_top10.csv", serp_rows)

# Also dump combined json
(OUT / "raw.json").write_text(json.dumps({
    "overview": overview_rows, "suggestions": sugg_rows, "serp": serp_rows,
}, indent=2))
print("Wrote raw.json")

# Balance after
req = urllib.request.Request("https://api.dataforseo.com/v3/appendix/user_data",
    headers={"Authorization": AUTH})
with urllib.request.urlopen(req) as r:
    d = json.load(r)
print("Balance after run: $", d["tasks"][0]["result"][0]["money"]["balance"])
