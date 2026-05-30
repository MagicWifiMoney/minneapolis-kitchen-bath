#!/usr/bin/env python3
"""
gbp-monitor.py ,  Weekly local-SEO defensive perimeter monitor for Minneapolis Kitchen & Bath.

Monitors:
  1. Google Business Profile presence (duplicate listings via Maps scrape)
  2. NAP consistency across Yelp, Houzz, Angi, BBB, Thumbtack, Facebook, Bing
  3. Review velocity week-over-week (SQLite-backed)
  4. SERP position for primary keywords via DataForSEO

Monitor only. No posting. No fabrication. Read-only signals.

Cron (weekly, Sundays 7am CT):
  0 7 * * 0 /usr/bin/env python3 /Users/jacobgiebel/code/active/minneapolis-kitchen-bath/scripts/gbp-monitor.py >> ~/.mnkb-gbp-monitor.log 2>&1

Env vars (optional):
  DATAFORSEO_USER, DATAFORSEO_PASS  (falls back to ~/.mcp.json)
  GMAIL_USER, GMAIL_APP_PASSWORD, ALERT_TO  (optional, else log file only)
"""

import json
import os
import re
import sqlite3
import smtplib
import sys
import urllib.parse
import urllib.request
from base64 import b64encode
from datetime import datetime, timezone
from email.mime.text import MIMEText
from pathlib import Path

BUSINESS_NAME = "Minneapolis Kitchen & Bath"
WEBSITE = "https://minneapoliskitchenandbath.com"
CITY = "Minneapolis"
STATE = "MN"

DB_PATH = Path.home() / ".mnkb-gbp-monitor.sqlite"
LOG_PATH = Path.home() / ".mnkb-gbp-monitor.log"
MCP_PATH = Path.home() / ".mcp.json"

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

CITATION_URLS = {
    "yelp": "https://www.yelp.com/search?find_desc=Minneapolis+Kitchen+and+Bath&find_loc=Minneapolis%2C+MN",
    "houzz": "https://www.houzz.com/professionals/probr0-bo~t_11786~q_Minneapolis%20Kitchen%20and%20Bath",
    "angi": "https://www.angi.com/companylist/minneapolis-kitchen-and-bath.htm",
    "bbb": "https://www.bbb.org/search?find_country=USA&find_text=Minneapolis+Kitchen+and+Bath&find_loc=Minneapolis%2C+MN",
    "thumbtack": "https://www.thumbtack.com/mn/minneapolis/kitchen-remodeling/minneapolis-kitchen-and-bath/",
    "facebook": "https://www.facebook.com/public/Minneapolis-Kitchen-and-Bath",
    "bing": "https://www.bing.com/maps?q=Minneapolis+Kitchen+and+Bath",
}

PHONE_RE = re.compile(r"\(?\b([2-9]\d{2})\)?[\s.\-]?(\d{3})[\s.\-]?(\d{4})\b")
ADDR_RE = re.compile(r"\b\d{1,6}\s+[A-Za-z0-9\.\s]{3,40}(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Drive|Dr|Lane|Ln|Way|Parkway|Pkwy|Place|Pl|Court|Ct)\b", re.IGNORECASE)


def log(msg):
    ts = datetime.now(timezone.utc).astimezone().strftime("%Y-%m-%d %H:%M:%S %Z")
    line = f"[{ts}] {msg}"
    print(line)
    try:
        with open(LOG_PATH, "a") as f:
            f.write(line + "\n")
    except Exception:
        pass


