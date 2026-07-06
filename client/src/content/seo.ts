import {
  DEFAULT_LOCALE,
  INDEXABLE_LOCALES,
  LOCALE_STATUS,
  PAGE_PATHS,
  type Locale,
} from "./routes";
import {
  CONTACT,
  DEFAULT_OG_IMAGE,
  LIAOCHENG_FACILITY,
  SITE_BRAND_NAME,
  SITE_BRAND_STATEMENT,
  SITE_COMPANY_SHORT_NAME,
  SITE_LEGAL_NAME,
  SITE_LEGAL_NAME_ZH,
  SITE_NAME,
} from "./site";
import { getProductBySlug } from "../lib/productData";
import { getInsightBySlug, getInsightContent } from "./insights";
import { URLS, buildRoutePath, createUrlSystem, stripLocale } from "./url";

type UrlSystem = ReturnType<typeof createUrlSystem>;

export type ManagedJsonLd = {
  id: string;
  data: object;
};

export type RouteSEO = {
  locale: Locale;
  routePath: string;
  title: string;
  description: string;
  keywords?: string;
  canonical: string;
  robots: "index,follow" | "noindex,follow";
  og: {
    title: string;
    description: string;
    url: string;
    type: "website" | "product" | "article";
    siteName: string;
    locale: string;
    image?: string;
  };
  alternates: Array<{ hreflang: string; href: string }>;
  jsonLd: ManagedJsonLd[];
};

export const PAGE_SEO: Record<
  (typeof PAGE_PATHS)[number],
  { title: string; description: string }
> = {
  "/": {
    title:
      "Stable Soy Lecithin Supplier | Lecprima B2B Phospholipid Supply",
    description:
      "Secure your formulation against global supply chain disruptions with Lecprima soy lecithin, phospholipid, soy protein and fiber systems.",
  },
  "/products": {
    title: "Soy Lecithin & Phospholipid Products | Stable B2B Supply",
    description:
      "Explore soy lecithin, phosphatidylcholine, phosphatidylserine, soy protein and dietary fiber systems from Lecprima.",
  },
  "/about": {
    title: "About Lecprima | Stable Phospholipid Supply from China",
    description:
      "Learn how Lecprima connects Harbin export operations with Liaocheng phospholipid production and Heilongjiang soybean sourcing.",
  },
  "/quality": {
    title: "Quality & Traceability | Secure Soy Lecithin Supply Chain",
    description:
      "Verify Lecprima quality systems, certifications, COA documentation and batch traceability.",
  },
  "/industry-solutions": {
    title: "Industry Solutions | Stable Phospholipid Applications",
    description:
      "Match soy lecithin, phospholipid, soy protein and dietary fiber systems to food, nutrition, cosmetics, feed and industrial applications.",
  },
  "/insights": {
    title:
      "Phospholipid & Lecithin Insights | PC, PS and Food Formulation Guides",
    description:
      "Read crawlable B2B guides on phosphatidylcholine, phosphatidylserine, lecithin, clean-label ingredients, functional beverages and food formulation.",
  },
  "/contact": {
    title: "Contact Lecprima | Request a Quote for Soy Lecithin",
    description:
      "Contact Lecprima for soy lecithin, phospholipid quote requests, samples and documentation.",
  },
};

function pageSeo(routePath: string) {
  const normalized = stripLocale(routePath).replace(/\/$/, "") || "/";
  if (!PAGE_PATHS.includes(normalized as (typeof PAGE_PATHS)[number])) {
    throw new Error(`Unknown page route: ${routePath}`);
  }
  return PAGE_SEO[normalized as (typeof PAGE_PATHS)[number]];
}

function productSeo(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Unknown product slug: ${slug}`);
  return {
    title: `${product.name} | ${SITE_NAME}`,
    description: `${product.subtitle}. ${product.quickSpecs}`,
    image: product.image,
  };
}

function insightSeo(slug: string, locale: Locale) {
  const article = getInsightBySlug(slug);
  const content = getInsightContent(article, locale);
  if (!article || !content) throw new Error(`Unknown insight slug: ${slug}`);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
  };
}

function routeTitleDescription(
  routePath: string,
  locale: Locale
): { title: string; description: string; image?: string } {
  const slug = productSlug(routePath);
  const insight = insightSlug(routePath);
  if (slug) return productSeo(slug);
  if (insight) return insightSeo(insight, locale);
  return pageSeo(routePath);
}

function productSlug(routePath: string) {
  const segments = stripLocale(routePath).split("/").filter(Boolean);
  return segments[0] === "products" && segments[1] ? segments[1] : "";
}

function insightSlug(routePath: string) {
  const segments = stripLocale(routePath).split("/").filter(Boolean);
  return segments[0] === "insights" && segments[1] ? segments[1] : "";
}

function organizationId(urls: UrlSystem) {
  return `${urls.siteOrigin}/#organization`;
}

