import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_STATUS,
  PAGE_PATHS,
  INSIGHT_SLUGS,
  PRODUCT_SLUGS,
  isPageRouteReady,
  isProductRouteReady,
  type Locale,
} from "../client/src/content/routes";
import { getInsightBySlug } from "../client/src/content/insights";
import {
  BASE_PATH,
  SITE_ORIGIN,
  buildCanonicalUrl,
  buildPublicPath,
  buildRoutePath,
  buildSitemapUrl,
  stripBasePath,
} from "../client/src/content/url";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist", "public");
const checks: Array<{ ok: boolean; message: string }> = [];

function check(ok: boolean, message: string) {
  checks.push({ ok, message });
  console.log(`${ok ? "PASS" : "FAIL"} ${message}`);
}

function allRoutes() {
  return LOCALES.flatMap((locale) => [
    ...PAGE_PATHS.map((routePath) => ({ locale, routePath, type: "page" as const })),
    ...PRODUCT_SLUGS.map((slug) => ({
      locale,
      routePath: `/products/${slug}`,
      type: "product" as const,
    })),
    ...INSIGHT_SLUGS.map((slug) => ({
      locale,
      routePath: `/insights/${slug}`,
      type: "insight" as const,
    })),
  ]);
}

function isIndexableRoute(route: ReturnType<typeof allRoutes>[number]) {
  if (route.type === "page") return isPageRouteReady(route.locale, route.routePath);
  if (route.type === "product") return isProductRouteReady(route.locale);
  if (route.type === "insight") {
    const slug = route.routePath.split("/").filter(Boolean)[1];
    return (
      LOCALE_STATUS[route.locale].status === "ready" &&
      getInsightBySlug(slug)?.localeStatus[route.locale] === "ready"
    );
  }
  return false;
}

function htmlPath(locale: Locale, routePath: string) {
  const clean = buildRoutePath(locale, routePath).replace(/^\/|\/$/g, "");
  return join(DIST, clean, "index.html");
}

function attr(content: string, pattern: RegExp) {
  return content.match(pattern)?.[1] || "";
}

function rootContent(content: string) {
  return attr(content, /<div id="root">([\s\S]*?)<\/div>\s*<script/);
}

function sitemapUrls() {
  const sitemapPath = join(DIST, "sitemap.xml");
  if (!existsSync(sitemapPath)) return [];
  const xml = readFileSync(sitemapPath, "utf-8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function robotsSitemapUrl() {
  const robotsPath = join(DIST, "robots.txt");
  if (!existsSync(robotsPath)) return "";
  return attr(readFileSync(robotsPath, "utf-8"), /^Sitemap:\s*(\S+)/m);
}

function collectFiles(dir: string, suffix: string): string[] {
  const files: string[] = [];
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...collectFiles(full, suffix));
    } else if (entry.endsWith(suffix)) {
      files.push(full);
    }
  }
  return files;
}

function localFileForPublicPath(publicPath: string) {
  const parsed = new URL(publicPath, SITE_ORIGIN);
  const clean = stripBasePath(parsed.pathname).replace(/^\/+/, "");
  return join(DIST, clean);
}

function validateAssetReferences(content: string, routeLabel: string) {
  const refs = [
    ...content.matchAll(/<(?:script|link|img)[^>]+(?:src|href)="([^"]+)"/g),
    ...content.matchAll(/data-src="([^"]+)"/g),
  ].map((match) => match[1]);

  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    if (ref.startsWith("/assets/") || ref.includes("/assets/")) {
      if (BASE_PATH !== "/") {
        check(ref.startsWith(`${BASE_PATH}assets/`), `${routeLabel} built asset ${ref} includes base path`);
      }
      check(existsSync(localFileForPublicPath(ref)), `${routeLabel} built asset ${ref} exists`);
    }
    if (ref.startsWith("/products/") || ref.startsWith(`${BASE_PATH}products/`)) {
      check(existsSync(localFileForPublicPath(ref)), `${routeLabel} public image ${ref} exists`);
    }
  }
}

function validateInternalLinks(content: string, routeLabel: string) {
  const links = [...content.matchAll(/<a[^>]+href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of links) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    if (BASE_PATH !== "/") {
      check(!href.includes(`${BASE_PATH}${BASE_PATH.replace(/^\//, "")}`), `${routeLabel} link ${href} does not duplicate base path`);
    }
    if (href.startsWith("/")) {
      if (BASE_PATH !== "/") {
        check(href.startsWith(BASE_PATH), `${routeLabel} link ${href} preserves base path`);
      }
      const withoutBase = stripBasePath(href);
      const first = withoutBase.split("/").filter(Boolean)[0];
      check(LOCALES.includes(first as Locale), `${routeLabel} link ${href} preserves locale`);
    }
  }
}

async function validateHttpPreview(publicPaths: string[]) {
  const baseUrl = process.env.STATIC_BASE_URL;
  if (!baseUrl) return;

  for (const publicPath of publicPaths) {
    const response = await fetch(new URL(publicPath, baseUrl));
    check(response.status === 200, `${publicPath} returns HTTP 200 from preview`);
  }
}

async function validate() {
  check(existsSync(DIST), "dist/public exists");
  const routes = allRoutes();
  check(routes.length === LOCALES.length * (PAGE_PATHS.length + PRODUCT_SLUGS.length + INSIGHT_SLUGS.length), `route manifest derives ${routes.length} localized static pages`);

  const urls = sitemapUrls();
  const expectedSitemapUrls = routes
    .filter(isIndexableRoute)
    .map((route) => buildCanonicalUrl(route.locale, route.routePath));

  check(urls.length === expectedSitemapUrls.length, "sitemap contains only ready locale URLs");
  check(robotsSitemapUrl() === buildSitemapUrl(), "robots.txt contains one generated absolute sitemap URL");
  check(!readFileSync(join(DIST, "robots.txt"), "utf-8").includes("/https://"), "robots.txt has no malformed /https:// URL");

  for (const route of routes) {
    const file = htmlPath(route.locale, route.routePath);
    const routeLabel = buildRoutePath(route.locale, route.routePath);
    check(existsSync(file), `${routeLabel} has static index.html`);
    if (!existsSync(file)) continue;

    const content = readFileSync(file, "utf-8");
    const root = rootContent(content);
    check(root.length > 1000, `${routeLabel} has non-empty static root`);
    check(/<h1[\s>]/.test(content), `${routeLabel} has H1`);
    check(!content.includes("/https://"), `${routeLabel} has no malformed /https:// URL`);
    validateAssetReferences(content, routeLabel);
    validateInternalLinks(content, routeLabel);
  }

  for (const url of urls) {
    check(expectedSitemapUrls.includes(url), `${url} is an expected sitemap URL`);
    check(existsSync(join(localFileForPublicPath(url), "index.html")), `${url} maps to a static index.html`);
  }

  const rootRedirect = readFileSync(join(DIST, "index.html"), "utf-8");
  check(rootRedirect.includes(`url=${buildPublicPath(DEFAULT_LOCALE, "/")}`), "root redirect uses configured base path");

  const htmlFiles = collectFiles(DIST, ".html");
  check(htmlFiles.length >= routes.length, "static HTML files include all route pages");

  await validateHttpPreview([
    buildPublicPath("en", "/"),
    buildPublicPath("en", "/products/soy-lecithin-granules"),
    buildPublicPath("ar", "/"),
    buildPublicPath("en", "/contact"),
  ]);
}

await validate();

const failed = checks.filter((item) => !item.ok);
console.log(`\nStatic validation: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  console.error(JSON.stringify(failed.slice(0, 40), null, 2));
  process.exit(1);
}
