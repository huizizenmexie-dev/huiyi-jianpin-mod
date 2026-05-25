import { describe, expect, it } from "vitest";
import { buildCanonicalUrl, buildOrganizationSchema, buildPageMeta } from "./seo";

describe("seo helpers", () => {
  it("builds canonical URLs from site paths", () => {
    expect(buildCanonicalUrl("/")).toBe("https://lecprima.com/");
    expect(buildCanonicalUrl("/products")).toBe("https://lecprima.com/products");
  });

  it("builds page meta with Open Graph defaults", () => {
    const meta = buildPageMeta({
      title: "Stable Soy Lecithin Supplier | Huiyi Jianpin",
      description: "Reliable phospholipid supply from China.",
      path: "/products",
    });

    expect(meta.canonicalUrl).toBe("https://lecprima.com/products");
    expect(meta.openGraph["og:title"]).toBe("Stable Soy Lecithin Supplier | Huiyi Jianpin");
    expect(meta.openGraph["og:type"]).toBe("website");
  });

  it("builds organization schema around stable phospholipid supply", () => {
    const schema = buildOrganizationSchema();

    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Huiyi Jianpin");
    expect(schema.knowsAbout).toContain("Soy lecithin supply chain resilience");
  });
});
