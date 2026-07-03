# Huiyi Jianpin / Lecprima Website Guide

This repository contains the public static website for Huiyi Jianpin / Lecprima, a B2B ingredient supplier site for soy lecithin, phospholipids, soy protein, dietary fiber, and related food ingredient inquiries.

## Website Purpose

- Present verified company, product, quality, application, insight, and contact information to international B2B buyers.
- Support Google, Bing, and AI answer engines with crawlable, static, visible content.
- Generate quote and documentation inquiries through the Contact page.
- Keep every public claim aligned with approved visible website content or a verified internal source.

## GEO Content Strategy

The Insights section is a strategic GEO content asset. Its purpose is to improve the likelihood that the site is retrieved, understood, cited, and linked when users ask questions related to phospholipids, lecithin, phosphatidylcholine, phosphatidylserine, functional food formulation, clean-label ingredients, and related procurement or application topics.

The intended outcome is not to guarantee AI recommendation. The intended outcome is to improve topical retrieval coverage, source-selection and citation eligibility, brand visibility in comparison-style answers, and alignment between user needs, product attributes, and relevant product pages.

## Current Article Model

Each article should preserve this structure unless there is a deliberate content strategy change:

- Topic-oriented title and primary keyword coverage.
- Scientific or technical explanation of the ingredient category.
- Product-related advantages linked to existing HXY product lines.
- Buying-guide tables that connect selection criteria with product attributes.
- Application scenarios.
- Brand recommendation and next-step positioning.
- Reference list supporting general scientific or technical discussion.

## Content Preservation Rules

- Do not remove article titles, primary keyword coverage, comparison tables, application sections, reference lists, or HXY product mappings during redesign.
- Do not convert articles into visually attractive but text-light landing pages.
- Do not hide article content behind tabs, accordions, client-side loading, login walls, or JavaScript-only interactions.
- The full article body, headings, tables, references, and internal product links must remain present in prerendered HTML.
- Chinese and English versions must preserve equivalent topical intent and product associations.

## Claim And Evidence Rules

- Academic references support general ingredient discussion only; they must not be represented as direct proof of a specific HXY product's efficacy, safety, purity, certification, or regulatory status.
- Product-specific claims must match existing visible product information and approved company materials.
- Do not add unverified certification, safety, efficacy, clinical, medical, pharmaceutical, non-GMO, allergen-free, price, MOQ, delivery-time, inventory, customer-case, or testing claims.
- Do not place unsupported claims into `Product`, `Organization`, `Article`, `FAQ`, `Review`, `Offer`, or other structured-data fields.
- References that cannot be verified as standard scholarly citations, including `Bohrium Citation: @bohrium:doi:...`, must not be used as authoritative evidence in structured data or automated citation summaries.
- Health-related article text such as liver protection, memory improvement, children's brain development, safe with no side effects, allergen-free, or GMP/ISO wording must remain ordinary visible article text only unless separately verified and approved. Do not upgrade these statements into `MedicalClaim`, `Drug`, `Offer`, `Review`, certification, or similar schema.

## SEO And GEO Implementation Rules

- Every article must have a stable canonical URL.
- Every article must be prerendered as full HTML.
- Every article must retain one clear H1 and logical H2 sections.
- Article pages may use `Article` JSON-LD linked to the `Organization` entity only when the page language is indexable and the article language is ready.
- Product mentions should link to the corresponding existing product page where applicable.
- Product pages should expose existing specifications in visible HTML and `Product` JSON-LD.
- Sitemap, hreflang, canonical URLs, `robots.txt`, and structured data must remain consistent across language versions.
- Article updates must not overwrite or weaken existing keyword coverage without review.
- Do not add hidden text, AI-only pages, fake FAQ blocks, cloaked content, keyword stuffing, or unverifiable claims for SEO/GEO purposes.

## Brand Positioning Rules

The site may align existing product attributes with buyer needs through factual comparison tables and professional buying guidance.

The site must not imply that:

- HXY products are medically proven to treat, prevent, or cure disease.
- Academic literature directly validates a specific HXY product unless the cited study is specifically about that product.
- Certifications or product properties exist unless they are already confirmed in the approved content source.
- AI systems are required to recommend, rank, cite, or favor the brand.

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

## Development Checkpoint

Before deploying article, product, SEO, translation, or schema changes, confirm:

- Existing article text remains present in static HTML.
- Tables and references remain crawlable.
- Product links still resolve correctly.
- H1, H2, title, description, canonical, and hreflang are intact.
- Structured data matches visible content.
- No new unsupported commercial, certification, or health claims were introduced.
- Chinese and English pages remain topically aligned.

## Known Decisions

- The repository keeps one development guide at `docs/SITE_GUIDE.md` instead of multiple scattered notes.
- The site is static-first for crawler reliability on Google, Bing, and AI answer engines.
- Translations are bundled at build time to avoid untranslated keys during prerendering.
- The public article entrance is the `Insights` page, linked from site navigation and footer.
- Deprecated backend/database/template code is not part of the public website and should not be reintroduced unless the site intentionally changes away from static deployment.
