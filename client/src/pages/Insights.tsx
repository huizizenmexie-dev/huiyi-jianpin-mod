import { Link } from "wouter";
import { ArrowRight, ChevronRight, FileText } from "lucide-react";
import { INSIGHT_ARTICLES, insightRoute } from "@/content/insights";
import { usePageSEO } from "@/lib/usePageSEO";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

const HEADER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-soybean-harvest-4Swmtb4Bj6WCpQxs3QVKpV.webp";

export default function Insights() {
  const { locale } = useI18nContext();
  const readyArticles = INSIGHT_ARTICLES.filter((article) => article.localeStatus.en === "ready");

  usePageSEO({
    path: "/insights",
    title: "Soy Lecithin B2B Insights | Procurement and Application Guides",
    description:
      "Read practical soy lecithin sourcing, application, documentation and RFQ guides for feed, food, bakery, beverage and confectionery buyers.",
    keywords:
      "soy lecithin insights, lecithin procurement guide, feed lecithin buyer guide, food grade lecithin applications",
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
            <Link href={buildLocalizedPath(locale, "/")} className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">Insights</span>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-harvest-gold">
            Buyer Guides
          </p>
          <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
            Soy Lecithin Procurement and Application Insights
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/82 md:text-lg">
            Practical B2B notes for evaluating product forms, documentation, handling,
            application fit, and RFQ details using the published Lecprima product pages.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-white">
        <div className="container grid gap-6 py-8 md:grid-cols-[1fr_0.7fr] md:items-center">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-deep-brown">
              Application-led reading for procurement teams
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-medium-gray">
              These articles are written as safe selection guides. They connect buyers to real
              product pages and avoid unsupported claims about certifications, performance,
              pricing, stock, delivery time, or universal use rates.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-warm-ivory p-5">
            <p className="text-sm font-semibold text-deep-brown">Grounded sourcing context</p>
            <p className="mt-2 text-sm leading-relaxed text-medium-gray">
              Start with the application, product form, documentation need, destination,
              and quantity range before discussing samples or commercial terms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-18">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2">
            {readyArticles.map((article) => (
              <Link key={article.slug} href={buildLocalizedPath(locale, insightRoute(article.slug))}>
                <article className="group flex h-full flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-earth-green hover:shadow-lg">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-soft-green text-earth-green">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-medium-gray">
                      {article.ctaType === "application" ? "Application" : "Procurement"}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold leading-snug text-deep-brown transition-colors group-hover:text-earth-green">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-medium-gray">
                    {article.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.keywords.slice(0, 3).map((keyword) => (
                      <span key={keyword} className="rounded-full bg-warm-ivory px-3 py-1 text-xs text-medium-gray">
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-earth-green">
                    Read guide
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
