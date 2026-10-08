# K Line Academy — Digital Aligner Planning Bootcamp

Marketing and application website for K Line Academy (https://klineacademy.org).
Next.js 14 · React 18 · Tailwind CSS · Resend (email) · Node.js 22.

**IT / hosting handover: see [HANDOVER.md](HANDOVER.md)** — architecture, configuration, Docker, DNS, email, cut-over plan and maintenance.

## Quick start

```bash
npm install
cp .env.example .env.local   # set RESEND_API_KEY
npm run dev                  # http://localhost:3000
```

## Production

```bash
docker build -t kline-academy .
docker run -p 3000:3000 -e RESEND_API_KEY=re_xxx kline-academy
```
