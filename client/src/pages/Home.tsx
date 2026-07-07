/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Home page: Hero with soybean field, industry grid, product systems, trust layer, resilience narrative, footer CTA
 */
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mail,
  Shield,
  MapPin,
  FileText,
  Factory,
  Headphones,
  Candy,
  Milk,
  Croissant,
  Pill,
  Brain,
  Leaf,
  Sparkles,
  Dog,
  Globe2,
  PackageCheck,
  Route,
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

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/hero-soybean-field-5mhsgZ9cxNzY2H9xAgjcJ4.webp";

// Industry icons mapping
const industryIcons = {
  "Chocolate & Confectionery": Candy,
  "Dairy & Instant Beverages": Milk,
  "Bakery & Snacks": Croissant,
  "Pharmaceuticals & Liposomes": Pill,
  "Cognitive & Sports Nutrition": Brain,
  "Plant-Based Meat & Protein": Leaf,
  "Cosmetics & Personal Care": Sparkles,
  "Animal Nutrition & Feed": Dog,
};

// Trust item icons mapping
const trustIcons = {
  Certifications: Shield,
  Traceability: MapPin,
  Documentation: FileText,
  Capacity: Factory,
  Support: Headphones,
};

// Resilience item icons mapping
const resilienceIcons = {
  "China-Based Supply Continuity": Globe2,
  "Documented Procurement Confidence": PackageCheck,
  "Traceable Farm-to-Shipment Control": Route,
};

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { t, locale } = useI18nContext();

  // Build localized links
  const PRODUCTS_LINK = buildLocalizedPath(locale, "/products");
  const QUALITY_LINK = buildLocalizedPath(locale, "/quality");
  const INQUIRY_FORM_LINK = buildLocalizedPublicPath(
    locale,
    "/contact#inquiryForm"
  );

  // SEO data from translations
  const seoTitle = t(
    "homepage.seo_title",
    "Stable Soy Lecithin Supplier | Lecprima"
  );
  const seoDescription = t(
    "homepage.seo_description",
    "Secure your formulation against global supply chain disruptions. Lecprima offers 10,000T annual capacity, Non-GMO IP traceability."
  );
  const seoKeywords = t(
    "homepage.seo_keywords",
    "soy lecithin, phospholipids, phosphatidylcholine, Lecprima"
  );

  // Apply unified SEO
  usePageSEO({
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    path: "/",
    jsonLd: [
      buildOrganizationSchema(),
      buildBreadcrumbSchema(
        [{ name: t("common.home", "Home"), path: "/" }],
        locale
      ),
    ],
  });

  // Industries data from translations
  const industries = [
    { key: "chocolate", icon: industryIcons["Chocolate & Confectionery"] },
    { key: "dairy", icon: industryIcons["Dairy & Instant Beverages"] },
    { key: "bakery", icon: industryIcons["Bakery & Snacks"] },
    {
      key: "pharmaceuticals",
      icon: industryIcons["Pharmaceuticals & Liposomes"],
    },
    { key: "cognitive", icon: industryIcons["Cognitive & Sports Nutrition"] },
    { key: "plant_based", icon: industryIcons["Plant-Based Meat & Protein"] },
    { key: "cosmetics", icon: industryIcons["Cosmetics & Personal Care"] },
    { key: "animal", icon: industryIcons["Animal Nutrition & Feed"] },
  ];

  // Product systems from translations
  const productSystemColors = [
    "from-amber-600/20 to-amber-600/5",
    "from-yellow-600/20 to-yellow-600/5",
    "from-emerald-600/20 to-emerald-600/5",
    "from-orange-500/20 to-orange-500/5",
    "from-red-600/20 to-red-600/5",
    "from-lime-600/20 to-lime-600/5",
  ];

  const formulationProblems = [
    {
      title: "Chocolate viscosity and molding flow",
      body: "Start with liquid soy lecithin grades for flow, molding and fat-system evaluation in buyer-validated chocolate formulas.",
      icon: Candy,
    },
    {
      title: "Instant beverage wetting and dispersion",
      body: "Compare modified lecithin and powder formats when clumping, floating fat or slow wetting blocks scale-up.",
      icon: Milk,
    },
    {
      title: "Bakery dough handling and texture",
      body: "Use powder or liquid lecithin systems to evaluate dough handling, fat distribution and finished-product texture.",
      icon: Croissant,
    },
    {
      title: "Clean-label soy-free substitution",
      body: "Review sunflower lecithin options when the formula needs a soy-free source and buyer-approved allergen positioning.",
      icon: Leaf,
    },
    {
      title: "PC/PS purity selection",
      body: "Select phosphatidylcholine or phosphatidylserine grades by target purity, storage condition and documentation needs.",
      icon: Brain,
    },
    {
      title: "QA documentation and batch verification",
      body: "Request COA, TDS, SDS/MSDS and certificate files before supplier qualification or production trials.",
      icon: FileText,
    },
  ];

  // Trust items from translations
  const trustItemKeys = [
    "certifications",
    "traceability",
    "documentation",
    "capacity",
    "support",
  ];
  const trustItemIcons = [Shield, MapPin, FileText, Factory, Headphones];

  // Resilience items from translations
  const resilienceItemKeys = [
    "supply_continuity",
    "procurement_confidence",
    "farm_to_shipment",
  ];
  const resilienceItemIcons = [Globe2, PackageCheck, Route];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src={HERO_IMG}
          alt="Soybean field representing Lecprima lecithin and phospholipid ingredient sourcing"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="relative container py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-harvest-gold font-heading font-medium text-sm uppercase tracking-widest mb-4">
              {t(
                "homepage.hero_subtitle",
                "From Heilongjiang Black Soil to Stable Global Formulations"
              )}
            </p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              {t("homepage.hero_title_line1", "Natural Phospholipids")}
              <br />
              <span className="text-harvest-gold">
                {t("homepage.hero_title_line2", "Engineered for Stable Supply")}
              </span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-4 max-w-xl">
              {t(
                "homepage.hero_description",
                "ISO 22000 certified soy lecithin and high-purity phospholipid derivatives with 10,000 tons annual capacity, Non-GMO IP traceability, and reliable supply continuity from China."
              )}
            </p>
            <p className="text-harvest-gold/90 text-sm font-semibold mb-8 border-l-2 border-harvest-gold pl-4">
              {t(
                "homepage.hero_guarantee",
                "Guaranteed supply stability amidst global sourcing uncertainty."
              )}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Clear Specs",
                "Batch COA",
                "Application Fit",
                "Sample to Scale",
              ].map(badge => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-harvest-gold/20 border border-harvest-gold/40 rounded text-harvest-gold text-xs font-heading font-semibold uppercase tracking-wide"
                >
                  <Shield className="w-3.5 h-3.5" />
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={PRODUCTS_LINK}
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                {t("homepage.explore_products", "Explore Product Systems")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={INQUIRY_FORM_LINK}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-harvest-gold text-harvest-gold font-medium rounded-md hover:bg-harvest-gold hover:text-white transition-colors"
              >
                {t("homepage.contact_engineer", "Contact an Engineer")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section className="border-b border-earth-green/10 bg-warm-ivory py-8">
        <div className="container">
          <p className="max-w-4xl text-base md:text-lg leading-relaxed text-deep-brown">
            {t(
              "homepage.brand_statement",
              "Lecprima is a global B2B brand operated by Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. We operate our own manufacturing facility in Liaocheng, Shandong, China, providing global customers with reliable production, quality management and export services."
            )}
          </p>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-28 bg-warm-ivory">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                {t("homepage.industries_subtitle", "Serving Global Industries")}
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                {t("homepage.industries_title", "Application Industries")}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {formulationProblems.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 60}>
                  <Link
                    href={buildLocalizedPath(locale, "/industry-solutions")}
                  >
                    <div className="group bg-white rounded-lg p-6 border border-transparent hover:border-earth-green shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
                      <Icon className="w-8 h-8 text-earth-green mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-heading font-semibold text-deep-brown text-base mb-2">
                        {item.title}
                      </h3>
                      <p className="text-medium-gray text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Systems Section */}
      <section className="py-20 lg:py-28 bg-soft-green">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                {t("homepage.systems_subtitle", "Comprehensive Solutions")}
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                {t("homepage.systems_title", "Six Functional Systems")}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <FadeIn key={i} delay={i * 80}>
                <div
                  className={`bg-gradient-to-br ${productSystemColors[i]} rounded-lg p-6 border border-earth-green/10 hover:border-earth-green/30 transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="w-10 h-10 rounded-full bg-earth-green/10 flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-earth-green text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-deep-brown text-lg">
                    {t(`homepage.systems.${i}`, `System ${i + 1}`)}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <Link
                href={PRODUCTS_LINK}
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                {t("homepage.browse_all", "Browse All 10 Products")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-24 bg-warm-ivory">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {trustItemKeys.map((key, i) => {
              const Icon = trustItemIcons[i];
              return (
                <FadeIn key={key} delay={i * 80}>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-harvest-gold/15 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-harvest-gold" />
                    </div>
                    <h4 className="font-heading font-semibold text-deep-brown text-sm mb-1">
                      {t(`homepage.trust.${key}.title`, key)}
                    </h4>
                    <p className="text-medium-gray text-xs leading-relaxed">
                      {t(`homepage.trust.${key}.desc`, "")}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resilience Section */}
      <section className="py-20 lg:py-28 bg-soft-green">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
            <FadeIn>
              <div>
                <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                  {t("homepage.resilience_subtitle", "Supply Chain Resilience")}
                </p>
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown mb-5">
                  {t(
                    "homepage.resilience_title",
                    "Your Safe Harbor in Global Ingredient Sourcing"
                  )}
                </h2>
                <p className="text-medium-gray text-lg leading-relaxed mb-6">
                  {t(
                    "homepage.resilience_description",
                    "Lecprima is a global B2B brand operated by Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. We operate our own manufacturing facility in Liaocheng, Shandong, China, providing global customers with reliable production, quality management and export services."
                  )}
                </p>
                <Link
                  href={QUALITY_LINK}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
                >
                  {t(
                    "homepage.verify_quality",
                    "Verify Quality & Traceability"
                  )}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 gap-4">
              {resilienceItemKeys.map((key, index) => {
                const Icon = resilienceItemIcons[index];
                return (
                  <FadeIn key={key} delay={index * 100}>
                    <div className="bg-white rounded-lg border border-earth-green/10 p-6 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full bg-earth-green/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-earth-green" />
                        </div>
                        <div>
                          <h3 className="font-heading font-semibold text-deep-brown text-lg mb-1">
                            {t(`homepage.resilience.${key}.title`, key)}
                          </h3>
                          <p className="text-medium-gray text-sm leading-relaxed">
                            {t(`homepage.resilience.${key}.desc`, "")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-dark-green">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-warm-ivory mb-4">
              {t("homepage.cta_title", "From Field to Formulation")}
            </h2>
            <p className="text-warm-ivory/70 text-lg max-w-2xl mx-auto mb-8">
              {t(
                "homepage.cta_description",
                "Precision controlled every step. Tell us about your product needs. Our agricultural and application engineers provide tailored recommendations for stable, long-term phospholipid sourcing."
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={INQUIRY_FORM_LINK}
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t("homepage.email_inquiry", "Email Inquiry")}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
