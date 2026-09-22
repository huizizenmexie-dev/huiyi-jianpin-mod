# Product image consistency and delivery follow-up

User authorizes edits directly in the GitHub Desktop connected workspace, on its current branch; leave commits/pushes to the user's Desktop workflow. Address slow image display and the hero partial/blank rendering screenshot, unify all product image backgrounds and dimensions, change Chinese product-family terminology from 系统 to 系列, and deliver the deployment archive and an owner manual on the Desktop. Explain the actual inquiry relay provider and deployment workflow in the manual.

## Responsibilities

- Controller: reproduce/measure current browser behavior; edit ten product photos with built-in imagegen using originals, preserving subject and labels; normalize transparent square masters and generate optimized responsive asset variants; update media manifest/tests/Chinese copy; author manual and Desktop packaging; run final root/subpath and browser checks.
- Frontend implementer (subagent-driven-development): bounded image rendering components/CSS/head font loading changes, preserving routes, content, form logic and brand direction. Root performs separate review and browser verification.

## Asset and UI contract

- Existing raw `PRODUCT_IMAGES` and `SITE_IMAGES` paths remain canonical default files.
- Product default WebP files become 1200 × 1200, real alpha, displayed against white. Preserve original sources and save cutout masters separately.
- Every product has sibling `-400.webp`, `-800.webp`, `-400.avif`, `-800.avif`, `-1200.avif` variants. Editorial image defaults remain 1536 × 1024, with `-480.webp`, `-960.webp`, `-480.avif`, `-960.avif`, `-1536.avif` variants.
- Shared responsive component accepts raw src/alt and product/editorial kind; resolves each source through the existing base-aware URL helper. Use actual image dimensions, sizes, eager/high priority for hero, lazy for offscreen product images.
- Unified square product frames/backgrounds; robust hero sizing with no percentage-height flex ambiguity or mix-blend compositing.
- Fonts can be served locally with swap and licenses, preserving family appearance while removing remote blocking stylesheet dependency.

## Verification and delivery

- Image dimensions/alpha/variant inventory, meaningful source-set/base-path tests; compare before/after selected resource sizes at fixed viewport/DPR.
- TypeScript, full tests, root and `/site-preview/` builds, SEO/static validation, route and sitemap stability.
- Phone/tablet/desktop screenshots; all product images; hero geometry; all seven language switches; product filtering/navigation/quote entry; browser console/network.
- Desktop deployment ZIP (no ZIP left inside project) plus readable website manual covering GitHub Desktop → branch → main Pages workflow, local preview, image/content updates, Web3Forms vs mailto, mailbox binding limitation, sample test procedures without sending real mail automatically, backups and troubleshooting.
