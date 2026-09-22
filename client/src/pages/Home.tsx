import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  FileText,
  Candy,
  Milk,
  Croissant,
  Brain,
  Leaf,
  ClipboardCheck,
  FlaskConical,
} from "lucide-react";
import {
  usePageSEO,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/usePageSEO";
import {
  useI18nContext,
  buildLocalizedPath,
  buildLocalizedPublicPath,
} from "@/i18n";
import { getProducts } from "@/lib/productData";
import { SITE_IMAGES } from "@/content/media";
import ResponsiveImage from "@/components/ResponsiveImage";

// Representative products retain their names, imagery and routes from shared data.
const systemProductIds = [1, 2, 4, 6, 8, 7];

export default function Home() {
  const { t, locale } = useI18nContext();
  const products = getProducts(locale);
  const APPLICATION_FIT_LINK = buildLocalizedPublicPath(
    locale,
    "/industry-solutions#application-fit-lecithin"
  );
  const PRODUCTS_LINK = buildLocalizedPath(locale, "/products");
  const QUALITY_LINK = buildLocalizedPath(locale, "/quality");
  const INQUIRY_FORM_LINK = buildLocalizedPublicPath(
    locale,
    "/contact#inquiryForm"
  );

  usePageSEO({
    title: t(
      "homepage.seo_title",
      "Lecithin & Phospholipid Ingredients | Lecprima"
    ),
    description: t(
      "homepage.seo_description",
      "Compare lecithin and phospholipid ingredients by application, specification and documentation needs."
    ),
    keywords: t(
      "homepage.seo_keywords",
      "soy lecithin, phospholipids, phosphatidylcholine, Lecprima"
    ),
    path: "/",
    image: SITE_IMAGES.hero,
    jsonLd: [
      buildOrganizationSchema(),
      buildBreadcrumbSchema(
        [{ name: t("common.home", "Home"), path: "/" }],
        locale
      ),
    ],
  });

  const formulationProblems = [
    {
      title: t(
        "homepage.problem_cards.chocolate.title",
        "Chocolate viscosity and molding flow"
      ),
      body: t(
        "homepage.problem_cards.chocolate.body",
        "Compare liquid lecithin grades for your chocolate formulation."
      ),
      icon: Candy,
    },
    {
      title: t(
        "homepage.problem_cards.beverage.title",
        "Instant beverage wetting and dispersion"
      ),
      body: t(
        "homepage.problem_cards.beverage.body",
        "Compare modified lecithin and powder formats for your beverage application."
      ),
      icon: Milk,
    },
    {
      title: t(
        "homepage.problem_cards.bakery.title",
        "Bakery dough handling and texture"
      ),
      body: t(
        "homepage.problem_cards.bakery.body",
        "Evaluate powder and liquid lecithin systems in your bakery formulation."
      ),
      icon: Croissant,
    },
    {
      title: t(
        "homepage.problem_cards.clean_label.title",
        "Clean-label soy-free substitution"
      ),
      body: t(
        "homepage.problem_cards.clean_label.body",
        "Review sunflower lecithin options and request product documentation."
      ),
      icon: Leaf,
    },
    {
      title: t("homepage.problem_cards.purity.title", "PC/PS purity selection"),
      body: t(
        "homepage.problem_cards.purity.body",
        "Compare phosphatidylcholine and phosphatidylserine grades by specification."
      ),
      icon: Brain,
    },
    {
      title: t(
        "homepage.problem_cards.qa.title",
        "QA documentation and batch verification"
      ),
      body: t(
        "homepage.problem_cards.qa.body",
        "Request COA, TDS, SDS/MSDS and certificate files for review."
      ),
      icon: FileText,
    },
  ];

  const evaluationSteps = [
    {
      icon: FlaskConical,
      title: t(
        "homepage.resilience.supply_continuity.title",
        "Application-Fit Selection"
      ),
      body: t(
        "homepage.resilience.supply_continuity.desc",
        "Start from the formulation issue, then compare forms, grades and usage context."
      ),
    },
    {
      icon: FileText,
      title: t(
        "homepage.resilience.procurement_confidence.title",
        "Documented Procurement Review"
      ),
      body: t(
        "homepage.resilience.procurement_confidence.desc",
        "Request COA, TDS, MSDS and certification files for supplier review."
      ),
    },
    {
      icon: ClipboardCheck,
      title: t("homepage.hero_badges.sample_to_scale", "Sample to Scale"),
      body: t(
        "product_detail.evaluation_description",
        "Request COA, TDS, SDS/MSDS or a sample before supplier qualification, formula trials or production scale-up."
      ),
    },
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-grid">
            <div className="hero-copy">
              <a href={APPLICATION_FIT_LINK} className="eyebrow hero-eyebrow">
                <span className="eyebrow-rule" aria-hidden="true" />
                {t(
                  "homepage.hero_subtitle",
                  "Application-fit lecithin and phospholipid ingredients"
                )}
              </a>
              <h1 className="display-heading hero-title">
                {t("homepage.hero_title_line1", "Make Every")}{" "}
                <span>{t("homepage.hero_title_line2", "Batch Perform")}</span>
              </h1>
              <p className="hero-description">
                {t(
                  "homepage.hero_description",
                  "Compare ingredients, review specifications and discuss your application with our team."
                )}
              </p>
              <div className="hero-actions">
                <Link href={PRODUCTS_LINK} className="button-primary">
                  {t("homepage.explore_products", "Find the Right Ingredient")}
                  <ArrowUpRight className="directional-arrow h-4 w-4" />
                </Link>
                <a href={INQUIRY_FORM_LINK} className="button-secondary">
                  {t("homepage.contact_engineer", "Request Technical Data")}
                </a>
              </div>
              <a
                href={APPLICATION_FIT_LINK}
                className="text-link hero-application-link"
              >
                {t("homepage.match_by_application", "Match by Application")}
                <ArrowRight className="directional-arrow h-4 w-4" />
              </a>
            </div>
            <figure className="hero-figure">
              <div className="hero-image-frame">
                <ResponsiveImage
                  src={SITE_IMAGES.hero}
                  preset="editorial"
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 900px) min(608px, calc(100vw - 48px)), (max-width: 1023px) calc(50vw - 40px), (max-width: 1100px) calc(50vw - 48px), (max-width: 1279px) calc(50vw - 52px), 588px"
                  alt={t(
                    "homepage.hero_subtitle",
                    "Lecithin and phospholipid ingredients"
                  )}
                  className="hero-image"
                  pictureClassName="image-fill"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <figcaption className="hero-image-caption">
                <span>Lecprima</span>
                <span>{t("homepage.systems_subtitle", "Product Systems")}</span>
              </figcaption>
            </figure>
          </div>
          <div className="hero-confidence-row">
            <p>
              {t(
                "homepage.hero_guarantee",
                "Match the problem, verify the specs, then discuss your application."
              )}
            </p>
            <div className="hero-badges">
              {[
                { label: t("homepage.hero_badges.clear_specs", "Clear Specs") },
                { label: t("homepage.hero_badges.batch_coa", "Batch COA") },
                {
                  label: t(
                    "homepage.hero_badges.application_fit",
                    "Application Fit"
                  ),
                  href: APPLICATION_FIT_LINK,
                },
                {
                  label: t(
                    "homepage.hero_badges.sample_to_scale",
                    "Sample to Scale"
                  ),
                },
              ].map(badge =>
                badge.href ? (
                  <a key={badge.label} href={badge.href} className="hero-badge">
                    <Check size={14} aria-hidden="true" />
                    {badge.label}
                  </a>
                ) : (
                  <span key={badge.label} className="hero-badge">
                    <Check size={14} aria-hidden="true" />
                    {badge.label}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-space product-systems"
        aria-labelledby="systems-title"
      >
        <div className="container">
          <div className="section-heading-row">
            <div className="max-w-3xl">
              <p className="eyebrow">
                {t("homepage.systems_subtitle", "Product Systems")}
              </p>
              <h2 id="systems-title" className="display-heading section-title">
                {t(
                  "homepage.systems_title",
                  "Select by Form, Function and Documentation Need"
                )}
              </h2>
            </div>
            <Link href={PRODUCTS_LINK} className="text-link shrink-0">
              {t("homepage.browse_all", "Browse All 10 Products")}
              <ArrowRight className="directional-arrow h-4 w-4" />
            </Link>
          </div>
          <div className="system-grid">
            {systemProductIds.map((id, index) => {
              const product = products.find(item => item.id === id);
              if (!product) return null;
              return (
                <Link
                  key={product.id}
                  href={buildLocalizedPath(locale, `/products/${product.slug}`)}
                  className="system-card group"
                >
                  <div className="system-image-frame">
                    <ResponsiveImage
                      src={product.image}
                      preset="product"
                      sizes="(max-width: 639px) calc(50vw - 23px), (max-width: 900px) calc(50vw - 37px), (max-width: 1023px) calc(33.333vw - 34px), (max-width: 1279px) calc(33.333vw - 39px), 389px"
                      pictureClassName="image-fill"
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="system-card-arrow" aria-hidden="true">
                      <ArrowUpRight className="directional-arrow h-5 w-5" />
                    </span>
                  </div>
                  <div className="system-card-copy">
                    <h3>{t(`homepage.systems.${index}`, product.name)}</h3>
                    <p>{product.name}</p>
                    <span className="text-link">
                      {t("common.view_details", "View Details")}
                      <ArrowRight className="directional-arrow h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="section-space application-section"
        aria-labelledby="applications-title"
      >
        <div className="container">
          <div className="application-intro">
            <div>
              <p className="eyebrow">
                {t(
                  "homepage.industries_subtitle",
                  "Start With the Formulation Problem"
                )}
              </p>
              <h2
                id="applications-title"
                className="display-heading section-title"
              >
                {t(
                  "homepage.industries_title",
                  "Problems Buyers Ask Us to Solve"
                )}
              </h2>
            </div>
            <ResponsiveImage
              src={SITE_IMAGES.applications}
              preset="editorial"
              sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 900px) calc(46.512vw - 38px), (max-width: 1023px) calc(46.512vw - 60px), (max-width: 1279px) calc(46.512vw - 67px), 529px"
              alt={t("common.industry_solutions", "Ingredient applications")}
              className="application-intro-image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="application-grid">
            {formulationProblems.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.title}
                  href={APPLICATION_FIT_LINK}
                  className="application-card"
                >
                  <div className="application-card-top">
                    <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                    <ArrowUpRight
                      size={18}
                      className="directional-arrow"
                      aria-hidden="true"
                    />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="section-space confidence-section"
        aria-labelledby="confidence-title"
      >
        <div className="container">
          <div className="confidence-grid">
            <div className="confidence-visual">
              <ResponsiveImage
                src={SITE_IMAGES.laboratory}
                preset="editorial"
                sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 48px), (max-width: 1023px) calc(47.5vw - 46px), (max-width: 1100px) calc(47.5vw - 54px), (max-width: 1279px) calc(47.5vw - 69px), 540px"
                pictureClassName="image-fill"
                alt={t(
                  "homepage.verify_quality",
                  "Quality documentation review"
                )}
                loading="lazy"
                decoding="async"
              />
              <div className="confidence-visual-caption">
                <FileText size={22} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {t("homepage.hero_badges.clear_specs", "Clear Specs")}{" "}
                  <span aria-hidden="true">/</span>{" "}
                  {t("homepage.hero_badges.batch_coa", "Batch COA")}
                </span>
              </div>
            </div>
            <div>
              <p className="eyebrow">
                {t("homepage.resilience_subtitle", "Formulation Confidence")}
              </p>
              <h2
                id="confidence-title"
                className="display-heading section-title"
              >
                {t(
                  "homepage.resilience_title",
                  "Clear Answers for QA, Procurement and R&D"
                )}
              </h2>
              <p className="section-description">
                {t(
                  "homepage.resilience_description",
                  "Connect your application to specifications, documentation and sample evaluation."
                )}
              </p>
              <div className="evaluation-steps">
                {evaluationSteps.map(step => {
                  const Icon = step.icon;
                  return (
                    <div className="evaluation-step" key={step.title}>
                      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href={QUALITY_LINK} className="text-link">
                {t("homepage.verify_quality", "Review Quality Documents")}
                <ArrowRight className="directional-arrow h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="brand-statement">
            <span className="brand-statement-name">Lecprima</span>
            <p>
              {t(
                "homepage.brand_statement",
                "Lecprima is a B2B ingredient brand operated by Harbin Huiyi Jianpin Import & Export Trade Co., Ltd."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="home-contact-section">
        <div className="container home-contact-grid">
          <div>
            <p className="eyebrow">{t("common.contact", "Contact")}</p>
            <h2 className="display-heading section-title">
              {t(
                "homepage.cta_title",
                "Tell Us the Problem Your Formula Needs to Solve"
              )}
            </h2>
          </div>
          <div>
            <p>
              {t(
                "homepage.cta_description",
                "Share your application, specification, sample request and quantity range with our team."
              )}
            </p>
            <a href={INQUIRY_FORM_LINK} className="button-light">
              <Mail className="h-4 w-4" />
              {t("homepage.email_inquiry", "Email Inquiry")}
              <ArrowUpRight className="directional-arrow h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
