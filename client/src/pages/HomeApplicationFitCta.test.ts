import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("./Home.tsx", import.meta.url), "utf8");
const industrySource = readFileSync(
  new URL("./IndustrySolutions.tsx", import.meta.url),
  "utf8"
);

describe("homepage application-fit lecithin CTA", () => {
  it("routes the application-fit hero text and CTA to the industry matching anchor", () => {
    expect(homeSource).toContain("buildLocalizedPublicPath");
    expect(homeSource).toContain(
      '"/industry-solutions#application-fit-lecithin"'
    );
    expect(homeSource).toContain("APPLICATION_FIT_LINK");
    expect(homeSource).toContain("Application-fit lecithin");
  });

  it("provides an on-page anchor on the application matching section", () => {
    expect(industrySource).toContain('id="application-fit-lecithin"');
    expect(industrySource).toContain("Problem-to-Product Application Guide");
  });
});
