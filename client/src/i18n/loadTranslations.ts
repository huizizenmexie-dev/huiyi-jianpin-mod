import { DEFAULT_LOCALE, type Locale } from "./config";
import { buildPublicAssetPath } from "@/content/url";

type TranslationData = Record<string, any>;

// Cache loaded translations
const translationCache: Map<Locale, TranslationData> = new Map();

// Loading promises cache to avoid duplicate requests
const loadingPromises: Map<Locale, Promise<TranslationData>> = new Map();

// Load translation file for a locale
async function loadTranslationFile(locale: Locale): Promise<TranslationData> {
  const response = await fetch(buildPublicAssetPath(`/locales/${locale}/translation.json`));

  if (!response.ok) {
    throw new Error(`Failed to load translation for ${locale}: ${response.status}`);
  }

  return response.json();
}

// Load translations with fallback
export async function loadTranslations(locale: Locale): Promise<TranslationData> {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  // Check if already loading
  if (loadingPromises.has(locale)) {
    return loadingPromises.get(locale)!;
  }

  // Start loading
  const loadPromise = loadTranslationFile(locale)
    .then((data) => {
      translationCache.set(locale, data);
      loadingPromises.delete(locale);
      return data;
    })
    .catch((error) => {
      console.warn(`Failed to load ${locale} translations:`, error);
      loadingPromises.delete(locale);

      // Fallback to default locale if not already loading it
      if (locale !== DEFAULT_LOCALE) {
        return loadTranslations(DEFAULT_LOCALE);
      }

      // Return empty object as last resort
      return {};
    });

  loadingPromises.set(locale, loadPromise);
  return loadPromise;
}

// Get translation value by dot-separated path
export function getTranslationValue(
  data: TranslationData,
  key: string,
  fallback?: string
): string {
  const keys = key.split(".");
  let current: any = data;

  for (const k of keys) {
    if (current === null || current === undefined) {
      return fallback ?? key;
    }
    current = current[k];
  }

  // Return the value if it's a string, otherwise return fallback or key
  if (typeof current === "string") {
    return current;
  }

  return fallback ?? key;
}

// Clear translation cache (useful for testing or hot reload)
export function clearTranslationCache(): void {
  translationCache.clear();
  loadingPromises.clear();
}

// Check if translations are cached
export function hasCachedTranslations(locale: Locale): boolean {
  return translationCache.has(locale);
}

// Preload translations for a locale
export function preloadTranslations(locale: Locale): void {
  if (!translationCache.has(locale) && !loadingPromises.has(locale)) {
    loadTranslations(locale).catch(() => {
      // Silent preload
    });
  }
}
