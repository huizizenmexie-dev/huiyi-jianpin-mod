import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { getProductListingNames } from "@/lib/productData";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import Brand from "./Brand";
import {
  useI18nContext,
  buildLocalizedPath,
  buildLocalizedPublicPath,
  getPathWithoutLocale,
} from "@/i18n";
import { CONTACT } from "@/content/site";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [location] = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { isRTL, t, locale } = useI18nContext();
  const productListingNames = getProductListingNames(locale);
  const route = getPathWithoutLocale(location);
  const quoteLink = buildLocalizedPublicPath(locale, "/contact#quoteForm");
  const navLinks = [
    { label: t("common.home", "Home"), path: "/" },
    {
      label: t("common.products", "Products"),
      path: "/products",
      dropdown: true,
    },
    {
      label: t("common.industry_solutions", "Industry Solutions"),
      path: "/industry-solutions",
    },
    { label: t("common.quality", "Quality"), path: "/quality" },
    { label: t("common.insights", "Insights"), path: "/insights" },
    { label: t("common.about", "About"), path: "/about" },
    { label: t("common.contact", "Contact"), path: "/contact" },
  ];
  const isActive = (path: string) =>
    path === "/"
      ? route === "/"
      : route.startsWith(`${path}/`) || route === path;

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        setMobileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [mobileOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <nav
        className="container header-inner"
        aria-label={t("footer.quick_links", "Quick Links")}
      >
        <Link
          href={buildLocalizedPath(locale, "/")}
          className="brand-home"
          aria-label={`Lecprima — ${t("common.home", "Home")}`}
        >
          <Brand />
        </Link>
        <div className="desktop-navigation">
          {navLinks.map(link =>
            link.dropdown ? (
              <DropdownMenu key={link.path} dir={isRTL ? "rtl" : "ltr"}>
                <DropdownMenuTrigger
                  className={`nav-link ${isActive(link.path) ? "is-active" : ""}`}
                >
                  {link.label}
                  <ChevronDown size={13} aria-hidden="true" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={15}
                  className="product-nav-dropdown"
                >
                  <DropdownMenuItem asChild>
                    <Link
                      href={buildLocalizedPath(locale, "/products")}
                      className="font-semibold"
                    >
                      {t("common.all_products", "All Products")}
                      <ArrowRight
                        size={15}
                        className="ms-auto directional-arrow"
                      />
                    </Link>
                  </DropdownMenuItem>
                  {productListingNames.map(product => (
                    <DropdownMenuItem key={product.slug} asChild>
                      <Link
                        href={buildLocalizedPath(
                          locale,
                          `/products/${product.slug}`
                        )}
                      >
                        {product.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.path}
                href={buildLocalizedPath(locale, link.path)}
                className={`nav-link ${isActive(link.path) ? "is-active" : ""}`}
                aria-current={isActive(link.path) ? "page" : undefined}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
        <div className="header-actions">
          <LanguageSwitcher />
          <a href={quoteLink} className="button-primary header-quote">
            {t("common.get_a_quote", "Get a Quote")}
            <ArrowUpRight size={15} className="directional-arrow" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen(open => !open)}
            className="mobile-menu-toggle"
            aria-label={
              mobileOpen
                ? t("common.close_menu", "Close menu")
                : t("common.open_menu", "Open menu")
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label={t("footer.quick_links", "Quick Links")}
        >
          <div className="container">
            {navLinks.map(link =>
              link.dropdown ? (
                <div key={link.path}>
                  <div className="mobile-product-navigation">
                    <Link
                      href={buildLocalizedPath(locale, link.path)}
                      className="mobile-nav-link"
                      aria-current={isActive(link.path) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setProductsOpen(open => !open)}
                      className="mobile-product-toggle"
                      aria-expanded={productsOpen}
                      aria-controls="mobile-product-links"
                      aria-label={t("common.all_products", "All Products")}
                    >
                      <ChevronDown
                        size={19}
                        className={productsOpen ? "rotate-180" : ""}
                      />
                    </button>
                  </div>
                  {productsOpen && (
                    <div
                      id="mobile-product-links"
                      className="mobile-product-links"
                    >
                      {productListingNames.map(product => (
                        <Link
                          key={product.slug}
                          href={buildLocalizedPath(
                            locale,
                            `/products/${product.slug}`
                          )}
                        >
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  href={buildLocalizedPath(locale, link.path)}
                  className="mobile-nav-link"
                  aria-current={isActive(link.path) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={quoteLink}
              onClick={() => setMobileOpen(false)}
              className="button-primary mobile-quote"
            >
              {t("common.get_a_quote", "Get a Quote")}
              <ArrowUpRight size={17} className="directional-arrow" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  const { t, locale } = useI18nContext();
  const links = [
    { label: t("common.products", "Products"), path: "/products" },
    {
      label: t("common.industry_solutions", "Industry Solutions"),
      path: "/industry-solutions",
    },
    { label: t("common.quality", "Quality"), path: "/quality" },
    { label: t("common.insights", "Insights"), path: "/insights" },
    { label: t("common.about", "About"), path: "/about" },
    { label: t("common.contact", "Contact"), path: "/contact" },
  ];
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Link
              href={buildLocalizedPath(locale, "/")}
              aria-label={`Lecprima — ${t("common.home", "Home")}`}
            >
              <Brand light />
            </Link>
            <p className="footer-brand-statement">
              {t(
                "footer.brand_statement",
                "Lecprima is a global B2B brand operated by Harbin Huiyi Jianpin Import & Export Trade Co., Ltd."
              )}
            </p>
          </div>
          <div>
            <h2 className="footer-heading">
              {t("footer.quick_links", "Quick Links")}
            </h2>
            <ul className="footer-links">
              {links.map(link => (
                <li key={link.path}>
                  <Link href={buildLocalizedPath(locale, link.path)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-heading">{t("footer.contact", "Contact")}</h2>
            <ul className="footer-links footer-contact-links">
              <li>
                <a href={`mailto:${CONTACT.email}`}>
                  <Mail size={15} aria-hidden="true" />
                  <span dir="ltr">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                  <Phone size={15} aria-hidden="true" />
                  <span dir="ltr">{CONTACT.phone}</span>
                </a>
              </li>
              <li className="footer-locations">
                {t("footer.location_harbin", "Harbin (HQ)")}
                <br />
                {t("footer.location_liaocheng", "Liaocheng (Factory)")}
              </li>
            </ul>
          </div>
          <div className="footer-documentation">
            <FileIcon />
            <h2 className="footer-heading">
              {t("homepage.hero_badges.clear_specs", "Clear Specs")}.{" "}
              {t("homepage.hero_badges.batch_coa", "Batch COA")}.
            </h2>
            <Link
              href={buildLocalizedPath(locale, "/quality")}
              className="footer-document-link"
            >
              {t("homepage.verify_quality", "Review Quality Documents")}
              <ArrowUpRight size={18} className="directional-arrow" />
            </Link>
            <a
              href={buildLocalizedPublicPath(locale, "/contact#quoteForm")}
              className="footer-document-link"
            >
              {t("common.get_a_quote", "Get a Quote")}
              <ArrowUpRight size={18} className="directional-arrow" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {t(
              "footer.copyright",
              "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. All rights reserved."
            )}
          </p>
          <span>
            {t("homepage.hero_title_line1", "Make Every")}{" "}
            {t("homepage.hero_title_line2", "Batch Perform")}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FileIcon() {
  return (
    <svg
      width="27"
      height="32"
      viewBox="0 0 27 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4 1h13l9 9v21H1V4a3 3 0 0 1 3-3Z" stroke="currentColor" />
      <path d="M17 1v9h9M7 17h13M7 22h13" stroke="currentColor" />
    </svg>
  );
}

function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { t, locale } = useI18nContext();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const detailRoute = /^\/products\/[^/]+\/?$/.test(
    getPathWithoutLocale(location)
  );

  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`floating-contact ${detailRoute ? "floating-contact-with-bar" : ""}`}
    >
      {open && (
        <div id="floating-contact-options" className="floating-contact-panel">
          <a
            href={buildLocalizedPublicPath(locale, "/contact#inquiryForm")}
            onClick={() => setOpen(false)}
          >
            <Mail size={19} />
            <span>{t("contact_page.email_inquiry", "Email Inquiry")}</span>
          </a>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
            <Phone size={19} />
            <span>{t("common.whatsapp", "WhatsApp")}</span>
          </a>
          <p>
            <MessageCircle size={19} />
            <span>{t("common.wechat_contact", "WeChat: +86 18646556618")}</span>
          </p>
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(value => !value)}
        className="floating-contact-button"
        aria-expanded={open}
        aria-controls="floating-contact-options"
        aria-label={t("common.contact_options", "Contact options")}
      >
        {open ? <X size={23} /> : <MessageCircle size={23} />}
      </button>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-layout">
      <Navbar />
      <main id="main-content" className="site-main">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
