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
export const LOCALE_STATUS: Record<
  Locale,
  { label: string; status: TranslationStatus }
> = {
  en: { label: "English", status: "ready" },
  "zh-CN": { label: "简体中文", status: "draft" },
  "pt-BR": { label: "Português (Brasil)", status: "draft" },
  fr: { label: "Français", status: "draft" },
  ar: { label: "العربية", status: "draft" },
  es: { label: "Español", status: "draft" },
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
