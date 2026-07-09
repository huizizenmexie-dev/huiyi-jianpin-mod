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

  it("embeds the Microsoft Clarity snippet in client/index.html", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    expect(html).toContain('<script type="text/javascript">');
    expect(html).toContain(
      "c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};"
    );
    expect(html).toContain('t.src="https://www.clarity.ms/tag/"+i;');
    expect(html).toContain(
      '})(window, document, "clarity", "script", "xjm8do23p8");'
    );
  });

  it("keeps Clarity and the NetEase site SDK in the document head", () => {
    const html = readFileSync(
      resolve(process.cwd(), "client/index.html"),
      "utf-8"
    );

    const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));

    expect(head).toContain("www.clarity.ms/tag/");
    expect(head).toContain("https://sirius-it-site.lx.netease.com/site-sdk.js");
    expect(head.indexOf("www.clarity.ms/tag/")).toBeLessThan(
      head.indexOf("https://sirius-it-site.lx.netease.com/site-sdk.js")
    );
  });
});
