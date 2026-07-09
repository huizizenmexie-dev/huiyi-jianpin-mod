import { describe, expect, it } from "vitest";
import { getProductBySlug, getProducts, getProductListingNames } from "./productData";

describe("localized product master data", () => {
  it("returns translated buyer-facing product fields while preserving stable product metadata", () => {
    const product = getProductBySlug("soy-lecithin-liquid", "zh-CN");

    expect(product?.slug).toBe("soy-lecithin-liquid");
    expect(product?.category).toEqual(["Liquid"]);
    expect(product?.image).toContain("soy-lecithin-liquid-system");
    expect(product?.name).toBe("液体大豆卵磷脂系统");
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
});