function brandId(urls: UrlSystem) {
  return `${urls.siteOrigin}/#brand`;
}

function websiteId(urls: UrlSystem) {
  return `${urls.siteOrigin}/#website`;
}

function liaochengFacilityId(urls: UrlSystem) {
  return `${urls.siteOrigin}/#liaocheng-facility`;
}

function webpageId(canonical: string) {
  return `${canonical}#webpage`;
}

function organizationSchema(urls: UrlSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(urls),
    name: SITE_LEGAL_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: [SITE_LEGAL_NAME_ZH, SITE_COMPANY_SHORT_NAME],
    url: urls.siteOrigin,
    description: SITE_BRAND_STATEMENT,
    email: CONTACT.email,
    telephone: CONTACT.phone.replace(/\s+/g, ""),
    brand: { "@id": brandId(urls) },
    location: { "@id": liaochengFacilityId(urls) },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harbin",
      addressRegion: "Heilongjiang Province",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone.replace(/\s+/g, ""),
      contactType: "sales",
      availableLanguage: [
        "English",
        "Chinese",
        "Portuguese",
        "French",
        "Arabic",
        "Spanish",
      ],
    },
  };
}

function brandSchema(urls: UrlSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": brandId(urls),
    name: SITE_BRAND_NAME,
    url: urls.siteOrigin,
    description: SITE_BRAND_STATEMENT,
    parentOrganization: { "@id": organizationId(urls) },
  };
}

function websiteSchema(locale: Locale, urls: UrlSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(urls),
    name: SITE_BRAND_NAME,
    url: urls.canonicalUrl(locale, "/"),
    publisher: { "@id": organizationId(urls) },
    about: { "@id": brandId(urls) },
    inLanguage: locale,
  };
}

function liaochengFacilitySchema(urls: UrlSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": liaochengFacilityId(urls),
    name: LIAOCHENG_FACILITY.name,
    description: LIAOCHENG_FACILITY.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: LIAOCHENG_FACILITY.locality,
      addressRegion: LIAOCHENG_FACILITY.region,
      addressCountry: LIAOCHENG_FACILITY.country,
    },
    operator: { "@id": organizationId(urls) },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Manufacturing and export relationship",
        value: SITE_BRAND_STATEMENT,
      },
    ],
  };
}

function webPageSchema(
  locale: Locale,
  routePath: string,
  urls: UrlSystem,
  title: string,
  description: string
) {
  const canonical = urls.canonicalUrl(locale, routePath);
  const slug = productSlug(routePath);
  const articleSlug = insightSlug(routePath);

  return {
    "@context": "https://schema.org",
    "@type": slug ? "ItemPage" : articleSlug ? "ArticlePage" : "WebPage",
    "@id": webpageId(canonical),
    url: canonical,
    name: title,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId(urls) },
    about: { "@id": brandId(urls) },
    ...(slug ? { mainEntity: { "@id": `${canonical}#product` } } : {}),
    ...(articleSlug ? { mainEntity: { "@id": `${canonical}#article` } } : {}),
  };
}

