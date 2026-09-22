/**
 * Resize/encode approved masters; this script does not remove backgrounds.
 * Optional image tooling stays outside the website's build dependencies:
 * npm install --prefix tmp/media-tools --no-save sharp@0.35.4
 * node scripts/optimize-media.mjs ./tmp/media-tools/node_modules/sharp
 */
import { createRequire } from "node:module";
import { readFile, writeFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const sharp = require(process.argv[2] ? resolve(process.argv[2]) : "sharp");
const root = process.cwd();
const manifestPath = resolve(root, "docs/design/media-manifest.json");
const previous = JSON.parse(await readFile(manifestPath, "utf8"));
const originals = previous.filter(entry => !/-\d+\.(avif|webp)$/.test(entry.path));
const manifest = [];

// Validate every approved cutout before overwriting published assets.
for (const entry of originals.filter(item => item.path.includes("/products/"))) {
  const slug = entry.path.split("/").at(-1).replace(".webp", "");
  const master = resolve(root, "design-assets/product-cutouts", `${slug}.png`);
  const metadata = await sharp(master).metadata();
  const alpha = (await sharp(master).stats()).channels[3];
  if (metadata.width !== metadata.height || !metadata.hasAlpha || alpha?.min !== 0 || alpha?.max !== 255) {
    throw new Error(`Expected square product master with actual alpha: ${master}`);
  }
}

for (const entry of originals) {
  if (entry.path.includes("/brand/")) {
    // Brand sizes are maintained separately from photographic media.
    const file = resolve(root, "client/public", entry.path.slice(1));
    const metadata = await sharp(file).metadata();
    manifest.push({ ...entry, width: metadata.width, height: metadata.height, bytes: (await stat(file)).size });
    continue;
  }
  const product = entry.path.includes("/products/");
  const slug = entry.path.split("/").at(-1).replace(".webp", "");
  const master = `design-assets/${product ? "product-cutouts" : "generated"}/${slug}.png`;
  const sizes = product ? [400, 800, 1200] : [480, 960, 1536];
  const provenance = product
    ? entry.provenance.replace(/; AI background extraction.*$/, "") + "; AI background extraction and square reframing, 2026-09-23"
    : entry.provenance;
  for (const width of sizes) {
    const height = product ? width : Math.round(width * 2 / 3);
    for (const format of ["webp", "avif"]) {
      const path = format === "webp" && width === sizes.at(-1)
        ? entry.path : entry.path.replace(/\.webp$/, `-${width}.${format}`);
      const output = resolve(root, "client/public", path.slice(1));
      const pipeline = sharp(resolve(root, master)).resize(width, height, { fit: "contain" });
      if (format === "webp") await pipeline.webp({ quality: product ? 80 : 78, alphaQuality: 100, effort: 5 }).toFile(output);
      else await pipeline.avif({ quality: product ? 55 : 50, effort: 5 }).toFile(output);
      const metadata = await sharp(output).metadata();
      const bytes = (await stat(output)).size;
      manifest.push({ path, width, height, bytes, hasAlpha: metadata.hasAlpha, master, provenance });
    }
  }
  console.log(`Encoded ${slug}: ${sizes.join(" / ")} px, WebP + AVIF`);
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`Updated ${manifest.length} media manifest entries.`);
