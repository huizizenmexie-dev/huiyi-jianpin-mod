# Huiyi Jianpin Website Guide

This repository contains the public static website for Huiyi Jianpin / Lecprima, the B2B ingredient supplier site for soy lecithin, phospholipid, soy protein, and related food ingredient supply inquiries.

## Website Purpose

- Present verified company, product, quality, application, insight, and contact information to international B2B buyers.
- Support search engines and AI answer engines with crawlable, static, visible content.
- Generate quote and documentation inquiries through the Contact page.
- Keep every public claim aligned with approved visible website content or a verified internal source.

## Content Boundaries

- Do not invent certifications, prices, stock, MOQ, delivery times, customer cases, test results, performance effects, regulatory claims, origin claims, or document availability.
- Any `Product`, `Organization`, `Article`, breadcrumb, or other JSON-LD data must match visible page content and the same content source used by the page.
- Article pages may explain buyer decision logic, but they must link back to real product pages instead of creating unsupported product grades.
- Do not add hidden text, AI-only pages, fake FAQ blocks, cloaked content, keyword stuffing, or unverifiable claims for SEO/GEO purposes.

## Architecture

- Framework: Vite + React + TypeScript.
- Output: static files in `dist/public`.
- Routing: `wouter`, with locale-prefixed public routes.
- Styling: Tailwind CSS plus the small UI primitives actually used by the site.
- Deployment target: GitHub Pages through `.github/workflows/deploy-pages.yml`.

## Route Map

- `/:locale/` - Home
- `/:locale/products/` - Product listing
- `/:locale/products/:slug/` - Product detail pages
- `/:locale/about/` - Company profile
- `/:locale/quality/` - Quality and documentation page
- `/:locale/industry-solutions/` - Application and industry page
- `/:locale/insights/` - Article index
- `/:locale/insights/:slug/` - Article detail pages
- `/:locale/contact/` - Inquiry form and contact details

`/` redirects to the default locale route during prerendering.

## Source Of Truth

- Product data: `client/src/lib/productData.ts`
- Article content: `client/src/content/insights.ts`
- Route metadata and route coverage: `client/src/content/routes.ts`
- Site identity and contact facts: `client/src/content/site.ts`
- Canonical URL and base path logic: `client/src/content/url.ts`
- SEO and JSON-LD builders: `client/src/content/seo.ts`
- Translations: `client/src/i18n/messages/*.json`
- Translation loader: `client/src/i18n/messages.ts` and `client/src/i18n/loadTranslations.ts`
- Static prerendering: `scripts/prerender.ts`
- SEO validation: `scripts/validate-seo.ts`
- Static output validation: `scripts/verify-static-site.ts`

## Internationalization Rules

- Supported locales are defined in `client/src/i18n/config.ts`.
- Keep the default locale as English unless there is a deliberate route and SEO migration plan.
- Add or update the same translation keys across every file in `client/src/i18n/messages/`.
- Do not restore browser-fetched locale JSON files under `client/public/locales`; translations are bundled so crawlers see complete prerendered text.

## SEO And GEO Rules

- Every indexable page must have a stable canonical URL, localized path, title, description, and visible H1-like page topic.
- Sitemap, robots rules, canonical tags, hreflang links, and JSON-LD must use the same `SITE_ORIGIN` and `BASE_PATH` logic.
- Product structured data must only use fields from real product records and visible page copy.
- Article structured data must reflect the actual article title, description, author/publisher, dates, and page URL.
- GEO content should answer buyer questions clearly in visible HTML; do not create separate hidden content for AI systems.
- Verification files and search-engine meta tags belong in `client/public` or `client/index.html` only when required by the relevant platform.

## Deployment And Environment

- `SITE_ORIGIN` / `VITE_SITE_ORIGIN`: absolute production origin, for example `https://lecprima.com`.
- `BASE_PATH` / `VITE_BASE_PATH`: deployment base path. Use `/` for a custom domain root.
- `WEB3FORMS_ACCESS_KEY` / `VITE_WEB3FORMS_ACCESS_KEY`: contact form access key.
- `INDEXNOW_KEY`: optional IndexNow key. The key file in `client/public` must match the submitted key.

Common commands:

```bash
pnpm check
pnpm test
pnpm build
pnpm validate-seo
pnpm verify-static
```

## Change Checklist

- Update the relevant source-of-truth file first, then update translations and SEO builders if needed.
- Confirm page content, metadata, canonical URL, hreflang, sitemap, robots, and JSON-LD stay consistent.
- For new public pages, add route metadata, prerender coverage, sitemap coverage, and tests.
- For new articles, provide an index entry, detail route, visible internal links, and article JSON-LD.
- Run the verification commands before deployment.

## Known Decisions

- The repository keeps one development guide at `docs/SITE_GUIDE.md` instead of multiple scattered notes.
- The site is static-first for crawler reliability on Google, Bing, and AI answer engines.
- Translations are bundled at build time to avoid untranslated keys during prerendering.
- The public article entrance is the `Insights` page, linked from site navigation and footer.
- Deprecated backend/database/template code is not part of the public website and should not be reintroduced unless the site intentionally changes away from static deployment.