function breadcrumbSchema(locale: Locale, routePath: string, urls: UrlSystem) {
  const slug = productSlug(routePath);
  const articleSlug = insightSlug(routePath);
  const normalized = stripLocale(routePath).replace(/\/$/, "") || "/";
  const items = [
    { name: "Home", path: "/" },
    slug
      ? { name: "Products", path: "/products" }
      : articleSlug
        ? null
        : normalized === "/"
          ? null
          : {
              name: pageSeo(normalized).title.split("|")[0].trim(),
              path: normalized,
            },
  ].filter(Boolean) as Array<{ name: string; path: string }>;

  if (slug) {
    items.push({
      name: getProductBySlug(slug)?.name || slug,
      path: `/products/${slug}`,
    });
  }

  if (articleSlug) {
    items.push({
      name:
        getInsightContent(getInsightBySlug(articleSlug), locale)?.title ||
        articleSlug,
      path: `/insights/${articleSlug}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: urls.canonicalUrl(locale, item.path),
    })),
  };
}

function articleSchema(locale: Locale, routePath: string, urls: UrlSystem) {
  const slug = insightSlug(routePath);
  if (!slug) return null;

  const article = getInsightBySlug(slug);
  const content = getInsightContent(article, locale);
  if (
    !article ||
    !content ||
    LOCALE_STATUS[locale].status !== "ready" ||
    article.localeStatus[locale] !== "ready"
  ) {
    return null;
  }

  const canonical = urls.canonicalUrl(locale, routePath);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: content.title,
    description: content.metaDescription,
    mainEntityOfPage: { "@id": webpageId(canonical) },
    inLanguage: locale,
    author: { "@id": organizationId(urls) },
    publisher: { "@id": organizationId(urls) },
    about: article.productSlugs.map(productSlug => ({
      "@id": `${urls.canonicalUrl(locale, `/products/${productSlug}`)}#product`,
    })),
  };
}

function productSchema(locale: Locale, routePath: string, urls: UrlSystem) {
  const slug = productSlug(routePath);
  if (!slug) return null;

  const product = getProductBySlug(slug);
  if (!product) return null;

  const canonical = urls.canonicalUrl(locale, routePath);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${canonical}#product`,
    url: canonical,
    name: product.name,
    description: `${product.subtitle}. ${product.quickSpecs}`,
    image: urls.absoluteAssetUrl(product.image),
    brand: { "@id": brandId(urls) },
    manufacturer: { "@id": organizationId(urls) },
    category: product.category.join(", "),
    additionalProperty: product.specifications.map(spec => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function resolveRouteSEO({
  locale,
  routePath,
  urls = URLS,
  title,
  description,
  keywords,
  image,
}: {
  locale: Locale;
  routePath: string;
  urls?: UrlSystem;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}): RouteSEO {
  const normalizedRoute = stripLocale(routePath);
  const baseSeo = routeTitleDescription(normalizedRoute, locale);
  const resolvedTitle = title || baseSeo.title;
  const resolvedDescription = description || baseSeo.description;
  const resolvedImage = image || baseSeo.image || DEFAULT_OG_IMAGE;
  const ready = LOCALE_STATUS[locale].status === "ready";
  const canonical = urls.canonicalUrl(locale, normalizedRoute);
  const slug = productSlug(normalizedRoute);
  const articleSlug = insightSlug(normalizedRoute);
  const alternates = ready
    ? [
        ...INDEXABLE_LOCALES.map(alternateLocale => ({
          hreflang: alternateLocale,
          href: urls.canonicalUrl(alternateLocale, normalizedRoute),
        })),
        ...(LOCALE_STATUS[DEFAULT_LOCALE].status === "ready"
          ? [
              {
                hreflang: "x-default",
                href: urls.canonicalUrl(DEFAULT_LOCALE, normalizedRoute),
              },
            ]
          : []),
      ]
    : [];

  const jsonLd: ManagedJsonLd[] = [
    { id: "ld-organization", data: organizationSchema(urls) },
    { id: "ld-brand", data: brandSchema(urls) },
    { id: "ld-website", data: websiteSchema(locale, urls) },
    { id: "ld-liaocheng-facility", data: liaochengFacilitySchema(urls) },
    {
      id: "ld-webpage",
      data: webPageSchema(
        locale,
        normalizedRoute,
        urls,
        resolvedTitle,
        resolvedDescription
      ),
    },
    {
      id: "ld-breadcrumb",
      data: breadcrumbSchema(locale, normalizedRoute, urls),
    },
  ];

  const product = productSchema(locale, normalizedRoute, urls);
  if (product) jsonLd.push({ id: "ld-product", data: product });

  const article = articleSchema(locale, normalizedRoute, urls);
  if (article) jsonLd.push({ id: "ld-article", data: article });

  return {
    locale,
    routePath: buildRoutePath(locale, normalizedRoute),
    title: resolvedTitle,
    description: resolvedDescription,
    keywords,
    canonical,
    robots: ready ? "index,follow" : "noindex,follow",
    og: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      type: slug ? "product" : articleSlug ? "article" : "website",
      siteName: SITE_NAME,
      locale: locale.replace("-", "_"),
      image: urls.absoluteAssetUrl(resolvedImage),
    },
    alternates,
    jsonLd,
  };
}
