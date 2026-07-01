import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import App from "../client/src/App";
import {
  DEFAULT_LOCALE,
  INDEXABLE_LOCALES,
  LOCALES,
  LOCALE_STATUS,
  PAGE_PATHS,
  PRODUCT_SLUGS,
  RTL_LOCALES,
  type Locale,
} from "../client/src/content/routes";
import { getProductBySlug, products } from "../client/src/lib/productData";
import { SITE_NAME } from "../client/src/content/site";
import { buildCanonicalUrl, buildRoutePath, SITE_ORIGIN, withTrailingSlash } from "../client/src/content/url";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist", "public");

type RouteType = "page" | "product";

type RouteConfig = {
  locale: Locale;
  routePath: string;
  type: RouteType;
  title: string;
  description: string;
};

const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Stable Soy Lecithin Supplier | Resilient Supply Chain | Huiyi Jianpin",
    description:
      "Secure your formulation against global supply chain disruptions with Huiyi Jianpin soy lecithin, phospholipid, soy protein and fiber systems.",
  },
  "/products": {
    title: "Soy Lecithin & Phospholipid Products | Stable B2B Supply",
    description:
      "Explore soy lecithin, phosphatidylcholine, phosphatidylserine, soy protein and dietary fiber systems from Huiyi Jianpin.",
  },
  "/about": {
    title: "About Huiyi Jianpin | Stable Phospholipid Manufacturer from China",
    description:
      "Learn how Huiyi Jianpin connects Heilongjiang soybean sourcing with GMP-standard phospholipid production.",
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
      "Contact Huiyi Jianpin for soy lecithin, phospholipid quote requests, samples and documentation.",
  },
};

function productSeo(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Unknown product slug: ${slug}`);
  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: `${product.subtitle}. ${product.quickSpecs}`,
  };
}

function routeConfigs(): RouteConfig[] {
  const routes: RouteConfig[] = [];
  for (const locale of LOCALES) {
    for (const routePath of PAGE_PATHS) {
      routes.push({
        locale,
        routePath,
        type: "page",
        title: PAGE_SEO[routePath].title,
        description: PAGE_SEO[routePath].description,
      });
    }
    for (const slug of PRODUCT_SLUGS) {
      const seo = productSeo(slug);
      routes.push({
        locale,
        routePath: `/products/${slug}`,
        type: "product",
        title: seo.title,
        description: seo.description,
      });
    }
  }
  return routes;
}

function relativeOutputPath(locale: Locale, routePath: string) {
  const route = buildRoutePath(locale, routePath).replace(/^\/|\/$/g, "");
  return join(DIST, route, "index.html");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function scriptTag(data: object) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Huiyi Jianpin",
    legalName: "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.",
    url: SITE_ORIGIN,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+86-18646556618",
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "Portuguese", "French", "Arabic", "Spanish"],
    },
  };
}

function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: buildCanonicalUrl(locale, "/"),
  };
}

function breadcrumbSchema(route: RouteConfig) {
  const items = [
    { name: "Home", path: "/" },
    route.type === "product"
      ? { name: "Products", path: "/products" }
      : route.routePath === "/"
        ? null
        : { name: PAGE_SEO[route.routePath]?.title.split("|")[0].trim() || route.routePath, path: route.routePath },
  ].filter(Boolean) as Array<{ name: string; path: string }>;

  if (route.type === "product") {
    const slug = route.routePath.split("/").filter(Boolean).pop() || "";
    items.push({ name: getProductBySlug(slug)?.name || slug, path: route.routePath });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(route.locale, item.path),
    })),
  };
}

function productSchema(route: RouteConfig) {
  const slug = route.routePath.split("/").filter(Boolean).pop() || "";
  const product = getProductBySlug(slug);
  if (!product) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.subtitle}. ${product.quickSpecs}`,
    image: product.image.startsWith("http") ? product.image : buildCanonicalUrl(route.locale, product.image),
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: {
      "@type": "Organization",
      name: "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.",
    },
    category: product.category.join(", "),
  };
}

