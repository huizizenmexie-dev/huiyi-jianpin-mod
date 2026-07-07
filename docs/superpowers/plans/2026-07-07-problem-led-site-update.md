# Problem-Led Site Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the Lecprima site so ready English pages answer buyer formulation problems first, then support those answers with product specs, documentation, CTAs, and mobile performance improvements.

**Architecture:** Keep the existing React/Vite static-site architecture, route manifest, i18n strings, SEO resolver, product data, and validation scripts. Make content and performance changes in existing focused modules without adding new route types in this phase.

**Tech Stack:** React 19, Vite 7, Wouter, Tailwind CSS v4, Vitest, TypeScript, static prerender scripts.

---

## File Structure

- Modify `client/src/content/seo.test.ts` to lock the problem-led SEO contract.
- Modify `client/src/site-sdk-script.test.ts` to lock nonblocking third-party script behavior.
- Modify `client/src/content/seo.ts` to update `PAGE_SEO`.
- Modify `client/src/i18n/messages/en.json` to update ready English page copy.
- Modify `client/src/content/site.ts` to update brand tagline and brand statement while preserving verified legal/manufacturing wording.
- Modify `client/src/pages/Home.tsx` to implement the problem-led homepage and mobile LCP image strategy.
- Modify `client/src/pages/Products.tsx` to make listing cards problem-fit selection aids.
- Modify `client/src/pages/ProductDetail.tsx` to add a verification/request panel and eager product hero image.
- Modify `client/src/pages/IndustrySolutions.tsx` to add answer-style problem sections around the existing matrix.
- Modify `client/src/pages/Quality.tsx` to reframe documentation as formulation/procurement verification.
- Modify `client/src/pages/Contact.tsx` only for SEO/copy alignment if existing form fields stay intact.
- Modify `client/index.html` only if tests prove third-party scripts are still render-blocking or too early for mobile performance.

## Task 1: SEO Contract

**Files:**
- Modify: `client/src/content/seo.test.ts`
- Modify: `client/src/content/seo.ts`
- Modify: `client/src/i18n/messages/en.json`
- Modify: `client/src/content/site.ts`

- [ ] **Step 1: Write the failing SEO tests**

Add these tests to `client/src/content/seo.test.ts` inside `describe("route SEO resolver", () => { ... })`:

```ts
  it("frames ready page SEO around formulation problems instead of supply disruption", () => {
    const homepage = resolveRouteSEO({ locale: "en", routePath: "/", urls });
    const products = resolveRouteSEO({
      locale: "en",
      routePath: "/products",
      urls,
    });
    const industry = resolveRouteSEO({
      locale: "en",
      routePath: "/industry-solutions",
      urls,
    });

    expect(homepage.title).toContain("Make Every Batch Perform");
    expect(homepage.description).toContain("formulation");
    expect(homepage.description).toContain("technical support");
    expect(products.description).toContain("application");
    expect(industry.description).toContain("problem-to-product");

    const combined = [
      homepage.title,
      homepage.description,
      products.title,
      products.description,
      industry.title,
      industry.description,
    ].join(" ");

    expect(combined).not.toMatch(/disruption|safe harbor|war|conflict/i);
  });

  it("keeps the public brand promise separate from unsupported guarantees", () => {
    const seo = resolveRouteSEO({ locale: "en", routePath: "/", urls });
    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;
    const serialized = JSON.stringify(schemas);

    expect(serialized).toContain("Make Every Batch Perform");
    expect(serialized).toContain("clear specifications");
    expect(serialized).not.toMatch(/guaranteed viscosity|guaranteed delivery|price|availability|Offer/i);
  });
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
pnpm exec vitest run client/src/content/seo.test.ts
```

Expected: FAIL because current homepage/product/industry SEO still emphasizes stable supply and disruption.

- [ ] **Step 3: Implement minimal SEO and site-copy changes**

Update `PAGE_SEO` in `client/src/content/seo.ts` so ready page metadata uses this wording:

