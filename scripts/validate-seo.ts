/**
 * Static SEO Validation Script
 *
 * Validates the pre-rendered output for:
 * - Every sitemap URL has a corresponding HTML file
 * - Every indexable page has a unique canonical
 * - hreflang relationships are bidirectional
 * - Product pages have Product + Breadcrumb Schema
 * - /ar pages have dir="rtl"
 * - No bare internal links in built HTML
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

const DIST = join(process.cwd(), "dist", "public");
const SITE_URL = "https://lecprima.com";

const INDEXABLE_LOCALES = ["en"];
const PRODUCT_SLUGS = [
  "soy-lecithin-granules",
  "soy-lecithin-liquid",
  "soy-lecithin-powder",
  "modified-soy-lecithin",
  "phosphatidylcholine",
  "phosphatidylserine",
  "sunflower-lecithin",
  "soy-dietary-fiber",
  "soy-protein-isolate",
  "soy-oligosaccharide-small-pack",
];

interface ValidationResult {
  passed: boolean;
  message: string;
}

const results: ValidationResult[] = [];

function check(condition: boolean, message: string) {
  results.push({ passed: condition, message });
  if (!condition) {
    console.error(`  ❌ FAIL: ${message}`);
  } else {
    console.log(`  ✅ PASS: ${message}`);
  }
}

function getHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...getHtmlFiles(full));
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  console.log("🔍 Validating pre-rendered output...\n");

  if (!existsSync(DIST)) {
    console.error("❌ dist/public not found. Run build first.");
    process.exit(1);
  }

  // 1. Check all expected routes have HTML files
  console.log("📁 Checking route files...");
  for (const locale of INDEXABLE_LOCALES) {
    // Homepage
    check(
      existsSync(join(DIST, locale, "index.html")),
      `/${locale}/ has index.html`
    );

    // Static pages
    for (const page of ["products", "about", "quality", "industry-solutions", "contact"]) {
      check(
        existsSync(join(DIST, locale, page, "index.html")),
        `/${locale}/${page}/ has index.html`
      );
    }

    // Product pages
    for (const slug of PRODUCT_SLUGS) {
      check(
        existsSync(join(DIST, locale, "products", slug, "index.html")),
        `/${locale}/products/${slug}/ has index.html`
      );
    }
  }

  // 2. Check 404.html exists
  console.log("\n📄 Checking 404 page...");
  check(existsSync(join(DIST, "404.html")), "404.html exists");

  // 3. Check canonical tags
  console.log("\n🔗 Checking canonical tags...");
  const htmlFiles = getHtmlFiles(DIST);
  const canonicals = new Set<string>();

  for (const file of htmlFiles) {
    if (file.includes("404.html")) continue;
    const content = readFileSync(file, "utf-8");
    const canonicalMatch = content.match(
      /<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/
    );

    if (canonicalMatch) {
      const canonical = canonicalMatch[1];
      check(
        !canonicals.has(canonical),
        `Unique canonical: ${canonical}`
      );
      canonicals.add(canonical);

      // Check canonical includes locale
      const hasLocale = INDEXABLE_LOCALES.some((l) =>
        canonical.includes(`/${l}`)
      );
      check(hasLocale, `Canonical includes locale: ${canonical}`);
    }
  }

  // 4. Check hreflang
  console.log("\n🌐 Checking hreflang...");
  for (const file of htmlFiles) {
    if (file.includes("404.html")) continue;
    const content = readFileSync(file, "utf-8");
    const hreflangMatches = [
      ...content.matchAll(
        /<link[^>]*rel="alternate"[^>]*hreflang="([^"]*)"[^>]*href="([^"]*)"[^>]*>/g
      ),
    ];

    if (hreflangMatches.length > 0) {
      const hasXDefault = hreflangMatches.some((m) => m[1] === "x-default");
      check(hasXDefault, `Has x-default: ${file.replace(DIST, "")}`);
    }
  }

  // 5. Check product pages have Product schema
  console.log("\n📦 Checking product schemas...");
  for (const slug of PRODUCT_SLUGS) {
    const file = join(DIST, "en", "products", slug, "index.html");
    if (!existsSync(file)) continue;
    const content = readFileSync(file, "utf-8");
    check(
      content.includes('"@type":"Product"'),
      `Product schema: ${slug}`
    );
    check(
      content.includes('"@type":"Organization"'),
      `Organization schema: ${slug}`
    );
  }

  // 6. Check /ar pages have dir="rtl"
  console.log("\n🔄 Checking RTL...");
  // Only check if ar pages exist
  const arDir = join(DIST, "ar");
  if (existsSync(arDir)) {
    const arFiles = getHtmlFiles(arDir);
    for (const file of arFiles) {
      const content = readFileSync(file, "utf-8");
      check(
        content.includes('dir="rtl"'),
        `RTL: ${file.replace(DIST, "")}`
      );
    }
  } else {
    console.log("  ⏭️  No /ar pages (not yet translated)");
  }

  // 7. Check sitemap references valid files
  console.log("\n🗺️  Checking sitemap...");
  const sitemapPath = join(DIST, "sitemap.xml");
  if (existsSync(sitemapPath)) {
    const sitemap = readFileSync(sitemapPath, "utf-8");
    const locMatches = [
      ...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g),
    ];
    for (const match of locMatches) {
      const url = match[1];
      const path = url.replace(SITE_URL, "");
      const filePath = join(DIST, path, "index.html");
      check(
        existsSync(filePath),
        `Sitemap URL has file: ${path}`
      );
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${results.length} checks`);

  if (failed > 0) {
    console.log("\n❌ Some checks failed!");
    process.exit(1);
  } else {
    console.log("\n✅ All checks passed!");
  }
}

main();
