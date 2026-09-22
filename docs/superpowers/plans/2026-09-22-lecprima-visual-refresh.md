# Lecprima Visual Refresh Implementation Plan

> **For agentic workers:** Use subagent-driven-development for the independent frontend task and reviews. The controller owns asset production/integration and final browser validation. Keep changes in the shared workspace on `codex/lecprima-visual-refresh`; do not commit or publish.

**Goal:** Deliver a cohesive Lecprima website with ten working local product photos, complete illustrative website imagery, a brand icon and clearer enquiry flows.

**Architecture:** Retain React/Vite/Wouter SSR and the shared locale/URL/content model. Centralize media paths in a content manifest, optimize photos to WebP, and use a shared brand component and CSS design tokens for consistency.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vite, Vitest, Playwright, built-in image generation.

## Task 1 - Media (controller)

- [x] Preserve the six supplied images; map Chinese filenames to the existing product slugs.
- [x] Generate the four missing product photos with the supplied photos as style references; generate five illustrative site photos and one compact brand icon.
- [x] Store optimized final media in `client/public/images/products`, `client/public/images/site`, and `client/public/images/brand`. Preserve reference originals in `design-assets/source-products` and record prompts/source provenance in `docs/design/2026-09-22-media.md`.
- [x] Add `client/src/content/media.ts` with `PRODUCT_IMAGES`, `SITE_IMAGES` and `BRAND_ASSETS`; update product data, other page image references and shared SEO images.
- [x] Add an asset availability regression test that covers all product slugs and URL generation under root and subpath deployment. Extend static verification to check inline CSS image paths and brand images.

## Task 2 - Website visual implementation (frontend agent)

- [x] Own `Home.tsx`, `Products.tsx`, `ProductDetail.tsx`, `Layout.tsx`, `LanguageSwitcher.tsx`, `index.css`, new `Brand.tsx`, and `client/index.html` only.
- [x] Apply the approved-in-scope natural ingredient direction: warm ivory/forest/brass, typographic hierarchy, bright product photo surfaces and consistent spacing. Use existing translated content and contact CTAs.
- [x] Redesign the homepage hero to feature `SITE_IMAGES.hero`; give product systems real photographs using the shared product data and localized links. Make primary CTA hierarchy obvious.
- [x] Integrate `BRAND_ASSETS.icon` into header/footer. Make the header legible on every page, mobile navigation accessible, product cards attractive and calls to action visible without hovering.
- [x] Display both portrait and landscape originals fully with intentional contain framing. Preserve critical static specifications and form links. Respect reduced-motion preferences and SSR visibility.
- [x] Keep route and locale behavior; run `pnpm run check` and relevant existing tests. Report changes for controller review.

## Task 3 - Integration and verification (controller and reviewers)

- [x] Review changes against scope and code quality; resolve findings before final validation.
- [x] Run `pnpm run check`, `pnpm run test`, then root build, `validate-seo`, `verify-static`.
- [x] Start the real preview command; exercise all seven languages, desktop/mobile menu, product filters, product cards, quote/sample links, Back/Forward and all ten images. Capture and review 375/768/1440 screenshots; record console/hydration errors and actual image dimensions.
- [x] Build and validate with `BASE_PATH=/site-preview/`; repeat key browser flows and verify media paths and metadata.
- [x] Restore a root build; compare generated routes and sitemap to the first build. Summarize files, imagery provenance, tests and any unverified deployment state.
