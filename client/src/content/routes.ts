/**
 * Unified route & content manifest
 * Single source of truth for: pages, products, translation status, sitemap, SEO
 */

export const LOCALES = ["en", "zh-CN", "pt-BR", "fr", "ar", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["ar"];
export type TranslationStatus = "draft" | "reviewed" | "ready";

/**
 * Translation completion status per locale
 * true = fully translated and indexable
 * false = fallback to English, noindex
 *
 * As of 2026-07-01 only English has complete product content.
 * Other languages have UI chrome translated but NOT product data.
 */
export const LOCALE_STATUS: Record<Locale, { label: string; status: TranslationStatus }> = {
  en: { label: "English", status: "ready" },
  "zh-CN": { label: "简体中文", status: "draft" },
  "pt-BR": { label: "Português (Brasil)", status: "draft" },
  fr: { label: "Français", status: "draft" },
  ar: { label: "العربية", status: "draft" },
  es: { label: "Español", status: "draft" },
};

/** Locales that are fully translated and should be indexed */
export const INDEXABLE_LOCALES: Locale[] = LOCALES.filter(
  (l) => LOCALE_STATUS[l].status === "ready"
);
export const NOINDEX_LOCALES: Locale[] = LOCALES.filter(
  (l) => LOCALE_STATUS[l].status !== "ready"
);

/** All product slugs — must match productData.ts */
export const PRODUCT_SLUGS = [
  "soy-lecithin-granules",
  "soy-lecithin-liquid",
  "soy-lecithin-powder",
  "modified-soy-lecithin",
  "phosphatidylcholine",
  "phosphatidylserine",
  "sunflower-lecithin",
  "soy-dietary-fiber",
  "soy-protein-isolate",
  "soy-oligosaccharide-small-pack",
] as const;

export type ProductSlug = (typeof PRODUCT_SLUGS)[number];

/** Static page paths (without locale prefix) */
export const PAGE_PATHS = [
  "/",
  "/products",
  "/about",
  "/quality",
  "/industry-solutions",
  "/contact",
] as const;

/** Generate all indexable URLs */
export function generateAllRoutes(): Array<{
  locale: Locale;
  path: string;
  fullUrl: string;
  type: "page" | "product";
  indexable: boolean;
}> {
  const siteOrigin =
    (typeof process !== "undefined" && process.env.SITE_ORIGIN) ||
    "https://lecprima.com";
  const toRoutePath = (locale: Locale, path: string) => {
    const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
    return `/${locale}${clean}/`;
  };
  const routes: Array<{
    locale: Locale;
    path: string;
    fullUrl: string;
    type: "page" | "product";
    indexable: boolean;
  }> = [];

  for (const locale of LOCALES) {
    // Static pages
    for (const pagePath of PAGE_PATHS) {
      routes.push({
        locale,
        path: toRoutePath(locale, pagePath),
        fullUrl: `${siteOrigin}${toRoutePath(locale, pagePath)}`,
        type: "page",
        indexable: LOCALE_STATUS[locale].status === "ready",
      });
    }

    // Product pages
    for (const slug of PRODUCT_SLUGS) {
      routes.push({
        locale,
        path: toRoutePath(locale, `/products/${slug}`),
        fullUrl: `${siteOrigin}${toRoutePath(locale, `/products/${slug}`)}`,
        type: "product",
        indexable: LOCALE_STATUS[locale].status === "ready",
      });
    }
  }

  return routes;
}

/** Get all alternate URLs for a given path */
export function getAlternates(
  path: string
): Array<{ locale: Locale; url: string }> {
  const SITE_URL = "https://lecprima.com";
  // Strip locale prefix to get base path
  const basePath = path.replace(/^\/[^/]+/, "") || "/";
  return INDEXABLE_LOCALES.map((locale) => ({
    locale,
    url: `${SITE_URL}/${locale}${basePath === "/" ? "" : basePath}`,
  }));
}
