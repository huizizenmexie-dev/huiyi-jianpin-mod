import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./ProductDetail.tsx", import.meta.url), "utf8");

describe("ProductDetail contact CTAs", () => {
  it("routes documentation and sample requests to the localized contact quote form", () => {
    const requestCtaMatch = source.match(
      /<a[\s\S]*?href=\{([^}]+)\}[\s\S]*?product_detail\.request_docs_sample[\s\S]*?<\/a>/
    );

    expect(requestCtaMatch?.[1]).toBe("contactQuoteFormLink");
    expect(source).toContain('buildLocalizedPublicPath(locale, "/contact#quoteForm")');
  });
});
