import { useCallback, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { type Locale, DEFAULT_LOCALE, isRTLLocale } from "./config";
import { getLocaleFromPath } from "./locale";
import { getTranslationValue } from "./loadTranslations";
import { getMessages } from "./messages";

export function useI18n() {
  const [location] = useLocation();
  const locale = getLocaleFromPath(location);
  const isRTL = isRTLLocale(locale);
  const messages = useMemo(() => getMessages(locale), [locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [locale, isRTL]);

  const t = useCallback(
    (key: string, fallback?: string): string => getTranslationValue(messages, key, fallback),
    [messages]
  );

  return {
    t,
    locale,
    loading: false,
    isRTL,
  };
}

export type { Locale };
export { getLocaleFromPath, DEFAULT_LOCALE };
