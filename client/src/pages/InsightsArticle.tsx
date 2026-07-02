import { Link, useParams } from "wouter";
import { ArrowRight, ChevronRight, Mail, Phone } from "lucide-react";
import { getInsightBySlug, insightRoute } from "@/content/insights";
import { CONTACT } from "@/content/site";
import { usePageSEO } from "@/lib/usePageSEO";
import { getProductBySlug, type Product } from "@/lib/productData";
import { useI18nContext, buildLocalizedPath, buildLocalizedPublicPath } from "@/i18n";

const CTA_COPY = {
  application: {
    title: "Discuss Your Application and Request a Quote",
    body:
      "Contact our sales team by email or WhatsApp. Please share the product or grade, intended application, estimated quantity, destination country or port, and any target specification. After requirements are confirmed, we can discuss technical documents, sample arrangements, quotation, contract terms, and shipment.",
  },
  procurement: {
    title: "Send Your RFQ to Our Sales Team",
    body:
      "For a more accurate quotation, please provide the product name or grade, application, estimated quantity, packaging preference, destination, and target technical requirements.",
  },
} as const;

function mailtoFor(title: string) {
  const subject = `RFQ - ${title}`;
  const body = [
    "Please share:",
    "Company:",
    "Product or grade:",
    "Application:",
    "Estimated quantity:",
    "Packaging preference:",
    "Destination country or port:",
    "Target technical requirements:",
  ].join("\n");
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function InsightsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getInsightBySlug(slug || "");
  const { locale } = useI18nContext();

  usePageSEO({
    path: article ? insightRoute(article.slug) : "/",
    title: article?.metaTitle,
    description: article?.metaDescription,
    keywords: article?.keywords.join(", "),
  });

  if (!article) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-24">
        <div className="container py-20">
          <h1 className="font-heading text-3xl font-bold text-deep-brown">Insight Not Found</h1>
          <Link href={buildLocalizedPath(locale, "/contact")} className="mt-6 inline-flex items-center gap-2 text-earth-green">
            Contact Sales <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const isReadyEnglish = locale === "en" && article.localeStatus.en === "ready";
  const cta = CTA_COPY[article.ctaType];
  const contactHref = buildLocalizedPublicPath(locale, "/contact#quoteForm");
  const mappedProducts = article.productSlugs
    .map((productSlug) => getProductBySlug(productSlug))
    .filter((product): product is Product => Boolean(product));
  const productNames = mappedProducts.map((product) => product.name).join(", ");

  if (!isReadyEnglish) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-24">
        <div className="container max-w-3xl py-20">
          <nav className="mb-6 flex items-center gap-2 text-sm text-medium-gray">
            <Link href={buildLocalizedPath(locale, "/")} className="hover:text-earth-green">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-deep-brown">Insights</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold text-deep-brown">Translation in Review</h1>
          <p className="mt-4 text-medium-gray">
            This insight translation is not yet approved for publication. Please use the English article or contact our sales team for product and documentation questions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={buildLocalizedPath("en", insightRoute(article.slug))} className="inline-flex items-center gap-2 rounded-md bg-earth-green px-4 py-2.5 text-sm font-semibold text-white">
              Read English Article <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={buildLocalizedPath(locale, "/contact")} className="inline-flex items-center gap-2 rounded-md border border-earth-green px-4 py-2.5 text-sm font-semibold text-earth-green">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-warm-ivory pt-24">
      <header className="border-b border-border bg-white">
        <div className="container max-w-5xl py-10 lg:py-14">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-medium-gray">
            <Link href={buildLocalizedPath(locale, "/")} className="hover:text-earth-green">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-deep-brown">Insights</span>
          </nav>
          <p className="mb-3 text-sm font-heading font-semibold uppercase tracking-widest text-harvest-gold">
            B2B SEO Insights
          </p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-deep-brown lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-medium-gray">{article.summary}</p>
        </div>
      </header>

      <div className="container grid max-w-6xl grid-cols-1 gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <div className="space-y-8">
          <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-deep-brown">Search Intent</h2>
            <p className="mt-3 leading-relaxed text-medium-gray">{article.intent}</p>
          </section>

          {article.sections.map((section) => (
            <section key={section.heading} className="rounded-lg border border-border bg-white p-6 shadow-sm lg:p-8">
              <h2 className="font-heading text-2xl font-bold text-deep-brown">{section.heading}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-medium-gray">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg border border-border bg-white p-6 shadow-sm lg:p-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown">RFQ details that make the supplier discussion useful</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-medium-gray">
              <p>
                For this topic, the RFQ should name the application and the real product pages being considered: {productNames}. That keeps the discussion attached to published product records instead of a broad ingredient label that may mean different forms, packaging units, or handling routes.
              </p>
              <p>
                Include the estimated quantity, packaging preference, destination country or port, target specification, and any document list required by the buyer's quality team. These details do not create a price, stock, delivery, or sample commitment; they simply give the sales team enough context to discuss an appropriate next step.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-white p-6 shadow-sm lg:p-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown">Quality and documentation review before approval</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-medium-gray">
              <p>
                Procurement, formulation, quality, and logistics teams should review the same product route before approval. The product page gives the shared reference point, while the inquiry confirms whether the needed specification, COA format, safety document, packing information, and storage guidance are available for the selected grade.
              </p>
              <p>
                If the buyer requires a certification, origin statement, allergen position, regulatory statement, or destination-specific document, that requirement should be requested directly. It should not be inferred from a category name, a related application article, or another product form.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-white p-6 shadow-sm lg:p-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown">Validation boundaries for this application</h2>
            <div className="mt-4 space-y-4 text-base leading-7 text-medium-gray">
              <p>
                This guide is written for B2B sourcing and application discussion. It does not replace buyer-side trials, regulatory review, label review, or finished-product testing. Any processing result depends on the complete formulation, equipment, process order, storage condition, and quality standard used by the buyer.
              </p>
              <p>
                The safest next step is to share the application brief and target requirement through the Contact page. After requirements are confirmed, Lecprima can discuss available technical documents, sample arrangements, quotation, contract terms, and shipment without publishing unsupported promises on the article page.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-earth-green/25 bg-soft-green p-6 lg:p-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown">{cta.title}</h2>
            <p className="mt-3 leading-7 text-medium-gray">{cta.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mailtoFor(article.title)} className="inline-flex items-center gap-2 rounded-md bg-earth-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-earth-green-dark">
                <Mail className="h-4 w-4" /> Email Sales
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-earth-green px-4 py-2.5 text-sm font-semibold text-earth-green hover:bg-earth-green hover:text-white">
                <Phone className="h-4 w-4" /> WhatsApp Sales
              </a>
              <a href={contactHref} className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-deep-brown hover:border-earth-green hover:text-earth-green">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-harvest-gold">Related Products</h2>
            <div className="mt-4 space-y-3">
              {mappedProducts.map((product) => {
                return (
                  <Link key={product.slug} href={buildLocalizedPath(locale, `/products/${product.slug}`)} className="block rounded-md border border-border p-3 text-sm hover:border-earth-green hover:bg-soft-green">
                    <span className="font-heading font-semibold text-deep-brown">{product.name}</span>
                    <span className="mt-1 block text-medium-gray">{product.form}</span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-harvest-gold">Related Insights</h2>
            <div className="mt-4 space-y-3">
              {article.relatedSlugs.map((relatedSlug) => {
                const related = getInsightBySlug(relatedSlug);
                if (!related) return null;
                return (
                  <Link key={relatedSlug} href={buildLocalizedPath(locale, insightRoute(related.slug))} className="block text-sm font-medium text-earth-green hover:underline">
                    {related.title}
                  </Link>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
