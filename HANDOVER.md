# K Line Academy — IT Handover

Everything needed to take over, run, and host **https://klineacademy.org** internally.
Snapshot date: **8 October 2026**. Owner until handover: Dr. Assem Youssef (assem@clearxaligners.com).

---

## 1. What the system is

A marketing + application website for K Line Academy (digital aligner planning bootcamp).

| Part | What it does |
|---|---|
| Public pages | `/` (landing), `/apply` (4-step application form), `/apply/success`, `/privacy`, `/terms` |
| API | `POST /api/submit` — validates an application, emails it (with CV attachment) to the admin, sends a confirmation to the applicant |
| Generated assets | `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`, `/twitter-image`, `/favicon.ico`, `/icon.png` |

**There is no database.** Applications exist only as (a) the admin email and (b) Resend's sending logs. Form drafts are kept only in the applicant's own browser (`localStorage`).

### Stack

| Component | Version |
|---|---|
| Runtime | Node.js **22 LTS** (container: `node:22-alpine`) |
| Framework | Next.js 14.2 (App Router), React 18, TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Email | Resend (`resend` npm SDK) — https://resend.com |
| Images | `next/image` + `sharp` (AVIF/WebP, resized per device) |
| Build output | Next.js `standalone` — a self-contained `server.js` |

---

## 2. Source code

- **Repository:** https://github.com/assem-cmyk/kline-academy (private), branch `main`
- **Action for owner:** add IT's GitHub account(s) as collaborators, or transfer the repo to the company GitHub organisation (GitHub → Settings → Transfer).
- Every commit to `main` currently auto-deploys to DigitalOcean (see §7). Disable that once internal hosting is live.

### Layout
```
src/app/            pages, API route (api/submit/route.ts), metadata, sitemap/robots, OG images
src/components/     page sections (Hero, ProgramOverview, Pricing, Faculty, Faq, RegistrationForm, …)
public/             faculty photos, software logos, brand logo
next.config.js      security headers (CSP, HSTS, …) and image settings
Dockerfile          production image (multi-stage, non-root, healthcheck)
```

---

## 3. Configuration & secrets

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | **Yes** | Sends application emails. Without it the site works but the form replies "Email service is not configured". |
| `NEXT_PUBLIC_SITE_URL` | No | Public origin for canonical URLs / sitemap / JSON-LD. Default `https://klineacademy.org`. **Build-time** value (baked in at `npm run build`). |
| `PORT` / `HOSTNAME` | No | Listening port/interface. Container defaults: `3000` / `0.0.0.0`. |

Hard-coded settings worth knowing (in `src/app/api/submit/route.ts`):
- `ADMIN_EMAIL = 'assem@clearxaligners.com'` — recipient of every application. Change here if applications should go to a shared inbox (e.g. admissions@…).
- `FROM = 'K Line Academy <noreply@klineacademy.org>'`
- Rate limit: 5 submissions per IP per 10 minutes (in memory, per instance).
- CV upload: PDF or Word only, max **3 MB** (form check); the API rejects base64 payloads over ~4.3 MB and checks file magic bytes.

**Secrets handover:** the Resend key must be passed privately (password manager), never by email/chat/Git. The current key was shared in a chat, so **create a fresh key at handover** (Resend → API keys → Create, *Sending access*, domain `klineacademy.org`), configure it on the new host, then delete the old key.

---

## 4. Run it

### Docker (recommended)
```bash
docker build -t kline-academy .
docker run -d --name kline-academy --restart unless-stopped \
  -p 3000:3000 \
  -e RESEND_API_KEY=re_xxxxxxxx \
  kline-academy
```
- Runs as non-root user `nextjs`; built-in `HEALTHCHECK` hits `/robots.txt`.
- `NEXT_PUBLIC_SITE_URL` is read at build time and defaults to `https://klineacademy.org`; only change it (in `.env.example` → build env) if the public domain changes.

