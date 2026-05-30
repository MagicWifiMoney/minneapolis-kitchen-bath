#!/usr/bin/env python3
"""
Competitor tracker for Minneapolis Kitchen & Bath.

Pulls weekly SEO metrics from DataForSEO for a fixed competitor list,
stores history in SQLite, and writes two markdown reports:
  - competitor-weekly-report.md (latest snapshot + 4-week trend)
  - competitor-keyword-gap.md (keywords competitors rank top-10 for that
    MNKB does not, framed as "easy steals")

Run weekly via cron:
  0 7 * * 1 /usr/bin/env python3 /Users/jacobgiebel/code/active/minneapolis-kitchen-bath/scripts/competitor-tracker.py
"""

from __future__ import annotations

import base64
import datetime as dt
import json
import os
import sqlite3
import sys
import urllib.request
import urllib.error
from pathlib import Path
from typing import Any

ROOT = Path("/Users/jacobgiebel/code/active/minneapolis-kitchen-bath")
RESEARCH = ROOT / "research"
DB_PATH = RESEARCH / "competitor-history.sqlite"
WEEKLY_REPORT = RESEARCH / "competitor-weekly-report.md"
GAP_REPORT = RESEARCH / "competitor-keyword-gap.md"

OWN_DOMAIN = "minneapoliskitchenandbath.com"

COMPETITORS = [
    "mbros.com",
    "mapeterson.com",
    "benquieandsons.com",
    "bluestemremodeling.com",
    "crystalkitchen.com",
    "wisedesignremodel.com",
    "sicora.com",
    "jbdb.biz",
]

LOCATION_CODE = 2840  # United States
LANGUAGE_CODE = "en"

API_BASE = "https://api.dataforseo.com"


def load_credentials() -> tuple[str, str]:
    user = os.environ.get("DATAFORSEO_USER")
    pw = os.environ.get("DATAFORSEO_PASS")
    if user and pw:
        return user, pw
    mcp_path = Path.home() / ".mcp.json"
    if mcp_path.exists():
        try:
            data = json.loads(mcp_path.read_text())
            env = (
                data.get("mcpServers", {})
                .get("dataforseo", {})
                .get("env", {})
            )
            user = user or env.get("DATAFORSEO_USER") or env.get("DATAFORSEO_LOGIN")
            pw = pw or env.get("DATAFORSEO_PASS") or env.get("DATAFORSEO_PASSWORD")
        except Exception as e:
            print(f"warn: could not parse ~/.mcp.json: {e}", file=sys.stderr)
    if not user or not pw:
        print("error: DATAFORSEO_USER/PASS not set in env or ~/.mcp.json", file=sys.stderr)
        sys.exit(1)
    return user, pw


def post(endpoint: str, payload: list[dict[str, Any]], auth: str) -> dict[str, Any]:
    req = urllib.request.Request(
        f"{API_BASE}{endpoint}",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Basic {auth}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"error: {endpoint} HTTP {e.code}: {body[:300]}", file=sys.stderr)
        return {"status_code": e.code, "error": body}
    except Exception as e:
        print(f"error: {endpoint}: {e}", file=sys.stderr)
        return {"status_code": -1, "error": str(e)}


def first_result(resp: dict[str, Any]) -> dict[str, Any] | None:
    try:
        tasks = resp.get("tasks") or []
        if not tasks:
            return None
        results = tasks[0].get("result") or []
        if not results:
            return None
        return results[0]
    except Exception:
        return None


def domain_rank_overview(domain: str, auth: str) -> dict[str, Any] | None:
    payload = [{
        "target": domain,
        "location_code": LOCATION_CODE,
        "language_code": LANGUAGE_CODE,
    }]
    resp = post("/v3/dataforseo_labs/google/domain_rank_overview/live", payload, auth)
    return first_result(resp)


