import {
  DEFAULT_LOCALE,
  INDEXABLE_LOCALES,
  LOCALE_STATUS,
  PAGE_PATHS,
  type Locale,
} from "./routes";
import {
  SITE_LEGAL_NAME,
  SITE_NAME,
  CONTACT,
  DEFAULT_OG_IMAGE,
} from "./site";
import { getProductBySlug } from "../lib/productData";
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
    type: "website" | "product";
    siteName: string;
    locale: string;
    image?: string;
  };
  alternates: Array<{ hreflang: string; href: string }>;
  jsonLd: ManagedJsonLd[];
};

export const PAGE_SEO: Record<(typeof PAGE_PATHS)[number], { title: string; description: string }> = {
  "/": {
    title: "Stable Soy Lecithin Supplier | Resilient Supply Chain | Huiyi Jianpin",
    description:
      "Secure your formulation against global supply chain disruptions with Huiyi Jianpin soy lecithin, phospholipid, soy protein and fiber systems.",
  },
  "/products": {
    title: "Soy Lecithin & Phospholipid Products | Stable B2B Supply",
    description:
      "Explore soy lecithin, phosphatidylcholine, phosphatidylserine, soy protein and dietary fiber systems from Huiyi Jianpin.",
  },
  "/about": {
    title: "About Huiyi Jianpin | Stable Phospholipid Manufacturer from China",
    description:
      "Learn how Huiyi Jianpin connects Heilongjiang soybean sourcing with GMP-standard phospholipid production.",
  },
  "/quality": {
    title: "Quality & Traceability | Secure Soy Lecithin Supply Chain",
    description:
      "Verify Huiyi Jianpin quality systems, certifications, COA documentation and batch traceability.",
  },
  "/industry-solutions": {
    title: "Industry Solutions | Stable Phospholipid Applications",
    description:
      "Match soy lecithin, phospholipid, soy protein and dietary fiber systems to food, nutrition, cosmetics, feed and industrial applications.",
  },
  "/contact": {
    title: "Contact Huiyi Jianpin | Request a Quote for Soy Lecithin",
    description:
      "Contact Huiyi Jianpin for soy lecithin, phospholipid quote requests, samples and documentation.",
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

function routeTitleDescription(routePath: string): { title: string; description: string; image?: string } {
  const slug = productSlug(routePath);
  return slug ? productSeo(slug) : pageSeo(routePath);
}

function productSlug(routePath: string) {
  const segments = stripLocale(routePath).split("/").filter(Boolean);
  return segments[0] === "products" && segments[1] ? segments[1] : "";
}

function organizationSchema(urls: UrlSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: urls.siteOrigin,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: CONTACT.phone.replace(/\s+/g, ""),
      contactType: "sales",
      availableLanguage: ["English", "Chinese", "Portuguese", "French", "Arabic", "Spanish"],
    },
  };
}

function websiteSchema(locale: Locale, urls: UrlSystem) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: urls.canonicalUrl(locale, "/"),
  };
}

function breadcrumbSchema(locale: Locale, routePath: string, urls: UrlSystem) {
  const slug = productSlug(routePath);
  const normalized = stripLocale(routePath).replace(/\/$/, "") || "/";
  const items = [
    { name: "Home", path: "/" },
    slug
      ? { name: "Products", path: "/products" }
      : normalized === "/"
        ? null
        : { name: pageSeo(normalized).title.split("|")[0].trim(), path: normalized },
  ].filter(Boolean) as Array<{ name: string; path: string }>;

  if (slug) {
    items.push({ name: getProductBySlug(slug)?.name || slug, path: `/products/${slug}` });
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

function productSchema(locale: Locale, routePath: string, urls: UrlSystem) {
  const slug = productSlug(routePath);
  if (!slug) return null;

  const product = getProductBySlug(slug);
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: `${product.subtitle}. ${product.quickSpecs}`,
    image: urls.absoluteAssetUrl(product.image),
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
    },
    category: product.category.join(", "),
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
  const baseSeo = routeTitleDescription(normalizedRoute);
  const resolvedTitle = title || baseSeo.title;
  const resolvedDescription = description || baseSeo.description;
  const resolvedImage = image || baseSeo.image || DEFAULT_OG_IMAGE;
  const ready = LOCALE_STATUS[locale].status === "ready";
  const canonical = urls.canonicalUrl(locale, normalizedRoute);
  const slug = productSlug(normalizedRoute);
  const alternates = ready
    ? [
        ...INDEXABLE_LOCALES.map((alternateLocale) => ({
          hreflang: alternateLocale,
          href: urls.canonicalUrl(alternateLocale, normalizedRoute),
        })),
        ...(LOCALE_STATUS[DEFAULT_LOCALE].status === "ready"
          ? [{ hreflang: "x-default", href: urls.canonicalUrl(DEFAULT_LOCALE, normalizedRoute) }]
          : []),
      ]
    : [];

  const jsonLd: ManagedJsonLd[] = [
    { id: "ld-organization", data: organizationSchema(urls) },
    { id: "ld-website", data: websiteSchema(locale, urls) },
    { id: "ld-breadcrumb", data: breadcrumbSchema(locale, normalizedRoute, urls) },
  ];

  const product = productSchema(locale, normalizedRoute, urls);
  if (product) {
    jsonLd.push({ id: "ld-product", data: product });
  }

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
      type: slug ? "product" : "website",
      siteName: SITE_NAME,
      locale: locale.replace("-", "_"),
      image: urls.absoluteAssetUrl(resolvedImage),
    },
    alternates,
    jsonLd,
  };
}
