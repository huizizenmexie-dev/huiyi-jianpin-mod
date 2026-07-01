import { useEffect } from "react";
import { useI18nContext, buildLocalizedPath, type Locale } from "@/i18n";
import { INDEXABLE_LOCALES, DEFAULT_LOCALE } from "@/content/routes";
import { SITE_URL } from "@/content/site";

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  image?: string;
  jsonLd?: object[];
}

// Generate absolute URL
function getAbsoluteUrl(path: string, locale: Locale): string {
  const localizedPath = buildLocalizedPath(locale, path);
  return `${SITE_URL}${localizedPath}`;
}

// Generate hreflang links — only for indexable (translated) locales
function generateHreflangLinks(path: string): Array<{ lang: string; url: string }> {
  const links: Array<{ lang: string; url: string }> = [];

  for (const locale of INDEXABLE_LOCALES) {
    links.push({
      lang: locale,
      url: getAbsoluteUrl(path, locale),
    });
  }

  // Add x-default
  links.push({
    lang: "x-default",
    url: getAbsoluteUrl(path, DEFAULT_LOCALE),
  });

  return links;
}

// Set meta tag
function setMetaTag(name: string, content: string, attribute: string = "name"): void {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Set link tag
function setLinkTag(rel: string, href: string, attributes: Record<string, string> = {}): void {
  // Remove existing
  const existing = document.querySelector(`link[rel="${rel}"]${attributes.hreflang ? `[hreflang="${attributes.hreflang}"]` : ""}`);
  if (existing) {
    existing.remove();
  }

  const el = document.createElement("link");
  el.rel = rel;
  el.href = href;
  for (const [key, value] of Object.entries(attributes)) {
    el.setAttribute(key, value);
  }
  document.head.appendChild(el);
}

// Clean up JSON-LD scripts
function cleanupJsonLd(): void {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach((script) => script.remove());
}

// Add JSON-LD
function addJsonLd(data: object): void {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Unified SEO hook
export function usePageSEO(seoData: SEOData) {
  const { locale } = useI18nContext();

  useEffect(() => {
    const { title, description, keywords, path, image, jsonLd } = seoData;

    // Set title
    document.title = title;

    // Set meta description
    setMetaTag("description", description);

    // Set keywords
    if (keywords) {
      setMetaTag("keywords", keywords);
    }

    // Set canonical - always points to current locale URL
    const canonicalUrl = getAbsoluteUrl(path, locale);
    setLinkTag("canonical", canonicalUrl);

    // Set hreflang links
    const hreflangLinks = generateHreflangLinks(path);
    for (const link of hreflangLinks) {
      setLinkTag("alternate", link.url, { hreflang: link.lang });
    }

    // Set Open Graph
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:url", canonicalUrl, "property");
    setMetaTag("og:locale", locale.replace("-", "_"), "property");
    setMetaTag("og:type", "website", "property");

    if (image) {
      setMetaTag("og:image", image, "property");
    }

    // Set HTML lang and dir
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    // Clean up and add JSON-LD
    cleanupJsonLd();
    if (jsonLd) {
      jsonLd.forEach((data) => addJsonLd(data));
    }

    // Cleanup function
    return () => {
      cleanupJsonLd();
    };
  }, [seoData, locale]);
}

// Helper to build breadcrumb JSON-LD
export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>, locale: Locale): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path, locale),
    })),
  };
}

// Helper to build organization JSON-LD
export function buildOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Huiyi Jianpin",
    url: "https://lecprima.com",
    logo: "https://lecprima.com/logo.png",
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
  };
}

// Helper to build product JSON-LD
export function buildProductSchema(product: {
  name: string;
  description: string;
  image?: string;
  sku?: string;
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Huiyi Jianpin",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.",
    },
  };
}
