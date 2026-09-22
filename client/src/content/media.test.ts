import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BRAND_ASSETS, PRODUCT_IMAGES, SITE_IMAGES } from "./media";
import { PRODUCT_SLUGS } from "./routes";
import { createUrlSystem } from "./url";
import { products } from "../lib/productData";
import { resolveRouteSEO } from "./seo";

describe("site-owned images", () => {
  it("ships a local photo for every product in the catalogue", () => {
    expect(Object.keys(PRODUCT_IMAGES).sort()).toEqual([...PRODUCT_SLUGS].sort());
    for (const product of products) {
      expect(product.image).toBe(PRODUCT_IMAGES[product.slug as keyof typeof PRODUCT_IMAGES]);
    }
  });

  it("ships all referenced product, editorial and brand files", () => {
    for (const path of [...Object.values(PRODUCT_IMAGES), ...Object.values(SITE_IMAGES), ...Object.values(BRAND_ASSETS)]) {
      expect(path.startsWith("/images/"), path).toBe(true);
      const file = resolve(import.meta.dirname, "../../public", path.slice(1));
      expect(existsSync(file), path).toBe(true);
      expect(statSync(file).size, path).toBeGreaterThan(100);
    }
  });

  it.each(["/", "/site-preview/"])("keeps product image metadata under %s", basePath => {
    const urls = createUrlSystem({ siteOrigin: "https://example.com", basePath });
    for (const slug of PRODUCT_SLUGS) {
      const seo = resolveRouteSEO({ locale: "en", routePath: `/products/${slug}`, urls });
      expect(seo.og.image).toBe(urls.absoluteAssetUrl(PRODUCT_IMAGES[slug]));
      const productSchema = seo.jsonLd.find(entry => entry.id === "ld-product")?.data as { image?: string };
      expect(productSchema.image).toBe(urls.absoluteAssetUrl(PRODUCT_IMAGES[slug]));
    }
  });
});
