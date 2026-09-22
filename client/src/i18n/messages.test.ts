import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { LOCALES, type Locale } from "./config";
import {
  clearCachedMessages,
  getCachedMessages,
  hasCachedMessages,
  loadMessages,
  setCachedMessages,
} from "./messages";
import en from "./messages/en.json";
import zhCN from "./messages/zh-CN.json";
import ptBR from "./messages/pt-BR.json";
import fr from "./messages/fr.json";
import ar from "./messages/ar.json";
import es from "./messages/es.json";
import ru from "./messages/ru.json";

type JsonObject = Record<string, unknown>;

const messages: Record<Locale, JsonObject> = {
  en,
  "zh-CN": zhCN,
  "pt-BR": ptBR,
  fr,
  ar,
  es,
  ru,
};

function missingKeys(reference: JsonObject, candidate: JsonObject, prefix = ""): string[] {
  return Object.entries(reference).flatMap(([key, value]) => {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    const candidateValue = candidate[key];

    if (!(key in candidate)) {
      return [nextPrefix];
    }

    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return missingKeys(
        value as JsonObject,
        (candidateValue || {}) as JsonObject,
        nextPrefix
      );
    }

    return [];
  });
}

describe("locale message coverage", () => {
  it("keeps every ready locale from falling back to English page copy", () => {
    for (const locale of LOCALES) {
      expect(missingKeys(messages.en, messages[locale]), locale).toEqual([]);
    }
  });
});

describe("language switching with cached English messages", () => {
  beforeEach(() => {
    clearCachedMessages();
    globalThis.__LECPRIMA_I18N__ = undefined;
    setCachedMessages("en", en);
  });

  afterEach(() => {
    clearCachedMessages();
    globalThis.__LECPRIMA_I18N__ = undefined;
  });

  it("does not treat English messages as a cached translation for another locale", () => {
    expect(getCachedMessages("zh-CN")).toBeUndefined();
    expect(hasCachedMessages("zh-CN")).toBe(false);
  });

  it.each(LOCALES.filter(locale => locale !== "en"))(
    "loads %s messages without requiring a page reload",
    async locale => {
      const translated = await loadMessages(locale);

      expect(translated).toEqual(messages[locale]);
      expect(getCachedMessages(locale)).toBe(translated);
      expect(await loadMessages("en")).toEqual(en);
      expect(await loadMessages(locale)).toBe(translated);
    }
  );
});
