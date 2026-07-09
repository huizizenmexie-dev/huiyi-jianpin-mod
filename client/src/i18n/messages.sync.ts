import ar from "./messages/ar.json";
import en from "./messages/en.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";
import ptBR from "./messages/pt-BR.json";
import ru from "./messages/ru.json";
import zhCN from "./messages/zh-CN.json";
import { DEFAULT_LOCALE, type Locale } from "./config";
import type { TranslationData } from "./messages";

const SYNC_MESSAGES: Record<Locale, TranslationData> = {
  en,
  "zh-CN": zhCN,
  "pt-BR": ptBR,
  fr,
  ar,
  es,
  ru,
};

export function getMessagesSync(locale: Locale): TranslationData {
  return SYNC_MESSAGES[locale] ?? SYNC_MESSAGES[DEFAULT_LOCALE];
}
