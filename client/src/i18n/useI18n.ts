import { useCallback, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { type Locale, DEFAULT_LOCALE, isRTLLocale } from "./config";
import { getLocaleFromPath } from "./locale";
import {
  getCachedMessages,
  getTranslationValue,
  loadTranslations,
} from "./loadTranslations";
import type { TranslationData } from "./messages";

export function useI18n() {
  const [location] = useLocation();
  const locale = getLocaleFromPath(location);
  const isRTL = isRTLLocale(locale);
  const [messages, setMessages] = useState<TranslationData>(
    () => getCachedMessages(locale) || {}
  );
  const [loading, setLoading] = useState(() => !getCachedMessages(locale));

  useEffect(() => {
    let active = true;
    const cached = getCachedMessages(locale);

    if (cached) {
      setMessages(cached);
      setLoading(false);
      return () => {
        active = false;
      };
    }

    setLoading(true);
    void loadTranslations(locale).then((nextMessages) => {
      if (!active) return;
      setMessages(nextMessages);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [locale]);

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
    loading,
    isRTL,
  };
}

export type { Locale };
export { getLocaleFromPath, DEFAULT_LOCALE };