### Without Docker (Node 22)
```bash
npm ci
npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
cd .next/standalone && RESEND_API_KEY=re_xxx PORT=3000 node server.js
```
Run under systemd / PM2 so it restarts on failure and on boot.

### Local development
```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

---

## 5. Hosting requirements

| Item | Requirement |
|---|---|
| CPU / RAM | 1 vCPU, **1 GB RAM** (current production size). 512 MB is too tight for image optimisation. |
| Disk | ~500 MB for the image; image cache is written to `.next/cache` inside the container (ephemeral is fine). |
| Instances | **One instance is enough.** If you run several, the rate limit is per instance (acceptable). |
| Inbound | HTTPS 443 (+ 80 → 443 redirect) through a reverse proxy (nginx / Traefik / load balancer). |
| Outbound | HTTPS to `api.resend.com` (email sending). Nothing else. |
| TLS | Certificates for `klineacademy.org` **and** `www.klineacademy.org` (e.g. Let's Encrypt). HSTS is sent (2 years, includeSubDomains) — keep HTTPS on every subdomain. |
| Proxy header | The proxy **must append the real client IP to `X-Forwarded-For`**. The rate limiter trusts the *last* hop. |
| Request size | Allow request bodies of at least **6 MB** on `/api/submit` (3 MB CV ≈ 4.3 MB base64 + form fields). nginx default (1 MB) is too small: `client_max_body_size 6m;` |
| Caching (optional) | Pages are static and send long `s-maxage`; a CDN in front is optional. Purge it after each deploy. |

Example nginx server block:
```nginx
server {
  listen 443 ssl http2;
  server_name klineacademy.org www.klineacademy.org;
  ssl_certificate     /etc/letsencrypt/live/klineacademy.org/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/klineacademy.org/privkey.pem;
  client_max_body_size 6m;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
server { listen 80; server_name klineacademy.org www.klineacademy.org; return 301 https://klineacademy.org$request_uri; }
```

---

## 6. Domain, DNS & email

**Registrar + DNS:** Namecheap (nameservers `dns1/dns2.registrar-servers.com`), account owned by Dr. Assem. Grant IT access via Namecheap → Sharing & Transfer, or move DNS to the company provider.

Current records (8 Oct 2026):

| Host | Type | Value | Purpose |
|---|---|---|---|
| `@` | A | `162.159.140.98` | Website → DigitalOcean (change at cut-over) |
| `@` | A | `172.66.0.96` | Website → DigitalOcean (change at cut-over) |
| `www` | CNAME | `oyster-app-ffl5x.ondigitalocean.app.` | Website → DigitalOcean (change at cut-over) |
| `resend._domainkey` | TXT | `p=MIGfMA0G…` (DKIM key) | **Email signing — do not delete** |
| `send` | MX | `10 feedback-smtp.eu-west-1.amazonses.com.` | **Resend bounce handling — do not delete** |
| `send` | TXT | `v=spf1 include:amazonses.com ~all` | **Email SPF — do not delete** |
| `rdp` | A | `49.13.101.195` | Not part of the website — confirm owner |
| `vm` | A | `63.181.20.164` | Not part of the website — confirm owner |

Notes
- `klineacademy.org` has **no MX record** — it can only *send* (noreply@). Replies go nowhere.
- **No DMARC record.** Recommended: `_dmarc` TXT `v=DMARC1; p=none; rua=mailto:<it-mailbox>` then tighten to `quarantine`.
- **Resend:** team "clearxaligners", sending domain `klineacademy.org` (verified, region eu-west-1). Invite IT to the Resend team (Settings → Team).

---

## 7. Current hosting (to be retired)

| Item | Value |
|---|---|
| Provider | DigitalOcean App Platform, team "K Line team", project `first-project` |
| App | `oyster-app` (id `09de311f-1ae3-4a04-929c-ce9915236596`), region FRA1 |
| Size / cost | 1 × 1 GB / 1 shared vCPU — **$12/month** |
| Build | From GitHub `main`, Dockerfile, auto-deploy on push |
| Env | `RESEND_API_KEY` (encrypted, app-level) |
| Domains | `klineacademy.org` (primary), `www.klineacademy.org`, starter `oyster-app-ffl5x.ondigitalocean.app` |

History: the previous app (`seal-app`) was deleted after an account suspension (billing) and recreated on 8 Oct 2026 — another reason to own hosting internally.

---

## 8. Cut-over plan (zero downtime)

1. **Prepare:** IT gets GitHub, Namecheap, and Resend access; new Resend key created and stored in the company vault.
2. **Deploy internally** (§4–§5) with the new key. Test with a hosts-file override (`<internal-public-IP> klineacademy.org www.klineacademy.org`).
3. **Verify** (§9 checklist), including one real test application.
4. **Lower DNS TTL** for `@` and `www` to 5 minutes, one day ahead.
5. **Switch DNS** at Namecheap: replace both `@` A records with the internal public IP; change `www` to a CNAME → `klineacademy.org` (or an A record to the same IP). **Leave the three email records untouched.**
6. Watch traffic move (logs on the new host, `dig klineacademy.org`), re-run the checklist on the real domain.
7. **After 48 h with no traffic on DigitalOcean:** disable auto-deploy, then destroy `oyster-app` (Settings → Destroy) to stop billing. Delete the old Resend key.

**Rollback:** point `@` back to `162.159.140.98` + `172.66.0.96` and `www` back to `oyster-app-ffl5x.ondigitalocean.app` (only while the DO app still exists).

---

## 9. Acceptance checklist

```bash
B=https://klineacademy.org
for p in / /apply /apply/success /privacy /terms /sitemap.xml /robots.txt /favicon.ico /opengraph-image; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code}' $B$p)"; done            # all 200
curl -sI $B | grep -iE 'content-security|strict-transport|x-frame'          # headers present
curl -s -X POST -H 'Content-Type: application/json' -d '{}' $B/api/submit   # 400 "Invalid submission…"
curl -s -o /dev/null -w '%{http_code}\n' http://klineacademy.org            # 301
curl -s -o /dev/null -w '%{http_code}\n' https://www.klineacademy.org       # 200 or 301
```
Then submit a real application on `/apply` with a small PDF → admin email **and** applicant confirmation arrive (check Resend → Emails shows both "Delivered").

---

## 10. Maintenance

| Task | How / when |
|---|---|
| Content: dates, price, seats | Facts are repeated across ~11 places. After any change, `grep -rn "<old value>" src` and update all: Hero, ProgramOverview, Pricing, Faq, RegistrationForm (`BATCHES` + consent text), `api/submit/route.ts` (`BATCHES` allowlist, `BATCH_FRIENDLY`, email text), terms, success page, `page.tsx` JSON-LD, `opengraph-image.tsx`. The form's `BATCHES` and the API's `BATCHES` **must match exactly** or submissions are rejected. |
| Faculty | Photo in `public/faculty/`, entry in `src/components/Faculty.tsx` (+ JSON-LD instructor list in `src/app/page.tsx`). |
| Dependencies | `npm outdated` / `npm audit` monthly. Next.js 14 is in maintenance; plan an upgrade to Next 15 in 2027. Node 22 is supported until **April 2027** — move to Node 24 before then (`Dockerfile` base image). |
| Secrets | Rotate `RESEND_API_KEY` yearly and whenever staff with access leave. |
| Monitoring | Add an uptime check on `https://klineacademy.org/robots.txt` (200) and alerting on container restarts. Server logs print `[submit]` lines for every email send/failure. |
| Backups | Code is in Git. No database to back up. Applications live in the admin mailbox — make sure that mailbox is retained/backed up. |

---

## 11. Known open items (as of handover)

- Batch 3 dates are "to be announced"; price shown $900 (deposit $450).
- No Batch 1 testimonials/outcomes on the site yet (biggest conversion gap).
- Venue district and legal entity address not yet on the privacy/terms pages.
- Applications go to a personal mailbox; consider a shared `admissions@` mailbox (requires an MX record or another domain).
- DMARC record missing (§6).
