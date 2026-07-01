/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Layout: Sticky nav (transparent→ivory), dark green footer, floating contact button
 */
import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { productListingNames } from "@/lib/productData";
import {
  ChevronDown,
  Menu,
  X,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18nContext } from "@/i18n";

const QUOTE_FORM_LINK = "/contact#quoteForm";
const INQUIRY_FORM_LINK = "/contact#inquiryForm";
const WHATSAPP_LINK = "https://wa.me/8618646556618";

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [location] = useLocation();
  const { isRTL, t } = useI18nContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProdOpen(false);
  }, [location]);

  const navLinks = [
    { label: t("common.home", "Home"), href: "/" },
    { label: t("common.products", "Products"), href: "/products", dropdown: true },
    { label: t("common.industry_solutions", "Industry Solutions"), href: "/industry-solutions" },
    { label: t("common.quality", "Quality"), href: "/quality" },
    { label: t("common.about", "About"), href: "/about" },
    { label: t("common.contact", "Contact"), href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-warm-ivory/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      style={
        scrolled
          ? { backgroundColor: "rgba(245, 242, 235, 0.95)" }
          : undefined
      }
    >
      <nav className={`container flex items-center justify-between h-16 lg:h-18 ${isRTL ? "flex-row-reverse" : ""}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <span className="font-heading font-semibold text-deep-brown text-base lg:text-lg tracking-tight">
            Huiyi Jianpin
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-body font-medium transition-colors rounded-md ${
                    location.startsWith("/products")
                      ? "text-earth-green"
                      : "text-deep-brown hover:text-earth-green"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className={`absolute top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${isRTL ? "right-0" : "left-0"}`}>
                  <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-[260px]">
                    {productListingNames.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="block px-4 py-2 text-sm text-deep-brown hover:bg-soft-green hover:text-earth-green transition-colors"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-body font-medium transition-colors rounded-md ${
                  location === link.href
                    ? "text-earth-green"
                    : "text-deep-brown hover:text-earth-green"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA + Language Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={QUOTE_FORM_LINK}
            className="inline-flex items-center gap-2 px-4 py-2 bg-earth-green text-white text-sm font-medium rounded-md hover:bg-earth-green-dark transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get a Quote
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-deep-brown"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border shadow-lg">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <button
                    onClick={() => setProdOpen(!prodOpen)}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-deep-brown"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        prodOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {prodOpen && (
                    <div className="pl-4 space-y-0.5">
                      <Link
                        href="/products"
                        className="block px-3 py-2 text-sm text-medium-gray hover:text-earth-green"
                      >
                        All Products
                      </Link>
                      {productListingNames.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/products/${p.slug}`}
                          className="block px-3 py-2 text-sm text-medium-gray hover:text-earth-green"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-deep-brown hover:text-earth-green"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <a
              href={QUOTE_FORM_LINK}
              className="flex items-center justify-center gap-2 mt-3 px-4 py-2.5 bg-earth-green text-white text-sm font-medium rounded-md"
            >
              <Mail className="w-4 h-4" />
              Get a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Footer ─── */
function Footer() {
  const { t, isRTL } = useI18nContext();

  const quickLinks = [
    { label: t("common.home", "Home"), href: "/" },
    { label: t("common.products", "Products"), href: "/products" },
    { label: t("common.industry_solutions", "Industry Solutions"), href: "/industry-solutions" },
    { label: t("common.quality", "Quality"), href: "/quality" },
    { label: t("common.about", "About"), href: "/about" },
    { label: t("common.contact", "Contact"), href: "/contact" },
  ];

  const certs = ["ISO 22000", "FSSC 22000", "HACCP", "Halal", "Non-GMO IP"];

  return (
    <footer className="bg-dark-green text-warm-ivory">
      <div className="container py-12 lg:py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 ${isRTL ? "text-right" : ""}`}>
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-heading font-semibold text-warm-ivory text-lg">
                Huiyi Jianpin
              </span>
            </div>
            <p className="text-sm text-warm-ivory/70 leading-relaxed">
              {t("footer.company_name", "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.")}
            </p>
            <p className="text-xs text-warm-ivory/50 mt-2">
              {t("footer.tagline", "From Black Soil to Global Health.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-harvest-gold mb-4">
              {t("footer.quick_links", "Quick Links")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-harvest-gold mb-4">
              {t("footer.contact", "Contact")}
            </h4>
            <ul className="space-y-2 text-sm text-warm-ivory/70">
              <li>+86 18646556618</li>
              <li>jojowei@huiyijianpin.cn</li>
              <li className="pt-1">{t("footer.location_harbin", "Harbin (HQ)")}</li>
              <li>{t("footer.location_liaocheng", "Liaocheng (Factory)")}</li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-harvest-gold mb-4">
              {t("footer.certifications", "Certifications")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {certs.map((c) => (
                <span
                  key={c}
                  className="inline-block px-2.5 py-1 text-xs font-medium border border-harvest-gold/40 text-harvest-gold rounded"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-warm-ivory/10 text-center text-xs text-warm-ivory/40">
          &copy; {new Date().getFullYear()} {t("footer.copyright", "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. All rights reserved.")}
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating Contact Button ─── */
function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="mb-3 bg-white rounded-xl shadow-xl border border-border p-3 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <a
            href={INQUIRY_FORM_LINK}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-soft-green transition-colors"
          >
            <Mail className="w-5 h-5 text-earth-green" />
            <span className="text-sm font-medium text-deep-brown">Email Inquiry</span>
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-soft-green transition-colors"
          >
            <Phone className="w-5 h-5 text-earth-green" />
            <span className="text-sm font-medium text-deep-brown">WhatsApp</span>
          </a>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-soft-green transition-colors cursor-default">
            <MessageCircle className="w-5 h-5 text-earth-green" />
            <span className="text-sm font-medium text-deep-brown">WeChat: +86 18646556618</span>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${
          open
            ? "bg-deep-brown text-white rotate-45"
            : "bg-earth-green text-white hover:bg-earth-green-dark hover:shadow-xl"
        }`}
        aria-label="Contact options"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

/* ─── Layout ─── */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
