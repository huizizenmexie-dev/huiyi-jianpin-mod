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

  it("does not embed the Microsoft Clarity snippet in client/index.html", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    expect(html).not.toContain("www.clarity.ms/tag/");
    expect(html).not.toContain("xjm8do23p8");
  });

  it("keeps the NetEase site SDK in the document head", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));

    expect(head).toContain("https://sirius-it-site.lx.netease.com/site-sdk.js");
  });
});
