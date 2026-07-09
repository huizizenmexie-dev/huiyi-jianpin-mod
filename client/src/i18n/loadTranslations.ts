import { DEFAULT_LOCALE, type Locale } from "./config";
import {
  clearCachedMessages,
  getCachedMessages,
  hasCachedMessages,
  loadMessages,
  preloadMessages,
  type TranslationData,
} from "./messages";

/**
 * Locale messages are split by language for the browser. Static pre-rendering
 * seeds the current locale into the page so hydration starts with translated
 * text and later language switches load only the selected JSON chunk.
 */
export async function loadTranslations(locale: Locale): Promise<TranslationData> {
  return loadMessages(locale);
}

export function getTranslationValue(
  data: TranslationData,
  key: string,
  fallback?: string
): string {
  const keys = key.split(".");
  let current: unknown = data;

  for (const segment of keys) {
    if (typeof current !== "object" || current === null || !(segment in current)) {
      return fallback ?? key;
    }
    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : fallback ?? key;
}

export function clearTranslationCache(): void {
  clearCachedMessages();
}
export function hasCachedTranslations(locale: Locale): boolean {
  return hasCachedMessages(locale);
}
export function preloadTranslations(locale: Locale): void {
  preloadMessages(locale);
}

export { getCachedMessages };

export { DEFAULT_LOCALE };