def ranked_keywords(domain: str, auth: str, limit: int = 100) -> dict[str, Any] | None:
    payload = [{
        "target": domain,
        "location_code": LOCATION_CODE,
        "language_code": LANGUAGE_CODE,
        "limit": limit,
        "order_by": ["keyword_data.keyword_info.search_volume,desc"],
    }]
    resp = post("/v3/dataforseo_labs/google/ranked_keywords/live", payload, auth)
    return first_result(resp)


def backlinks_summary(domain: str, auth: str) -> dict[str, Any] | None:
    payload = [{
        "target": domain,
        "internal_list_limit": 10,
        "backlinks_status_type": "live",
        "include_subdomains": True,
    }]
    resp = post("/v3/backlinks/summary/live", payload, auth)
    return first_result(resp)


def init_db() -> sqlite3.Connection:
    RESEARCH.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            week TEXT NOT NULL,
            captured_at TEXT NOT NULL,
            competitor TEXT NOT NULL,
            organic_keywords INTEGER,
            organic_traffic INTEGER,
            organic_etv REAL,
            backlinks INTEGER,
            referring_domains INTEGER,
            rank INTEGER,
            rank_overview_json TEXT,
            ranked_keywords_json TEXT,
            backlinks_json TEXT,
            UNIQUE(week, competitor)
        )
    """)
    conn.commit()
    return conn


def iso_week(today: dt.date) -> str:
    y, w, _ = today.isocalendar()
    return f"{y}-W{w:02d}"


def extract_overview_metrics(overview: dict[str, Any] | None) -> dict[str, Any]:
    out = {
        "organic_keywords": None,
        "organic_traffic": None,
        "organic_etv": None,
        "rank": None,
    }
    if not overview:
        return out
    metrics = overview.get("metrics") or {}
    organic = metrics.get("organic") or {}
    out["organic_keywords"] = organic.get("count")
    out["organic_traffic"] = organic.get("etv") and int(organic.get("etv"))
    out["organic_etv"] = organic.get("etv")
    out["rank"] = organic.get("pos_1")
    return out


def extract_backlinks_metrics(bl: dict[str, Any] | None) -> dict[str, Any]:
    if not bl:
        return {"backlinks": None, "referring_domains": None}
    return {
        "backlinks": bl.get("backlinks"),
        "referring_domains": bl.get("referring_domains"),
    }


def store_snapshot(
    conn: sqlite3.Connection,
    week: str,
    competitor: str,
    overview: dict[str, Any] | None,
    ranked: dict[str, Any] | None,
    bl: dict[str, Any] | None,
) -> None:
    om = extract_overview_metrics(overview)
    bm = extract_backlinks_metrics(bl)
    conn.execute("""
        INSERT OR REPLACE INTO snapshots
        (week, captured_at, competitor, organic_keywords, organic_traffic, organic_etv,
         backlinks, referring_domains, rank, rank_overview_json, ranked_keywords_json, backlinks_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        week,
        dt.datetime.utcnow().isoformat(),
        competitor,
        om["organic_keywords"],
        om["organic_traffic"],
        om["organic_etv"],
        bm["backlinks"],
        bm["referring_domains"],
        om["rank"],
        json.dumps(overview) if overview else None,
        json.dumps(ranked) if ranked else None,
        json.dumps(bl) if bl else None,
    ))
    conn.commit()


def get_recent_weeks(conn: sqlite3.Connection, n: int = 4) -> list[str]:
    rows = conn.execute(
        "SELECT DISTINCT week FROM snapshots ORDER BY week DESC LIMIT ?", (n,)
    ).fetchall()
    return [r[0] for r in rows]


def fmt(v: Any) -> str:
    if v is None:
        return "n/a"
    if isinstance(v, float):
        return f"{v:,.0f}"
    if isinstance(v, int):
        return f"{v:,}"
    return str(v)


def delta(curr: Any, prev: Any) -> str:
    if curr is None or prev is None:
        return ""
    try:
        d = curr - prev
        if d == 0:
            return " (flat)"
        sign = "+" if d > 0 else ""
        return f" ({sign}{d:,})"
    except Exception:
        return ""


