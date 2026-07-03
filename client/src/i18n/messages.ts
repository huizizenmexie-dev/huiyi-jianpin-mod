import ar from "./messages/ar.json";
import en from "./messages/en.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";
import ptBR from "./messages/pt-BR.json";
import zhCN from "./messages/zh-CN.json";
import { DEFAULT_LOCALE, type Locale } from "./config";

export type TranslationData = Record<string, unknown>;

const MESSAGES: Record<Locale, TranslationData> = {
  en,
  "zh-CN": zhCN,
  "pt-BR": ptBR,
  fr,
  ar,
  es,
};

/**
 * Translation data is bundled synchronously so the static pre-renderer and the
 * hydrated browser render produce the same visible text. This avoids serving
 * untranslated i18n keys to crawlers before a client-side fetch completes.
 */
export function getMessages(locale: Locale): TranslationData {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}
