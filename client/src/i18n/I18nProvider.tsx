import { createContext, useContext, type ReactNode } from "react";
import { useI18n } from "./useI18n";
import type { Locale } from "./config";

interface I18nContextValue {
  t: (key: string, fallback?: string) => string;
  locale: Locale;
  loading: boolean;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const i18n = useI18n();

  return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}

export function useI18nContext(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }
  return context;
}

// Re-export utilities
export { useI18n } from "./useI18n";
export { getLocaleFromPath, buildLocalizedPath, getPathWithoutLocale } from "./locale";
export type { Locale } from "./config";
