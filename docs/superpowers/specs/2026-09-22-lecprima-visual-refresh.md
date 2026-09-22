# Lecprima visual refresh

The user requests matching imagery for four missing products, restoration of all other website imagery, a company brand icon, and an attractive website that encourages B2B enquiries. Six supplied product photos in `C:/Users/29223/Desktop/新建文件夹` establish the visual direction and will be preserved as the source of truth. Continue the already repaired locale cache behavior.

## Visual direction

Use a refined natural-ingredient catalogue: warm white, deep forest green, restrained brass accents, generous space, clear editorial hierarchy, high-key product photography and clean glass/ceramic material detail. Keep the Lecprima brand and existing business/contact information. A new compact seed/leaf mark gives the wordmark a recognizable brand device. Hero copy and imagery get their own readable space rather than text covering products.

Alternatives considered: the existing full-bleed farm documentary layout offers less immediate product visibility; a clinical blue laboratory theme conflicts with the provided natural product photography. The selected direction connects attractive ingredients with clear specifications and an easy enquiry path.

## Scope and safeguards

- Restore ten product images: the six supplied originals plus generated phosphatidylserine, soy dietary fiber, soy protein isolate and soy oligosaccharide/small-pack images.
- Generate ingredient still-life, field, laboratory sample, sourcing/workbench and food-application visuals. These are illustrative marketing assets, with no fabricated certificates, people, facilities or credentials.
- Generate a brand icon and integrate it into navigation, footer, favicon and touch icon.
- Make the homepage, catalogue, product detail and shared shell coherent, responsive and accessible. Preserve all existing locale routes, useful body text, specification tables, forms and SEO behavior. Maintain a visible route to product details and sample/quote enquiries, without invented prices or endorsements.
- Store all delivered images in this repository and use the shared base-aware URL helpers. Record source versus generated imagery and generation prompts.
- Do not publish or push changes as part of local implementation. Deliver a tested local result for review.

## Asset contract

`client/src/content/media.ts` exports raw public paths: `PRODUCT_IMAGES` keyed by existing product slug, `SITE_IMAGES` with `hero`, `harvest`, `laboratory`, `company`, `applications`, and `BRAND_ASSETS` with `icon`, `favicon`, `appleTouchIcon`. Components pass raw paths through `buildPublicAssetPath`; SEO uses `buildAbsoluteAssetUrl` through its resolver. No component constructs a deployment prefix itself.

## Verification

Run TypeScript, all Vitest tests, build, SEO and static validation for `/` and `/site-preview/`. Check every local media file, all ten product images, image metadata, SSR content and hydration. Browser QA covers 375/768/1440 widths, English home/catalogue/detail/contact, Arabic, a non-ready French about route, all seven locale switches, navigation and filter controls. Product locales are all ready, so the French about route supplies the existing noindex case. Compare consecutive build route/sitemap counts. Review screenshots before completion.
