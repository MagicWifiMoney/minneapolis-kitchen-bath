#!/usr/bin/env python3
"""
citation-submit.py

Helps Minneapolis Kitchen & Bath (MNKB) get listed across 30 top citation
directories. For each directory:
  1. If an API token is configured in env, auto-submit via API.
  2. Else, pre-fill a copy-paste sheet with all NAP fields ready.
  3. Else, write a manual checklist row with URL + steps.

Outputs:
  - marketing/citations/checklist.md
  - marketing/citations/nap-canonical.json

Usage:
  python3 scripts/citation-submit.py

Env tokens (optional, presence triggers auto-submit path):
  GBP_API_TOKEN, BING_PLACES_TOKEN, APPLE_BC_TOKEN, YELP_API_TOKEN,
  HOUZZ_PRO_TOKEN, FACEBOOK_GRAPH_TOKEN, FOURSQUARE_API_TOKEN,
  NEXTDOOR_API_TOKEN, BBB_API_TOKEN
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "marketing" / "citations"
OUT_DIR.mkdir(parents=True, exist_ok=True)

NAP = {
    "name": "Minneapolis Kitchen & Bath",
    "website": "https://minneapoliskitchenandbath.com",
    "email": "hello@minneapoliskitchenandbath.com",
    "phone": "[PHONE]",
    "street": "[STREET]",
    "city": "Minneapolis",
    "state": "MN",
    "postal_code": "[ZIP]",
    "country": "US",
    "categories": [
        "Kitchen Remodeler",
        "Bathroom Remodeler",
        "General Contractor",
        "Cabinet Maker",
        "Tile Installer",
    ],
    "service_area": "Minneapolis-Saint Paul, MN metro",
    "year_established": "[YEAR]",
    "hours": "[HOURS]",
    "short_description": (
        "Minneapolis Kitchen & Bath designs and builds custom kitchen and "
        "bathroom remodels across the Twin Cities metro. Full service from "
        "design to cabinetry, tile, and general contracting."
    ),
    "long_description": (
        "Minneapolis Kitchen & Bath is a Twin Cities remodeling company "
        "focused on kitchen and bathroom renovations. Services include "
        "design consultation, custom cabinetry, countertop and tile "
        "installation, plumbing and electrical coordination, and full "
        "general contracting. Serving Minneapolis, Saint Paul, and the "
        "surrounding metro communities."
    ),
    "logo_url": "https://minneapoliskitchenandbath.com/logo.png",
    "cover_image_url": "https://minneapoliskitchenandbath.com/og.jpg",
    "social": {
        "facebook": "[FB_URL]",
        "instagram": "[IG_URL]",
    },
}

# 30 top directories. method values: api, sheet, manual.
DIRECTORIES = [
    {
        "name": "Google Business Profile",
        "url": "https://business.google.com/create",
        "env_token": "GBP_API_TOKEN",
        "preferred_method": "api",
        "notes": "Highest priority. Verify by postcard or video. Requires GMB API access (whitelisted partners only).",
    },
    {
        "name": "Bing Places",
        "url": "https://www.bingplaces.com/",
        "env_token": "BING_PLACES_TOKEN",
        "preferred_method": "api",
        "notes": "Can import from Google Business Profile if claimed.",
    },
    {
        "name": "Apple Business Connect",
        "url": "https://businessconnect.apple.com/",
        "env_token": "APPLE_BC_TOKEN",
        "preferred_method": "sheet",
        "notes": "Required for Apple Maps. Verify via D-U-N-S or document upload.",
    },
    {
        "name": "Yelp",
        "url": "https://biz.yelp.com/signup",
        "env_token": "YELP_API_TOKEN",
        "preferred_method": "sheet",
        "notes": "Yelp public API is read-only. Claim listing via biz portal.",
    },
    {
        "name": "Houzz Pro",
        "url": "https://www.houzz.com/pro",
        "env_token": "HOUZZ_PRO_TOKEN",
        "preferred_method": "sheet",
        "notes": "High-intent home remodel audience. Upload project photos.",
    },
    {
        "name": "Angi",
        "url": "https://www.angi.com/companylist/",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Free basic listing. Paid leads optional.",
    },
    {
        "name": "BBB",
        "url": "https://www.bbb.org/get-listed",
        "env_token": "BBB_API_TOKEN",
        "preferred_method": "manual",
        "notes": "Accreditation is paid. Free unclaimed listing usually exists after a year of operation.",
    },
    {
        "name": "Thumbtack",
        "url": "https://www.thumbtack.com/pro/",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Lead marketplace. Set service categories and travel radius.",
    },
    {
        "name": "Facebook",
        "url": "https://www.facebook.com/pages/create",
        "env_token": "FACEBOOK_GRAPH_TOKEN",
        "preferred_method": "api",
        "notes": "Create Page via Graph API if token has pages_manage_metadata.",
    },
    {
        "name": "Nextdoor",
        "url": "https://business.nextdoor.com/",
        "env_token": "NEXTDOOR_API_TOKEN",
        "preferred_method": "sheet",
        "notes": "Hyperlocal. Strong for Twin Cities neighborhoods.",
    },
    {
        "name": "HomeAdvisor",
        "url": "https://www.homeadvisor.com/r/become-a-pro/",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Now part of Angi. Separate pro signup still exists.",
    },
    {
        "name": "Porch",
        "url": "https://pros.porch.com/",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Lead service for home pros.",
    },
    {
        "name": "BuildZoom",
        "url": "https://www.buildzoom.com/contractor/sign_up",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Pulls from MN contractor license public data. Claim listing.",
    },
    {
        "name": "Hometalk",
        "url": "https://www.hometalk.com/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Community focused. Create pro profile and post project content.",
    },
    {
        "name": "Bark",
        "url": "https://www.bark.com/en/us/",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Pay-per-lead. Set service categories carefully to limit spend.",
    },
    {
        "name": "GuildQuality",
        "url": "https://www.guildquality.com/",
        "env_function": None,
        "preferred_method": "sheet",
        "notes": "Surveying and reputation for remodelers. Paid.",
    },
    {
        "name": "Manta",
        "url": "https://www.manta.com/claim",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Free claim flow. Boost ranks in general business search.",
    },
    {
        "name": "YP.com",
        "url": "https://www.yellowpages.com/claim",
        "env_token": None,
        "preferred_method": "sheet",
        "notes": "Free basic claim.",
    },
    {
        "name": "Foursquare",
        "url": "https://business.foursquare.com/",
        "env_token": "FOURSQUARE_API_TOKEN",
        "preferred_method": "api",
        "notes": "Feeds many downstream apps (Snapchat, Uber, etc).",
    },
    {
        "name": "Better Local",
        "url": "https://www.betterlocal.com/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Smaller directory. Manual submission form.",
    },
    {
        "name": "NARI Minnesota",
        "url": "https://www.narimn.org/membership/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Local remodelers association. Membership is paid. Strong local trust signal.",
    },
    {
        "name": "BATC-Housing First MN",
        "url": "https://www.housingfirstmn.org/membership/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Builders Association of the Twin Cities. Paid membership.",
    },
    {
        "name": "Minneapolis Regional Chamber",
        "url": "https://www.mplschamber.com/join",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Paid membership. Member directory listing included.",
    },
    {
        "name": "TwinWest Chamber",
        "url": "https://www.twinwest.com/join",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "West metro chamber. Paid membership.",
    },
    {
        "name": "Edina Chamber",
        "url": "https://www.edinachamber.com/membership",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Edina-specific chamber. Paid membership.",
    },
    {
        "name": "MN Dept of Labor & Industry contractor verification",
        "url": "https://secure.doli.state.mn.us/lookup/licensing.aspx",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Verify residential building contractor license is active and public. No submission, but confirm record accuracy.",
    },
    {
        "name": "IRS public listing",
        "url": "https://apps.irs.gov/app/eos/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Only relevant if structured as nonprofit. Otherwise confirm EIN on SS-4 records, no public listing required.",
    },
    {
        "name": "Pro Remodeler directory",
        "url": "https://www.proremodeler.com/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Trade publication. Pitch for inclusion in pro directory or features.",
    },
    {
        "name": "Qualified Remodeler directory",
        "url": "https://www.qualifiedremodeler.com/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Trade publication. Submit company profile for directory inclusion.",
    },
    {
        "name": "RemodelingMagazine pro dir",
        "url": "https://www.remodeling.hw.net/",
        "env_token": None,
        "preferred_method": "manual",
        "notes": "Hanley Wood property. Pitch for directory or Big50 consideration after [YEAR+3].",
    },
]


def resolve_method(d):
    """Decide which method to use for this directory based on env presence."""
    token_name = d.get("env_token")
    if token_name and os.environ.get(token_name):
        return "api"
    if d.get("preferred_method") == "manual":
        return "manual"
    return "sheet"


def submit_api(d):
    """Stub for API auto-submit. Real implementations would go here."""
    token = os.environ.get(d["env_token"], "")
    print(f"[api] {d['name']}: token present ({len(token)} chars). Submission stub, no live call wired.")
    return "queued-api"


def build_sheet_row(d):
    """Pre-filled copy-paste row for manual paste into the directory's signup form."""
    return {
        "directory": d["name"],
        "signup_url": d["url"],
        "business_name": NAP["name"],
        "website": NAP["website"],
        "email": NAP["email"],
        "phone": NAP["phone"],
        "street": NAP["street"],
        "city": NAP["city"],
        "state": NAP["state"],
        "zip": NAP["postal_code"],
        "country": NAP["country"],
        "primary_category": NAP["categories"][0],
        "all_categories": ", ".join(NAP["categories"]),
        "service_area": NAP["service_area"],
        "year_established": NAP["year_established"],
        "hours": NAP["hours"],
        "short_description": NAP["short_description"],
        "long_description": NAP["long_description"],
        "logo_url": NAP["logo_url"],
        "cover_image_url": NAP["cover_image_url"],
        "facebook": NAP["social"]["facebook"],
        "instagram": NAP["social"]["instagram"],
        "notes": d["notes"],
    }


