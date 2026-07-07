import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("site SDK script injection", () => {
  it("embeds the provided third-party SDK snippet in client/index.html", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    expect(html).toContain("https://sirius-it-site.lx.netease.com/site-sdk.js");
    expect(html).toContain("outerKey: 'key568983629cdf4c00a613bcdf6913be10'");
    expect(html).toContain("w.__siteSDK__.setDefaultConfig");
    expect(html).toContain("(window, document, '__siteSDK__');");
  });

  it("embeds the Umami analytics script in client/index.html", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    expect(html).toContain(
      '<script defer src="https://cloud.umami.is/script.js" data-website-id="3a39b74e-2aa4-4489-85c3-e07802e8fc18"></script>'
    );
  });

  it("embeds the Shenma homepage verification meta tag in client/index.html", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    expect(html).toContain(
      '<meta name="shenma-site-verification" content="bcf60bf98a5703c9072a1f73c65b24e5_1783383359" />'
    );
  });
});
