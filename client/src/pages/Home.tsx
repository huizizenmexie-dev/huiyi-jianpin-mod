/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Home page: Hero with soybean field, industry grid, product systems, trust layer, footer CTA
 */
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mail,
  Phone,
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
} from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/hero-soybean-field-5mhsgZ9cxNzY2H9xAgjcJ4.webp";
const INQUIRY_FORM_LINK = "/contact#inquiryForm";
const WHATSAPP_LINK = "https://wa.me/8618646556618";
const HOME_SEO_TITLE = "Soy Lecithin & Phospholipids | Huiyi Jianpin";
const HOME_SEO_DESCRIPTION =
  "ISO 22000 certified soy lecithin, phospholipids, soy protein and fiber from Heilongjiang with traceable sourcing and global B2B supply.";
const HOME_SEO_KEYWORDS =
  "soy lecithin, phospholipids, phosphatidylcholine, phosphatidylserine, soy protein isolate, soy dietary fiber, Huiyi Jianpin";

const industries = [
  { icon: Candy, title: "Chocolate & Confectionery", desc: "Viscosity reduction, bloom control, cocoa butter savings" },
  { icon: Milk, title: "Dairy & Instant Beverages", desc: "Rapid dispersion, no sedimentation" },
  { icon: Croissant, title: "Bakery & Snacks", desc: "Dough strength, moisture retention, anti-staling" },
  { icon: Pill, title: "Pharmaceuticals & Liposomes", desc: "High-purity PC for drug delivery" },
  { icon: Brain, title: "Cognitive & Sports Nutrition", desc: "PS for brain health, PC for liver support" },
  { icon: Leaf, title: "Plant-Based Meat & Protein", desc: "Gelation, water binding, meat-like texture" },
  { icon: Sparkles, title: "Cosmetics & Personal Care", desc: "Natural emulsifiers, skin-friendly moisturization" },
  { icon: Dog, title: "Animal Nutrition & Feed", desc: "Energy source, pellet binding" },
];

const productSystems = [
  { title: "Liquid Emulsifier Systems", color: "from-amber-600/20 to-amber-600/5" },
  { title: "Dry Emulsifier Systems", color: "from-yellow-600/20 to-yellow-600/5" },
  { title: "High-Purity Lipid Systems", color: "from-emerald-600/20 to-emerald-600/5" },
  { title: "Allergen-Free Sunflower Systems", color: "from-orange-500/20 to-orange-500/5" },
  { title: "Protein & Texture Systems", color: "from-red-600/20 to-red-600/5" },
  { title: "Prebiotic & Dietary Fiber Systems", color: "from-lime-600/20 to-lime-600/5" },
];

const trustItems = [
  { icon: Shield, title: "Certifications", desc: "ISO 22000 · FSSC 22000 · HACCP · Halal" },
  { icon: MapPin, title: "Traceability", desc: "Heilongjiang Non-GMO Identity Preserved" },
  { icon: FileText, title: "Documentation", desc: "TDS · COA · MSDS by batch" },
  { icon: Factory, title: "Capacity", desc: "7,000㎡ GMP · 3 Automated Lines · 10,000T/Year" },
  { icon: Headphones, title: "Support", desc: "Direct Access to Application Engineers" },
];

/* Animated counter hook */
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

/* Fade-in on scroll */
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

export default function Home() {
  useEffect(() => {
    document.title = HOME_SEO_TITLE;

    const ensureMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    ensureMeta("description", HOME_SEO_DESCRIPTION);
    ensureMeta("keywords", HOME_SEO_KEYWORDS);
  }, []);

  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="relative container py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-harvest-gold font-heading font-medium text-sm uppercase tracking-widest mb-4">
              From Heilongjiang Black Soil to Global Formulations
            </p>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Natural Phospholipids
              <br />
              <span className="text-harvest-gold">Precision Engineered</span>
            </h1>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              ISO 22000 certified soy lecithin and high-purity phospholipid
              derivatives. 10,000 tons annual capacity. Non-GMO IP traceable
              from farm to shipment.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {["ISO 22000", "FSSC 22000", "10,000T Capacity", "Non-GMO IP"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-harvest-gold/20 border border-harvest-gold/40 rounded text-harvest-gold text-xs font-heading font-semibold uppercase tracking-wide"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    {badge}
                  </span>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                Explore Product Systems
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={INQUIRY_FORM_LINK}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-harvest-gold text-harvest-gold font-medium rounded-md hover:bg-harvest-gold hover:text-white transition-colors"
              >
                Contact an Engineer
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-warm-ivory">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Serving Global Industries
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Application Industries
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <Link href="/industry-solutions">
                  <div className="group bg-white rounded-lg p-6 border border-transparent hover:border-earth-green shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
                    <item.icon className="w-8 h-8 text-earth-green mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-heading font-semibold text-deep-brown text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-medium-gray text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-soft-green">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Comprehensive Solutions
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Six Functional Systems
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {productSystems.map((sys, i) => (
              <FadeIn key={sys.title} delay={i * 80}>
                <div className={`bg-gradient-to-br ${sys.color} rounded-lg p-6 border border-earth-green/10 hover:border-earth-green/30 transition-all duration-200 hover:-translate-y-1`}>
                  <div className="w-10 h-10 rounded-full bg-earth-green/10 flex items-center justify-center mb-4">
                    <span className="font-heading font-bold text-earth-green text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-deep-brown text-lg">
                    {sys.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                Browse All 9 Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-warm-ivory">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {trustItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-harvest-gold/15 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-harvest-gold" />
                  </div>
                  <h4 className="font-heading font-semibold text-deep-brown text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-medium-gray text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-dark-green">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-warm-ivory mb-4">
              From Field to Formulation
            </h2>
            <p className="text-warm-ivory/70 text-lg max-w-2xl mx-auto mb-8">
              Precision Controlled Every Step. Tell us about your product needs.
              Our agricultural and application engineers provide tailored
              recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={INQUIRY_FORM_LINK}
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Inquiry
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-harvest-gold text-harvest-gold font-medium rounded-md hover:bg-harvest-gold hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                WhatsApp Contact
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
