# K Line Academy — Digital Aligner Planning Bootcamp

Registration website for K Line Academy, a clear aligner digital training bootcamp by K Line Middle East.

Built with Next.js 14 (App Router), Tailwind CSS, and Resend for email notifications.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and add your Resend API key:
   ```bash
   cp .env.example .env.local
   ```
   Get a free Resend key at [resend.com](https://resend.com) (free tier: 100 emails/day).

3. Add the 5 faculty photos to `/public/faculty/` using these exact filenames:
   - `sameh-talaat.jpg`
   - `yasmine-kabani.jpg`
   - `sara-tag.jpg`
   - `khalid-ibrahim.jpg`
   - `amr-radwan.jpg`

4. Start the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. Test the full form flow and confirm both emails arrive.

## DigitalOcean App Platform Deployment

1. Push this project to GitHub.

2. Go to **DigitalOcean → App Platform → Create App → Connect GitHub repo**.

3. It will auto-detect Next.js — confirm:
   - **Build command:** `npm run build`
   - **Run command:** `npm start`
   - **Port:** `3000`

4. Add environment variables:
   - `RESEND_API_KEY` → from [resend.com](https://resend.com)
   - `NEXT_PUBLIC_SITE_URL` → your DigitalOcean app URL

5. Deploy — live in ~3 minutes.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Inter font
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles
│   ├── apply/
│   │   ├── page.tsx        # Registration form page
│   │   └── success/
│   │       └── page.tsx    # Success page
│   └── api/
│       └── submit/
│           └── route.ts    # POST handler — sends emails via Resend
├── components/
│   ├── Header.tsx          # Sticky nav with mobile menu
│   ├── Hero.tsx            # Hero with CTAs
│   ├── Differentiators.tsx # 3 icon cards
│   ├── ProgramOverview.tsx # Program details + timeline
│   ├── SoftwareSection.tsx # OnyxCeph & Titan cards
│   ├── Faculty.tsx         # 5 instructor cards
│   ├── Benefits.tsx        # Graduate benefits
│   ├── Pricing.tsx         # Pricing card with inclusions
│   ├── Footer.tsx          # Footer
│   └── RegistrationForm.tsx # 4-step form with validation
public/
└── faculty/                # Faculty photos (add manually)
```
