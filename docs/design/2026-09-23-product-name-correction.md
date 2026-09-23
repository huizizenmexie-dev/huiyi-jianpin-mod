# Soy oligosaccharide product-name correction

The business owner clarified in this task that the certificate scope reads:

> 大豆磷脂系列产品的研发、生产和销售；大豆蛋白、大豆纤维、大豆低聚糖的小包装生产及销售；……

Small packaging modifies three distinct categories: soy protein, soy fiber and soy oligosaccharides. It is not a combined product name, and a grouping in a product-introduction document does not establish a public-facing product identity.

## Implemented interpretation

- Public product name: 大豆低聚糖 / Soy Oligosaccharides, with corresponding names in all seven locales.
- Soy protein and dietary fiber remain their own catalogue entries. The shared catalogue filter lists protein, fiber and oligosaccharides explicitly.
- Small packaging appears only as a packaging field on the oligosaccharide product. Exact pack size requires enquiry; no new package size or format was inferred from the scope wording.
- Removed the soy-protein-content row from oligosaccharide specifications, and removed the combined protein/oligosaccharide retail-format applications, unsupported capsule-format wording and full-certification marketing derived from the old grouping.
- Product titles, navigation labels, industry recommendations, image alt text, inquiry subject/body and SEO/Open Graph/Product schema read the corrected shared names. The existing URL and image filename retain `soy-oligosaccharide-small-pack` to preserve published links; that identifier is not a public product label.
- The certificate ledger scope description now distinguishes the three categories. This correction does not assert a new certificate approval or extend a certificate's validity or scope.

The existing oligosaccharide-specific technical values have not been re-verified against a new COA/TDS in this naming correction. Original certificate PDFs and product-introduction documents were not edited.

## Verification and delivery

- TypeScript passed; 64 tests passed, including seven-locale agreement between product names, compact navigation names, SEO titles, Open Graph titles and Product schema, plus exclusion of protein specifications from oligosaccharides.
- Root build: SEO 5,372 passed and static validation with HTTP preview 13,102 passed. Subpath build: SEO 6,506 passed and static validation with HTTP preview 23,014 passed. Both produced 190 index files and 109 indexable URLs with matching normalized route/sitemap lists.
- Browser checks covered 375/768/1440 px, the affected detail/listing, home, Arabic, French noindex about and quote form. All seven mobile catalogue filters retained the three independent categories, and detail titles, metadata and product email links used the corrected name. The final fresh root-browser run passed 18 cases without page errors, failed assets, broken visible images or overflow.
- An earlier rapid-navigation session recorded one unattributed `Cannot read properties of null (reading 'sequence')` page error. Five follow-up page loads and the fresh final 18-case run did not reproduce it. No unrelated analytics/runtime code was changed.
- The desktop deployment ZIP was updated and its CRC, all 358 file hashes, and all seven localized product names verified against the final root build. Size: 12,759,301 bytes. SHA-256: `c3eb58d2e121d6ea01eef6977f0ced0ee275859d09839ca77cbf4c54aa338b28`.
- The previous image-update archive was preserved on the Desktop as `Lecprima-网站部署包-2026-09-23-产品名修正前.zip`; the current deployable package retains `Lecprima-网站部署包-2026-09-23.zip`. The existing PDF/HTML owner manuals are still applicable.

Changes remain in the local GitHub Desktop connected workspace. No commit, push or production publication was performed.
