export const SITE_URL = "https://lecprima.com";
export const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/hero-soybean-field-5mhsgZ9cxNzY2H9xAgjcJ4.webp";

type JsonLd = Record<string, unknown>;

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  image?: string;
  jsonLd?: JsonLd[];
};

type BuiltPageMeta = PageSeoInput & {
  canonicalUrl: string;
  openGraph: Record<string, string>;
};

export function buildCanonicalUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Huiyi Jianpin",
    alternateName: "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.",
    url: `${SITE_URL}/`,
    description:
      "A stable supplier of soy lecithin and phospholipids from China, providing resilient supply chain solutions for global food, nutrition, pharmaceutical, cosmetic and feed industries.",
    areaServed: "Worldwide",
    foundingLocation: "Harbin, Heilongjiang Province, China",
    knowsAbout: [
      "Soy lecithin supply chain resilience",
      "Non-GMO phospholipid manufacturing",
      "Stable food ingredient sourcing",
      "Phosphatidylcholine",
      "Phosphatidylserine",
      "Batch traceability",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Stable Supply Phospholipid Systems",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: "Soy Lecithin and Phospholipid Systems",
            description:
              "Soy lecithin, high-purity phospholipid derivatives, soy protein and dietary fiber products backed by 10,000T annual capacity and batch traceability.",
          },
        },
      ],
    },
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Huiyi Jianpin",
    url: `${SITE_URL}/`,
    description:
      "Stable soy lecithin, phospholipid, soy protein and dietary fiber sourcing from China.",
    inLanguage: "en",
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonicalUrl(item.path),
    })),
  };
}

export function buildPageMeta(input: PageSeoInput): BuiltPageMeta {
  const canonicalUrl = buildCanonicalUrl(input.path);
  const image = input.image || DEFAULT_OG_IMAGE;

  return {
    ...input,
    canonicalUrl,
    image,
    openGraph: {
      "og:type": "website",
      "og:title": input.title,
      "og:description": input.description,
      "og:url": canonicalUrl,
      "og:image": image,
      "og:site_name": "Huiyi Jianpin",
    },
  };
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function applyPageSeo(input: PageSeoInput) {
  const meta = buildPageMeta(input);
  document.title = meta.title;

  upsertMeta("name", "description", meta.description);
  if (meta.keywords) upsertMeta("name", "keywords", meta.keywords);
  upsertMeta("name", "robots", "index, follow");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", meta.image || DEFAULT_OG_IMAGE);

  Object.entries(meta.openGraph).forEach(([property, content]) => {
    upsertMeta("property", property, content);
  });

  upsertCanonical(meta.canonicalUrl);

  const schemaNodes = (meta.jsonLd || []).map((schema, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = `${meta.path}-${index}`;
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
    return script;
  });

  return () => {
    schemaNodes.forEach((node) => node.remove());
  };
}
