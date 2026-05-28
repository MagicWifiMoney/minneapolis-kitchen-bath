#!/usr/bin/env python3
"""
IndexNow + Bing/Google ping submitter for minneapoliskitchenandbath.com.

- Reads sitemap.xml, extracts <loc> URLs.
- Generates (or reuses) IndexNow key file in public/.
- Submits all URLs to IndexNow (api.indexnow.org).
- Pings Bing for each URL.
- Pings Google + Bing sitemap endpoints.
- Optionally hits Google Indexing API if GOOGLE_INDEXING_KEY env is set
  (path to a service account JSON file).
- Logs everything to research/index-submit.log.

Stdlib only. Run after every deploy, or weekly via cron.
"""

import json
import os
import secrets
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

SITE = "https://minneapoliskitchenandbath.com"
SITEMAP_URL = f"{SITE}/sitemap.xml"

ROOT = Path("/Users/jacobgiebel/code/active/minneapolis-kitchen-bath")
PUBLIC_DIR = ROOT / "public"
RESEARCH_DIR = ROOT / "research"
LOG_PATH = RESEARCH_DIR / "index-submit.log"

USER_AGENT = "mnkb-index-submit/1.0 (+https://minneapoliskitchenandbath.com)"
TIMEOUT = 20


def log(msg):
    ts = datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")
    line = f"[{ts}] {msg}"
    print(line)
    RESEARCH_DIR.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as f:
        f.write(line + "\n")


