import { DEFAULT_LOCALE, type Locale } from "./config";
import { getMessages, type TranslationData } from "./messages";

/**
 * Kept as an async-compatible API for existing callers. Messages are bundled
 * at build time, so server rendering never depends on browser fetch().
 */
export async function loadTranslations(locale: Locale): Promise<TranslationData> {
  return getMessages(locale);
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

/** No network cache is needed because messages are bundled with the app. */
export function clearTranslationCache(): void {}
export function hasCachedTranslations(locale: Locale): boolean {
  return Boolean(getMessages(locale));
}
export function preloadTranslations(_locale: Locale): void {}

export { DEFAULT_LOCALE };
