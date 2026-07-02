---
name: b2b-static-site
description: Maintain and safely improve this multilingual B2B food-ingredient static website deployed to GitHub Pages. Use when work involves GitHub Pages deployment, static rendering or prerendering, Vite base paths, locale routes, canonical URLs, hreflang, sitemap, robots.txt, Open Graph, schema, product metadata, Quote Request forms, evidence-ledger governed claims, SEO, GEO, AEO, indexing, crawlability, or static-site validation.
---

# B2B Static Site

Use this skill to preserve static HTML quality, URL consistency, locale correctness, claim evidence, and deployability for this GitHub Pages website.

## Operating Principles

- Treat real static HTML, verified public facts, canonical consistency, locale-preserving links, stable URL generation, and deterministic builds as the SEO, GEO, and AEO foundation.
- Maintain one shared source of truth for routes, locale status, sitemap, hreflang, canonical URLs, schema, prerendering, internal links, and static validation inputs.
- Every public route, including `noindex` routes, must use a trailing slash.
- The site must work both at domain root and under a GitHub Pages project base path.
- `SITE_ORIGIN` must be an absolute origin without a path.
- `BASE_PATH` must begin and end with `/`.
- Built assets, navigation links, redirects, canonical URLs, Open Graph URLs, schema URLs, sitemap URLs, hreflang URLs, and robots sitemap URLs must use the same shared URL helpers and configured `SITE_ORIGIN` and `BASE_PATH`.
- Do not construct URLs by manually concatenating origin and base-path strings.
- Do not hardcode public absolute URLs, locale lists, product slugs, or generated asset paths outside the shared content and route system.
- Do not add `llms.txt`, AI-only pages, hidden text, keyword stuffing, fake FAQs, fake reviews, fake offers, fake prices, or unsupported business claims.
- Do not remove tests, lower validations, use `|| true`, or convert errors into warnings to make CI pass.

## Locale And Indexing Rules

- Treat locale and page status as the sole authority for indexing, sitemap, hreflang, metadata, schema, and static generation.
- Supported statuses are `draft`, `reviewed`, and `ready`.
- A `ready` page may be indexed only when its visible body, H1, product specifications, CTA, FAQ when applicable, title, description, Open Graph fields, and schema fields are complete and approved.
- A locale or page not marked `ready` must generate a real static route, remain reachable with HTTP 200, include `<meta name="robots" content="noindex,follow">`, use its own self-canonical URL, stay out of sitemap and hreflang, stay out of alternate-locale output, and not receive an `x-default` mapping.
- Never canonical a non-ready localized page to English.
- Output `x-default` only when the matching English route is `ready`.
- Arabic pages must output `<html lang="ar" dir="rtl">`.

## Product And Schema Rules

- Product pages must contain visible static product information before emitting `Product` schema.
- Product specifications, applications, packaging, storage, MOQ, documentation availability, and FAQ content must come from shared approved product data.
- Critical product information must be present in initial static HTML and must not depend on tabs, accordions, client-side fetching, or JavaScript execution.
- `Organization` and `WebSite` schema must come from shared site configuration and match public site information such as footer, contact details, or company information.
- `Product` and `BreadcrumbList` schema must be route-specific and match visible approved page content.
- Emit `FAQPage` schema only when the FAQ content is visibly rendered on that page.
- Give all managed JSON-LD scripts stable identifiers.
- During client-side navigation or hydration, replace only managed route-level metadata and schema. Never delete all JSON-LD scripts globally.
- Never include `Offer`, price, availability, review, `aggregateRating`, GTIN, or MPN unless explicit, verified, public business data exists.

## Evidence Ledger Rules

- Map any certification, product performance, capacity, traceability, health, pharmaceutical, supplement, allergen, Non-GMO, GMP, ISO, FSSC, HACCP, Halal, logistics, factory, export, or regulatory claim to an approved evidence-ledger entry before publication.
- A claim is publishable only when its ledger entry has a precise public wording, source document, source owner, source date, applicable market, in-date expiry status, reviewer, approved verification status, and approved publication status.
- Do not publish copy or schema supported only by pending reviewer confirmation, expired evidence, unverified evidence, incomplete metadata, or do-not-publish status.
- When evidence is missing or stale, remove the claim or replace it with a non-factual contact or documentation CTA.
- Do not weaken unsupported factual claims into vague marketing language.
- Do not use a claim ledger entry to support wording broader than the entry's exact approved public wording.

