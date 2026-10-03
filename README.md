# Adio Prints International — Website

**Quality Prints • Lasting Impressions**

Production-ready marketing website for Adio Prints International (Nigerian printing & branding
business): services, portfolio, quote form with WhatsApp hand-off, and a secured admin area for
managing quote requests.

**Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Neon serverless Postgres +
Drizzle ORM · `jose` JWT auth (httpOnly cookies) · Zod validation · lucide-react icons · Vercel-ready.

---

## 1. Quick start (local)

```bash
npm install
cp .env.example .env         # then fill in the values (see table below)
npm run db:migrate           # creates tables with drizzle-kit  (or use db:seed, which also creates them)
npm run db:seed              # creates/updates the admin user from ADMIN_EMAIL + ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

No database yet? Create a free project at [neon.tech](https://neon.tech) and copy the
**pooled** connection string into `DATABASE_URL`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also runs lint + type checking) |
| `npm run start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript checks |
| `npm run db:generate` | Generate SQL migrations from `db/schema.ts` into `db/migrations/` |
| `npm run db:migrate` | Apply pending migrations to the database |
| `npm run db:seed` | Create tables if missing + seed the admin user (idempotent) |
| `node scripts/smoke-test.mjs` | Boots the built site in-process and smoke-tests every route/API |
| `node scripts/screenshot.mjs` | Captures full-page screenshots into `.next/shots/` (needs Chrome) |
| `node scripts/diagnose-overflow.mjs /path` | Reports elements overflowing a 390px mobile viewport |

> `npm run db:seed` already creates the tables, so `db:migrate` is only needed if you change the
> schema later (then: `db:generate` → `db:migrate`).
>
> Pick **one** method for the first setup: either `db:migrate` then `db:seed` (recommended), or
> `db:seed` alone. If `db:seed` created the tables first, a later `db:migrate` of that first
> migration will fail because the tables already exist — delete nothing, just skip that migration
> (or start with an empty database).

---

## 2. Environment variables

`.env.example` documents all of them:

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes (for quote form + admin) | Neon Postgres connection string |
| `JWT_SECRET` | Yes (for admin login) | Signs the admin session cookie (16+ random chars) |
| `ADMIN_EMAIL` | Yes (for seeding) | Admin login email used by `npm run db:seed` |
| `ADMIN_PASSWORD` | Yes (for seeding) | Admin login password used by `npm run db:seed` |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL used for SEO, Open Graph and sitemap |

Never commit `.env`. On Vercel: **Project → Settings → Environment Variables**.

---

## 3. Editing content (one file)

All business information, copy and data live in **`/data/site.ts`** — no component changes needed.

```text
business   → name, tagline, phone (08088430235 / +2348088430235), email, address,
             working hours, social links, area served
nav        → header + footer navigation
slogans    → marketing lines used across the site
services   → the 8 services (title, description, uses, options, turnaround, keywords)
processSteps / trustStrip / whyUs / stats   → home & about sections
portfolio  → portfolio items (title, client, category, description, image, gradient)
testimonials / clientLogos                  → social proof
faqs      → FAQ accordion (how-it-works + service pages)
deadlineOptions / sitemapExtraPaths         → form + sitemap
```

**Adding a portfolio photo**

1. Drop the file in `/public/images/portfolio/your-file.jpg`
2. In `portfolio`, set `image: "/images/portfolio/your-file.jpg"` (the gradient is only a placeholder).

**Changing the phone / WhatsApp number** — update `phoneDisplay`, `phoneRaw`, `phoneIntl` and
`whatsappNumber` in `business`. Every call/WhatsApp button reads from there.

---

## 4. Swapping the logo

The placeholder logo is an inline SVG that recreates the brand mark (crown + **AP** monogram +
CMYK swoosh) plus the **ADIO PRINTS / INTERNATIONAL** wordmark.

* Replace the SVG inside `components/Logo.tsx → LogoMark()` with the real artwork, **or**
* Put the client logo at `/public/logo.svg` and render `<img src="/logo.svg">` in `LogoMark`.
* The favicon is `app/icon.svg` — replace it with the matching icon/`.ico`.
* The wordmark text (`ADIO PRINTS` / `International`) is plain HTML in `Logo()`, so it stays
  crisp and selectable.

