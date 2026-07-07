# Problem-Led Site Update Design

## Goal

Update the Lecprima website from a supply-continuity-led story to a problem-led B2B ingredient experience. The site should answer the questions buyers and formulation teams bring to search and AI assistants:

- Which lecithin or phospholipid solves my formulation problem?
- What specifications and documents help my QA or procurement team verify it?
- How do I move from sample evaluation to production discussion?

The primary brand promise is:

> Make Every Batch Perform.

This promise must be supported by visible product specifications, application fit, documentation availability, and contact paths. It should not become an unsupported guarantee of universal performance.

## Source Inputs

- `C:/Users/29223/Desktop/deep-research-report.md`
- Existing English ready pages and route manifest.
- Existing product data, evidence ledger, static prerendering, SEO validation, and form handling.
- Mobile Lighthouse screenshot showing performance score 75, FCP 3.2s, LCP 5.0s, TBT 20ms, CLS 0.

## Narrative Strategy

Replace the current dominant story:

- Stable global supply
- Safe harbor under sourcing uncertainty
- Capacity-first trust

with a buyer-intent story:

- Formulation problem
- Application requirement
- Matching product system
- Specification and documentation proof
- Sample, quote, or technical-data CTA

The new narrative should still mention production, quality, and traceability where evidence allows, but those become proof points under formulation confidence instead of the main emotional hook.

## Page Scope

### Homepage

The homepage becomes the clearest expression of the new story:

- Hero headline: `Make Every Batch Perform.`
- Support copy: application-fit lecithin and phospholipid ingredients for food, nutrition, pharma, personal care, and feed.
- Proof language: clear specifications, consistent batch documentation, and technical support from sample to scale.
- Replace supply-disruption framing with a problem grid:
  - Chocolate viscosity and molding flow.
  - Instant beverage wetting and dispersion.
  - Bakery dough handling and texture.
  - Clean-label soy-free substitution.
  - PC/PS purity selection.
  - QA documentation and batch verification.
- Keep CTAs focused on product exploration and technical data requests.

### Product Listing

The product listing should read like a selection gateway:

- Explain products by form and buyer problem, not only category.
- Keep filters simple and fast.
- Add short problem-fit labels where supported by existing product data.
- Keep product cards lightweight for mobile.

### Product Detail Pages

Product detail pages should answer:

- What is this product?
- Which formulation problems is it used for?
- Which specs must QA/procurement review?
- Which documents or samples should the buyer request next?

Implementation direction:

- Keep specifications visible in static HTML.
- Keep applications visible in static HTML.
- Add a small verification/request panel near the hero.
- Avoid unsupported claims such as guaranteed viscosity reduction, medical efficacy, universal use rate, prices, stock, availability, or delivery guarantees.
- Preserve Product schema rules and omit Offer, rating, GTIN, MPN, or review fields.

### Industry Solutions

The industry page should become a problem-to-product matrix:

- Chocolate and confectionery: viscosity, flow, molding, cocoa-butter efficiency discussions.
- Bakery: dough handling, fat distribution, texture, shelf-life evaluation without unsupported shelf-life promises.
- Beverages and instant powders: wetting, clumping, dispersion, sedimentation evaluation.
- Nutrition and supplements: PC/PS grade selection, documentation, buyer-reviewed formulations.
- Cosmetics and personal care: emulsion texture and soy-free options.
- Animal feed and aquafeed: dispersion and palatability evaluation.

The page should keep a concise matrix for scanning and add answer-style sections that search engines and AI systems can quote.

### Quality And Documentation

Quality should support the buyer answer:

- State which documentation helps supplier qualification: COA, TDS, SDS/MSDS, certificates, batch records where applicable.
- Keep certificate names aligned with evidence ledger entries.
- Avoid broad certification claims beyond the approved wording.
- Reframe from "secure sourcing" toward "verification for repeatable formulation decisions."

### SEO Metadata

Update `PAGE_SEO` and English i18n strings for ready pages:

- Homepage: formulation confidence, application-fit lecithin, batch performance.
- Products: soy lecithin and phospholipid product selection by application.
- Industry: lecithin application guide and problem-to-product matching.
- Quality: documentation, COA/TDS, traceability, specification review.
- Contact: request technical data, sample, quote, or formulation discussion.

Non-English locales remain draft/noindex unless complete translations are added later.

## Mobile Performance Strategy

Focus on mobile FCP and LCP without risky architecture changes:

- Make the homepage hero image load eagerly with priority semantics instead of only as a CSS background.
- Provide stable hero media dimensions to preserve CLS.
- Reduce above-the-fold animation cost and avoid delayed visibility for critical hero content.
- Keep decorative and below-fold images lazy where appropriate.
- Avoid adding new client-side libraries.
- Review third-party analytics scripts for nonblocking loading. Do not remove business tracking without explicit approval.
- Keep static prerendered HTML intact and hydrate without clearing server-rendered content.

## Technical Constraints

- Preserve static prerendering for all public routes.
- Use shared route, locale, URL, SEO, and product-data systems.
- Do not hardcode absolute public URLs outside shared helpers.
- Preserve trailing slash canonical behavior.
- Preserve noindex behavior for draft locales.
- Preserve quote form fields, tracking fields, honeypot, and validation.
- Do not weaken validation scripts or convert failures to warnings.

## Testing And Validation

Required checks after implementation:

- `pnpm run check`
- `pnpm run test`
- `pnpm run build`
- `pnpm run validate-seo`
- `pnpm run verify-static`
- Root and project-base builds:
  - `BASE_PATH=/ pnpm run build`
  - `BASE_PATH=/site-preview/ pnpm run build`

Browser/mobile verification should cover at least:

- English homepage at 375px.
- English product listing at 375px.
- English product detail page at 375px.
- English industry page at 375px.
- English quality page at 375px.

Failure conditions include hydration mismatch, console errors, critical asset 404s, horizontal overflow, inaccessible CTAs, missing H1/body content, broken canonical/OG/schema URLs, and base-path regressions.

## Out Of Scope

- Creating the full 50-page matrix in one pass.
- Publishing non-English ready translations.
- Adding unsupported certifications, performance guarantees, price, stock, offer, review, or health claims.
- Removing analytics or tracking integrations without explicit business approval.
- Redesigning the whole visual identity.

## Phase Boundary

The implementation should prioritize high-impact English ready pages first. A later phase can add dedicated product-category pages, application pages, FAQ pages, and download-center routes once approved content and evidence are available.
