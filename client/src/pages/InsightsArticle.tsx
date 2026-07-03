import { Fragment, type ReactNode } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, ChevronRight, Mail } from "lucide-react";
import {
  getInsightBySlug,
  getInsightContent,
  insightRoute,
  type InsightContentBlock,
} from "@/content/insights";
import { CONTACT } from "@/content/site";
import { usePageSEO } from "@/lib/usePageSEO";
import { getProductBySlug, type Product } from "@/lib/productData";
import {
  useI18nContext,
  buildLocalizedPath,
  buildLocalizedPublicPath,
} from "@/i18n";

const CTA_COPY = {
  application: {
    title: "Discuss This Application",
    body: "Share the target application, product form, estimated quantity, destination, and documentation needs so the sales team can discuss the appropriate next step.",
  },
  procurement: {
    title: "Send Your RFQ to Our Sales Team",
    body: "For a focused quotation discussion, include the product or grade, application, estimated quantity, packaging preference, destination, and target technical requirements.",
  },
  quality: {
    title: "Request Product Documentation",
    body: "Send the product route, application, and document list required by your quality team so the sales team can confirm what is available for review.",
  },
} as const;

const REVIEWED_BY =
  "Technical content reviewed by Huiyi Jianpin Product & Application Team";

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

function richText(text: string): ReactNode[] {
  const parts = text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean);

  return parts.map((part, index) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <strong key={`${part}-${index}`}>{bold[1]}</strong>;

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <a
          key={`${part}-${index}`}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-earth-green underline-offset-4 hover:underline"
        >
          {link[1]}
        </a>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function ArticleBlock({ block }: { block: InsightContentBlock }) {
  if (block.type === "paragraph") {
    return <p>{richText(block.text)}</p>;
  }

  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag
        className={
          block.ordered
            ? "list-decimal space-y-2 pl-5"
            : "list-disc space-y-2 pl-5"
        }
      >
        {block.items.map(item => (
          <li key={item}>{richText(item)}</li>
        ))}
      </Tag>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-warm-ivory text-deep-brown">
            <tr>
              {block.headers.map(header => (
                <th
                  key={header}
                  scope="col"
                  className="px-4 py-3 font-heading font-semibold"
                >
                  {richText(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-white">
            {block.rows.map((row, rowIndex) => (
              <tr key={`${row.join("|")}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="px-4 py-3 align-top"
                  >
                    {richText(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <ol className="space-y-2 pl-0 text-sm leading-6">
      {block.items.map(reference => (
        <li key={reference.text} className="list-none">
          {richText(reference.text)}
        </li>
      ))}
    </ol>
  );
}

export default function InsightsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getInsightBySlug(slug || "");
  const { locale } = useI18nContext();
  const content = getInsightContent(article, locale);

  usePageSEO({
    path: article ? insightRoute(locale, article.slug) : "/",
    title: content?.metaTitle,
    description: content?.metaDescription,
    keywords: content?.keywords.join(", "),
  });

  if (!article || !content) {
    return (
      <div className="min-h-screen bg-warm-ivory pt-24">
        <div className="container py-20">
          <h1 className="font-heading text-3xl font-bold text-deep-brown">
            Insight Not Found
          </h1>
          <Link
            href={buildLocalizedPath(locale, "/contact")}
            className="mt-6 inline-flex items-center gap-2 text-earth-green"
          >
            Contact Sales <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const cta = CTA_COPY[article.ctaType];
  const contactHref = buildLocalizedPublicPath(locale, "/contact#quoteForm");
  const mappedProducts = article.productSlugs
    .map(productSlug => getProductBySlug(productSlug))
    .filter((product): product is Product => Boolean(product));

  return (
    <article className="bg-warm-ivory pt-24">
      <header className="border-b border-border bg-white">
        <div className="container max-w-5xl py-10 lg:py-14">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-medium-gray">
            <Link
              href={buildLocalizedPath(locale, "/")}
              className="hover:text-earth-green"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={buildLocalizedPath(locale, "/insights")}
              className="hover:text-earth-green"
            >
              Insights
            </Link>
          </nav>
          <p className="mb-3 text-sm font-heading font-semibold uppercase tracking-widest text-harvest-gold">
            B2B Ingredient Insight
          </p>
          <h1 className="max-w-4xl font-heading text-4xl font-bold leading-tight text-deep-brown lg:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-medium-gray">
            {content.summary}
          </p>
          <p className="mt-4 text-sm font-medium text-medium-gray">
            {REVIEWED_BY}
          </p>
        </div>
      </header>

      <div className="container grid max-w-6xl grid-cols-1 gap-8 py-10 lg:grid-cols-[1fr_320px] lg:py-14">
        <div className="space-y-8">
          <section className="rounded-lg border border-border bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-semibold text-deep-brown">
              Search Intent
            </h2>
            <p className="mt-3 leading-relaxed text-medium-gray">
              {content.intent}
            </p>
          </section>

          {content.sections.map(section => (
            <section
              key={section.heading}
              className="rounded-lg border border-border bg-white p-6 shadow-sm lg:p-8"
            >
              <h2 className="font-heading text-2xl font-bold text-deep-brown">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-medium-gray">
                {section.blocks.map((block, index) => (
                  <ArticleBlock
                    key={`${section.heading}-${index}`}
                    block={block}
                  />
                ))}
              </div>
            </section>
          ))}

          <section className="rounded-lg border border-earth-green/25 bg-soft-green p-6 lg:p-8">
            <h2 className="font-heading text-2xl font-bold text-deep-brown">
              {cta.title}
            </h2>
            <p className="mt-3 leading-7 text-medium-gray">{cta.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={mailtoFor(content.title)}
                className="inline-flex items-center gap-2 rounded-md bg-earth-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-earth-green-dark"
              >
                <Mail className="h-4 w-4" /> Email Sales
              </a>
              <a
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-4 py-2.5 text-sm font-semibold text-deep-brown hover:border-earth-green hover:text-earth-green"
              >
                Request a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-harvest-gold">
              Related Products
            </h2>
            <div className="mt-4 space-y-3">
              {mappedProducts.map(product => (
                <Link
                  key={product.slug}
                  href={buildLocalizedPath(locale, `/products/${product.slug}`)}
                  className="block rounded-md border border-border p-3 text-sm hover:border-earth-green hover:bg-soft-green"
                >
                  <span className="font-heading font-semibold text-deep-brown">
                    {product.name}
                  </span>
                  <span className="mt-1 block text-medium-gray">
                    {product.form}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-white p-5 shadow-sm">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-harvest-gold">
              Related Insights
            </h2>
            <div className="mt-4 space-y-3">
              {article.relatedSlugs.map(relatedSlug => {
                const related = getInsightBySlug(relatedSlug);
                const relatedContent = getInsightContent(related, locale);
                if (!related || !relatedContent) return null;
                return (
                  <Link
                    key={relatedSlug}
                    href={buildLocalizedPath(
                      locale,
                      insightRoute(locale, related.slug)
                    )}
                    className="block text-sm font-medium text-earth-green hover:underline"
                  >
                    {relatedContent.title}
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
