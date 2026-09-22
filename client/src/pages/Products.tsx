import { useState } from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  SlidersHorizontal,
} from "lucide-react";
import { getProducts, filterCategories } from "@/lib/productData";
import { usePageSEO, buildBreadcrumbSchema } from "@/lib/usePageSEO";
import {
  useI18nContext,
  buildLocalizedPath,
  buildLocalizedPublicPath,
} from "@/i18n";
import { buildPublicAssetPath } from "@/content/url";
import { SITE_IMAGES } from "@/content/media";

const filterLabelKeys: Record<string, string> = {
  All: "products_page.filters.all",
  Liquid: "products_page.filters.liquid",
  Powder: "products_page.filters.powder",
  "High-Purity": "products_page.filters.high_purity",
  "Allergen-Free": "products_page.filters.allergen_free",
  "Protein/Fiber": "products_page.filters.protein_fiber",
};

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { t, locale } = useI18nContext();
  const products = getProducts(locale);

  usePageSEO({
    title: t(
      "products_page.seo_title",
      "Lecithin & Phospholipid Products | Lecprima"
    ),
    description: t(
      "products_page.seo_description",
      "Explore lecithin, phospholipid, soy protein and dietary fiber ingredient systems for B2B formulation."
    ),
    keywords: t(
      "products_page.seo_keywords",
      "soy lecithin products, phospholipid systems, phosphatidylcholine supplier, phosphatidylserine supplier"
    ),
    path: "/products",
    image: SITE_IMAGES.hero,
    jsonLd: [
      buildBreadcrumbSchema(
        [
          { name: t("common.home", "Home"), path: "/" },
          { name: t("common.products", "Products"), path: "/products" },
        ],
        locale
      ),
    ],
  });

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter(product => product.category.includes(activeFilter));

  return (
    <div className="catalogue-page">
      <section className="catalogue-header">
        <div className="container">
          <nav
            className="breadcrumb"
            aria-label={t("common.products", "Products")}
          >
            <Link href={buildLocalizedPath(locale, "/")}>
              {t("common.home", "Home")}
            </Link>
            <ChevronRight
              size={14}
              className="directional-arrow"
              aria-hidden="true"
            />
            <span aria-current="page">{t("common.products", "Products")}</span>
          </nav>
          <div className="catalogue-header-grid">
            <div>
              <p className="eyebrow">
                {t("homepage.systems_subtitle", "Product Systems")}
              </p>
              <h1 className="display-heading catalogue-title">
                {t(
                  "products_page.hero_title",
                  "Select Lecithin & Phospholipids by Application Problem"
                )}
              </h1>
              <p className="section-description">
                {t(
                  "products_page.hero_description",
                  "Compare form, specification, documentation and validation fit."
                )}
              </p>
            </div>
            <div className="catalogue-header-visual">
              <img
                src={buildPublicAssetPath(SITE_IMAGES.hero)}
                alt={t(
                  "homepage.hero_subtitle",
                  "Lecithin and phospholipid ingredients"
                )}
                width={1536}
                height={1024}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="catalogue-body">
        <div className="container">
          <div className="catalogue-intro">
            <p>
              {t(
                "products_page.intro",
                "Compare form, grade, specification, documentation and buyer-side validation needs. Core specifications and application context are available on every product page."
              )}
            </p>
            <a
              href={buildLocalizedPublicPath(locale, "/contact#quoteForm")}
              className="text-link"
            >
              {t("homepage.contact_engineer", "Request Technical Data")}
              <ArrowUpRight className="directional-arrow h-4 w-4" />
            </a>
          </div>
          <div className="catalogue-filter-bar">
            <SlidersHorizontal
              size={18}
              aria-hidden="true"
              className="shrink-0 text-earth-green"
            />
            <div
              className="catalogue-filters"
              role="group"
              aria-label={t("common.products", "Products")}
            >
              {filterCategories.map(category => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={activeFilter === category}
                  aria-controls="product-grid"
                  className="filter-button"
                >
                  {t(
                    filterLabelKeys[category] ?? "products_page.filters.all",
                    category
                  )}
                </button>
              ))}
            </div>
            <p
              className="catalogue-count"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {filtered.length} <span>{t("common.products", "Products")}</span>
            </p>
          </div>

          <div id="product-grid" className="catalogue-grid">
            {filtered.map(product => (
              <Link
                key={product.id}
                href={buildLocalizedPath(locale, `/products/${product.slug}`)}
                className="product-card"
              >
                <div className="product-card-image">
                  <img
                    src={buildPublicAssetPath(product.image)}
                    alt={product.name}
                    width={720}
                    height={720}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="product-form-tag">{product.form}</span>
                </div>
                <div className="product-card-content">
                  <h2>{product.name}</h2>
                  <p className="product-card-subtitle">{product.subtitle}</p>
                  <p className="product-card-specs">{product.listingSpecs}</p>
                  {product.applications[0] && (
                    <p className="product-card-fit">
                      <span>
                        {t("products_page.problem_fit_label", "Problem fit")}
                      </span>
                      {product.applications[0].painPoint}
                    </p>
                  )}
                  <div className="product-card-link">
                    <span>{t("common.view_details", "View Details")}</span>
                    <ArrowRight
                      size={18}
                      className="directional-arrow"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="py-16 text-center text-medium-gray">
              {t("products_page.no_products", "No products match this filter.")}
            </p>
          )}
          <div className="catalogue-contact">
            <div>
              <p className="eyebrow">
                {t("homepage.resilience_subtitle", "Formulation Confidence")}
              </p>
              <h2 className="display-heading">
                {t(
                  "homepage.cta_title",
                  "Tell Us the Problem Your Formula Needs to Solve"
                )}
              </h2>
            </div>
            <a
              href={buildLocalizedPublicPath(locale, "/contact#quoteForm")}
              className="button-primary"
            >
              {t("common.get_a_quote", "Get a Quote")}
              <ArrowUpRight size={17} className="directional-arrow" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
