/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Products listing: Filter bar, product cards in grid
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight } from "lucide-react";
import { products, filterCategories } from "@/lib/productData";
import { usePageSEO, buildBreadcrumbSchema } from "@/lib/usePageSEO";
import { useI18nContext, buildLocalizedPath } from "@/i18n";
import { buildPublicAssetPath } from "@/content/url";

const HEADER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-soybean-harvest-4Swmtb4Bj6WCpQxs3QVKpV.webp";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { t, locale } = useI18nContext();

  // Apply unified SEO
  usePageSEO({
    title: t("products_page.seo_title", "Soy Lecithin & Phospholipid Products | Stable B2B Supply"),
    description: t("products_page.seo_description", "Explore soy lecithin, phosphatidylcholine, phosphatidylserine, soy protein and dietary fiber systems from Lecprima, built for reliable sourcing and global B2B supply."),
    keywords: t("products_page.seo_keywords", "soy lecithin products, phospholipid systems, phosphatidylcholine supplier, phosphatidylserine supplier, reliable lecithin sourcing, stable B2B ingredient supply"),
    path: "/products",
    image: HEADER_IMG,
    jsonLd: [
      buildBreadcrumbSchema([
        { name: t("common.home", "Home"), path: "/" },
        { name: t("common.products", "Products"), path: "/products" },
      ], locale),
    ],
  });

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.category.includes(activeFilter));

  return (
    <div>
      {/* Header */}
      <section className="relative h-[35vh] min-h-[280px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HEADER_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative container pb-10">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href={buildLocalizedPath(locale, "/")} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Products</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Select Lecithin & Phospholipids by Application Problem
          </h1>
          <p className="text-harvest-gold font-heading font-medium text-lg mt-2">
            Compare form, specification, documentation and validation fit.
          </p>
        </div>
      </section>

      {/* Intro + Filter */}
      <section className="py-8 bg-warm-ivory border-b border-border sticky top-16 z-30 backdrop-blur-sm" style={{ backgroundColor: "rgba(245, 242, 235, 0.95)" }}>
        <div className="container">
          <p className="text-medium-gray text-sm mb-4 max-w-3xl">
            Start with the formulation or procurement problem, then compare form, grade, specification, documentation and buyer-side validation needs. Each product page keeps core specs and application context visible for QA, R&D and purchasing review.
          </p>
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-earth-green text-white"
                    : "bg-white text-medium-gray border border-border hover:border-earth-green hover:text-earth-green"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 lg:py-20 bg-warm-ivory">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={i * 60}>
                <Link href={buildLocalizedPath(locale, `/products/${product.slug}`)}>
                  <div className="group bg-white rounded-lg overflow-hidden border border-transparent hover:border-earth-green shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={buildPublicAssetPath(product.image)}
                        alt={`${product.name} for application-led ingredient evaluation`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading font-semibold text-deep-brown text-lg mb-1 group-hover:text-earth-green transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-medium-gray text-sm mb-3 line-clamp-2">
                        {product.subtitle}
                      </p>
                      {product.applications[0] && (
                        <p className="text-xs leading-relaxed text-medium-gray mb-3">
                          <span className="font-heading font-semibold text-deep-brown">
                            Problem fit:
                          </span>{" "}
                          {product.applications[0].painPoint}
                        </p>
                      )}
                      <div className="mt-auto pt-3 border-t border-border">
                        <p className="text-xs font-mono text-earth-green font-medium">
                          {product.listingSpecs}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mt-3 text-earth-green text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-medium-gray">No products match this filter.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
