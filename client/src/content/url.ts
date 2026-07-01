import { DEFAULT_LOCALE, type Locale } from "./routes";

const RAW_SITE_ORIGIN =
  (typeof process !== "undefined" && process.env.SITE_ORIGIN) ||
  "https://lecprima.com";

const RAW_BASE_PATH =
  (typeof process !== "undefined" && process.env.BASE_PATH) ||
  (typeof import.meta !== "undefined" && import.meta.env?.BASE_URL) ||
  "/";

export const SITE_ORIGIN = normalizeOrigin(RAW_SITE_ORIGIN);
export const BASE_PATH = normalizeBasePath(RAW_BASE_PATH);

export function normalizeOrigin(origin: string) {
  return origin.replace(/\/+$/, "");
}

export function normalizeBasePath(basePath: string) {
  const clean = basePath.trim();
  if (!clean || clean === "/") return "";
  return `/${clean.replace(/^\/+|\/+$/g, "")}`;
}

export function withTrailingSlash(path: string) {
  const [pathname, hash = ""] = path.split("#", 2);
  const [cleanPath, search = ""] = pathname.split("?", 2);
  const normalized = `/${cleanPath.replace(/^\/+|\/+$/g, "")}`;
  const slashPath = normalized === "/" ? "/" : `${normalized}/`;
  return `${slashPath}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
}

export function stripLocale(path: string) {
  const clean = withTrailingSlash(path).split("#")[0].split("?")[0];
  const segments = clean.split("/").filter(Boolean);
  if (segments[0]?.match(/^(en|zh-CN|pt-BR|fr|ar|es)$/)) {
    return withTrailingSlash(`/${segments.slice(1).join("/")}`);
  }
  return clean;
}

export function buildRoutePath(locale: Locale, routePath: string) {
  const cleanRoute = stripLocale(routePath);
  return withTrailingSlash(`/${locale}${cleanRoute === "/" ? "" : cleanRoute}`);
}

export function buildPublicPath(locale: Locale, routePath: string) {
  return `${BASE_PATH}${buildRoutePath(locale, routePath)}`;
}

export function buildCanonicalUrl(locale: Locale, routePath: string) {
  return `${SITE_ORIGIN}${BASE_PATH}${buildRoutePath(locale, routePath)}`;
}

export function buildLocalizedHref(locale: Locale, routePath: string) {
  return buildPublicPath(locale, routePath);
}

export function buildDefaultUrl(routePath: string) {
  return buildCanonicalUrl(DEFAULT_LOCALE, routePath);
}
