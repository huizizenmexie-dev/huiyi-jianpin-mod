import { describe, expect, it } from "vitest";
import { getProductBySlug, getProducts, getProductListingNames } from "./productData";
import { resolveRouteSEO } from "../content/seo";
import { createUrlSystem } from "../content/url";
import type { Locale } from "../i18n/config";

describe("localized product master data", () => {
  it("returns translated buyer-facing product fields while preserving stable product metadata", () => {
    const product = getProductBySlug("soy-lecithin-liquid", "zh-CN");

    expect(product?.slug).toBe("soy-lecithin-liquid");
    expect(product?.category).toEqual(["Liquid"]);
    expect(product?.image).toBe("/images/products/soy-lecithin-liquid.webp");
    expect(product?.name).toBe("液体大豆卵磷脂系列");
    expect(product?.subtitle).toContain("磷脂");
    expect(product?.specifications[0]).toEqual({
      label: "产品形态",
      value: "黄色至棕色黏稠液体；脱色型颜色更浅",
    });
    expect(product?.applications[0].painPoint).toContain("精炼黏度");
  });

  it("localizes product listings from the same source used by product detail pages", () => {
    const products = getProducts("ru");
    const listingNames = getProductListingNames("ru");

    expect(products).toHaveLength(10);
    expect(products[0].name).toBe("Система жидкого соевого лецитина");
    expect(listingNames[0]).toEqual({
      slug: "soy-lecithin-liquid",
      name: "Жидкий соевый лецитин",
    });
  });

  it.each<[Locale, string]>([
    ["en", "Soy Oligosaccharides"],
    ["zh-CN", "大豆低聚糖"],
    ["pt-BR", "Oligossacarídeos de soja"],
    ["fr", "Oligosaccharides de soja"],
    ["ar", "السكريات قليلة التعدد من الصويا"],
    ["es", "Oligosacáridos de soja"],
    ["ru", "Соевые олигосахариды"],
  ])("keeps the independent product name consistent in %s listings and metadata", (locale, name) => {
    const slug = "soy-oligosaccharide-small-pack";
    expect(getProductBySlug(slug, locale)?.name).toBe(name);
    expect(getProductListingNames(locale).find(product => product.slug === slug)?.name).toBe(name);
    const seo = resolveRouteSEO({
      locale,
      routePath: `/products/${slug}`,
      urls: createUrlSystem({ siteOrigin: "https://example.com", basePath: "/site-preview/" }),
    });
    expect(seo.title).toBe(`${name} | Lecprima`);
    expect(seo.og.title).toBe(`${name} | Lecprima`);
    expect((seo.jsonLd.find(entry => entry.id === "ld-product")?.data as { name: string }).name).toBe(name);
  });

  it("keeps packaging separate and excludes protein specifications from oligosaccharides", () => {
    const product = getProductBySlug("soy-oligosaccharide-small-pack")!;
    expect(product.specifications.find(spec => spec.label === "Packaging")?.value).toContain("Small packs");
    expect(product.specifications.some(spec => /protein|production scope|certifications/i.test(spec.label))).toBe(false);
    expect(product.applications.some(application => /protein|capsules|full certification/i.test(JSON.stringify(application)))).toBe(false);
    expect(getProductBySlug("soy-protein-isolate")?.specifications.some(spec => spec.label === "Protein Content")).toBe(true);
    expect(getProductBySlug("soy-dietary-fiber")?.name).toBe("Soy Dietary Fiber");
    expect(getProducts()).toHaveLength(10);
  });
});
