# Image delivery validation · 2026-09-23

The update is present in the GitHub Desktop connected workspace on `codex/lecprima-visual-refresh`. No commit, push or production deployment was performed as part of this edit.

## Changes

- Ten product defaults are 1200 × 1200 with real transparency, displayed in square white frames. Each has 400/800/1200 AVIF and WebP candidates. Six supplied originals remain unchanged; generated and edited masters remain separate from web delivery files.
- Five editorial photos have 480/960/1536 AVIF and WebP candidates. A shared static `<picture>` component handles sizes and base-aware paths. The hero uses an explicitly positioned image to fill its arch; it does not depend on flex percentage-height resolution.
- Fonts and their licenses are served locally. The header brand PNG is 192 × 192 and 8,704 bytes (previously 82,540 bytes).
- Chinese product-family terminology uses 系列, including 高纯度脂质系列 and 磷脂酰胆碱系列.

## Download measurements

Chromium, local production preview, disabled browser cache, DPR 1, same viewport before/after. These measure selected image payload bytes, not a promise of production load times on all networks or screen densities.

| Image | Viewport | Before | After | Reduction |
|---|---:|---:|---:|---:|
| Homepage hero | 375 px | 135,314 B | 9,485 B | 93.0% |
| Homepage hero | 1440 px | 135,314 B | 26,219 B | 80.6% |
| Homepage phosphatidylcholine card | 375 / 1440 px | 75,968 B | 19,327 B | 74.6% |

The browser requested only one hero candidate. No Google Fonts requests were made. Higher-density screens select larger variants automatically.

## Automated and browser verification

- TypeScript passed; all 56 tests passed across 11 files, including responsive markup, real alpha/square WebP headers, variant existence and small-image budgets.
- Production root build: 189 localized pages; 190 index.html files including root redirect; 109 indexable sitemap URLs. SEO 5,372 passed; static verification with HTTP preview 13,102 passed; no failures.
- `/site-preview/` build: SEO 6,506 passed; static verification with HTTP preview 23,014 passed; no failures. Route lists and normalized sitemap lists matched the root build. A final root build had identical route/sitemap lists and counts.
- Browser root matrix: 27 cases at 375 / 768 / 1440 px, covering homepage, listing, detail, French noindex about, Arabic RTL, contact, quality, insights and industry solutions. No script errors, critical asset failures, broken visible images or horizontal overflow.
- Browser subpath matrix: 18 cases at the same widths, covering home, listing, detail, French noindex about, Arabic and contact. No layout or local asset failures; responsive images and fonts preserved the deployment prefix.
- Seven product-page locale switches updated path, H1 and document language in the same document, without reload. Product filtering and product-to-quote navigation worked under the subpath. Required fields and source-tracking fields were present. No real inquiry was submitted.
- Independent code and specification review findings were resolved: case-insensitive React `srcSet` extraction in static checks and complete owner-manual email replacement instructions.

## Desktop delivery

- `Lecprima-网站部署包-2026-09-23.zip`: 358 files, 12,762,377 bytes; archive CRC and every extracted file hash match the final `dist/public` build. SHA-256: `ca21f60a70d18e4ac7c3014be4d4b334021f0101ac221a1a82c28e4ea5cb6948`.
- Five-page owner manual in PDF and HTML. All five PDF pages rendered and visually checked. Covers Desktop/branch/main publication, static ZIP use, local preview, images and translations, Web3Forms configuration, public mailto links, recipient-binding uncertainty, mailbox testing and maintenance.
- The previous 2026-09-22 archive was moved from `dist` to the Desktop as a backup. No deployment ZIP remains in the project output folder.

Web3Forms identifies the destination by its access key. The actual key-bound mailbox and real delivery were not verified; the manual explains how the owner can confirm them. The site's public email remains `jojowei@huiyijianpin.cn`.