def write_weekly_report(conn: sqlite3.Connection, current_week: str) -> None:
    weeks = get_recent_weeks(conn, 4)
    lines: list[str] = []
    lines.append(f"# Competitor Weekly Report")
    lines.append("")
    lines.append(f"Generated: {dt.datetime.now().strftime('%Y-%m-%d %H:%M')} local")
    lines.append(f"Week: {current_week}")
    lines.append("")
    lines.append("## Latest Snapshot")
    lines.append("")
    lines.append("| Competitor | Organic KWs | Organic Traffic (ETV) | Backlinks | Ref Domains |")
    lines.append("|---|---:|---:|---:|---:|")

    prev_week = weeks[1] if len(weeks) > 1 else None
    for comp in COMPETITORS:
        row = conn.execute(
            "SELECT organic_keywords, organic_traffic, backlinks, referring_domains FROM snapshots WHERE week=? AND competitor=?",
            (current_week, comp),
        ).fetchone()
        prev = None
        if prev_week:
            prev = conn.execute(
                "SELECT organic_keywords, organic_traffic, backlinks, referring_domains FROM snapshots WHERE week=? AND competitor=?",
                (prev_week, comp),
            ).fetchone()
        if not row:
            lines.append(f"| {comp} | n/a | n/a | n/a | n/a |")
            continue
        ok, ot, bl, rd = row
        pok, pot, pbl, prd = prev if prev else (None, None, None, None)
        lines.append(
            f"| {comp} | {fmt(ok)}{delta(ok, pok)} | {fmt(ot)}{delta(ot, pot)} "
            f"| {fmt(bl)}{delta(bl, pbl)} | {fmt(rd)}{delta(rd, prd)} |"
        )

    lines.append("")
    lines.append("## 4-Week Trend (Organic Keywords)")
    lines.append("")
    header = "| Competitor | " + " | ".join(reversed(weeks)) + " |"
    sep = "|---|" + "---:|" * len(weeks)
    lines.append(header)
    lines.append(sep)
    for comp in COMPETITORS:
        cells = []
        for w in reversed(weeks):
            row = conn.execute(
                "SELECT organic_keywords FROM snapshots WHERE week=? AND competitor=?",
                (w, comp),
            ).fetchone()
            cells.append(fmt(row[0]) if row else "n/a")
        lines.append(f"| {comp} | " + " | ".join(cells) + " |")

    lines.append("")
    lines.append("## 4-Week Trend (Referring Domains)")
    lines.append("")
    lines.append(header)
    lines.append(sep)
    for comp in COMPETITORS:
        cells = []
        for w in reversed(weeks):
            row = conn.execute(
                "SELECT referring_domains FROM snapshots WHERE week=? AND competitor=?",
                (w, comp),
            ).fetchone()
            cells.append(fmt(row[0]) if row else "n/a")
        lines.append(f"| {comp} | " + " | ".join(cells) + " |")

    WEEKLY_REPORT.write_text("\n".join(lines) + "\n")


def extract_ranked_keywords(payload_json: str | None) -> list[dict[str, Any]]:
    if not payload_json:
        return []
    try:
        data = json.loads(payload_json)
    except Exception:
        return []
    items = data.get("items") or []
    out = []
    for it in items:
        kd = it.get("keyword_data") or {}
        kw = kd.get("keyword")
        info = kd.get("keyword_info") or {}
        sv = info.get("search_volume")
        cpc = info.get("cpc")
        diff = (kd.get("keyword_properties") or {}).get("keyword_difficulty")
        ranked = it.get("ranked_serp_element") or {}
        se = ranked.get("serp_item") or {}
        pos = se.get("rank_absolute") or se.get("rank_group")
        url = se.get("url")
        if kw and pos is not None:
            out.append({
                "keyword": kw,
                "position": pos,
                "search_volume": sv,
                "cpc": cpc,
                "difficulty": diff,
                "url": url,
            })
    return out