```ts
  "/": {
    title: "Make Every Batch Perform | Lecprima Lecithin & Phospholipids",
    description:
      "Application-fit lecithin and phospholipid ingredients with clear specifications, batch documentation and technical support from sample evaluation to scale-up.",
  },
  "/products": {
    title: "Lecithin & Phospholipid Products by Application | Lecprima",
    description:
      "Select soy lecithin, sunflower lecithin, phosphatidylcholine, phosphatidylserine, protein and fiber systems by form, specification and application problem.",
  },
  "/about": {
    title: "About Lecprima | Formulation-Focused Ingredient Support",
    description:
      "Learn how Lecprima connects export service, manufacturing, documentation and application support for B2B lecithin and phospholipid buyers.",
  },
  "/quality": {
    title: "Quality Documents & Batch Verification | Lecprima",
    description:
      "Review Lecprima quality systems, certificates, COA documentation, TDS support and traceability inputs for supplier qualification.",
  },
  "/industry-solutions": {
    title: "Lecithin Application Guide | Problem-to-Product Matching",
    description:
      "Match chocolate viscosity, instant beverage dispersion, bakery texture, clean-label substitution and PC/PS selection problems to Lecprima ingredient systems.",
  },
  "/insights": {
    title:
      "Phospholipid & Lecithin Insights | PC, PS and Food Formulation Guides",
    description:
      "Read crawlable B2B guides on phosphatidylcholine, phosphatidylserine, lecithin, clean-label ingredients, functional beverages and food formulation.",
  },
  "/contact": {
    title: "Request Technical Data, Samples or Quote | Lecprima",
    description:
      "Contact Lecprima with your application, target specification, documentation needs, sample request, quantity range and destination details.",
  },
```

Update `client/src/content/site.ts`:

```ts
export const SITE_TAGLINE = "Make Every Batch Perform";
export const SITE_BRAND_STATEMENT =
  "Make Every Batch Perform. Lecprima helps B2B formulation and procurement teams match lecithin and phospholipid ingredients to application problems with clear specifications, batch documentation and responsive technical support.";
```

Update matching English SEO and homepage strings in `client/src/i18n/messages/en.json` using the same problem-led vocabulary. Keep non-English files unchanged.

- [ ] **Step 4: Run focused test and verify GREEN**

Run:

```bash
pnpm exec vitest run client/src/content/seo.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add client/src/content/seo.test.ts client/src/content/seo.ts client/src/i18n/messages/en.json client/src/content/site.ts
git commit -m "Refocus SEO around formulation problems"
```

## Task 2: Homepage Narrative And Mobile Hero

**Files:**
- Modify: `client/src/pages/Home.tsx`

- [ ] **Step 1: Write the failing static expectation**

Add this test to `client/src/content/seo.test.ts` if Task 1 did not already cover static narrative enough:

```ts
  it("homepage SEO uses problem-led buyer language", () => {
    const seo = resolveRouteSEO({ locale: "en", routePath: "/", urls });

    expect(seo.title).toContain("Make Every Batch Perform");
    expect(seo.description).toMatch(/application-fit|technical support/i);
    expect(seo.description).not.toMatch(/disruption|safe harbor/i);
  });
```

- [ ] **Step 2: Run RED check**

Run:

```bash
pnpm exec vitest run client/src/content/seo.test.ts
```

Expected: PASS if Task 1 already made it green; FAIL if homepage SEO was not fully updated.

- [ ] **Step 3: Replace homepage story and use an eager image element**

In `client/src/pages/Home.tsx`:

- Replace the CSS-background hero image with an absolutely positioned `<img>`.
- Add `loading="eager"`, `fetchPriority="high"`, `decoding="async"`, explicit full-size classes, and an `alt`.
- Remove supply-disruption phrases from visible homepage copy.
- Add a problem grid with six buyer problems.
- Keep below-fold `FadeIn` only for non-critical sections.

Use this hero image pattern:

```tsx
<img
  src={HERO_IMG}
  alt="Soybean field representing Lecprima lecithin and phospholipid ingredient sourcing"
  className="absolute inset-0 h-full w-full object-cover"
  loading="eager"
  fetchPriority="high"
  decoding="async"
/>
```

Use these problem cards:

```ts
const formulationProblems = [
  {
    title: "Chocolate viscosity and molding flow",
    body: "Start with liquid soy lecithin grades for flow, molding and fat-system evaluation in buyer-validated chocolate formulas.",
  },
  {
    title: "Instant beverage wetting and dispersion",
    body: "Compare modified lecithin and powder formats when clumping, floating fat or slow wetting blocks scale-up.",
  },
  {
    title: "Bakery dough handling and texture",
    body: "Use powder or liquid lecithin systems to evaluate dough handling, fat distribution and finished-product texture.",
  },
  {
    title: "Clean-label soy-free substitution",
    body: "Review sunflower lecithin options when the formula needs a soy-free source and buyer-approved allergen positioning.",
  },
  {
    title: "PC/PS purity selection",
    body: "Select phosphatidylcholine or phosphatidylserine grades by target purity, storage condition and documentation needs.",
  },
  {
    title: "QA documentation and batch verification",
    body: "Request COA, TDS, SDS/MSDS and certificate files before supplier qualification or production trials.",
  },
];
```

