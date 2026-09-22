import { existsSync, readFileSync, statSync } from "node:fs";
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

  it("ships square product images with real transparency at every WebP size", () => {
    for (const path of Object.values(PRODUCT_IMAGES)) {
      for (const size of [400, 800, 1200]) {
        const variant = size === 1200 ? path : path.replace(/\.webp$/, `-${size}.webp`);
        const file = readFileSync(resolve(import.meta.dirname, "../../public", variant.slice(1)));
        // Extended WebP stores alpha and canvas geometry in the VP8X header.
        expect(file.toString("ascii", 12, 16), variant).toBe("VP8X");
        expect(file[20] & 0x10, `${variant} alpha flag`).toBe(0x10);
        expect(file.readUIntLE(24, 3) + 1, `${variant} width`).toBe(size);
        expect(file.readUIntLE(27, 3) + 1, `${variant} height`).toBe(size);
      }
    }
  });

  it("ships every responsive format and keeps phone-sized images under 50 KB", () => {
    const presets = [
      { paths: Object.values(PRODUCT_IMAGES), sizes: [400, 800, 1200] },
      { paths: Object.values(SITE_IMAGES), sizes: [480, 960, 1536] },
    ];
    for (const { paths, sizes } of presets) {
      for (const path of paths) {
        for (const format of ["avif", "webp"]) {
          for (const size of sizes) {
            const variant = format === "webp" && size === sizes.at(-1)
              ? path : path.replace(/\.webp$/, `-${size}.${format}`);
            const file = resolve(import.meta.dirname, "../../public", variant.slice(1));
            expect(existsSync(file), variant).toBe(true);
            expect(statSync(file).size, variant).toBeGreaterThan(100);
            if (size === sizes[0]) expect(statSync(file).size, variant).toBeLessThan(50_000);
          }
        }
      }
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
