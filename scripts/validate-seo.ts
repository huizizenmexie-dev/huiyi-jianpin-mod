import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
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
import { buildCanonicalUrl, buildRoutePath } from "../client/src/content/url";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist", "public");

type Check = { ok: boolean; message: string };
const checks: Check[] = [];

function check(ok: boolean, message: string) {
  checks.push({ ok, message });
  console.log(`${ok ? "PASS" : "FAIL"} ${message}`);
}

function htmlPath(locale: Locale, routePath: string) {
  const clean = buildRoutePath(locale, routePath).replace(/^\/|\/$/g, "");
  return join(DIST, clean, "index.html");
}

function readHtml(locale: Locale, routePath: string) {
  return readFileSync(htmlPath(locale, routePath), "utf-8");
}

function allRoutes() {
  return LOCALES.flatMap((locale) => [
    ...PAGE_PATHS.map((routePath) => ({ locale, routePath, type: "page" as const })),
    ...PRODUCT_SLUGS.map((slug) => ({
      locale,
      routePath: `/products/${slug}`,
      type: "product" as const,
    })),
  ]);
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

function validateSourceLinks() {
  const sourceFiles = [
    ...collectFiles(join(ROOT, "client", "src"), ".tsx"),
    ...collectFiles(join(ROOT, "client", "src"), ".ts"),
  ];
  const bareLinkPattern = /href=["']\/(?!\/|en\/|zh-CN\/|pt-BR\/|fr\/|ar\/|es\/|products\/soy-lecithin-granules\.png|api\/)/;
  const bareSetLocationPattern = /setLocation\(["']\//;
  for (const file of sourceFiles) {
    const content = readFileSync(file, "utf-8");
    check(!bareLinkPattern.test(content), `no bare public href in ${relative(ROOT, file)}`);
    check(!bareSetLocationPattern.test(content), `no bare setLocation in ${relative(ROOT, file)}`);
  }
}

function validate() {
  check(existsSync(DIST), "dist/public exists");
  const routes = allRoutes();
  const urls = sitemapUrls();
  const urlSet = new Set(urls);

  for (const route of routes) {
    const file = htmlPath(route.locale, route.routePath);
    const expectedCanonical = buildCanonicalUrl(route.locale, route.routePath);
    const indexable = LOCALE_STATUS[route.locale].status === "ready";

    check(existsSync(file), `${buildRoutePath(route.locale, route.routePath)} has static index.html`);
    if (!existsSync(file)) continue;

    const content = readHtml(route.locale, route.routePath);
    const root = rootContent(content);
    const canonical = attr(content, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
    const robots = attr(content, /<meta[^>]+name="robots"[^>]+content="([^"]+)"/);
    const h1Count = (content.match(/<h1[\s>]/g) || []).length;
    const bodyText = root.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

    check(root.length > 1000, `${buildRoutePath(route.locale, route.routePath)} root contains real HTML`);
    check(h1Count >= 1, `${buildRoutePath(route.locale, route.routePath)} has H1`);
    check(bodyText.length > 300, `${buildRoutePath(route.locale, route.routePath)} has visible body text`);
    check(canonical === expectedCanonical, `${buildRoutePath(route.locale, route.routePath)} has self canonical`);
    check(canonical.endsWith("/"), `${buildRoutePath(route.locale, route.routePath)} canonical uses trailing slash`);
    check(content.includes(`property="og:url" content="${expectedCanonical}"`), `${buildRoutePath(route.locale, route.routePath)} OG URL matches canonical`);

    if (indexable) {
      check(robots === "index,follow", `${buildRoutePath(route.locale, route.routePath)} is indexable`);
      check(urlSet.has(expectedCanonical), `${expectedCanonical} appears in sitemap`);
      for (const alt of INDEXABLE_LOCALES) {
        check(content.includes(`hreflang="${alt}" href="${buildCanonicalUrl(alt, route.routePath)}"`), `${expectedCanonical} has hreflang ${alt}`);
      }
      check(content.includes(`hreflang="x-default" href="${buildCanonicalUrl(DEFAULT_LOCALE, route.routePath)}"`), `${expectedCanonical} has x-default`);
    } else {
      check(robots === "noindex,follow", `${buildRoutePath(route.locale, route.routePath)} is noindex`);
      check(!urlSet.has(expectedCanonical), `${expectedCanonical} omitted from sitemap`);
      check(!content.includes('rel="alternate"'), `${expectedCanonical} has no hreflang alternates`);
    }

    if (RTL_LOCALES.includes(route.locale)) {
      check(content.includes('<html lang="ar" dir="rtl">'), `${expectedCanonical} has RTL html attrs`);
    }

    if (route.type === "product") {
      check(content.includes('"@type":"Product"'), `${expectedCanonical} has Product schema`);
      check(content.includes('"@type":"BreadcrumbList"'), `${expectedCanonical} has BreadcrumbList schema`);
      check(content.includes('"@type":"Organization"'), `${expectedCanonical} has Organization schema`);
      check(content.includes('"@type":"WebSite"'), `${expectedCanonical} has WebSite schema`);
      for (const forbidden of ["Offer", "price", "availability", "aggregateRating", "review", "gtin", "mpn"]) {
        check(!content.includes(`"${forbidden}"`) && !content.includes(`"@type":"${forbidden}"`), `${expectedCanonical} schema omits ${forbidden}`);
      }
    }
  }

  const expectedSitemapUrls = routes
    .filter((route) => LOCALE_STATUS[route.locale].status === "ready")
    .map((route) => buildCanonicalUrl(route.locale, route.routePath));
  check(urls.length === expectedSitemapUrls.length, "sitemap contains only ready locale URLs");
  for (const url of urls) {
    check(url.endsWith("/"), `${url} uses trailing slash`);
    check(expectedSitemapUrls.includes(url), `${url} is an expected indexable URL`);
    const parsed = new URL(url);
    const localPath = parsed.pathname.replace(/^\/+|\/+$/g, "");
    check(existsSync(join(DIST, localPath, "index.html")), `${url} maps to a static file`);
  }

  validateSourceLinks();
}

validate();

const failed = checks.filter((item) => !item.ok);
console.log(`\nSEO validation: ${checks.length - failed.length} passed, ${failed.length} failed`);

if (failed.length > 0) {
  process.exit(1);
}
