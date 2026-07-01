/**
 * Unified route & content manifest
 * Single source of truth for: pages, products, translation status, sitemap, SEO
 */

export const LOCALES = ["en", "zh-CN", "pt-BR", "fr", "ar", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["ar"];

/**
 * Translation completion status per locale
 * true = fully translated and indexable
 * false = fallback to English, noindex
 *
 * As of 2026-07-01 only English has complete product content.
 * Other languages have UI chrome translated but NOT product data.
 */
export const LOCALE_STATUS: Record<Locale, { label: string; ready: boolean }> = {
  en: { label: "English", ready: true },
  "zh-CN": { label: "简体中文", ready: false },
  "pt-BR": { label: "Português (Brasil)", ready: false },
  fr: { label: "Français", ready: false },
  ar: { label: "العربية", ready: false },
  es: { label: "Español", ready: false },
};

/** Locales that are fully translated and should be indexed */
export const INDEXABLE_LOCALES: Locale[] = LOCALES.filter(
  (l) => LOCALE_STATUS[l].ready
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
}> {
  const SITE_URL = "https://lecprima.com";
  const routes: Array<{
    locale: Locale;
    path: string;
    fullUrl: string;
    type: "page" | "product";
  }> = [];

  for (const locale of INDEXABLE_LOCALES) {
    // Static pages
    for (const pagePath of PAGE_PATHS) {
      const p = pagePath === "/" ? "" : pagePath;
      routes.push({
        locale,
        path: `/${locale}${p}`,
        fullUrl: `${SITE_URL}/${locale}${p}`,
        type: "page",
      });
    }

    // Product pages
    for (const slug of PRODUCT_SLUGS) {
      routes.push({
        locale,
        path: `/${locale}/products/${slug}`,
        fullUrl: `${SITE_URL}/${locale}/products/${slug}`,
        type: "product",
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
