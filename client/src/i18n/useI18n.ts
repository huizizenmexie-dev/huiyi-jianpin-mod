import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { type Locale, DEFAULT_LOCALE, isRTLLocale } from "./config";
import { getLocaleFromPath } from "./locale";
import { loadTranslations, getTranslationValue } from "./loadTranslations";

type TranslationData = Record<string, any>;

export function useI18n() {
  const [location] = useLocation();
  const [messages, setMessages] = useState<TranslationData>({});
  const [loading, setLoading] = useState(true);

  // Get locale from URL - URL is the source of truth
  const locale = getLocaleFromPath(location);
  const isRTL = isRTLLocale(locale);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await loadTranslations(locale);
        if (!cancelled) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Update document attributes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [locale, isRTL]);

  // Translation function
  const t = useCallback(
    (key: string, fallback?: string): string => {
      return getTranslationValue(messages, key, fallback);
    },
    [messages]
  );

  return {
    t,
    locale,
    loading,
    isRTL,
  };
}

// Export types and utilities
export type { Locale };
export { getLocaleFromPath, DEFAULT_LOCALE };
