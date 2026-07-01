/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * About page: Company intro, animated counters, philosophy, locations
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { MapPin, Eye, ShieldCheck, ChevronRight } from "lucide-react";
import { usePageSEO, buildBreadcrumbSchema } from "@/lib/usePageSEO";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

const GMP_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/about-company-scene-4hr3U7uoXgBrhJqFUv3tiL.webp";
const QUALITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-lab-closeup-eEN2xCbwdBHhpnYpNTTntG.webp";

function useCounter(end: number, suffix = "", duration = 2000) {
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

  return { count, ref, suffix };
}

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

export default function About() {
  const { t, locale } = useI18nContext();
  const counter1 = useCounter(7000, "㎡");
  const counter2 = useCounter(3, "");
  const counter3 = useCounter(10000, "T");
  const counter4 = useCounter(100, "%");

  // Apply unified SEO
  usePageSEO({
    title: t("about_page.seo_title", "About Huiyi Jianpin | Stable Phospholipid Manufacturer from China"),
    description: t("about_page.seo_description", "Learn how Huiyi Jianpin connects Heilongjiang Non-GMO soybean sourcing with GMP-standard phospholipid production for stable, traceable global supply."),
    keywords: t("about_page.seo_keywords", "Huiyi Jianpin manufacturer, stable phospholipid manufacturer China, Non-GMO soybean sourcing, GMP soy lecithin factory, reliable lecithin supplier"),
    path: "/about",
    image: GMP_IMG,
    jsonLd: [
      buildBreadcrumbSchema([
        { name: t("common.home", "Home"), path: "/" },
        { name: t("common.about", "About"), path: "/about" },
      ], locale),
    ],
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${GMP_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative container pb-12">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href={buildLocalizedPath(locale, "/")} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">About Us</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white">
            About Huiyi Jianpin
          </h1>
          <p className="text-harvest-gold font-heading font-medium text-lg mt-2">
            Rooted in black soil. Built for stable global supply.
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 lg:py-28 bg-warm-ivory">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <div>
                <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                  Our Story
                </p>
                <h2 className="font-heading font-bold text-3xl text-deep-brown mb-6">
                  From China's Premier Soybean Belt to the World
                </h2>
                <div className="space-y-4 text-medium-gray leading-relaxed">
                  <p>
                    Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. originates from China's premier non-GMO soybean belt — Heilongjiang Province. We are a modern agricultural technology enterprise integrating deep processing of soybeans, R&D of high-purity phospholipid derivatives, production, and global distribution.
                  </p>
                  <p>
                    Huiyi Jianpin connects Heilongjiang Non-GMO soybean sourcing with GMP-standard phospholipid production, helping global buyers reduce procurement uncertainty through reliable capacity, traceable raw materials, and verified quality documentation.
                  </p>
                  <p>
                    Headquartered in Harbin, our 7,000㎡ GMP-certified manufacturing facility is located in Liaocheng, Shandong Province, operating three independent computer-controlled automated production lines with an annual processing capacity of 10,000 tons for soy lecithin series products.
                  </p>
                  <p>
                    We maintain full quality control from seed to shipment: raw materials sourced from Heilongjiang Non-GMO Identity Preserved (IP) farms; production executed under ISO 22000, FSSC 22000, and HACCP systems. Every batch undergoes rigorous testing for Acetone Insoluble, Acid Value, Peroxide Value, and Heavy Metals, with traceable Certificates of Analysis provided.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={QUALITY_IMG}
                  alt="Quality control technician verifying traceable phospholipid supply"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Animated Counters */}
      <section className="py-16 bg-earth-green">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { ...counter1, label: "GMP Workshop" },
              { ...counter2, label: "Automated Production Lines", suffix: "" },
              { ...counter3, label: "Annual Capacity (Tons)" },
              { ...counter4, label: "Batch Traceability" },
            ].map((item, i) => (
              <div key={i} ref={item.ref} className="text-center">
                <div className="font-heading font-bold text-4xl md:text-5xl text-white mb-2">
                  {item.count.toLocaleString()}
                  <span className="text-harvest-gold text-2xl ml-1">
                    {i === 0 ? "㎡" : i === 2 ? "T" : i === 3 ? "%" : ""}
                  </span>
                </div>
                <p className="text-white/70 text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="py-20 lg:py-28 bg-soft-green">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Our Philosophy
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Guided by Purpose
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            <FadeIn delay={100} className="h-full">
              <div className="h-full min-h-[240px] bg-white rounded-xl p-8 shadow-sm border border-earth-green/10 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-earth-green/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-earth-green" />
                </div>
                <h3 className="font-heading font-semibold text-deep-brown text-xl mb-3">
                  Vision
                </h3>
                <p className="text-medium-gray leading-relaxed">
                  Unlocking the full value of every Heilongjiang soybean for global health industries while supporting secure, long-term ingredient sourcing.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="h-full">
              <div className="h-full min-h-[240px] bg-white rounded-xl p-8 shadow-sm border border-earth-green/10 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-earth-green/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-earth-green" />
                </div>
                <h3 className="font-heading font-semibold text-deep-brown text-xl mb-3">
                  Quality Policy
                </h3>
                <p className="text-medium-gray leading-relaxed">
                  Standards define quality. Every batch tested. Every batch traceable. Every shipment documented for procurement confidence.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-28 bg-warm-ivory">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Our Presence
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Locations
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
            <FadeIn delay={100} className="h-full">
              <div className="h-full min-h-[220px] bg-white rounded-xl p-8 shadow-sm border border-earth-green/10 text-center flex flex-col items-center justify-center">
                <MapPin className="w-8 h-8 text-earth-green mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-deep-brown text-lg mb-2">
                  Headquarters & Sourcing Base
                </h3>
                <p className="text-medium-gray">
                  Harbin, Heilongjiang Province, China
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="h-full">
              <div className="h-full min-h-[220px] bg-white rounded-xl p-8 shadow-sm border border-earth-green/10 text-center flex flex-col items-center justify-center">
                <MapPin className="w-8 h-8 text-earth-green mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-deep-brown text-lg mb-2">
                  Manufacturing Facility
                </h3>
                <p className="text-medium-gray">
                  Liaocheng, Shandong Province, China (GMP Standard)
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
