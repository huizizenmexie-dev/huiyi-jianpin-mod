import { DEFAULT_LOCALE, type Locale } from "./config";

export type TranslationData = Record<string, unknown>;

type TranslationModule = { default: TranslationData };
type InitialI18nPayload = {
  locale: Locale;
  messages: TranslationData;
};

declare global {
  interface Window {
    __LECPRIMA_I18N__?: Partial<Record<Locale, TranslationData>>;
  }

  // eslint-disable-next-line no-var
  var __LECPRIMA_I18N__: Partial<Record<Locale, TranslationData>> | undefined;
}

const MESSAGE_LOADERS: Record<Locale, () => Promise<TranslationModule>> = {
  en: () => import("./messages/en.json"),
  "zh-CN": () => import("./messages/zh-CN.json"),
  "pt-BR": () => import("./messages/pt-BR.json"),
  fr: () => import("./messages/fr.json"),
  ar: () => import("./messages/ar.json"),
  es: () => import("./messages/es.json"),
  ru: () => import("./messages/ru.json"),
};

const MESSAGE_CACHE: Partial<Record<Locale, TranslationData>> = {};

function browserInitialMessages(locale: Locale): TranslationData | undefined {
  if (typeof document === "undefined") return undefined;

  const script = document.getElementById("lecprima-i18n");
  if (!script?.textContent) return undefined;

  try {
    const payload = JSON.parse(script.textContent) as InitialI18nPayload;
    if (payload.locale === locale && payload.messages) {
      return payload.messages;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function globalInitialMessages(locale: Locale): TranslationData | undefined {
  const source =
    typeof window === "undefined"
      ? globalThis.__LECPRIMA_I18N__
      : window.__LECPRIMA_I18N__;
  return source?.[locale];
}

function safeLocale(locale: Locale): Locale {
  return locale in MESSAGE_LOADERS ? locale : DEFAULT_LOCALE;
}

export function setCachedMessages(
  locale: Locale,
  messages: TranslationData
): void {
  const resolvedLocale = safeLocale(locale);
  MESSAGE_CACHE[resolvedLocale] = messages;

  if (typeof window === "undefined") {
    globalThis.__LECPRIMA_I18N__ = {
      ...globalThis.__LECPRIMA_I18N__,
      [resolvedLocale]: messages,
    };
  } else {
    window.__LECPRIMA_I18N__ = {
      ...window.__LECPRIMA_I18N__,
      [resolvedLocale]: messages,
    };
  }
}

export function getCachedMessages(locale: Locale): TranslationData | undefined {
  const resolvedLocale = safeLocale(locale);
  const cached =
    MESSAGE_CACHE[resolvedLocale] ||
    globalInitialMessages(resolvedLocale) ||
    browserInitialMessages(resolvedLocale);

  if (cached) {
    setCachedMessages(resolvedLocale, cached);
    return cached;
  }

  return MESSAGE_CACHE[DEFAULT_LOCALE] || globalInitialMessages(DEFAULT_LOCALE);
}

export async function loadMessages(locale: Locale): Promise<TranslationData> {
  const resolvedLocale = safeLocale(locale);
  const cached = getCachedMessages(resolvedLocale);
  if (cached) return cached;

  const module = await MESSAGE_LOADERS[resolvedLocale]();
  setCachedMessages(resolvedLocale, module.default);
  return module.default;
}

export function hasCachedMessages(locale: Locale): boolean {
  return Boolean(getCachedMessages(locale));
}

export function clearCachedMessages(): void {
  for (const locale of Object.keys(MESSAGE_CACHE) as Locale[]) {
    delete MESSAGE_CACHE[locale];
  }
}

export function preloadMessages(locale: Locale): void {
  void loadMessages(locale);
}
