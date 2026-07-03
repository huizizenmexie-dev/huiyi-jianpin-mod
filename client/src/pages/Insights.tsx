import { Link } from "wouter";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import {
  INSIGHT_ARTICLES,
  getInsightContent,
  insightRoute,
} from "@/content/insights";
import { usePageSEO } from "@/lib/usePageSEO";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

const HEADER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-soybean-harvest-4Swmtb4Bj6WCpQxs3QVKpV.webp";

export default function Insights() {
  const { locale, t } = useI18nContext();
  const readyArticles = INSIGHT_ARTICLES.filter(
    article => article.localeStatus.en === "ready"
  );

  usePageSEO({
    path: "/insights",
    title: t(
      "insights_page.seo_title",
      "Phospholipid & Lecithin Insights | PC, PS and Food Formulation Guides"
    ),
    description: t(
      "insights_page.seo_description",
      "Read crawlable B2B guides on phosphatidylcholine, phosphatidylserine, lecithin, clean-label ingredients, functional beverages and food formulation."
    ),
    keywords: t(
      "insights_page.seo_keywords",
      "phospholipid insights, phosphatidylcholine guide, phosphatidylserine guide, lecithin procurement guide, functional food formulation"
    ),
    image: HEADER_IMG,
  });

  return (
    <main className="bg-warm-ivory">
      <section className="relative flex min-h-[300px] items-end overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HEADER_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="container relative pb-10">
          <nav className="mb-4 flex items-center gap-2 text-sm text-white/65">
            <Link
              href={buildLocalizedPath(locale, "/")}
              className="hover:text-white transition-colors"
            >
              {t("common.home", "Home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">
              {t("common.insights", "Insights")}
            </span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-harvest-gold">
            {t("insights_page.eyebrow", "Ingredient Guides")}
          </p>
          <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
            {t(
              "insights_page.hero_title",
              "Phospholipid, Lecithin and Functional Food Insights"
            )}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/82 md:text-lg">
            {t(
              "insights_page.hero_description",
              "Practical B2B guides for phosphatidylcholine, phosphatidylserine, lecithin, clean-label ingredients, functional beverages, and application-led formulation."
            )}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container grid gap-6 py-8 md:grid-cols-[1fr_0.7fr] md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-deep-brown">
              {t(
                "insights_page.intro_title",
                "Application-led reading for formulation and procurement teams"
              )}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-medium-gray">
              {t(
                "insights_page.intro_description",
                "These articles are written as safe selection guides. They connect buyers to real product pages and avoid unsupported claims about certifications, performance, pricing, stock, delivery time, or universal use rates."
              )}
            </p>
          </div>
          <div className="rounded-lg border border-border bg-warm-ivory p-5">
            <p className="text-sm font-semibold text-deep-brown">
              {t("insights_page.context_title", "Grounded sourcing context")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-medium-gray">
              {t(
                "insights_page.context_description",
                "Start with the application, product form, documentation need, destination, and quantity range before discussing samples or commercial terms."
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-18">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {readyArticles.map(article => {
              const content = getInsightContent(article, locale);
              if (!content) return null;

              return (
                <Link
                  key={article.slug}
                  href={buildLocalizedPath(
                    locale,
                    insightRoute(locale, article.slug)
                  )}
                >
                  <article className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-earth-green hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-soft-green text-earth-green">
                        <FileText className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-medium-gray">
                        {article.ctaType === "application"
                          ? t("insights_page.application_label", "Application")
                          : t("insights_page.procurement_label", "Procurement")}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-semibold leading-snug text-deep-brown transition-colors group-hover:text-earth-green">
                      {content.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-medium-gray">
                      {content.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {content.keywords.slice(0, 3).map(keyword => (
                        <span
                          key={keyword}
                          className="rounded-full bg-warm-ivory px-3 py-1 text-xs text-medium-gray"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-earth-green">
                      {t("insights_page.read_guide", "Read guide")}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
