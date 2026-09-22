import { useState, useEffect } from "react";
import { useParams } from "wouter";
import {
  ChevronRight,
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Phone,
  FileText,
} from "lucide-react";
import { getProductBySlug } from "@/lib/productData";
import LocalizedLink from "@/components/LocalizedLink";
import { usePageSEO } from "@/lib/usePageSEO";
import { buildPublicAssetPath } from "@/content/url";
import { buildLocalizedPublicPath, useI18nContext } from "@/i18n";
import { CONTACT } from "@/content/site";

const CONTACT_EMAIL_BASE = `mailto:${CONTACT.email}?subject=`;

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useI18nContext();
  const product = getProductBySlug(slug || "", locale);
  const [showStickyCta, setShowStickyCta] = useState(false);

  usePageSEO({
    path: product ? `/products/${product.slug}` : "/products",
    title: product
      ? `${product.name} | Lecprima`
      : t("product_detail.not_found_title", "Product Not Found | Lecprima"),
    description: product
      ? `${product.subtitle}. ${product.quickSpecs}`
      : t(
          "product_detail.not_found_description",
          "The requested product could not be found."
        ),
    image: product?.image,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-ivory">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl text-deep-brown mb-4">
            {t("product_detail.not_found_heading", "Product Not Found")}
          </h2>
          <LocalizedLink
            to="/products"
            className="inline-flex items-center gap-2 text-earth-green hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("product_detail.back_to_products", "Back to Products")}
          </LocalizedLink>
        </div>
      </div>
    );
  }

  const emailLink = `${CONTACT_EMAIL_BASE}${encodeURIComponent(
    `Inquiry - ${product.name} - Website`
  )}&body=${encodeURIComponent(
    `Please fill in:\nCompany:\nProduct: ${product.name}\nQuantity:\nMessage:`
  )}`;
  // Keep this existing CTA contract easy to inspect in source-based checks.
  // prettier-ignore
  const contactQuoteFormLink = buildLocalizedPublicPath(locale, "/contact#quoteForm");
  const productImage = buildPublicAssetPath(product.image);

  return (
    <div className="product-detail-page">
      {/* Header */}
      <section className="product-detail-header">
        <div className="container">
          <nav
            className="breadcrumb"
            aria-label={t("common.products", "Products")}
          >
            <LocalizedLink
              to="/"
              className="hover:text-earth-green transition-colors"
            >
              {t("common.home", "Home")}
            </LocalizedLink>
            <ChevronRight
              className="directional-arrow w-3.5 h-3.5"
              aria-hidden="true"
            />
            <LocalizedLink
              to="/products"
              className="hover:text-earth-green transition-colors"
            >
              {t("common.products", "Products")}
            </LocalizedLink>
            <ChevronRight
              className="directional-arrow w-3.5 h-3.5"
              aria-hidden="true"
            />
            <span aria-current="page">{product.name}</span>
          </nav>

          <div className="product-detail-grid">
            {/* Product Image */}
            <div className="product-detail-image">
              <img
                src={productImage}
                alt={product.name}
                className="w-full h-full object-contain"
                width={900}
                height={900}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            {/* Product Info */}
            <div className="product-detail-copy">
              <p className="eyebrow">
                {t("homepage.systems_subtitle", "Product Systems")}{" "}
                <span aria-hidden="true">/</span> {product.form}
              </p>
              <h1 className="display-heading detail-title">{product.name}</h1>
              <p className="product-detail-subtitle">{product.subtitle}</p>

              {/* Quick Specs Bar */}
              <div className="detail-quick-specs">
                <FileText size={21} strokeWidth={1.5} aria-hidden="true" />
                <p>{product.quickSpecs}</p>
              </div>

              <div className="detail-evaluation">
                <h2 className="detail-evaluation-title">
                  {t(
                    "product_detail.evaluation_title",
                    "What this product helps evaluate"
                  )}
                </h2>
                <ul className="space-y-2">
                  {product.applications.slice(0, 2).map(app => (
                    <li
                      key={`${app.industry}-${app.product}`}
                      className="text-sm text-medium-gray leading-relaxed"
                    >
                      <span className="font-heading font-semibold text-deep-brown">
                        {app.industry}:
                      </span>{" "}
                      {app.painPoint}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-medium-gray leading-relaxed">
                  {t(
                    "product_detail.evaluation_description",
                    "Request COA, TDS, SDS/MSDS or a sample before supplier qualification, formula trials or production scale-up."
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="detail-actions">
                <a href={contactQuoteFormLink} className="button-primary">
                  <Mail className="w-4 h-4" />
                  {t(
                    "product_detail.request_docs_sample",
                    "Request COA / TDS / Sample"
                  )}
                  <ArrowUpRight className="directional-arrow w-4 h-4" />
                </a>
                <LocalizedLink to="/products" className="text-link">
                  <ArrowLeft className="directional-arrow w-4 h-4" />
                  {t("product_detail.back_to_products", "Back to Products")}
                </LocalizedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section links work without JavaScript; all technical content stays visible. */}
      <section className="detail-content-section">
        <div className="container">
          <nav className="detail-section-links" aria-label={product.name}>
            <a href="#product-specifications">
              {t("product_detail.specifications_tab", "Specifications")}
            </a>
            <a href="#product-applications">
              {t(
                "product_detail.applications_tab",
                "Applications & Pain Points"
              )}
            </a>
          </nav>

          {/* Static core content: keep specs visible in initial HTML */}
          <div className="space-y-12">
            <div id="product-specifications" className="specifications-panel">
              <h2 className="display-heading text-3xl md:text-4xl text-earth-green mb-7">
                {t(
                  "product_detail.specifications_title",
                  "Product Specifications"
                )}
              </h2>
              <div className="max-w-full overflow-x-auto">
                <table className="specifications-table">
                  <tbody>
                    {product.specifications.map((spec, i) => (
                      <tr key={i}>
                        <th scope="row">{spec.label}</th>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="product-applications" className="space-y-5">
              <h2 className="display-heading text-3xl md:text-4xl text-earth-green mb-7">
                {t(
                  "product_detail.applications_title",
                  "Applications & Pain Points"
                )}
              </h2>
              {product.applications.map((app, i) => (
                <div key={i} className="detail-application-card">
                  <h3 className="font-heading font-semibold text-deep-brown text-lg mb-3">
                    {app.industry}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        {t("product_detail.pain_point_label", "Pain Point")}
                      </p>
                      <p className="text-sm text-medium-gray">
                        {app.painPoint}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        {t(
                          "product_detail.recommended_product_label",
                          "Recommended Product"
                        )}
                      </p>
                      <p className="text-sm text-earth-green font-medium">
                        {app.product}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        {t("product_detail.dosage_label", "Dosage")}
                      </p>
                      <p className="text-sm font-mono text-medium-gray">
                        {app.dosage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        {t(
                          "product_detail.technical_effect_label",
                          "Technical Effect"
                        )}
                      </p>
                      <p className="text-sm text-medium-gray">{app.effect}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar */}
      {showStickyCta && (
        <div className="detail-sticky-cta">
          <div className="container detail-sticky-inner">
            <p className="text-sm text-deep-brown font-medium hidden sm:block">
              {product.ctaText}
            </p>
            <div className="detail-sticky-actions">
              <a href={emailLink} className="button-primary">
                <Mail className="w-4 h-4" />
                {t("homepage.email_inquiry", "Email Inquiry")}
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