def write_gap_report(conn: sqlite3.Connection, current_week: str) -> None:
    own_row = conn.execute(
        "SELECT ranked_keywords_json FROM snapshots WHERE week=? AND competitor=?",
        (current_week, OWN_DOMAIN),
    ).fetchone()
    own_kws: set[str] = set()
    if own_row and own_row[0]:
        for k in extract_ranked_keywords(own_row[0]):
            own_kws.add(k["keyword"].lower())

    gap: dict[str, dict[str, Any]] = {}
    for comp in COMPETITORS:
        row = conn.execute(
            "SELECT ranked_keywords_json FROM snapshots WHERE week=? AND competitor=?",
            (current_week, comp),
        ).fetchone()
        if not row or not row[0]:
            continue
        for k in extract_ranked_keywords(row[0]):
            if k["position"] is None or k["position"] > 10:
                continue
            kw = k["keyword"].lower()
            if kw in own_kws:
                continue
            entry = gap.setdefault(kw, {
                "keyword": k["keyword"],
                "search_volume": k.get("search_volume") or 0,
                "difficulty": k.get("difficulty"),
                "competitors": [],
            })
            entry["competitors"].append({
                "domain": comp,
                "position": k["position"],
                "url": k.get("url"),
            })
            if (k.get("search_volume") or 0) > (entry["search_volume"] or 0):
                entry["search_volume"] = k["search_volume"]

    rows = sorted(
        gap.values(),
        key=lambda r: (
            -(r.get("search_volume") or 0),
            (r.get("difficulty") if r.get("difficulty") is not None else 100),
        ),
    )

    lines: list[str] = []
    lines.append("# Competitor Keyword Gap (Easy Steals)")
    lines.append("")
    lines.append(f"Generated: {dt.datetime.now().strftime('%Y-%m-%d %H:%M')} local")
    lines.append(f"Week: {current_week}")
    lines.append(f"Own domain: {OWN_DOMAIN}")
    lines.append("")
    lines.append("Keywords where one or more competitors rank top-10 and MNKB does not appear in the tracked sample. Sorted by search volume, then difficulty.")
    lines.append("")
    lines.append("## Easy Steals (low difficulty)")
    lines.append("")
    lines.append("| Keyword | Volume | Difficulty | Competitors (pos) |")
    lines.append("|---|---:|---:|---|")

    easy = [r for r in rows if (r.get("difficulty") or 0) <= 30][:50]
    for r in easy:
        comps = ", ".join(f"{c['domain']} ({c['position']})" for c in r["competitors"][:5])
        lines.append(
            f"| {r['keyword']} | {fmt(r.get('search_volume'))} "
            f"| {fmt(r.get('difficulty'))} | {comps} |"
        )

    lines.append("")
    lines.append("## All Gap Keywords")
    lines.append("")
    lines.append("| Keyword | Volume | Difficulty | Competitors (pos) |")
    lines.append("|---|---:|---:|---|")
    for r in rows[:200]:
        comps = ", ".join(f"{c['domain']} ({c['position']})" for c in r["competitors"][:5])
        lines.append(
            f"| {r['keyword']} | {fmt(r.get('search_volume'))} "
            f"| {fmt(r.get('difficulty'))} | {comps} |"
        )

    GAP_REPORT.write_text("\n".join(lines) + "\n")


def main() -> int:
    user, pw = load_credentials()
    auth = base64.b64encode(f"{user}:{pw}".encode()).decode()

    conn = init_db()
    today = dt.date.today()
    week = iso_week(today)

    targets = COMPETITORS + [OWN_DOMAIN]
    for domain in targets:
        print(f"[{domain}] fetching...", file=sys.stderr)
        overview = domain_rank_overview(domain, auth)
        ranked = ranked_keywords(domain, auth, limit=100)
        bl = backlinks_summary(domain, auth)
        store_snapshot(conn, week, domain, overview, ranked, bl)

    write_weekly_report(conn, week)
    write_gap_report(conn, week)
    print(f"done. week={week} reports written to {RESEARCH}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
