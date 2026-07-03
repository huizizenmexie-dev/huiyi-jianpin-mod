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

    expect(seo.jsonLd.map(entry => entry.id)).toEqual([
      "ld-organization",
      "ld-website",
      "ld-webpage",
      "ld-breadcrumb",
      "ld-product",
    ]);
  });

  it("connects the product, page, website, and publisher with stable @id values", () => {
    const seo = resolveRouteSEO({
      locale: "en",
      routePath: "/products/soy-lecithin-granules",
      urls,
    });

    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;

    expect(schemas["ld-organization"]["@id"]).toBe(
      "https://example.com/#organization"
    );
    expect(schemas["ld-website"].publisher["@id"]).toBe(
      "https://example.com/#organization"
    );
    expect(schemas["ld-webpage"].mainEntity["@id"]).toBe(
      "https://example.com/site-preview/en/products/soy-lecithin-granules/#product"
    );
    expect(schemas["ld-product"].manufacturer["@id"]).toBe(
      "https://example.com/#organization"
    );
    expect(schemas["ld-product"].additionalProperty.length).toBeGreaterThan(0);
  });

  it("treats the insights listing as an indexable crawl entry point", () => {
    const seo = resolveRouteSEO({
      locale: "en",
      routePath: "/insights",
      urls,
    });

    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;

    expect(seo.robots).toBe("index,follow");
    expect(seo.canonical).toBe("https://example.com/site-preview/en/insights/");
    expect(seo.alternates).toContainEqual({
      hreflang: "x-default",
      href: "https://example.com/site-preview/en/insights/",
    });
    expect(seo.og.type).toBe("website");
    expect(schemas["ld-webpage"]["@type"]).toBe("WebPage");
    expect(schemas["ld-breadcrumb"].itemListElement.at(-1).item).toBe(
      "https://example.com/site-preview/en/insights/"
    );
  });

  it("keeps health article schema limited to ordinary Article data", () => {
    const seo = resolveRouteSEO({
      locale: "en",
      routePath: "/insights/phosphatidylcholine-health-supplement-guide",
      urls,
    });

    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;
    const serialized = JSON.stringify(schemas);

    expect(schemas["ld-article"]["@type"]).toBe("Article");
    expect(serialized).not.toContain("MedicalClaim");
    expect(serialized).not.toContain("Drug");
    expect(serialized).not.toContain("Offer");
    expect(serialized).not.toContain("Review");
    expect(serialized).not.toContain("AggregateRating");
    expect(serialized).not.toContain("Certification");
    expect(serialized).not.toContain("@bohrium");
  });

  it("does not emit Article JSON-LD for non-indexable localized insight pages", () => {
    const seo = resolveRouteSEO({
      locale: "zh-CN",
      routePath: "/zh-CN/insights/phosphatidylcholine-health-supplement-guide",
      urls,
    });

    expect(seo.robots).toBe("noindex,follow");
    expect(seo.jsonLd.map(entry => entry.id)).not.toContain("ld-article");
  });
});
