import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE } from "./routes";
import { createUrlSystem } from "./url";
import { resolveRouteSEO } from "./seo";

describe("route SEO resolver", () => {
  const urls = createUrlSystem({
    siteOrigin: "https://example.com",
    basePath: "/site-preview/",
  });

  it("keeps non-ready localized pages self-canonical and out of alternates", () => {
    const seo = resolveRouteSEO({
      locale: "ar",
      routePath: "/products/soy-lecithin-granules",
      urls,
    });

    expect(seo.robots).toBe("noindex,follow");
    expect(seo.canonical).toBe(
      "https://example.com/site-preview/ar/products/soy-lecithin-granules/"
    );
    expect(seo.alternates).toEqual([]);
  });

  it("emits x-default only for ready English routes", () => {
    const seo = resolveRouteSEO({
      locale: DEFAULT_LOCALE,
      routePath: "/products/soy-lecithin-granules",
      urls,
    });

    expect(seo.robots).toBe("index,follow");
    expect(seo.alternates).toContainEqual({
      hreflang: "x-default",
      href: "https://example.com/site-preview/en/products/soy-lecithin-granules/",
    });
  });

  it("assigns stable identifiers to managed JSON-LD scripts", () => {
    const seo = resolveRouteSEO({
      locale: "en",
      routePath: "/products/soy-lecithin-granules",
      urls,
    });

    expect(seo.jsonLd.map((entry) => entry.id)).toEqual([
      "ld-organization",
      "ld-website",
      "ld-breadcrumb",
      "ld-product",
    ]);
  });
});
