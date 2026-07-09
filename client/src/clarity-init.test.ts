import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Microsoft Clarity package initialization", () => {
  it("initializes Clarity from the npm package in the browser entrypoint", () => {
    const main = readFileSync(resolve(process.cwd(), "client/src/main.tsx"), "utf-8");
    const clarity = readFileSync(resolve(process.cwd(), "client/src/lib/clarity.ts"), "utf-8");

    expect(main).toContain('import { initializeClarity } from "./lib/clarity";');
    expect(main).toContain("initializeClarity();");
    expect(clarity).toContain('import Clarity from "@microsoft/clarity";');
    expect(clarity).toContain('const CLARITY_PROJECT_ID = "xjm8do23p8";');
    expect(clarity).toContain("Clarity.init(CLARITY_PROJECT_ID);");
  });
});
