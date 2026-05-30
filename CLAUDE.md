@AGENTS.md

# Minneapolis Kitchen & Bath — project rules

## Deploy: GIT ONLY. Never manual.
- **Production deploys come from `git push origin main` ONLY.** The Vercel project
  (`giebz/minneapoliskitchenandbath`) is connected to
  `github.com/MagicWifiMoney/minneapolis-kitchen-bath` and auto-builds on push to `main`.
- **NEVER run `vercel --prod`, `vercel deploy`, or any manual CLI deploy.**
  On 2026-05-30 manual `vercel --prod` runs from a stale local checkout published
  an old build over the apex domain, so ~165 committed content pages (26 blogs,
  3 tools, service-area + programmatic pages) sat 404 in production for ~2 days
  while looking "Ready" in `vercel ls`. Git-sourced deploys do not have this failure mode.
- To ship: commit → `git push origin main` → confirm a new Production deployment
  goes Ready in `vercel ls` (~30s) and curl a changed URL for 200. That's it.
- `vercel` CLI is fine for read-only ops (`vercel ls`, `vercel inspect`). Just never deploy with it.

## Canonical names
- Vercel project: `minneapoliskitchenandbath` (giebz team)
- Domain: `minneapoliskitchenandbath.com`
- GSC property: `sc-domain:minneapoliskitchenandbath.com` (service account on jake-dev)

## Local services
- `com.mnkb.gsc-recheck` — weekly Mon 9:05am CT GSC re-check.
  Script: `~/code/active/_shared/scripts/mnkb-gsc-recheck.sh`. Emails Jake via AgentMail
  (key read from mplsvegan `.env.local`). Log: `~/code/active/_shared/logs/mnkb-gsc-recheck.log`.