---

## 5. Quote form → database → admin

* `POST /api/quotes` validates with Zod, applies rate limiting (5 requests / 10 min per IP),
  drops bot submissions (hidden honeypot field + sub-3-second submissions), then inserts a row
  into `quote_requests`.
* On success the site shows a confirmation with a **“Send details on WhatsApp”** button that
  builds a pre-filled `wa.me/2348088430235` message from the form values.
* If the database is unreachable, the form tells the visitor to continue on WhatsApp instead of
  failing silently.

**Admin**

* Login: `/admin/login` (credentials come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` via `npm run db:seed`).
* Dashboard: `/admin` — newest first, counts, text search, status filter, status dropdown
  (New → Contacted → In Progress → Completed) and one-click **Reply on WhatsApp**.
* `middleware.ts` protects `/admin` and `/api/admin` with an 8-hour JWT session in an httpOnly cookie.

---

## 6. Deploying to Vercel

1. Push the project to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repository (framework auto-detected: **Next.js**).
3. Create the Neon database, then add the environment variables above in
   **Project → Settings → Environment Variables** (`DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL=https://your-domain.com`).
4. Deploy. After the first deploy, run the database setup once:
   ```bash
   # from your machine, pointed at the production database
   DATABASE_URL="postgresql://…" npm run db:migrate
   DATABASE_URL="postgresql://…" ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run db:seed
   ```
5. **Custom domain:** Project → Settings → Domains → add `yourdomain.com` (and `www`),
   then:
   * At your registrar, point `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com`
     (or follow the values Vercel shows you).
   * Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` and redeploy so canonical URLs,
     Open Graph tags and the sitemap use the domain.
6. Verify: `/sitemap.xml`, `/robots.txt`, a service page, and a test quote request.

---

## 7. Project structure

```text
app/                  Pages, API routes, metadata, sitemap/robots/OG image
  api/quotes          Quote form endpoint
  api/admin/*         Login / logout / status update
  admin/              Login page + dashboard (protected by middleware)
  services/[slug]     Individual service pages (statically generated)
components/           Header, Footer, QuoteForm, PortfolioGrid, cards, UI primitives
data/site.ts          ← all editable content in one place
db/                   Drizzle schema + Neon client
lib/                  Validation, auth/JWT, SEO helpers, icons, links, rate limiting
scripts/              Seed, smoke test, screenshots
middleware.ts         Secures /admin and /api/admin
```

---

## 8. Placeholders to replace before launch

1. **Logo** — placeholder SVG in `components/Logo.tsx` + `app/icon.svg`.
2. **Address** — `business.address` (`12 Example Street…`).
3. **Email** — `business.email` (`hello@adioprints.com`).
4. **Working hours** — `business.hours` (if they differ).
5. **Social links** — `business.socials` (Instagram/Facebook/X/TikTok handles).
6. **Testimonials** — `testimonials` are clearly-marked samples; swap for real client quotes.
7. **Client logos** — `clientLogos` are sample names.
8. **Portfolio photos** — gradient placeholders; add real images as described above.
9. **Stats** — `stats` (years, projects, clients) are placeholders.
10. **Founder photo & note** — `/app/about/page.tsx` (drop the photo in `/public/images/founder.jpg`).
11. **Google Map** — replace the map placeholder block in `/app/contact/page.tsx`.
12. **Pricing** — no fixed price list is published; add one to `data/site.ts` later if desired.

---

## 9. Accessibility & performance notes

* Semantic landmarks, skip-to-content link, visible focus rings, keyboard-navigable menus,
  carousel, lightbox and FAQ accordion; `prefers-reduced-motion` disables animations.
* `next/font` (Poppins / Inter / Caveat) with `display: swap`, lazy-loaded images via `next/image`,
  no heavy image assets (hero art is SVG/CSS).
* Per-page metadata, canonical URLs, Open Graph/Twitter tags, auto-generated `opengraph-image`,
  `sitemap.xml`, `robots.txt` and `LocalBusiness` JSON-LD with services and area served (Nigeria).
