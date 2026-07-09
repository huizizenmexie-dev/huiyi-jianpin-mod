/**
 * Unified route & content manifest
 * Single source of truth for: pages, products, translation status, sitemap, SEO
 */

export const LOCALES = ["en", "zh-CN", "pt-BR", "fr", "ar", "es", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["ar"];
export type TranslationStatus = "draft" | "reviewed" | "ready";

/**
 * Translation completion status per locale
 * true = fully translated and indexable
 * false = fallback to English, noindex
 *
 * Locale-level status means the language can publish completed route groups.
 * Route-level readiness below prevents partially translated static sections
 * such as about pages or insight listings from entering sitemap early.
 */
export const LOCALE_STATUS: Record<
  Locale,
  { label: string; status: TranslationStatus }
> = {
  en: { label: "English", status: "ready" },
  "zh-CN": { label: "简体中文", status: "ready" },
  "pt-BR": { label: "Português (Brasil)", status: "ready" },
  fr: { label: "Français", status: "ready" },
  ar: { label: "العربية", status: "ready" },
  es: { label: "Español", status: "ready" },
  ru: { label: "Русский", status: "ready" },
};

/** Locales that are fully translated and should be indexed */
export const INDEXABLE_LOCALES: Locale[] = LOCALES.filter(
  l => LOCALE_STATUS[l].status === "ready"
);
export const NOINDEX_LOCALES: Locale[] = LOCALES.filter(
  l => LOCALE_STATUS[l].status !== "ready"
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

/** English insight article slugs — must match insights.ts */
export const INSIGHT_SLUGS = [
  "phosphatidylcholine-health-supplement-guide",
  "phosphatidylserine-brain-health-guide",
  "water-soluble-phospholipid-powder-beverages",
  "high-purity-lecithin-granules-guide",
  "sunflower-lecithin-clean-label-guide",
  "soy-lecithin-sports-nutrition-guide",
  "phospholipid-supplements-children-guide",
  "pc-ps-middle-aged-elderly-health-guide",
  "soy-lecithin-plant-based-diet-guide",
  "functional-phospholipids-food-formulation-guide",
] as const;

export type InsightSlug = (typeof INSIGHT_SLUGS)[number];

/** Static page paths (without locale prefix) */
export const PAGE_PATHS = [
  "/",
  "/products",
  "/about",
  "/quality",
  "/industry-solutions",
  "/insights",
  "/contact",
] as const;

type PagePath = (typeof PAGE_PATHS)[number];

const PAGE_ROUTE_STATUS: Record<PagePath, Partial<Record<Locale, TranslationStatus>>> = {
  "/": {
    en: "ready",
    "zh-CN": "ready",
    "pt-BR": "ready",
    fr: "ready",
    ar: "ready",
    es: "ready",
    ru: "ready",
  },
  "/products": {
    en: "ready",
    "zh-CN": "ready",
    "pt-BR": "ready",
    fr: "ready",
    ar: "ready",
    es: "ready",
    ru: "ready",
  },
  "/about": {
    en: "ready",
  },
  "/quality": {
    en: "ready",
    "zh-CN": "ready",
    ru: "ready",
  },
  "/industry-solutions": {
    en: "ready",
    "zh-CN": "ready",
    ru: "ready",
  },
  "/insights": {
    en: "ready",
  },
  "/contact": {
    en: "ready",
    "zh-CN": "ready",
    "pt-BR": "ready",
    fr: "ready",
    ar: "ready",
    es: "ready",
    ru: "ready",
  },
};

export function isLocaleReady(locale: Locale): boolean {
  return LOCALE_STATUS[locale].status === "ready";
}

export function isPageRouteReady(
  locale: Locale,
  routePath: string
): boolean {
  const normalized = (routePath.replace(/\/$/, "") || "/") as PagePath;
  return (
    isLocaleReady(locale) &&
    PAGE_PATHS.includes(normalized) &&
    PAGE_ROUTE_STATUS[normalized]?.[locale] === "ready"
  );
}

export function isProductRouteReady(locale: Locale): boolean {
  return isLocaleReady(locale);
}

export function pageRouteIndexableLocales(routePath: string): Locale[] {
  return LOCALES.filter(locale => isPageRouteReady(locale, routePath));
}

export function productRouteIndexableLocales(): Locale[] {
  return LOCALES.filter(isProductRouteReady);
}
