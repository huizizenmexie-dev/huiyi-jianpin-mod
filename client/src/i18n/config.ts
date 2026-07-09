// i18n Configuration
// URL determines language, no browser detection override

export const LOCALES = ["en", "zh-CN", "pt-BR", "fr", "ar", "es", "ru"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// RTL languages
export const RTL_LOCALES: Locale[] = ["ar"];

// Locale display names
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "pt-BR": "Português (Brasil)",
  fr: "Français",
  ar: "العربية",
  es: "Español",
  ru: "Русский",
};

// Locale flags
export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇺🇸",
  "zh-CN": "🇨🇳",
  "pt-BR": "🇧🇷",
  fr: "🇫🇷",
  ar: "🇸🇦",
  es: "🇪🇸",
  ru: "🇷🇺",
};

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

// Get safe locale (fallback to default)
export function getSafeLocale(locale: string | undefined): Locale {
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  return DEFAULT_LOCALE;
}

// Check if locale is RTL
export function isRTLLocale(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}
