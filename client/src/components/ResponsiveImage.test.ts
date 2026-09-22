import { afterEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { srcsetReferences } from "../../../scripts/srcset-references";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("responsive image delivery", () => {
  it.each(["/", "/site-preview/"])(
    "renders product AVIF sources and a WebP fallback once under %s",
    async basePath => {
      vi.stubEnv("BASE_PATH", basePath);
      const { default: ResponsiveImage } = await import("./ResponsiveImage");
      const markup = renderToStaticMarkup(
        createElement(ResponsiveImage, {
          src: "/images/products/soy-lecithin-liquid.webp",
          preset: "product",
          sizes: "(max-width: 639px) calc(100vw - 32px), 390px",
          alt: "Soy lecithin liquid",
        })
      );

      expect(markup).toContain('type="image/avif"');
      expect(markup).toContain(
        `${basePath}images/products/soy-lecithin-liquid-400.avif 400w, ${basePath}images/products/soy-lecithin-liquid-800.avif 800w, ${basePath}images/products/soy-lecithin-liquid-1200.avif 1200w`
      );
      expect(markup).toContain(
        `${basePath}images/products/soy-lecithin-liquid-400.webp 400w, ${basePath}images/products/soy-lecithin-liquid-800.webp 800w, ${basePath}images/products/soy-lecithin-liquid.webp 1200w`
      );
      expect(markup).toContain(
        `src="${basePath}images/products/soy-lecithin-liquid.webp"`
      );
      expect(markup).toContain('width="1200" height="1200"');
      expect(markup).toContain('loading="lazy"');
      expect(markup).toContain(
        'sizes="(max-width: 639px) calc(100vw - 32px), 390px"'
      );
      expect(markup).not.toContain("/site-preview/site-preview/");
      // Static validation must inspect React's mixed-case srcSet attributes too.
      const candidates = srcsetReferences(markup);
      expect(candidates).toHaveLength(6);
      expect(candidates).toContain(`${basePath}images/products/soy-lecithin-liquid-400.avif`);
      expect(candidates.every(path => path.startsWith(`${basePath}images/`))).toBe(true);
    }
  );

  it("keeps hero source dimensions, priority and alternative text in static HTML", async () => {
    vi.stubEnv("BASE_PATH", "/");
    const { default: ResponsiveImage } = await import("./ResponsiveImage");
    const markup = renderToStaticMarkup(
      createElement(ResponsiveImage, {
        src: "/images/site/ingredient-still-life.webp",
        preset: "editorial",
        sizes: "(max-width: 639px) calc(100vw - 32px), 588px",
        alt: "Lecithin ingredients",
        loading: "eager",
        fetchPriority: "high",
        className: "hero-image",
        pictureClassName: "image-fill",
      })
    );

    expect(markup).toContain("ingredient-still-life-480.avif 480w");
    expect(markup).toContain("ingredient-still-life-960.webp 960w");
    expect(markup).toContain("ingredient-still-life.webp 1536w");
    expect(markup).toContain('width="1536" height="1024"');
    expect(markup).toContain('loading="eager"');
    expect(markup).toContain('fetchPriority="high"');
    expect(markup).toContain('alt="Lecithin ingredients"');
    expect(markup).toContain('class="responsive-image image-fill"');
    // React must leave selection to <picture>, without preloading the WebP fallback.
    expect(markup).not.toMatch(/<link[^>]*as="image"/);
  });
});