function hreflang(route: RouteConfig) {
  if (LOCALE_STATUS[route.locale].status !== "ready") return "";
  const alternates = INDEXABLE_LOCALES.map(
    (locale) =>
      `<link rel="alternate" hreflang="${locale}" href="${buildCanonicalUrl(locale, route.routePath)}" />`
  );
  if (INDEXABLE_LOCALES.includes(DEFAULT_LOCALE)) {
    alternates.push(
      `<link rel="alternate" hreflang="x-default" href="${buildCanonicalUrl(DEFAULT_LOCALE, route.routePath)}" />`
    );
  }
  return alternates.join("\n    ");
}

function headFor(route: RouteConfig) {
  const canonical = buildCanonicalUrl(route.locale, route.routePath);
  const robots =
    LOCALE_STATUS[route.locale].status === "ready" ? "index,follow" : "noindex,follow";
  const schemas = [organizationSchema(), websiteSchema(route.locale), breadcrumbSchema(route)];
  if (route.type === "product") {
    const schema = productSchema(route);
    if (schema) schemas.push(schema);
  }

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    hreflang(route),
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${route.locale.replace("-", "_")}" />`,
    ...schemas.map(scriptTag),
  ]
    .filter(Boolean)
    .join("\n    ");
}

function renderRoute(route: RouteConfig) {
  const queryClient = new QueryClient();
  const ssrPath = buildRoutePath(route.locale, route.routePath);
  return renderToString(
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(App, { ssrPath })
    )
  );
}

function injectHtml(template: string, route: RouteConfig, body: string) {
  const isRtl = RTL_LOCALES.includes(route.locale);
  return template
    .replace(/<html[^>]*>/, `<html lang="${route.locale}" dir="${isRtl ? "rtl" : "ltr"}">`)
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta[^>]+name="description"[^>]*>/, "")
    .replace("</head>", `    ${headFor(route)}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${body}</div>`);
}

function writeSitemap(routes: RouteConfig[]) {
  const urls = routes
    .filter((route) => LOCALE_STATUS[route.locale].status === "ready")
    .map((route) => `  <url><loc>${buildCanonicalUrl(route.locale, route.routePath)}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(join(DIST, "sitemap.xml"), xml, "utf-8");
}

function writeRobots() {
  const robots = `User-agent: *\nAllow: /\nSitemap: ${withTrailingSlash(SITE_ORIGIN).replace(/\/$/, "")}/sitemap.xml\n`;
  writeFileSync(join(DIST, "robots.txt"), robots, "utf-8");
}

function main() {
  const builtIndex = join(DIST, "index.html");
  if (!existsSync(builtIndex)) {
    throw new Error("dist/public/index.html not found. Run vite build first.");
  }

  const template = readFileSync(builtIndex, "utf-8");
  const routes = routeConfigs();

  for (const route of routes) {
    const outputPath = relativeOutputPath(route.locale, route.routePath);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, injectHtml(template, route, renderRoute(route)), "utf-8");
    console.log(`  rendered ${buildRoutePath(route.locale, route.routePath)}`);
  }

  const rootRedirect = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="refresh" content="0;url=${buildRoutePath(DEFAULT_LOCALE, "/")}" /><link rel="canonical" href="${buildCanonicalUrl(DEFAULT_LOCALE, "/")}" /></head><body><a href="${buildRoutePath(DEFAULT_LOCALE, "/")}">Continue to English homepage</a></body></html>`;
  writeFileSync(join(DIST, "index.html"), rootRedirect, "utf-8");

  writeFileSync(
    join(DIST, "404.html"),
    injectHtml(template, {
      locale: DEFAULT_LOCALE,
      routePath: "/404",
      type: "page",
      title: "Page Not Found | Huiyi Jianpin",
      description: "The requested page could not be found.",
    }, renderRoute({ locale: DEFAULT_LOCALE, routePath: "/404", type: "page", title: "", description: "" })),
    "utf-8"
  );

  writeSitemap(routes);
  writeRobots();
  console.log(`Pre-rendered ${routes.length} localized static pages.`);
  console.log(`Sitemap contains ${routes.filter((route) => LOCALE_STATUS[route.locale].status === "ready").length} indexable URLs.`);
}

main();
