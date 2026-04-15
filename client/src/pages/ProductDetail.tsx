/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Product Detail: Tabs for Specifications / Applications & Pain Points, sticky CTA bar
 */
import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { ChevronRight, ArrowLeft, Mail, Phone, FileDown } from "lucide-react";
import { getProductBySlug } from "@/lib/productData";

const CONTACT_EMAIL_BASE = "mailto:jojowei@huiyijianpin.cn?subject=";
const WHATSAPP_LINK = "https://wa.me/8618646556618";
const PRODUCT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-lab-closeup-eEN2xCbwdBHhpnYpNTTntG.webp";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [activeTab, setActiveTab] = useState<"specs" | "apps">("specs");
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    setActiveTab("specs");
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
            Product Not Found
          </h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-earth-green hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const emailLink = `${CONTACT_EMAIL_BASE}${encodeURIComponent(
    `Inquiry - ${product.name} - Website`
  )}&body=${encodeURIComponent(
    `Please fill in:\nCompany:\nProduct: ${product.name}\nQuantity:\nMessage:`
  )}`;

  return (
    <div className="bg-warm-ivory">
      {/* Header */}
      <section className="pt-24 pb-8 bg-white border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-medium-gray mb-6">
            <Link href="/" className="hover:text-earth-green transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-earth-green transition-colors">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-deep-brown font-medium">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[320px] lg:h-[400px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = PRODUCT_IMG;
                }}
              />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown mb-2">
                {product.name}
              </h1>
              <p className="text-medium-gray text-lg mb-4">{product.subtitle}</p>

              {/* Quick Specs Bar */}
              <div className="bg-soft-green rounded-lg p-4 mb-6">
                <p className="text-sm font-mono text-earth-green font-medium">
                  {product.quickSpecs}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-medium-gray rounded-md hover:border-earth-green hover:text-earth-green transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Products
                </Link>
                <button
                  onClick={() => {
                    import("sonner").then(({ toast }) =>
                      toast.info("TDS document will be available for download soon.")
                    );
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-harvest-gold text-harvest-gold rounded-md hover:bg-harvest-gold hover:text-white transition-colors text-sm"
                >
                  <FileDown className="w-4 h-4" />
                  Download TDS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 lg:py-16">
        <div className="container">
          {/* Tab Headers */}
          <div className="flex border-b border-border mb-8">
            <button
              onClick={() => setActiveTab("specs")}
              className={`px-6 py-3 text-sm font-heading font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === "specs"
                  ? "border-earth-green text-earth-green"
                  : "border-transparent text-medium-gray hover:text-deep-brown"
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab("apps")}
              className={`px-6 py-3 text-sm font-heading font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === "apps"
                  ? "border-earth-green text-earth-green"
                  : "border-transparent text-medium-gray hover:text-deep-brown"
              }`}
            >
              Applications & Pain Points
            </button>
          </div>

          {/* Tab Content: Specifications */}
          {activeTab === "specs" && (
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-border">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, i) => (
                    <tr
                      key={i}
                      className={`${
                        i % 2 === 0 ? "bg-light-green/50" : "bg-white"
                      }`}
                    >
                      <td className="px-4 py-3 text-sm font-heading font-semibold text-deep-brown w-1/3 align-top">
                        {spec.label}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-medium-gray">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab Content: Applications */}
          {activeTab === "apps" && (
            <div className="space-y-4">
              {product.applications.map((app, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm border border-border"
                >
                  <h3 className="font-heading font-semibold text-deep-brown text-lg mb-3">
                    {app.industry}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        Pain Point
                      </p>
                      <p className="text-sm text-medium-gray">{app.painPoint}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        Recommended Product
                      </p>
                      <p className="text-sm text-earth-green font-medium">
                        {app.product}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        Dosage
                      </p>
                      <p className="text-sm font-mono text-medium-gray">
                        {app.dosage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-harvest-gold font-heading font-semibold mb-1">
                        Technical Effect
                      </p>
                      <p className="text-sm text-medium-gray">{app.effect}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sticky CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-border shadow-lg transition-transform duration-300 ${
          showStickyCta ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="container flex items-center justify-between py-3 gap-4">
          <p className="text-sm text-deep-brown font-medium hidden sm:block">
            {product.ctaText}
          </p>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href={emailLink}
              className="inline-flex items-center gap-2 px-4 py-2 bg-earth-green text-white text-sm font-medium rounded-md hover:bg-earth-green-dark transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Inquiry
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-earth-green text-earth-green text-sm font-medium rounded-md hover:bg-earth-green hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
