# Heritage Auto Finance — Website

A production-quality, multi-page website for **Heritage Auto Finance**, Mehsana, Gujarat (heritageautofinance.in). Built with React + Vite + TypeScript, Tailwind CSS, and a Three.js / React Three Fiber 3D hero.

## Features

- 11 pages: Home, 5 service pages (New Car Finance, Used Car Finance, Car Refinance, Commercial Vehicle Finance, Insurance Assistance), EMI Calculator, About Us, Contact Us, Privacy Policy, Terms and Conditions
- Cinematic 3D hero car (original low-poly model built with React Three Fiber — no paid 3D APIs), with:
  - slow auto-rotation, mouse-follow camera, scroll-driven rotation
  - animated headlights with live glow lights, showroom lighting rig, floating gold particles
  - static image fallback when WebGL is unavailable
  - automatic reduced-motion mode (`prefers-reduced-motion`)
  - lazy-loaded 3D bundle (code-split from the main app)
- Heritage-branded loading animation (monogram + gold sweep, reduced-motion aware)
- Working EMI calculator (loan amount, interest rate, tenure) with standard EMI formula
- Finance comparison tool: indicative side-by-side EMIs across finance types
- Finance enquiry form (name, mobile, city, vehicle type, enquiry type) with validation, success/error feedback, saved to Supabase
- WhatsApp enquiry integration with per-service prefilled messages, floating WhatsApp button on every page, click-to-call
- Official Facebook and Instagram links in header, footer, mobile menu and Contact page
- Mobile navigation, responsive layouts, accessible semantics, SEO metadata, Open Graph, JSON-LD structured data, `sitemap.xml` and `robots.txt`

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at the address Vite prints in the terminal.

## Configuration

All business details live in **one file**: `src/config/site.ts`.

| What | Where |
|---|---|
| WhatsApp number | `whatsappNumber` (`917600211085`) |
| Phone number | `phoneDisplay` (`+91 76002 11085`) and `phoneDial` (`+917600211085`) |
| Email | `email` |
| Address | `location.addressLine` |
| Facebook / Instagram | `social.facebook`, `social.instagram` (official links pre-configured) |
| Logo | set `logoSrc: '/brand/logo.png'` after placing the file |
| Domain (SEO/sitemap) | `domain` |

> **Logo:** the original logo file was not present in the project. To use it, save it as
> `public/brand/logo.png` and change `logoSrc` to `'/brand/logo.png'` in `src/config/site.ts`
> — it then appears automatically in the navbar, footer and loading screen.

> **Before going live:** replace the placeholder phone/WhatsApp/email/address values with the real business details. No other file needs to change.

## Supabase (enquiry form storage)

The enquiry form writes to a Supabase table (`enquiries`). The project reads its URL and anon key from environment variables at build time:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

Add these to a `.env` file locally and to your hosting provider's environment settings. If they are absent, the form still works — submissions are delivered via WhatsApp and the form shows a note that automatic storage was skipped.

To create the table, run in the Supabase SQL editor:

```sql
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mobile text NOT NULL,
  city text NOT NULL,
  vehicle_type text NOT NULL,
  enquiry_type text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON enquiries TO anon, authenticated;
CREATE POLICY "Anyone can submit an enquiry"
  ON enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (length(name) > 0 AND length(mobile) > 0 AND length(city) > 0);
```

## Build

```bash
npm run build      # production build in dist/
npm run preview    # preview the production build locally
npm run typecheck  # TypeScript check
npm run lint       # ESLint
```

## Deployment

### Cloudflare Pages

1. Push this repository to GitHub (below).
2. In Cloudflare Dashboard → Workers & Pages → Create → Pages → **Connect to Git**, select the repo.
3. Build settings:
   - Framework preset: **Vite** (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Deploy. The included `public/_redirects` file makes all client-side routes (e.g. `/services/new-car-finance`) resolve correctly.
5. Add the custom domain `heritageautofinance.in` in Pages → Custom domains.

### Any static host (Netlify, Vercel, cPanel)

Upload the contents of `dist/` and configure SPA fallback (all routes → `index.html`).

## GitHub Setup

```bash
git init
git add .
git commit -m "Heritage Auto Finance website"
git branch -M main
git remote add origin https://github.com/<your-username>/heritage-auto-finance.git
git push -u origin main
```

## Project Structure

```
src/
  components/        # Navbar, Footer, Hero3D, EMI calculator, enquiry form, etc.
    three/           # 3D scene (lazy-loaded)
  pages/             # One file per route
    services/        # Five service pages
  config/site.ts     # ALL business details — edit here
  lib/               # Supabase client, EMI math, image URLs
  data/              # Service page content
public/              # robots.txt, sitemap.xml, _redirects
```

## Content Policy

The site deliberately contains no fabricated testimonials, ratings, lender partnerships or approval guarantees. Finance copy states clearly that approvals are subject to lender eligibility checks.
