import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { buildLocalizedPath } from "@/i18n/locale";

// Generate hreflang link tags for all locales
export function generateHreflangLinks(path: string): Array<{ hreflang: string; href: string }> {
  const links: Array<{ hreflang: string; href: string }> = [];

  for (const locale of LOCALES) {
    links.push({
      hreflang: locale,
      href: buildLocalizedPath(locale, path),
    });
  }

  // Add x-default (usually points to default locale or root)
  links.push({
    hreflang: "x-default",
    href: buildLocalizedPath(DEFAULT_LOCALE, path),
  });

  return links;
}

// Generate canonical URL
export function generateCanonicalUrl(path: string, locale: Locale): string {
  return buildLocalizedPath(locale, path);
}

// Apply hreflang and canonical tags to document head
export function applyHreflangAndCanonical(path: string, locale: Locale): void {
  // Remove existing hreflang and canonical tags
  const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
  const existingCanonical = document.querySelectorAll('link[rel="canonical"]');
  existingHreflang.forEach((el) => el.remove());
  existingCanonical.forEach((el) => el.remove());

  // Add hreflang links
  const hreflangLinks = generateHreflangLinks(path);
  for (const link of hreflangLinks) {
    const el = document.createElement("link");
    el.rel = "alternate";
    el.hreflang = link.hreflang;
    el.href = link.href;
    document.head.appendChild(el);
  }

  // Add canonical link
  const canonicalEl = document.createElement("link");
  canonicalEl.rel = "canonical";
  canonicalEl.href = generateCanonicalUrl(path, locale);
  document.head.appendChild(canonicalEl);
}

// Update Open Graph tags
export function updateOpenGraphTags(
  title: string,
  description: string,
  path: string,
  locale: Locale
): void {
  const ogTags: Record<string, string> = {
    "og:title": title,
    "og:description": description,
    "og:url": buildLocalizedPath(locale, path),
    "og:locale": locale.replace("-", "_"),
  };

  for (const [property, content] of Object.entries(ogTags)) {
    let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }
}

// Apply all SEO metadata for a page
export function applyMultilingualSEO(
  path: string,
  locale: Locale,
  title: string,
  description: string
): void {
  // Update document title
  document.title = title;

  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (!metaDesc) {
    metaDesc = document.createElement("meta");
    metaDesc.setAttribute("name", "description");
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute("content", description);

  // Apply hreflang and canonical
  applyHreflangAndCanonical(path, locale);

  // Update Open Graph
  updateOpenGraphTags(title, description, path, locale);
}
