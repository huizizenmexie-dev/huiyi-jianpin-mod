// i18n Module
// Lightweight internationalization without external dependencies

export { I18nProvider, useI18nContext } from "./I18nProvider";
export { useI18n } from "./useI18n";
export {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_NAMES,
  LOCALE_FLAGS,
  RTL_LOCALES,
  isValidLocale,
  getSafeLocale,
  isRTLLocale,
  type Locale,
} from "./config";
export {
  getLocaleFromPath,
  getPathWithoutLocale,
  buildLocalizedPath,
  buildLocalizedPublicPath,
  getAllLocalizedPaths,
  parseUrlParams,
} from "./locale";
export {
  loadTranslations,
  getTranslationValue,
  clearTranslationCache,
  hasCachedTranslations,
  preloadTranslations,
} from "./loadTranslations";
