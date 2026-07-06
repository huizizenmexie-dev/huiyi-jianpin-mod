import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  DEFAULT_LOCALE,
  INDEXABLE_LOCALES,
  LOCALES,
  LOCALE_STATUS,
  PAGE_PATHS,
  INSIGHT_SLUGS,
  PRODUCT_SLUGS,
  RTL_LOCALES,
  type Locale,
} from "../client/src/content/routes";
import { getInsightBySlug } from "../client/src/content/insights";
import {
  BASE_PATH,
  buildCanonicalUrl,
  buildRoutePath,
  buildSitemapUrl,
  stripBasePath,
} from "../client/src/content/url";

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
  return LOCALES.flatMap(locale => [
    ...PAGE_PATHS.map(routePath => ({
      locale,
      routePath,
      type: "page" as const,
    })),
    ...PRODUCT_SLUGS.map(slug => ({
      locale,
      routePath: `/products/${slug}`,
      type: "product" as const,
    })),
    ...INSIGHT_SLUGS.map(slug => ({
      locale,
      routePath: `/insights/${slug}`,
      type: "insight" as const,
    })),
  ]);
}

function isIndexableRoute(route: ReturnType<typeof allRoutes>[number]) {
  if (LOCALE_STATUS[route.locale].status !== "ready") return false;
  if (route.type === "insight") {
    const slug = route.routePath.split("/").filter(Boolean)[1];
    return getInsightBySlug(slug)?.localeStatus[route.locale] === "ready";
  }
  return true;
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

function jsonLdContent(content: string) {
  return [
    ...content.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    ),
  ]
    .map(match => match[1])
    .join("\n");
}

function sitemapUrls() {
  const sitemapPath = join(DIST, "sitemap.xml");
  if (!existsSync(sitemapPath)) return [];
  const xml = readFileSync(sitemapPath, "utf-8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
}

function robotsSitemapUrl() {
  const robotsPath = join(DIST, "robots.txt");
  if (!existsSync(robotsPath)) return "";
  const robots = readFileSync(robotsPath, "utf-8");
  return attr(robots, /^Sitemap:\s*(\S+)/m);
}

function validateBuiltAssetPaths(content: string, routeLabel: string) {
  check(
    !content.includes("/https://"),
    `${routeLabel} has no malformed /https:// URL`
  );

  const assetRefs = [
    ...content.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g),
    ...content.matchAll(/data-src="([^"]+)"/g),
  ].map(match => match[1]);

  for (const asset of assetRefs.filter(ref => ref.includes("/assets/"))) {
    if (BASE_PATH !== "/") {
      check(
        asset.startsWith(`${BASE_PATH}assets/`),
        `${routeLabel} asset ${asset} uses configured base path`
      );
    }
  }
}

