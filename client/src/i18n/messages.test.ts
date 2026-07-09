import { describe, expect, it } from "vitest";
import { LOCALES, type Locale } from "./config";
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
