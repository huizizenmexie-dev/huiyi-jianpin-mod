import { describe, expect, it } from "vitest";
import { DEFAULT_LOCALE } from "./routes";
import { createUrlSystem } from "./url";
import { resolveRouteSEO } from "./seo";

describe("route SEO resolver", () => {
  const urls = createUrlSystem({
    siteOrigin: "https://example.com",
    basePath: "/site-preview/",
  });
  const brandStatement =
    "Lecprima is a global B2B brand operated by Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. We operate our own manufacturing facility in Liaocheng, Shandong, China, providing global customers with reliable production, quality management and export services.";

  it("keeps non-ready localized routes self-canonical and out of alternates", () => {
    const seo = resolveRouteSEO({
      locale: "ar",
      routePath: "/about",
      urls,
    });

    expect(seo.robots).toBe("noindex,follow");
    expect(seo.canonical).toBe(
      "https://example.com/site-preview/ar/about/"
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
      "ld-brand",
      "ld-website",
      "ld-liaocheng-facility",
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

  it("models Lecprima as the public brand and Huiyi Jianpin as the legal operator", () => {
    const seo = resolveRouteSEO({
      locale: "en",
      routePath: "/products/soy-lecithin-granules",
      urls,
    });

    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;

    expect(seo.og.siteName).toBe("Lecprima");
    expect(seo.jsonLd.map(entry => entry.id)).toContain("ld-brand");
    expect(seo.jsonLd.map(entry => entry.id)).toContain("ld-liaocheng-facility");
    expect(schemas["ld-organization"].name).toBe(
      "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd."
    );
    expect(schemas["ld-organization"].alternateName).toContain("Huiyi Jianpin");
    expect(schemas["ld-organization"].brand["@id"]).toBe(
      "https://example.com/#brand"
    );
    expect(schemas["ld-brand"].name).toBe("Lecprima");
    expect(schemas["ld-brand"].description).toBe(brandStatement);
    expect(schemas["ld-brand"].parentOrganization["@id"]).toBe(
      "https://example.com/#organization"
    );
    expect(schemas["ld-website"].name).toBe("Lecprima");
    expect(schemas["ld-website"].about["@id"]).toBe(
      "https://example.com/#brand"
    );
    expect(schemas["ld-product"].brand["@id"]).toBe(
      "https://example.com/#brand"
    );
    expect(schemas["ld-product"].manufacturer["@id"]).toBe(
      "https://example.com/#organization"
    );
    expect(schemas["ld-liaocheng-facility"].name).toBe(
      "Lecprima Liaocheng Manufacturing Facility"
    );
    expect(schemas["ld-liaocheng-facility"].operator["@id"]).toBe(
      "https://example.com/#organization"
    );
    expect(schemas["ld-liaocheng-facility"].description).toBe(
      "We operate our own manufacturing facility in Liaocheng, Shandong, China, providing global customers with reliable production, quality management and export services."
    );
    expect(
      schemas["ld-liaocheng-facility"].additionalProperty.some(
        (property: any) =>
          property.name === "Manufacturing and export relationship" &&
          property.value === brandStatement
      )
    ).toBe(true);
    expect(JSON.stringify(schemas)).not.toContain("exclusive B2B pricing authority");
    expect(JSON.stringify(schemas)).not.toContain("cooperative factory");
    expect(JSON.stringify(schemas)).not.toContain("affiliated company");
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
    expect(serialized).not.toMatch(
      /guaranteed viscosity|guaranteed delivery|price|availability|Offer/i
    );
  });

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
    expect(serialized).not.toMatch(
      /"Offer"|"price"|"availability"|"aggregateRating"|"review"|"gtin"|"mpn"/
    );
  });

  it("uses localized product master data in non-English product metadata and schema", () => {
    const seo = resolveRouteSEO({
      locale: "ru",
      routePath: "/products/soy-lecithin-liquid",
      urls,
    });
    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;

    expect(seo.title).toContain("Система жидкого соевого лецитина");
    expect(seo.description).toContain("Фосфолипиды");
    expect(schemas["ld-product"].name).toBe(
      "Система жидкого соевого лецитина"
    );
    expect(schemas["ld-product"].additionalProperty[0].name).toBe(
      "Форма продукта"
    );
    expect(JSON.stringify(schemas["ld-product"])).not.toContain(
      "Soy Lecithin Liquid System"
    );
  });

  it("uses localized page SEO and breadcrumb labels for non-English page routes", () => {
    const translate = (key: string, fallback: string) => {
      const values: Record<string, string> = {
        "common.home": "الرئيسية",
        "about_page.seo_title": "عن Lecprima | توريد مستقر للفوسفوليبيدات من الصين",
        "about_page.seo_description": "تعرّف كيف تربط Lecprima عمليات التصدير في هاربين وإنتاج الفوسفوليبيدات في لياوتشنغ ومصادر الصويا في خيلونغجيانغ لتوريد عالمي مستقر وقابل للتتبع.",
      };
      return values[key] || fallback;
    };

    const seo = resolveRouteSEO({
      locale: "ar",
      routePath: "/about",
      urls,
      translate,
    });
    const schemas = Object.fromEntries(
      seo.jsonLd.map(entry => [entry.id, entry.data])
    ) as Record<string, any>;

    expect(seo.title).toBe("عن Lecprima | توريد مستقر للفوسفوليبيدات من الصين");
    expect(seo.description).toContain("تعرّف كيف تربط Lecprima");
    expect(schemas["ld-breadcrumb"].itemListElement[0].name).toBe("الرئيسية");
    expect(schemas["ld-breadcrumb"].itemListElement.at(-1).name).toBe(
      "عن Lecprima"
    );
    expect(JSON.stringify(schemas["ld-breadcrumb"])).not.toContain(
      "About Lecprima"
    );
  });
});
