import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const baseUrl = process.env.STATIC_BASE_URL || "http://localhost:4173";
const locales = ["en", "zh-CN", "pt-BR", "fr", "ar", "es"];
const products = [
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
const pages = ["/", "/products/", "/about/", "/quality/", "/industry-solutions/", "/contact/"];

const urls = new Set();
const sitemap = readFileSync(resolve("dist/public/sitemap.xml"), "utf8");
for (const match of sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]+)<\/loc>/g)) {
  urls.add(match[1]);
}
for (const locale of locales) {
  for (const page of pages) {
    urls.add(`/${locale}${page === "/" ? "/" : page}`);
  }
  for (const product of products) {
    urls.add(`/${locale}/products/${product}/`);
  }
}

const failures = [];
for (const url of [...urls].sort()) {
  const response = await fetch(`${baseUrl}${url}`);
  const html = await response.text();
  const hasRoot = /<div id="root">[\s\S]{1000,}<\/div>\s*<script/.test(html);
  const hasH1 = /<h1[\s>]/.test(html);
  const missingAssets = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((asset) => asset.startsWith("/assets/"));

  for (const asset of missingAssets) {
    const assetResponse = await fetch(`${baseUrl}${asset}`);
    if (assetResponse.status !== 200) {
      failures.push({ url, asset, status: assetResponse.status });
    }
  }

  if (response.status !== 200 || !hasRoot || !hasH1) {
    failures.push({ url, status: response.status, hasRoot, hasH1 });
  }
}

console.log(`Static deep-link check: ${urls.size} URLs`);
if (failures.length > 0) {
  console.error(JSON.stringify(failures.slice(0, 30), null, 2));
  process.exit(1);
}
console.log("All checked URLs returned 200 with real static root, H1, and loadable built assets.");