- [ ] **Step 4: Run check**

Run:

```bash
pnpm run check
```

Expected: exit code 0.

- [ ] **Step 5: Commit**

Run:

```bash
git add client/src/pages/Home.tsx client/src/content/seo.test.ts
git commit -m "Update homepage for problem-led formulation story"
```

## Task 3: Product And Industry Pages

**Files:**
- Modify: `client/src/pages/Products.tsx`
- Modify: `client/src/pages/ProductDetail.tsx`
- Modify: `client/src/pages/IndustrySolutions.tsx`
- Modify: `client/src/lib/productData.ts` only if a reusable problem-fit field is needed.

- [ ] **Step 1: Write a failing product SEO/schema guard**

Add this test to `client/src/content/seo.test.ts`:

```ts
  it("product pages keep product schema but do not emit offer-style commercial claims", () => {
    const seo = resolveRouteSEO({
      locale: "en",
      routePath: "/products/soy-lecithin-liquid",
      urls,
    });
    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;
    const serialized = JSON.stringify(schemas);

    expect(seo.title).toContain("Soy Lecithin Liquid");
    expect(schemas["ld-product"]["@type"]).toBe("Product");
    expect(serialized).toContain("Acetone Insoluble");
    expect(serialized).not.toMatch(/"Offer"|"price"|"availability"|"aggregateRating"|"review"|"gtin"|"mpn"/);
  });
```

- [ ] **Step 2: Run RED or guard check**

Run:

```bash
pnpm exec vitest run client/src/content/seo.test.ts
```

Expected: PASS as a guard if existing schema already satisfies this; keep it to prevent regressions.

- [ ] **Step 3: Update listing and detail pages**

In `Products.tsx`:

- Change header H1 to `Select Lecithin & Phospholipids by Application Problem`.
- Change intro copy to explain form, specification, documentation, and buyer validation.
- Add a short problem-fit line in each product card using `product.applications[0]?.painPoint`.
- Add `loading="lazy"` and `decoding="async"` to product-card images.

In `ProductDetail.tsx`:

- Add an above-fold panel titled `What this product helps evaluate`.
- Show first two application pain points and a `Request COA / TDS / Sample` CTA.
- Add `loading="eager"` and `fetchPriority="high"` to the main product image.
- Keep specifications and applications in static HTML.

- [ ] **Step 4: Update industry page**

In `IndustrySolutions.tsx`:

- Change hero title to `Problem-to-Product Application Guide`.
- Add answer-style sections before the matrix using the six major problem categories from the design spec.
- Keep the matrix for scanning.
- Change CTA text from generic engineer contact to technical data/sample discussion.

- [ ] **Step 5: Run checks**

Run:

```bash
pnpm run check
pnpm exec vitest run client/src/content/seo.test.ts
```

Expected: both exit code 0.

- [ ] **Step 6: Commit**

Run:

```bash
git add client/src/pages/Products.tsx client/src/pages/ProductDetail.tsx client/src/pages/IndustrySolutions.tsx client/src/content/seo.test.ts client/src/lib/productData.ts
git commit -m "Make product pages answer formulation problems"
```

## Task 4: Quality, Contact, And Third-Party Script Timing

**Files:**
- Modify: `client/src/pages/Quality.tsx`
- Modify: `client/src/pages/Contact.tsx`
- Modify: `client/index.html`
- Modify: `client/src/site-sdk-script.test.ts`

- [ ] **Step 1: Write failing script timing test**

Add this test to `client/src/site-sdk-script.test.ts`:

```ts
  it("loads Clarity and the NetEase site SDK after the page can render", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    expect(html).toContain("window.addEventListener('load'");
    expect(html).toContain("requestIdleCallback");
    expect(html.indexOf("cloud.umami.is/script.js")).toBeLessThan(
      html.indexOf("www.clarity.ms/tag/")
    );
  });
```

- [ ] **Step 2: Run RED check**

Run:

```bash
pnpm exec vitest run client/src/site-sdk-script.test.ts
```

Expected: FAIL because Clarity and the NetEase SDK currently inject during parsing, not after load/idle.

- [ ] **Step 3: Reframe Quality and Contact copy**

In `Quality.tsx`:

- Change hero H1 to `Quality Documents for Formulation Confidence`.
- Change lead copy to explain COA/TDS/SDS/MSDS and certificates as supplier qualification and formulation-repeatability inputs.
- Keep certificate names and document URLs unchanged.

