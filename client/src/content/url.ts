import { DEFAULT_LOCALE, LOCALES, type Locale } from "./routes";
import { SITE_CONFIG } from "./siteConfig";

type UrlSystemInput = {
  siteOrigin: string;
  basePath: string;
};

function envValue(key: string) {
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }

  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return import.meta.env[key];
  }

  return undefined;
}

const EXPLICIT_SITE_ORIGIN =
  envValue("SITE_ORIGIN") || envValue("VITE_SITE_ORIGIN");
const EXPLICIT_BASE_PATH = envValue("BASE_PATH") || envValue("VITE_BASE_PATH");
const PRODUCTION_LIFECYCLE_EVENTS = new Set([
  "build",
  "build:full",
  "validate",
  "validate-seo",
  "verify-static",
]);
const REQUIRES_EXPLICIT_SITE_ORIGIN =
  PRODUCTION_LIFECYCLE_EVENTS.has(envValue("npm_lifecycle_event") || "") ||
  envValue("NODE_ENV") === "production" ||
  (typeof import.meta !== "undefined" && import.meta.env?.PROD);

const RAW_SITE_ORIGIN =
  EXPLICIT_SITE_ORIGIN ||
  (REQUIRES_EXPLICIT_SITE_ORIGIN
    ? SITE_CONFIG.productionSiteOrigin
    : SITE_CONFIG.localSiteOrigin);

const RAW_BASE_PATH =
  EXPLICIT_BASE_PATH ||
  (typeof import.meta !== "undefined"
    ? import.meta.env?.BASE_URL
    : undefined) ||
  (REQUIRES_EXPLICIT_SITE_ORIGIN
    ? SITE_CONFIG.productionBasePath
    : SITE_CONFIG.localBasePath) ||
  "/";

export function normalizeSiteOrigin(origin: string) {
  const clean = origin.trim();
  if (!clean) {
    throw new Error("SITE_ORIGIN is required.");
  }

  const parsed = new URL(clean);
  if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new Error("SITE_ORIGIN must be an absolute origin without a path.");
  }

  return parsed.origin;
}

export function normalizeBasePath(basePath: string) {
  const clean = basePath.trim();
  if (!clean || clean === "/") return "/";
  return `/${clean.replace(/^\/+|\/+$/g, "")}/`;
}

export function withTrailingSlash(path: string) {
  const [pathname, hash = ""] = path.split("#", 2);
  const [cleanPath, search = ""] = pathname.split("?", 2);
  const normalized = `/${cleanPath.replace(/^\/+|\/+$/g, "")}`;
  const slashPath = normalized === "/" ? "/" : `${normalized}/`;
  return `${slashPath}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
}

export function stripBasePath(path: string, basePath = BASE_PATH) {
  const normalizedBase = normalizeBasePath(basePath);
  if (normalizedBase === "/") return path || "/";

  const routerBase = normalizedBase.replace(/\/$/, "");
  if (path === routerBase) return "/";
  if (path.startsWith(`${routerBase}/`)) {
    return path.slice(routerBase.length) || "/";
  }
  return path || "/";
}

export function stripLocale(path: string) {
  const withoutBase = stripBasePath(path);
  const [pathAndSearch, hash = ""] = withoutBase.split("#", 2);
  const [pathname, search = ""] = pathAndSearch.split("?", 2);
  const clean = withTrailingSlash(pathname);
  const segments = clean.split("/").filter(Boolean);
  const suffix = `${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;

  if (LOCALES.includes(segments[0] as Locale)) {
    return `${withTrailingSlash(`/${segments.slice(1).join("/")}`)}${suffix}`;
  }
  return `${clean}${suffix}`;
}

export function createUrlSystem({ siteOrigin, basePath }: UrlSystemInput) {
  const normalizedOrigin = normalizeSiteOrigin(siteOrigin);
  const normalizedBase = normalizeBasePath(basePath);
  const routerBasePath =
    normalizedBase === "/" ? "" : normalizedBase.replace(/\/$/, "");

  const withBase = (path: string) => {
    const slashPath = path.startsWith("/") ? path : `/${path}`;
    return normalizedBase === "/" ? slashPath : `${routerBasePath}${slashPath}`;
  };

  const routePath = (locale: Locale, path: string) => {
    const cleanRoute = stripLocale(path);
    return withTrailingSlash(
      `/${locale}${cleanRoute === "/" ? "" : cleanRoute}`
    );
  };

  const publicPath = (locale: Locale, path: string) =>
    withBase(routePath(locale, path));
  const canonicalUrl = (locale: Locale, path: string) =>
    `${normalizedOrigin}${publicPath(locale, path)}`;
  const publicAssetPath = (path: string) => {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(path)) return path;
    return withBase(path.startsWith("/") ? path : `/${path}`);
  };
  const absoluteAssetUrl = (path: string) => {
    if (/^https?:/.test(path)) return path;
    return `${normalizedOrigin}${publicAssetPath(path)}`;
  };
  const sitemapUrl = absoluteAssetUrl("/sitemap.xml");

  return {
    siteOrigin: normalizedOrigin,
    basePath: normalizedBase,
    routerBasePath,
    routePath,
    publicPath,
    canonicalUrl,
    publicAssetPath,
    absoluteAssetUrl,
    sitemapUrl,
    withBase,
  };
}

export const URLS = createUrlSystem({
  siteOrigin: RAW_SITE_ORIGIN,
  basePath: RAW_BASE_PATH,
});

export const SITE_ORIGIN = URLS.siteOrigin;
export const BASE_PATH = URLS.basePath;
export const ROUTER_BASE_PATH = URLS.routerBasePath;

export function buildRoutePath(locale: Locale, routePath: string) {
  return URLS.routePath(locale, routePath);
}

export function buildPublicPath(locale: Locale, routePath: string) {
  return URLS.publicPath(locale, routePath);
}

export function buildCanonicalUrl(locale: Locale, routePath: string) {
  return URLS.canonicalUrl(locale, routePath);
}

export function buildLocalizedHref(locale: Locale, routePath: string) {
  return buildRoutePath(locale, routePath);
}

export function buildLocalizedPublicHref(locale: Locale, routePath: string) {
  return buildPublicPath(locale, routePath);
}

export function buildDefaultUrl(routePath: string) {
  return buildCanonicalUrl(DEFAULT_LOCALE, routePath);
}

export function buildPublicAssetPath(path: string) {
  return URLS.publicAssetPath(path);
}

export function buildAbsoluteAssetUrl(path: string) {
  return URLS.absoluteAssetUrl(path);
}

export function buildSitemapUrl() {
  return URLS.sitemapUrl;
}