def http(method, url, data=None, headers=None):
    headers = dict(headers or {})
    headers.setdefault("User-Agent", USER_AGENT)
    body = None
    if data is not None:
        if isinstance(data, (dict, list)):
            body = json.dumps(data).encode("utf-8")
            headers.setdefault("Content-Type", "application/json; charset=utf-8")
        elif isinstance(data, str):
            body = data.encode("utf-8")
        else:
            body = data
    req = urllib.request.Request(url, data=body, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            return resp.status, resp.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as e:
        try:
            payload = e.read().decode("utf-8", errors="replace")
        except Exception:
            payload = ""
        return e.code, payload
    except Exception as e:
        return 0, f"ERROR: {e}"


def get_or_create_key():
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    existing = sorted(PUBLIC_DIR.glob("IndexNow-key-*.txt"))
    if existing:
        key_file = existing[0]
        key = key_file.stem.replace("IndexNow-key-", "")
        log(f"reusing IndexNow key file: {key_file.name}")
        return key, key_file
    key = secrets.token_hex(16)
    key_file = PUBLIC_DIR / f"IndexNow-key-{key}.txt"
    key_file.write_text(key, encoding="utf-8")
    log(f"created IndexNow key file: {key_file.name}")
    return key, key_file


def fetch_sitemap_urls():
    log(f"fetching sitemap: {SITEMAP_URL}")
    status, body = http("GET", SITEMAP_URL)
    if status != 200:
        log(f"sitemap fetch failed: status={status}")
        return []
    urls = []
    try:
        root = ET.fromstring(body)
        ns = ""
        if root.tag.startswith("{"):
            ns = root.tag.split("}")[0].strip("{")
        loc_tag = f"{{{ns}}}loc" if ns else "loc"
        for el in root.iter(loc_tag):
            text = (el.text or "").strip()
            if text:
                urls.append(text)
    except ET.ParseError as e:
        log(f"sitemap parse error: {e}")
        return []
    log(f"sitemap URLs found: {len(urls)}")
    return urls


def submit_indexnow_bulk(key, key_location, urls):
    if not urls:
        return
    payload = {
        "host": urllib.parse.urlparse(SITE).netloc,
        "key": key,
        "keyLocation": key_location,
        "urlList": urls,
    }
    status, body = http("POST", "https://api.indexnow.org/IndexNow", data=payload)
    log(f"IndexNow bulk submit: status={status} urls={len(urls)} body={body[:200]}")


def ping_bing_url(url):
    endpoint = "https://www.bing.com/indexnow?" + urllib.parse.urlencode(
        {"url": url}
    )
    status, _ = http("GET", endpoint)
    log(f"Bing ping URL: status={status} {url}")


def ping_sitemap_search_engines():
    qs = urllib.parse.urlencode({"sitemap": SITEMAP_URL})
    for name, base in [
        ("Google", "https://www.google.com/ping"),
        ("Bing", "https://www.bing.com/ping"),
    ]:
        status, _ = http("GET", f"{base}?{qs}")
        log(f"{name} sitemap ping: status={status}")


def google_indexing_api(urls):
    sa_path = os.environ.get("GOOGLE_INDEXING_KEY")
    if not sa_path:
        log("GOOGLE_INDEXING_KEY not set, skipping Google Indexing API")
        return
    if not Path(sa_path).is_file():
        log(f"GOOGLE_INDEXING_KEY path not found: {sa_path}")
        return
    try:
        import base64
        import hashlib
        import hmac
        import time

        with open(sa_path, "r", encoding="utf-8") as f:
            sa = json.load(f)
        client_email = sa["client_email"]
        private_key_pem = sa["private_key"]
        token_uri = sa.get("token_uri", "https://oauth2.googleapis.com/token")
        scope = "https://www.googleapis.com/auth/indexing"

        # Sign JWT using RSA SHA256. Stdlib has no RSA, so we need a fallback:
        # attempt to use 'cryptography' if available; otherwise skip.
        try:
            from cryptography.hazmat.primitives import hashes, serialization
            from cryptography.hazmat.primitives.asymmetric import padding
        except Exception:
            log(
                "Google Indexing API requires 'cryptography' package, "
                "skipping (install: pip install cryptography)"
            )
            return

        def b64url(b):
            return base64.urlsafe_b64encode(b).rstrip(b"=").decode("ascii")

        header = {"alg": "RS256", "typ": "JWT"}
        now = int(time.time())
        claims = {
            "iss": client_email,
            "scope": scope,
            "aud": token_uri,
            "iat": now,
            "exp": now + 3600,
        }
        signing_input = (
            b64url(json.dumps(header, separators=(",", ":")).encode())
            + "."
            + b64url(json.dumps(claims, separators=(",", ":")).encode())
        ).encode("ascii")
        key = serialization.load_pem_private_key(
            private_key_pem.encode("utf-8"), password=None
        )
        signature = key.sign(signing_input, padding.PKCS1v15(), hashes.SHA256())
        jwt = signing_input.decode("ascii") + "." + b64url(signature)

        token_body = urllib.parse.urlencode(
            {
                "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
                "assertion": jwt,
            }
        )
        status, body = http(
            "POST",
            token_uri,
            data=token_body,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )
        if status != 200:
            log(f"Google OAuth token fetch failed: status={status} body={body[:200]}")
            return
        access_token = json.loads(body).get("access_token")
        if not access_token:
            log("Google OAuth returned no access_token")
            return

        for url in urls:
            status, body = http(
                "POST",
                "https://indexing.googleapis.com/v3/urlNotifications:publish",
                data={"url": url, "type": "URL_UPDATED"},
                headers={"Authorization": f"Bearer {access_token}"},
            )
            log(f"Google Indexing API: status={status} {url}")
    except Exception as e:
        log(f"Google Indexing API error: {e}")


def main():
    log("=== index-submit run start ===")
    key, key_file = get_or_create_key()
    key_location = f"{SITE}/{key_file.name}"
    log(f"keyLocation: {key_location}")

    urls = fetch_sitemap_urls()
    if not urls:
        log("no URLs to submit, exiting")
        log("=== index-submit run end ===")
        return 1

    submit_indexnow_bulk(key, key_location, urls)

    for url in urls:
        ping_bing_url(url)

    ping_sitemap_search_engines()
    google_indexing_api(urls)

    log(f"=== index-submit run end (submitted {len(urls)} URLs) ===")
    return 0


if __name__ == "__main__":
    sys.exit(main())
