import { describe, expect, it } from "vitest";
import { createUrlSystem, normalizeBasePath, normalizeSiteOrigin } from "./url";

describe("site URL system", () => {
  it("normalizes origins and deployment base paths", () => {
    expect(normalizeSiteOrigin("https://example.com/")).toBe("https://example.com");
    expect(normalizeBasePath("")).toBe("/");
    expect(normalizeBasePath("/")).toBe("/");
    expect(normalizeBasePath("site-preview")).toBe("/site-preview/");
    expect(normalizeBasePath("/site-preview")).toBe("/site-preview/");
  });

  it("builds route, public, canonical, and asset URLs from the same root config", () => {
    const root = createUrlSystem({
      siteOrigin: "https://example.com",
      basePath: "/",
    });

    expect(root.basePath).toBe("/");
    expect(root.routerBasePath).toBe("");
    expect(root.routePath("en", "/products")).toBe("/en/products/");
    expect(root.publicPath("en", "/products")).toBe("/en/products/");
    expect(root.canonicalUrl("en", "/products")).toBe("https://example.com/en/products/");
    expect(root.sitemapUrl).toBe("https://example.com/sitemap.xml");
    expect(root.publicAssetPath("/products/soy-lecithin-granules.png")).toBe(
      "/products/soy-lecithin-granules.png"
    );

    const project = createUrlSystem({
      siteOrigin: "https://example.com/",
      basePath: "site-preview",
    });

    expect(project.basePath).toBe("/site-preview/");
    expect(project.routerBasePath).toBe("/site-preview");
    expect(project.routePath("en", "/products")).toBe("/en/products/");
    expect(project.publicPath("en", "/products")).toBe("/site-preview/en/products/");
    expect(project.canonicalUrl("en", "/products")).toBe(
      "https://example.com/site-preview/en/products/"
    );
    expect(project.sitemapUrl).toBe("https://example.com/site-preview/sitemap.xml");
    expect(project.publicAssetPath("/products/soy-lecithin-granules.png")).toBe(
      "/site-preview/products/soy-lecithin-granules.png"
    );
  });
});
