import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { renderToString } from "react-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import App from "../client/src/App";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STATUS,
  PAGE_PATHS,
  INSIGHT_SLUGS,
  PRODUCT_SLUGS,
  RTL_LOCALES,
  type Locale,
} from "../client/src/content/routes";
import { getInsightBySlug } from "../client/src/content/insights";
import { resolveRouteSEO } from "../client/src/content/seo";
import { buildCanonicalUrl, buildPublicPath, buildRoutePath, buildSitemapUrl } from "../client/src/content/url";

const ROOT = join(import.meta.dirname, "..");
const DIST = join(ROOT, "dist", "public");

type RouteType = "page" | "product" | "insight";

type RouteConfig = {
  locale: Locale;
  routePath: string;
  type: RouteType;
};

function routeConfigs(): RouteConfig[] {
  const routes: RouteConfig[] = [];
  for (const locale of LOCALES) {
    for (const routePath of PAGE_PATHS) {
      routes.push({ locale, routePath, type: "page" });
    }
    for (const slug of PRODUCT_SLUGS) {
      routes.push({ locale, routePath: `/products/${slug}`, type: "product" });
    }
    for (const slug of INSIGHT_SLUGS) {
      routes.push({ locale, routePath: `/insights/${slug}`, type: "insight" });
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

function scriptTag(id: string, data: object) {
  return `<script id="${id}" data-managed-seo="route" type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function headFor(route: RouteConfig) {
  const seo = resolveRouteSEO({ locale: route.locale, routePath: route.routePath });

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta data-managed-seo="route" name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta data-managed-seo="route" name="robots" content="${seo.robots}" />`,
    `<link data-managed-seo="route" rel="canonical" href="${seo.canonical}" />`,
    ...seo.alternates.map(
      (alternate) =>
        `<link data-managed-seo="route" rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`
    ),
    `<meta data-managed-seo="route" property="og:title" content="${escapeHtml(seo.og.title)}" />`,
    `<meta data-managed-seo="route" property="og:description" content="${escapeHtml(seo.og.description)}" />`,
    `<meta data-managed-seo="route" property="og:url" content="${seo.og.url}" />`,
    `<meta data-managed-seo="route" property="og:type" content="${seo.og.type}" />`,
    `<meta data-managed-seo="route" property="og:site_name" content="${escapeHtml(seo.og.siteName)}" />`,
    `<meta data-managed-seo="route" property="og:locale" content="${seo.og.locale}" />`,
    seo.og.image ? `<meta data-managed-seo="route" property="og:image" content="${seo.og.image}" />` : "",
    ...seo.jsonLd.map((entry) => scriptTag(entry.id, entry.data)),
  ]
    .filter(Boolean)
    .join("\n    ");
}

function renderRoute(route: RouteConfig) {
  const queryClient = new QueryClient();
  const ssrPath = buildPublicPath(route.locale, route.routePath);
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
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta[^>]+name=["'](?:description|keywords)["'][^>]*>/gi, "")
    .replace("</head>", `    ${headFor(route)}\n  </head>`)
    .replace(/<div id="root">[\s\S]*?<\/div>/, `<div id="root">${body}</div>`);
}

function writeSitemap(routes: RouteConfig[]) {
  const urls = routes
    .filter((route) => {
      if (LOCALE_STATUS[route.locale].status !== "ready") return false;
      if (route.type === "insight") {
        const slug = route.routePath.split("/").filter(Boolean)[1];
        return getInsightBySlug(slug)?.localeStatus[route.locale] === "ready";
      }
      return true;
    })
    .map((route) => `  <url><loc>${buildCanonicalUrl(route.locale, route.routePath)}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  writeFileSync(join(DIST, "sitemap.xml"), xml, "utf-8");
}

function writeRobots() {
  const robots = `User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: *
Allow: /

Sitemap: ${buildSitemapUrl()}
`;
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

  const rootTarget = buildPublicPath(DEFAULT_LOCALE, "/");
  const rootRedirect = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="refresh" content="0;url=${rootTarget}" /><link rel="canonical" href="${buildCanonicalUrl(DEFAULT_LOCALE, "/")}" /></head><body><a href="${rootTarget}">Continue to English homepage</a></body></html>`;
  writeFileSync(join(DIST, "index.html"), rootRedirect, "utf-8");

  writeFileSync(
    join(DIST, "404.html"),
    injectHtml(
      template,
      { locale: DEFAULT_LOCALE, routePath: "/", type: "page" },
      renderRoute({ locale: DEFAULT_LOCALE, routePath: "/404", type: "page" })
    ),
    "utf-8"
  );

  writeSitemap(routes);
  writeRobots();
  console.log(`Pre-rendered ${routes.length} localized static pages.`);
  console.log(
    `Sitemap contains ${
      routes.filter((route) => {
        if (LOCALE_STATUS[route.locale].status !== "ready") return false;
        if (route.type === "insight") {
          const slug = route.routePath.split("/").filter(Boolean)[1];
          return getInsightBySlug(slug)?.localeStatus[route.locale] === "ready";
        }
        return true;
      }).length
    } indexable URLs.`
  );
}

main();