## Static Rendering And Form Rules

- Every public route must generate a real static `index.html` with non-empty `#root` content.
- Every indexable page must contain static route-specific H1, visible body content, title, description, canonical URL, internal links, and required schema.
- Use `hydrateRoot` for client-side hydration. Do not clear or replace static page content on initial load.
- Guard browser-only APIs such as `window`, `document`, `localStorage`, `sessionStorage`, `navigator`, `matchMedia`, `window.scrollY`, and `document.referrer`.
- Do not read browser-only APIs at module scope during SSR.
- For Quote Request form changes, preserve static markup; preserve locale, product, application, UTM, referrer, page URL, destination port, sample request, and monthly quantity fields; test successful validation with complete data, missing required fields, invalid email, and honeypot rejection; and do not log customer form content to the browser console, test snapshots, or public output.

## Workflow

1. Inspect `package.json`, build configuration, GitHub Pages workflow, existing scripts, route manifest, locale status, URL helpers, product content, and evidence ledger before editing.
2. Identify every affected route, locale, metadata object, schema object, form, asset path, and evidence-ledger entry.
3. Use shared content and URL helpers for route generation, locale preservation, base-path handling, absolute URL construction, sitemap generation, canonical generation, Open Graph generation, schema generation, and robots generation.
4. Preserve real static rendering and prerender coverage for every public route.
5. Use `$playwright-interactive` whenever a change affects rendered HTML, routing, visual layout, forms, mobile behavior, hydration, static assets, base paths, or browser-visible metadata.
6. Do not make unrelated visual redesigns or broad framework migrations.
7. Report failed, skipped, and unverified checks honestly.

## Required Validation

Before completion, inspect the actual scripts in `package.json`. Use the repository's real commands rather than assuming `start` means static preview. Expected success means exit code `0`, no newly introduced errors, and no skipped required validation.

```bash
pnpm run check
```

Expected: TypeScript and project checks finish without diagnostics.

```bash
pnpm run test
```

Expected: all automated tests pass.

```bash
pnpm run build
```

Expected: Vite build and prerendering complete, producing static output.

```bash
pnpm run validate-seo
```

Expected: no canonical, hreflang, sitemap, robots, schema, locale-status, metadata, or evidence-ledger publication errors.

```bash
pnpm run verify-static
```

Expected: no base-path, trailing-slash, asset, route, prerender, root-content, or static-file parity failures.

Run deterministic deployment validation twice:

```bash
BASE_PATH=/ pnpm run build
BASE_PATH=/site-preview/ pnpm run build
```

For both builds verify:

- Every sitemap URL maps to a real static `index.html`.
- Every indexable page has one self-canonical URL.
- Canonical, Open Graph, schema, sitemap, hreflang, redirects, and robots use consistent origin and base-path configuration.
- `robots.txt` contains exactly one valid absolute sitemap URL.
- No output contains malformed values such as `/https://`.
- All built CSS, JS, images, fonts, favicon, manifest, sitemap, and robots assets resolve successfully.
- No rendered route contains invalid root-absolute asset paths under non-root base-path mode.
- Public navigation preserves locale and base path.
- Root redirects preserve the configured base path.
- Noindex routes remain absent from sitemap and hreflang.

Start the static preview using the actual repository preview command. If no preview script exists, use a deterministic static-server command that serves the built output without changing it.

Use `$playwright-interactive` for browser smoke tests at 375px, 768px, and 1440px. Cover at minimum:

- English homepage.
- English product listing.
- English product detail page.
- One non-ready noindex locale product page.
- Arabic route.
- Quote Request form.

Fail validation if any checked page has hydration mismatch, browser console error, uncaught exception, critical asset 404, horizontal overflow, inaccessible primary CTA, locale-dropping navigation, broken trailing-slash URL, missing static H1 or visible body content, incorrect canonical, incorrect Open Graph, incorrect schema URL, or incorrect base-path behavior.

Run two consecutive builds and compare the generated route list, sitemap list, and indexable URL count. They must remain stable unless the task intentionally changes route or locale configuration.