function validateSourceLinks() {
  const sourceFiles = [
    ...collectFiles(join(ROOT, "client", "src"), ".tsx"),
    ...collectFiles(join(ROOT, "client", "src"), ".ts"),
  ];
  const bareLinkPattern =
    /href=["']\/(?!\/|en\/|zh-CN\/|pt-BR\/|fr\/|ar\/|es\/|products\/soy-lecithin-granules\.png|api\/)/;
  const bareSetLocationPattern = /setLocation\(["']\//;
  for (const file of sourceFiles) {
    const content = readFileSync(file, "utf-8");
    check(
      !bareLinkPattern.test(content),
      `no bare public href in ${relative(ROOT, file)}`
    );
    check(
      !bareSetLocationPattern.test(content),
      `no bare setLocation in ${relative(ROOT, file)}`
    );
  }
}

function validate() {
  check(existsSync(DIST), "dist/public exists");
  const routes = allRoutes();
  check(
    routes.length ===
      LOCALES.length *
        (PAGE_PATHS.length + PRODUCT_SLUGS.length + INSIGHT_SLUGS.length),
    `route manifest contains ${routes.length} localized static pages`
  );
  const urls = sitemapUrls();
  const urlSet = new Set(urls);
  const robotsUrl = robotsSitemapUrl();
  const robotsText = readFileSync(join(DIST, "robots.txt"), "utf-8");
  check(
    robotsUrl === buildSitemapUrl(),
    "robots.txt points to the generated absolute sitemap URL"
  );
  check(
    !robotsUrl.includes("/https://"),
    "robots.txt sitemap URL is not malformed"
  );
  check(
    /User-agent: OAI-SearchBot\nAllow: \//.test(robotsText),
    "robots.txt explicitly allows OAI-SearchBot"
  );
  check(
    /User-agent: GPTBot\nAllow: \//.test(robotsText),
    "robots.txt explicitly allows GPTBot"
  );

  for (const route of routes) {
    const file = htmlPath(route.locale, route.routePath);
    const expectedCanonical = buildCanonicalUrl(route.locale, route.routePath);
    const indexable = isIndexableRoute(route);

    check(
      existsSync(file),
      `${buildRoutePath(route.locale, route.routePath)} has static index.html`
    );
    if (!existsSync(file)) continue;

    const content = readHtml(route.locale, route.routePath);
    const jsonLd = jsonLdContent(content);
    validateBuiltAssetPaths(
      content,
      buildRoutePath(route.locale, route.routePath)
    );
    const root = rootContent(content);
    const canonical = attr(
      content,
      /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/
    );
    const robots = attr(
      content,
      /<meta[^>]+name="robots"[^>]+content="([^"]+)"/
    );
    const h1Count = (content.match(/<h1[\s>]/g) || []).length;
    const bodyText = root
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    check(
      root.length > 1000,
      `${buildRoutePath(route.locale, route.routePath)} root contains real HTML`
    );
    check(
      h1Count >= 1,
      `${buildRoutePath(route.locale, route.routePath)} has H1`
    );
    check(
      bodyText.length > 300,
      `${buildRoutePath(route.locale, route.routePath)} has visible body text`
    );
    check(
      !/\b(?:homepage|common|footer|about_page|quality_page|contact_page|products_page|industry_solutions)\.[a-z0-9_.-]+\b/i.test(
        bodyText
      ),
      `${buildRoutePath(route.locale, route.routePath)} has no unresolved i18n keys`
    );
    check(
      canonical === expectedCanonical,
      `${buildRoutePath(route.locale, route.routePath)} has self canonical`
    );
    check(
      canonical.endsWith("/"),
      `${buildRoutePath(route.locale, route.routePath)} canonical uses trailing slash`
    );
    check(
      content.includes(`property="og:url" content="${expectedCanonical}"`),
      `${buildRoutePath(route.locale, route.routePath)} OG URL matches canonical`
    );

    if (indexable) {
      check(
        robots === "index,follow",
        `${buildRoutePath(route.locale, route.routePath)} is indexable`
      );
      check(
        urlSet.has(expectedCanonical),
        `${expectedCanonical} appears in sitemap`
      );
      for (const alt of INDEXABLE_LOCALES) {
        check(
          content.includes(
            `hreflang="${alt}" href="${buildCanonicalUrl(alt, route.routePath)}"`
          ),
          `${expectedCanonical} has hreflang ${alt}`
        );
      }
      check(
        content.includes(
          `hreflang="x-default" href="${buildCanonicalUrl(DEFAULT_LOCALE, route.routePath)}"`
        ),
        `${expectedCanonical} has x-default`
      );
    } else {
      check(
        robots === "noindex,follow",
        `${buildRoutePath(route.locale, route.routePath)} is noindex`
      );
      check(
        !urlSet.has(expectedCanonical),
        `${expectedCanonical} omitted from sitemap`
      );
      check(
        !content.includes('rel="alternate"'),
        `${expectedCanonical} has no hreflang alternates`
      );
    }

    if (RTL_LOCALES.includes(route.locale)) {
      check(
        content.includes('<html lang="ar" dir="rtl">'),
        `${expectedCanonical} has RTL html attrs`
      );
    }

    if (route.type === "product") {
      check(
        content.includes('"@type":"Product"'),
        `${expectedCanonical} has Product schema`
      );
      check(
        content.includes('"@type":"BreadcrumbList"'),
        `${expectedCanonical} has BreadcrumbList schema`
      );
      check(
        content.includes('"@type":"Organization"'),
        `${expectedCanonical} has Organization schema`
      );
      check(
        content.includes('"@type":"WebSite"'),
        `${expectedCanonical} has WebSite schema`
      );
      check(
        content.includes('"@type":"ItemPage"'),
        `${expectedCanonical} has ItemPage schema`
      );
      check(
        content.includes('"additionalProperty"'),
        `${expectedCanonical} has visible product properties in JSON-LD`
      );
      for (const forbidden of [
        "Offer",
        "price",
        "availability",
        "aggregateRating",
        "review",
        "gtin",
        "mpn",
      ]) {
        check(
          !content.includes(`"${forbidden}"`) &&
            !content.includes(`"@type":"${forbidden}"`),
          `${expectedCanonical} schema omits ${forbidden}`
        );
      }
    }

    if (route.type === "insight") {
      check(
        content.includes(
          "Technical content reviewed by Lecprima Product &amp; Application Team"
        ) ||
          content.includes(
            "Technical content reviewed by Lecprima Product & Application Team"
          ),
        `${expectedCanonical} has enterprise content reviewer`
      );
      check(
        !content.includes("Author: Manus AI") && !content.includes("Manus AI"),
        `${expectedCanonical} omits Manus AI author text`
      );
      if (indexable) {
        check(
          content.includes('"@type":"Article"'),
          `${expectedCanonical} has Article schema`
        );
      } else {
        check(
          !content.includes('"@type":"Article"'),
          `${expectedCanonical} draft insight omits Article schema`
        );
      }
      check(
        content.includes('"@type":"BreadcrumbList"'),
        `${expectedCanonical} has BreadcrumbList schema`
      );
      check(
        content.includes('"@type":"Organization"'),
        `${expectedCanonical} has Organization schema`
      );
      check(
        content.includes('"@type":"WebSite"'),
        `${expectedCanonical} has WebSite schema`
      );
      check(
        content.includes('"@type":"ArticlePage"'),
        `${expectedCanonical} has ArticlePage schema`
      );
      check(
        !content.includes('"@type":"Product"'),
        `${expectedCanonical} article page omits Product schema`
      );
      for (const forbidden of [
        "MedicalClaim",
        "Drug",
        "Offer",
        "Review",
        "AggregateRating",
        "Certification",
      ]) {
        check(
          !jsonLd.includes(`"@type":"${forbidden}"`) &&
            !jsonLd.includes(`"${forbidden}"`),
          `${expectedCanonical} article schema omits ${forbidden}`
        );
      }
      check(
        !jsonLd.includes("@bohrium:"),
        `${expectedCanonical} schema omits Bohrium citation identifiers`
      );
    }
  }

  const expectedSitemapUrls = routes
    .filter(isIndexableRoute)
    .map(route => buildCanonicalUrl(route.locale, route.routePath));
  check(
    urls.length === expectedSitemapUrls.length,
    "sitemap contains only ready locale URLs"
  );
  for (const url of urls) {
    check(url.endsWith("/"), `${url} uses trailing slash`);
    check(
      expectedSitemapUrls.includes(url),
      `${url} is an expected indexable URL`
    );
    const parsed = new URL(url);
    const localPath = stripBasePath(parsed.pathname).replace(/^\/+|\/+$/g, "");
    check(
      existsSync(join(DIST, localPath, "index.html")),
      `${url} maps to a static file`
    );
  }

  validateSourceLinks();
}

validate();

const failed = checks.filter(item => !item.ok);
console.log(
  `\nSEO validation: ${checks.length - failed.length} passed, ${failed.length} failed`
);

if (failed.length > 0) {
  process.exit(1);
}