def write_nap_canonical():
    path = OUT_DIR / "nap-canonical.json"
    payload = {
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "nap": NAP,
        "usage_rule": (
            "This is the single source of truth for NAP. Every directory "
            "listing must match these values exactly, character for "
            "character. Inconsistent NAP across directories suppresses "
            "local rankings. Update this file first, then propagate."
        ),
    }
    path.write_text(json.dumps(payload, indent=2) + "\n")
    return path


def write_checklist(rows):
    path = OUT_DIR / "checklist.md"
    lines = []
    lines.append("# MNKB Citation Checklist")
    lines.append("")
    lines.append(f"Generated: {datetime.now().isoformat(timespec='seconds')}")
    lines.append("")
    lines.append(
        "One row per directory. Method is auto if env token present, "
        "sheet if pre-filled copy-paste fields are available below, "
        "manual otherwise. Status starts as TODO. Update after submit."
    )
    lines.append("")
    lines.append("| # | Directory | URL | Method | Primary Category | Status | Notes |")
    lines.append("|---|-----------|-----|--------|------------------|--------|-------|")
    for i, r in enumerate(rows, start=1):
        lines.append(
            f"| {i} | {r['directory']} | {r['signup_url']} | {r['method']} | "
            f"{r['primary_category']} | TODO | {r['notes_short']} |"
        )
    lines.append("")
    lines.append("## Canonical NAP (paste these into every form)")
    lines.append("")
    lines.append(f"- Name: {NAP['name']}")
    lines.append(f"- Website: {NAP['website']}")
    lines.append(f"- Email: {NAP['email']}")
    lines.append(f"- Phone: {NAP['phone']}")
    lines.append(
        f"- Address: {NAP['street']}, {NAP['city']}, {NAP['state']} {NAP['postal_code']}, {NAP['country']}"
    )
    lines.append(f"- Service area: {NAP['service_area']}")
    lines.append(f"- Year established: {NAP['year_established']}")
    lines.append(f"- Hours: {NAP['hours']}")
    lines.append(f"- Categories: {', '.join(NAP['categories'])}")
    lines.append("")
    lines.append("### Short description")
    lines.append("")
    lines.append(NAP["short_description"])
    lines.append("")
    lines.append("### Long description")
    lines.append("")
    lines.append(NAP["long_description"])
    lines.append("")
    lines.append("## Per-directory pre-filled sheet")
    lines.append("")
    for r in rows:
        lines.append(f"### {r['directory']}")
        lines.append("")
        lines.append(f"- URL: {r['signup_url']}")
        lines.append(f"- Method: {r['method']}")
        lines.append(f"- Status: TODO")
        lines.append(f"- Notes: {r['notes']}")
        if r["method"] in ("sheet", "api"):
            lines.append("")
            lines.append("Copy-paste fields:")
            lines.append("")
            lines.append(f"- Business name: {r['business_name']}")
            lines.append(f"- Website: {r['website']}")
            lines.append(f"- Email: {r['email']}")
            lines.append(f"- Phone: {r['phone']}")
            lines.append(f"- Address: {r['street']}, {r['city']}, {r['state']} {r['zip']}, {r['country']}")
            lines.append(f"- Primary category: {r['primary_category']}")
            lines.append(f"- All categories: {r['all_categories']}")
            lines.append(f"- Service area: {r['service_area']}")
            lines.append(f"- Year established: {r['year_established']}")
            lines.append(f"- Hours: {r['hours']}")
            lines.append(f"- Short description: {r['short_description']}")
            lines.append(f"- Long description: {r['long_description']}")
            lines.append(f"- Logo URL: {r['logo_url']}")
            lines.append(f"- Cover image URL: {r['cover_image_url']}")
            lines.append(f"- Facebook: {r['facebook']}")
            lines.append(f"- Instagram: {r['instagram']}")
        else:
            lines.append("")
            lines.append("Manual steps:")
            lines.append("")
            lines.append("1. Open the URL above.")
            lines.append("2. Locate the join, claim, or submit flow.")
            lines.append("3. Paste the canonical NAP fields exactly as above.")
            lines.append("4. Save record ID or profile URL in this checklist row.")
            lines.append("5. Mark status as SUBMITTED, then LIVE once approved.")
        lines.append("")
    path.write_text("\n".join(lines) + "\n")
    return path


def short(s, n=80):
    s = s.replace("\n", " ").strip()
    return s if len(s) <= n else s[: n - 1] + "..."


def main():
    rows = []
    for d in DIRECTORIES:
        method = resolve_method(d)
        sheet = build_sheet_row(d)
        sheet["method"] = method
        sheet["notes_short"] = short(d["notes"], 60)
        if method == "api":
            try:
                submit_api(d)
            except Exception as e:
                print(f"[warn] {d['name']} api submit failed: {e}", file=sys.stderr)
        rows.append(sheet)

    nap_path = write_nap_canonical()
    checklist_path = write_checklist(rows)
    print(f"wrote: {nap_path}")
    print(f"wrote: {checklist_path}")
    print(f"total directories: {len(rows)}")


if __name__ == "__main__":
    main()