def http_get(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = resp.read()
            try:
                return data.decode("utf-8", errors="ignore")
            except Exception:
                return data.decode("latin-1", errors="ignore")
    except Exception as e:
        log(f"http_get failed for {url}: {e}")
        return ""


def init_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.execute("""
        CREATE TABLE IF NOT EXISTS review_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ts TEXT NOT NULL,
            review_count INTEGER,
            avg_rating REAL
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS serp_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ts TEXT NOT NULL,
            keyword TEXT NOT NULL,
            position INTEGER,
            url TEXT
        )
    """)
    conn.commit()
    return conn


def check_gbp_presence():
    """Scrape Google Maps search results page for the business name + city, count distinct listings."""
    findings = {"status": "ok", "listings_seen": 0, "duplicates_suspected": False, "notes": []}
    query = urllib.parse.quote_plus(f"{BUSINESS_NAME} {CITY} {STATE}")
    url = f"https://www.google.com/maps/search/{query}"
    html = http_get(url)
    if not html:
        findings["status"] = "fetch_failed"
        findings["notes"].append("Could not retrieve Maps SERP. Manual verification required.")
        return findings

    name_pattern = re.escape(BUSINESS_NAME).replace(r"\ ", r"\s+")
    matches = re.findall(name_pattern, html, flags=re.IGNORECASE)
    findings["listings_seen"] = len(matches)
    if len(matches) > 2:
        findings["duplicates_suspected"] = True
        findings["notes"].append(f"Name appears {len(matches)} times in Maps HTML. Possible duplicate listings.")
    return findings


def extract_nap(html):
    phones = set()
    for m in PHONE_RE.finditer(html or ""):
        phones.add(f"({m.group(1)}) {m.group(2)}-{m.group(3)}")
    addrs = set()
    for m in ADDR_RE.finditer(html or ""):
        addrs.add(m.group(0).strip())
    return phones, addrs


def check_nap_across_citations():
    """Fetch each citation URL, extract phone + address candidates, flag inconsistency vs canonical."""
    results = {}
    canonical_html = http_get(WEBSITE)
    canon_phones, canon_addrs = extract_nap(canonical_html)
    results["_canonical"] = {
        "phones": sorted(canon_phones),
        "addresses": sorted(canon_addrs),
    }

    inconsistencies = []
    for name, url in CITATION_URLS.items():
        html = http_get(url)
        phones, addrs = extract_nap(html)
        entry = {
            "url": url,
            "phones_found": sorted(phones),
            "addresses_found": sorted(addrs),
            "fetched": bool(html),
        }
        if html and canon_phones and phones and not (canon_phones & phones):
            entry["phone_mismatch"] = True
            inconsistencies.append(f"{name}: phone mismatch")
        if html and canon_addrs and addrs:
            overlap = False
            for ca in canon_addrs:
                for fa in addrs:
                    if ca.lower()[:15] in fa.lower() or fa.lower()[:15] in ca.lower():
                        overlap = True
                        break
                if overlap:
                    break
            if not overlap:
                entry["address_mismatch_possible"] = True
                inconsistencies.append(f"{name}: address may not match")
        results[name] = entry

    results["_inconsistencies"] = inconsistencies
    return results


def check_review_velocity(conn):
    """Scrape Maps for review_count + avg rating, store snapshot, compare to last week."""
    query = urllib.parse.quote_plus(f"{BUSINESS_NAME} {CITY} {STATE}")
    url = f"https://www.google.com/maps/search/{query}"
    html = http_get(url)

    review_count = None
    avg_rating = None
    if html:
        rc = re.search(r"(\d{1,5})\s*reviews?", html, flags=re.IGNORECASE)
        if rc:
            try:
                review_count = int(rc.group(1))
            except ValueError:
                pass
        ar = re.search(r"\b([1-5]\.\d)\s*stars?", html, flags=re.IGNORECASE)
        if ar:
            try:
                avg_rating = float(ar.group(1))
            except ValueError:
                pass

    ts = datetime.now(timezone.utc).isoformat()
    conn.execute(
        "INSERT INTO review_snapshots (ts, review_count, avg_rating) VALUES (?, ?, ?)",
        (ts, review_count, avg_rating),
    )
    conn.commit()

    cur = conn.execute(
        "SELECT ts, review_count, avg_rating FROM review_snapshots ORDER BY id DESC LIMIT 2"
    )
    rows = cur.fetchall()
    delta = None
    prev = None
    if len(rows) >= 2:
        prev = {"ts": rows[1][0], "review_count": rows[1][1], "avg_rating": rows[1][2]}
        if review_count is not None and rows[1][1] is not None:
            delta = review_count - rows[1][1]

    return {
        "current": {"ts": ts, "review_count": review_count, "avg_rating": avg_rating},
        "previous": prev,
        "delta_reviews": delta,
        "alert_no_new_reviews": (delta is not None and delta <= 0),
    }


def get_dataforseo_creds():
    user = os.environ.get("DATAFORSEO_USER")
    pw = os.environ.get("DATAFORSEO_PASS")
    if user and pw:
        return user, pw
    if MCP_PATH.exists():
        try:
            with open(MCP_PATH) as f:
                cfg = json.load(f)
            blob = json.dumps(cfg)
            um = re.search(r"DATAFORSEO_USER[^A-Za-z0-9]+([A-Za-z0-9_.@\-]+)", blob)
            pm = re.search(r"DATAFORSEO_PASS[^A-Za-z0-9]+([A-Za-z0-9_.@\-]+)", blob)
            if um and pm:
                return um.group(1), pm.group(1)
        except Exception as e:
            log(f"mcp.json parse failed: {e}")
    return None, None


def check_serp_position():
    """Query DataForSEO live SERP for primary keywords. Returns positions and stores snapshot."""
    user, pw = get_dataforseo_creds()
    out = {"results": [], "error": None}
    if not user or not pw:
        out["error"] = "Missing DataForSEO credentials. Set DATAFORSEO_USER and DATAFORSEO_PASS."
        return out

    keywords = ["kitchen remodel minneapolis", "bathroom remodel minneapolis"]
    auth = b64encode(f"{user}:{pw}".encode()).decode()
    endpoint = "https://api.dataforseo.com/v3/serp/google/organic/live/advanced"

    payload = []
    for kw in keywords:
        payload.append({
            "keyword": kw,
            "location_name": f"{CITY},Minnesota,United States",
            "language_code": "en",
            "device": "desktop",
            "depth": 100,
        })

    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Basic {auth}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        out["error"] = f"DataForSEO request failed: {e}"
        return out

    tasks = data.get("tasks") or []
    for task in tasks:
        kw = (task.get("data") or {}).get("keyword", "")
        position = None
        found_url = None
        for res in task.get("result") or []:
            for item in res.get("items") or []:
                url = item.get("url") or ""
                if "minneapoliskitchenandbath" in url.lower():
                    position = item.get("rank_absolute") or item.get("rank_group")
                    found_url = url
                    break
            if position:
                break
        out["results"].append({"keyword": kw, "position": position, "url": found_url})

    return out


def store_serp(conn, serp_data):
    ts = datetime.now(timezone.utc).isoformat()
    for r in serp_data.get("results", []):
        conn.execute(
            "INSERT INTO serp_snapshots (ts, keyword, position, url) VALUES (?, ?, ?, ?)",
            (ts, r["keyword"], r["position"], r["url"]),
        )
    conn.commit()


def send_alert(subject, body):
    """Send via Gmail SMTP if configured, otherwise append to log file."""
    gmail_user = os.environ.get("GMAIL_USER")
    gmail_pw = os.environ.get("GMAIL_APP_PASSWORD")
    alert_to = os.environ.get("ALERT_TO") or gmail_user

    if not (gmail_user and gmail_pw and alert_to):
        log(f"ALERT (log-only): {subject}\n{body}")
        return False

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = gmail_user
    msg["To"] = alert_to

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, timeout=30) as s:
            s.login(gmail_user, gmail_pw)
            s.sendmail(gmail_user, [alert_to], msg.as_string())
        log(f"ALERT sent to {alert_to}: {subject}")
        return True
    except Exception as e:
        log(f"SMTP failed: {e}. Falling back to log.")
        log(f"ALERT (log-only): {subject}\n{body}")
        return False