In `Contact.tsx`:

- Change SEO defaults and visible form guidance to ask for application problem, target specification, documentation needs, sample request, quantity range, and destination.
- Preserve all existing form fields, hidden tracking fields, honeypot, Web3Forms submission, and validation.

- [ ] **Step 4: Defer heavy third-party SDK initialization**

In `client/index.html`, keep Umami as `defer`. Wrap Clarity and NetEase SDK injection in a small `runAfterPageReady` helper:

```html
<script>
  (function() {
    function runAfterPageReady(callback) {
      window.addEventListener('load', function() {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(callback, { timeout: 3000 });
          return;
        }
        window.setTimeout(callback, 1500);
      });
    }

    runAfterPageReady(function() {
      (function(c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function() {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "xfz527srer");
    });

    runAfterPageReady(function() {
      (function(w, d, n, a, j, s) {
        w[n] =
          w[n] ||
          function() {
            return (w[n].a = w[n].a || []).push(arguments);
          };
        j = d.createElement('script');
        j.async = true;
        j.src = 'https://sirius-it-site.lx.netease.com/site-sdk.js';
        j.onload = function() {
          setTimeout(function() {
            if (!w.__siteSDK__ || typeof w.__siteSDK__.setDefaultConfig !== 'function' || typeof w.__siteSDK__.init !== 'function') {
              console.warn('Site SDK was loaded, but the global API is not ready.');
              return;
            }

            w.__siteSDK__.setDefaultConfig({
              outerKey: 'key568983629cdf4c00a613bcdf6913be10',
            });
            w.__siteSDK__.init();
          }, 500);
        };
        j.onerror = function() {
          console.warn('Failed to load site SDK script.');
        };
        s = d.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(j, s);
      })(window, document, '__siteSDK__');
    });
  })();
</script>
```

- [ ] **Step 5: Run tests**

Run:

```bash
pnpm exec vitest run client/src/site-sdk-script.test.ts
pnpm run check
```

Expected: both exit code 0.

- [ ] **Step 6: Commit**

Run:

```bash
git add client/src/pages/Quality.tsx client/src/pages/Contact.tsx client/index.html client/src/site-sdk-script.test.ts
git commit -m "Improve quality copy and defer tracking scripts"
```

## Task 5: Full Validation And Mobile Smoke

**Files:**
- No planned source edits unless validation fails.

- [ ] **Step 1: Run core validation**

Run:

```bash
pnpm run check
pnpm run test
pnpm run build
pnpm run validate-seo
pnpm run verify-static
```

Expected: all exit code 0.

- [ ] **Step 2: Run deterministic base-path builds**

Run:

```bash
BASE_PATH=/ pnpm run build
BASE_PATH=/site-preview/ pnpm run build
```

Expected: both exit code 0.

- [ ] **Step 3: Start preview**

Run:

```bash
pnpm run start
```

Expected: Vite preview serves `dist/public` on `http://localhost:4173/`.

- [ ] **Step 4: Mobile browser smoke**

Open the preview at 375px width and verify:

- `/en/` has no horizontal overflow and first viewport shows the brand promise plus CTAs.
- `/en/products/` product cards fit without text overlap.
- `/en/products/soy-lecithin-liquid/` main image, verification panel, specs, and CTAs are visible and usable.
- `/en/industry-solutions/` answer sections and matrix are readable.
- `/en/quality/` certificate/document cards fit and remain tappable.

- [ ] **Step 5: Stop preview**

Stop the running preview process with Ctrl+C in the terminal session.

- [ ] **Step 6: Final commit if validation fixes were needed**

If validation required follow-up edits, run:

```bash
git add client/src docs/superpowers/plans/2026-07-07-problem-led-site-update.md
git commit -m "Validate problem-led site update"
```

If no source edits were needed after prior commits, do not create an empty commit.

## Self-Review

Spec coverage:

- Brand narrative problem-led update is covered by Tasks 1-3.
- Homepage, products, product detail, industry, quality, and contact scope is covered by Tasks 2-4.
- Mobile performance is covered by Tasks 2 and 4.
- Static/SEO validation is covered by Task 5.
- Out-of-scope full 50-page route expansion is not included.

Placeholder scan:

- The plan contains no TBD, TODO, "implement later", or unspecified test steps.

Type consistency:

- The plan reuses existing `resolveRouteSEO`, `PAGE_SEO`, `SITE_BRAND_STATEMENT`, `usePageSEO`, product fields, and existing route paths.
