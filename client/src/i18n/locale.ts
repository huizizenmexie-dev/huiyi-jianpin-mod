import { LOCALES, DEFAULT_LOCALE, type Locale, isValidLocale } from "./config";
import { buildLocalizedHref } from "@/content/url";

// Extract locale from URL path
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment;
  }

  return DEFAULT_LOCALE;
}

// Get path without locale prefix
export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    return "/" + segments.slice(1).join("/");
  }

  return pathname;
}

// Build URL with locale prefix
export function buildLocalizedPath(locale: Locale, path: string): string {
  return buildLocalizedHref(locale, path);
}

// Get all localized paths for a given path
export function getAllLocalizedPaths(path: string): Record<Locale, string> {
  const result: Record<string, string> = {};
  for (const locale of LOCALES) {
    result[locale] = buildLocalizedPath(locale, path);
  }
  return result as Record<Locale, string>;
}

// Parse URL parameters
export function parseUrlParams(pathname: string): Record<string, string> {
  const url = new URL(pathname, window.location.origin);
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
