/**
 * Static Pre-render Script
 *
 * Generates real HTML files for each indexable route so GitHub Pages
 * returns HTTP 200 instead of relying on 404.html SPA fallback.
 *
 * Run after `vite build`: `node --import tsx scripts/prerender.ts`
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist", "public");

// Import route definitions
const LOCALES = ["en", "zh-CN", "pt-BR", "fr", "ar", "es"];
const DEFAULT_LOCALE = "en";
const RTL_LOCALES = ["ar"];

// Only indexable locales (en is fully translated)
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

const PAGE_PATHS = [
  { path: "/", name: "Home" },
  { path: "/products", name: "Products" },
  { path: "/about", name: "About" },
  { path: "/quality", name: "Quality" },
  { path: "/industry-solutions", name: "Industry Solutions" },
  { path: "/contact", name: "Contact" },
];

const SITE_URL = "https://lecprima.com";

interface RouteConfig {
  locale: string;
  outputPath: string; // relative to DIST
  canonical: string;
  title: string;
  description: string;
  type: "page" | "product";
}

// Page SEO data (English only for now)
const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Stable Soy Lecithin Supplier | Resilient Supply Chain | Huiyi Jianpin",
    description:
      "Secure your formulation against global supply chain disruptions. Huiyi Jianpin offers 10,000T annual capacity, Non-GMO IP traceability, and stable phospholipid supply from China.",
  },
  "/products": {
    title: "Soy Lecithin & Phospholipid Products | Stable B2B Supply",
    description:
      "Explore soy lecithin, phosphatidylcholine, phosphatidylserine, soy protein and dietary fiber systems from Huiyi Jianpin.",
  },
  "/about": {
    title: "About Huiyi Jianpin | Stable Phospholipid Manufacturer from China",
    description:
      "Learn how Huiyi Jianpin connects Heilongjiang Non-GMO soybean sourcing with GMP-standard phospholipid production.",
  },
  "/quality": {
    title: "Quality & Traceability | Secure Soy Lecithin Supply Chain",
    description:
      "Verify Huiyi Jianpin quality systems, certifications, COA documentation and batch traceability.",
  },
  "/industry-solutions": {
    title: "Industry Solutions | Stable Phospholipid Applications",
    description:
      "Match soy lecithin, phospholipid, soy protein and dietary fiber systems to food, nutrition, cosmetics, feed and industrial applications.",
  },
  "/contact": {
    title: "Contact Huiyi Jianpin | Request a Quote for Soy Lecithin",
    description:
      "Contact Huiyi Jianpin for soy lecithin, phospholipid quote requests, samples and stable global supply support.",
  },
};

// Product SEO data
const PRODUCT_SEO: Record<string, { title: string; description: string }> = {
  "soy-lecithin-granules": {
    title: "Soy Lecithin Granules | Non-GMO Phospholipid 97.2% | Huiyi Jianpin",
    description:
      "Soy lecithin granules with 97.2% total phospholipids. Non-GMO soy source, clean granular format for supplements, food and feed applications.",
  },
  "soy-lecithin-liquid": {
    title: "Soy Lecithin Liquid System | Phospholipid ≥60% | Huiyi Jianpin",
    description:
      "Soy lecithin liquid for chocolate, dairy, bakery. ISO 22000 certified, Non-GMO IP optional. Models HXY-1SP/3SP/5SP/1SPN.",
  },
  "soy-lecithin-powder": {
    title: "Soy Lecithin Powder System | Phospholipid ≥96% | Huiyi Jianpin",
    description:
      "Soy lecithin powder for baking, pharma excipients, meat processing. Phospholipid ≥96%, ISO 22000 certified.",
  },
  "modified-soy-lecithin": {
    title: "Modified Soy Lecithin | HLB ~10 O/W Emulsifier | Huiyi Jianpin",
    description:
      "Modified soy lecithin for instant beverages, bakery, protein processing. HLB ~10, rapid water dispersion.",
  },
  phosphatidylcholine: {
    title: "Phosphatidylcholine (PC) 30%–90% | Liposome Grade | Huiyi Jianpin",
    description:
      "High-purity phosphatidylcholine for supplements, liposomal drug delivery, cosmetics. Purity 30%–90%.",
  },
  phosphatidylserine: {
    title: "Phosphatidylserine (PS) 20%–70% | Cognitive Health | Huiyi Jianpin",
    description:
      "Phosphatidylserine for brain health supplements, dietary formulations. Purity 20%–70%, enzymatic synthesis.",
  },
  "sunflower-lecithin": {
    title: "Sunflower Lecithin | Soy-Free Allergen-Free | Huiyi Jianpin",
    description:
      "Sunflower lecithin liquid and powder. Soy-free, allergen-free for infant formula, clean label foods, cosmetics.",
  },
  "soy-dietary-fiber": {
    title: "Soy Dietary Fiber | Total Fiber ≥60% | Huiyi Jianpin",
    description:
      "Soy dietary fiber for meat products, baking, frozen foods. High water holding capacity, ISO 22000 certified.",
  },
  "soy-protein-isolate": {
    title: "Gel-Type Soy Protein Isolate | Protein ≥90% | Huiyi Jianpin",
    description:
      "Gel-type soy protein isolate for restructured meat, seafood, sausages. Protein ≥90%, gel value ≥20g.",
  },
  "soy-oligosaccharide-small-pack": {
    title: "Soy Oligosaccharide & Protein | FSSC 22000 | Huiyi Jianpin",
    description:
      "Soy oligosaccharide and protein in retail-ready small packaging. FSSC 22000 certified, prebiotic.",
  },
};

function generateHreflangLinks(locale: string, basePath: string): string {
  const links: string[] = [];
  for (const loc of INDEXABLE_LOCALES) {
    const url = `${SITE_URL}/${loc}${basePath === "/" ? "" : basePath}`;
    links.push(`<link rel="alternate" hreflang="${loc}" href="${url}" />`);
  }
  links.push(
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LOCALE}${basePath === "/" ? "" : basePath}" />`
  );
  return links.join("\n    ");
}

function generateJsonLd(
  locale: string,
  type: "page" | "product",
  slug?: string
): string {
  const schemas: object[] = [];

  // Organization
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Huiyi Jianpin",
    url: SITE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-18646556618",
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "Portuguese", "French", "Arabic", "Spanish"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harbin",
      addressRegion: "Heilongjiang",
      addressCountry: "CN",
    },
  });

  // WebSite
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Huiyi Jianpin",
    url: `${SITE_URL}/${locale}`,
  });

  // Product schema for product pages
  if (type === "product" && slug) {
    const seo = PRODUCT_SEO[slug];
    if (seo) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        name: seo.title.split("|")[0].trim(),
        description: seo.description,
        brand: { "@type": "Brand", name: "Huiyi Jianpin" },
        manufacturer: {
          "@type": "Organization",
          name: "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.",
        },
        category: "Food Ingredients",
      });
    }
  }

  return schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n    ");
}

function generateHtml(config: RouteConfig): string {
  const isRTL = RTL_LOCALES.includes(config.locale);
  const basePath = config.outputPath.replace(/\/index\.html$/, "").replace(/^\/?/, "/") || "/";
  const canonical = config.canonical;

  return `<!DOCTYPE html>
<html lang="${config.locale}" dir="${isRTL ? "rtl" : "ltr"}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <link rel="canonical" href="${canonical}" />
    ${generateHreflangLinks(config.locale, basePath === `/${config.locale}` ? "/" : basePath.replace(`/${config.locale}`, ""))}
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:locale" content="${config.locale.replace("-", "_")}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Huiyi Jianpin" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    ${generateJsonLd(config.locale, config.type, config.type === "product" ? config.outputPath.split("/").pop()?.replace("/index.html", "") : undefined)}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${config.locale === DEFAULT_LOCALE ? "" : ""}assets/"></script>
  </body>
</html>`;
}

function main() {
  console.log("🔧 Pre-rendering static pages...\n");

  // Read the built index.html to get asset references
  const builtIndex = join(DIST, "index.html");
  if (!existsSync(builtIndex)) {
    console.error("❌ dist/public/index.html not found. Run `vite build` first.");
    process.exit(1);
  }

  const builtHtml = readFileSync(builtIndex, "utf-8");

  // Extract script/style tags from built HTML
  const scriptMatch = builtHtml.match(/<script[^>]*type="module"[^>]*src="([^"]*)"[^>]*>/);
  const styleMatches = [...builtHtml.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"[^>]*>/g)];
  const moduleScript = scriptMatch ? scriptMatch[0] : "";
  const styleLinks = styleMatches.map((m) => m[0]).join("\n    ");

  const routes: RouteConfig[] = [];

  // Generate page routes
  for (const locale of INDEXABLE_LOCALES) {
    for (const page of PAGE_PATHS) {
      const seoKey = page.path;
      const seo = PAGE_SEO[seoKey];
      if (!seo) continue;

      const outputPath =
        page.path === "/"
          ? `${locale}/index.html`
          : `${locale}${page.path}/index.html`;

      const canonical =
        page.path === "/"
          ? `${SITE_URL}/${locale}`
          : `${SITE_URL}/${locale}${page.path}`;

      routes.push({
        locale,
        outputPath,
        canonical,
        title: seo.title,
        description: seo.description,
        type: "page",
      });
    }

    // Generate product routes
    for (const slug of PRODUCT_SLUGS) {
      const seo = PRODUCT_SEO[slug];
      if (!seo) continue;

      routes.push({
        locale,
        outputPath: `${locale}/products/${slug}/index.html`,
        canonical: `${SITE_URL}/${locale}/products/${slug}`,
        title: seo.title,
        description: seo.description,
        type: "product",
      });
    }
  }

  // Write each HTML file
  let count = 0;
  for (const route of routes) {
    const fullPath = join(DIST, route.outputPath);
    const dir = dirname(fullPath);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Build custom HTML with proper meta tags but referencing built assets
    const isRTL = RTL_LOCALES.includes(route.locale);
    const basePath = route.outputPath.replace(/\/index\.html$/, "");
    const altBasePath = basePath.replace(new RegExp(`^${route.locale}`), "") || "/";

    const html = builtHtml
      .replace(/<html[^>]*>/, `<html lang="${route.locale}" dir="${isRTL ? "rtl" : "ltr"}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
      .replace(
        /<meta[^>]*name="description"[^>]*>/,
        `<meta name="description" content="${route.description}" />`
      )
      .replace(
        /<\/head>/,
        `    <link rel="canonical" href="${route.canonical}" />
    ${generateHreflangLinks(route.locale, altBasePath)}
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${route.canonical}" />
    <meta property="og:locale" content="${route.locale.replace("-", "_")}" />
    <meta property="og:type" content="website" />
    ${generateJsonLd(route.locale, route.type, route.type === "product" ? route.outputPath.split("/").slice(-2, -1)[0] : undefined)}
  </head>`
      );

    writeFileSync(fullPath, html, "utf-8");
    count++;
    console.log(`  ✅ ${route.outputPath}`);
  }

  // Generate root redirect
  const rootHtml = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0;url=/${DEFAULT_LOCALE}/" />
  <link rel="canonical" href="${SITE_URL}/${DEFAULT_LOCALE}/" />
</head>
<body>
  <a href="${SITE_URL}/${DEFAULT_LOCALE}/">Redirecting...</a>
</body>
</html>`;
  writeFileSync(join(DIST, "index.html"), rootHtml, "utf-8");
  console.log(`  ✅ index.html (redirect to /${DEFAULT_LOCALE}/)`);

  // Generate 404 page
  const notFoundHtml = builtHtml
    .replace(/<title>[^<]*<\/title>/, "<title>Page Not Found | Huiyi Jianpin</title>")
    .replace(
      /<div id="root">/,
      `<div id="root"><div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui"><div style="text-align:center"><h1 style="font-size:3rem;font-weight:700;margin-bottom:1rem">404</h1><p style="font-size:1.25rem;margin-bottom:2rem">Page Not Found</p><a href="/${DEFAULT_LOCALE}/" style="color:#2E7D32;text-decoration:underline">Go to Homepage</a></div></div></div>`
    );
  writeFileSync(join(DIST, "404.html"), notFoundHtml, "utf-8");
  console.log(`  ✅ 404.html`);

  console.log(`\n🎉 Pre-rendered ${count} pages + 404 + root redirect`);
}

main();
