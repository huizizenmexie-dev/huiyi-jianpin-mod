import { useEffect } from "react";
import { useI18nContext, type Locale } from "@/i18n";
import { resolveRouteSEO } from "@/content/seo";
import { buildCanonicalUrl } from "@/content/url";
import {
  CONTACT,
  LIAOCHENG_FACILITY,
  SITE_BRAND_NAME,
  SITE_BRAND_STATEMENT,
  SITE_LEGAL_NAME,
  SITE_LEGAL_NAME_ZH,
} from "@/content/site";

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  path: string;
  image?: string;
  jsonLd?: object[];
}

const MANAGED_ATTR = "data-managed-seo";
const MANAGED_VALUE = "route";

function markManaged(el: Element) {
  el.setAttribute(MANAGED_ATTR, MANAGED_VALUE);
}

function setMetaTag(name: string, content: string, attribute: string = "name"): void {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  markManaged(el);
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string, attributes: Record<string, string> = {}): void {
  const selector = attributes.hreflang
    ? `link[rel="${rel}"][hreflang="${attributes.hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    for (const [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value);
    }
    document.head.appendChild(el);
  }
  markManaged(el);
  el.href = href;
}

function removeStaleAlternates(nextHreflangs: Set<string>) {
  const alternates = document.querySelectorAll(`link[rel="alternate"][${MANAGED_ATTR}="${MANAGED_VALUE}"]`);
  alternates.forEach((alternate) => {
    const hreflang = alternate.getAttribute("hreflang") || "";
    if (!nextHreflangs.has(hreflang)) {
      alternate.remove();
    }
  });
}

function setJsonLd(id: string, data: object): void {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  markManaged(script);
  script.textContent = JSON.stringify(data);
}

function removeStaleJsonLd(nextIds: Set<string>) {
  const scripts = document.querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTR}="${MANAGED_VALUE}"]`);
  scripts.forEach((script) => {
    if (!nextIds.has(script.id)) {
      script.remove();
    }
  });
}

export function usePageSEO(seoData: SEOData) {
  const { locale } = useI18nContext();

  useEffect(() => {
    const seo = resolveRouteSEO({
      locale,
      routePath: seoData.path,
      title: seoData.title,
      description: seoData.description,
      keywords: seoData.keywords,
      image: seoData.image,
    });

    document.title = seo.title;
    setMetaTag("description", seo.description);
    if (seo.keywords) {
      setMetaTag("keywords", seo.keywords);
    }

    setMetaTag("robots", seo.robots);
    setLinkTag("canonical", seo.canonical);

    const nextHreflangs = new Set(seo.alternates.map((alternate) => alternate.hreflang));
    removeStaleAlternates(nextHreflangs);
    for (const alternate of seo.alternates) {
      setLinkTag("alternate", alternate.href, { hreflang: alternate.hreflang });
    }

    setMetaTag("og:title", seo.og.title, "property");
    setMetaTag("og:description", seo.og.description, "property");
    setMetaTag("og:url", seo.og.url, "property");
    setMetaTag("og:locale", seo.og.locale, "property");
    setMetaTag("og:type", seo.og.type, "property");
    setMetaTag("og:site_name", seo.og.siteName, "property");
    if (seo.og.image) {
      setMetaTag("og:image", seo.og.image, "property");
    }

    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";

    const nextJsonLdIds = new Set(seo.jsonLd.map((entry) => entry.id));
    removeStaleJsonLd(nextJsonLdIds);
    for (const entry of seo.jsonLd) {
      setJsonLd(entry.id, entry.data);
    }
  }, [seoData.description, seoData.image, seoData.keywords, seoData.path, seoData.title, locale]);
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>, locale: Locale): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(locale, item.path),
    })),
  };
}

export function buildOrganizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
    url: buildCanonicalUrl("en", "/").replace(/\/en\/$/, ""),
    logo: buildCanonicalUrl("en", "/logo.png"),
    legalName: SITE_LEGAL_NAME,
    alternateName: [SITE_LEGAL_NAME_ZH, "Huiyi Jianpin"],
    description: SITE_BRAND_STATEMENT,
    brand: {
      "@type": "Brand",
      name: SITE_BRAND_NAME,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone.replace(/\s+/g, ""),
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "Portuguese", "French", "Arabic", "Spanish"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harbin",
      addressRegion: "Heilongjiang",
      addressCountry: "CN",
    },
    location: {
      "@type": "Place",
      name: LIAOCHENG_FACILITY.name,
      address: LIAOCHENG_FACILITY.address,
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Manufacturing and export relationship",
        value: SITE_BRAND_STATEMENT,
      },
    },
  };
}

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
      name: SITE_BRAND_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
    },
  };
}