def main():
    log(f"Starting weekly GBP monitor for {BUSINESS_NAME}")
    conn = init_db()

    report_lines = [f"MNKB local-SEO monitor report: {datetime.now(timezone.utc).astimezone().isoformat()}", ""]
    alerts = []

    gbp = check_gbp_presence()
    report_lines.append(f"[GBP] listings_seen={gbp['listings_seen']} duplicates_suspected={gbp['duplicates_suspected']}")
    for n in gbp["notes"]:
        report_lines.append(f"  note: {n}")
    if gbp["duplicates_suspected"]:
        alerts.append("Possible duplicate GBP listings detected.")

    nap = check_nap_across_citations()
    report_lines.append("")
    report_lines.append("[NAP]")
    report_lines.append(f"  canonical phones: {nap['_canonical']['phones']}")
    report_lines.append(f"  canonical addresses: {nap['_canonical']['addresses']}")
    for name in CITATION_URLS:
        e = nap.get(name, {})
        flags = []
        if e.get("phone_mismatch"):
            flags.append("phone_mismatch")
        if e.get("address_mismatch_possible"):
            flags.append("address_mismatch_possible")
        if not e.get("fetched"):
            flags.append("fetch_failed")
        report_lines.append(f"  {name}: phones={e.get('phones_found')} flags={flags}")
    if nap["_inconsistencies"]:
        alerts.append("NAP inconsistencies: " + "; ".join(nap["_inconsistencies"]))

    rv = check_review_velocity(conn)
    report_lines.append("")
    report_lines.append(f"[Reviews] current={rv['current']} previous={rv['previous']} delta={rv['delta_reviews']}")
    if rv["alert_no_new_reviews"]:
        alerts.append(f"No new reviews this week (delta={rv['delta_reviews']}).")

    serp = check_serp_position()
    report_lines.append("")
    report_lines.append("[SERP]")
    if serp.get("error"):
        report_lines.append(f"  error: {serp['error']}")
    else:
        store_serp(conn, serp)
        for r in serp["results"]:
            report_lines.append(f"  {r['keyword']}: position={r['position']} url={r['url']}")
            if r["position"] is None or (isinstance(r["position"], int) and r["position"] > 20):
                alerts.append(f"SERP weak for '{r['keyword']}': position={r['position']}")

    report = "\n".join(report_lines)
    log("\n" + report)

    if alerts:
        subject = f"[MNKB monitor] {len(alerts)} alert(s) this week"
        body = "ALERTS:\n- " + "\n- ".join(alerts) + "\n\nFULL REPORT:\n" + report
        send_alert(subject, body)
    else:
        log("No alerts this week.")

    conn.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
