/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Industry Solutions: Selection matrix table with filter tags
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ChevronRight, Mail } from "lucide-react";

const HEADER_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-soybean-harvest-4Swmtb4Bj6WCpQxs3QVKpV.webp";
const CONTACT_EMAIL =
  "mailto:jojowei@huiyijianpin.cn?subject=Industry%20Application%20Inquiry%20-%20Website&body=Please%20fill%20in%3A%0ACompany%3A%0AIndustry%3A%0ASpecific%20Request%3A%0AMessage%3A";

interface SolutionRow {
  industry: string;
  category: string;
  painPoints: string;
  products: string;
  dosage: string;
  effect: string;
}

const solutions: SolutionRow[] = [
  {
    industry: "Chocolate & Bakery",
    category: "Food",
    painPoints: "High viscosity, molding difficulty, poor dough extensibility, milk powder clumping",
    products: "Soy Lecithin Liquid HXY-1SP / HXY-3SP, Lecithin Powder HXY-PLP",
    dosage: "Chocolate: 0.3–0.5% of total fat; Bakery: 0.3–1% of flour; Milk powder: 0.5–2% spray",
    effect: "Reduces viscosity 15-25%, improves flow, enhances dough extensibility, uniform powder dispersion",
  },
  {
    industry: "Dairy & Instant Beverages",
    category: "Food",
    painPoints: "Powder clumping, slow dissolution, fat floating, uneven emulsification",
    products: "Modified Lecithin HXY-PLW, Soy Lecithin Liquid HXY-1SPN, Small Pack Oligosaccharide",
    dosage: "0.2–2% dry/wet addition, spray or dry blend",
    effect: "Uniform dispersion, wetting time reduced by 50%, stable emulsion, smooth mouthfeel",
  },
  {
    industry: "Nutraceuticals / Supplements",
    category: "Pharma/Supplements",
    painPoints: "Poor active solubility, low lipophilic absorption, poor stability",
    products: "PC 50–90% (Liposome/Softgel), PS 20–70%, Modified Lecithin HXY-PLW",
    dosage: "PC high-purity solution/softgel, PS oil-based softgel, Modified powder dry blend",
    effect: "Improves water dispersibility and bioavailability, stabilizes nutrients, improves mouthfeel",
  },
  {
    industry: "Cosmetics / Skincare",
    category: "Cosmetics",
    painPoints: "Emulsion separation, poor active dispersion, allergen risk",
    products: "Sunflower Lecithin HXY-SFL / HXY-SFP, PC 30–50%",
    dosage: "0.5–2% in creams/lotions",
    effect: "Stable emulsion, enhanced moisturization, reduced allergen risk",
  },
  {
    industry: "Paints / Coatings / Leather",
    category: "Industrial",
    painPoints: "Uneven pigment dispersion, emulsion separation, poor film leveling",
    products: "Modified Lecithin HXY-2SP, Soy Lecithin Liquid HXY-1SP",
    dosage: "0.3–1% of solids content",
    effect: "Improves emulsion stability, enhances pigment distribution, improves film smoothness and adhesion",
  },
  {
    industry: "Protein Beverages / Meat Products",
    category: "Food",
    painPoints: "Protein precipitation, fat separation, low yield",
    products: "Gel-Type Soy Protein J7501, Soy Dietary Fiber J8000/J18000, Lecithin Powder HXY-PLP",
    dosage: "Meat: 2–4% direct protein addition; Beverage: 0.5–2% fiber or lecithin",
    effect: "Stabilizes protein network, prevents fat separation, increases yield, smooth beverage texture",
  },
  {
    industry: "Feed / Animal Nutrition",
    category: "Feed",
    painPoints: "Low lipophilic nutrient absorption, powder caking, poor stability",
    products: "Small Pack Soy Protein/Oligosaccharide, Soy Dietary Fiber",
    dosage: "Mix into feed formula",
    effect: "Uniform nutrition, improves gut health, powder free-flowing",
  },
  {
    industry: "Functional Foods / Wellness",
    category: "Food",
    painPoints: "High-fiber, low-calorie needs, satiety support",
    products: "Soy Dietary Fiber J18000, Small Pack Soy Oligosaccharide",
    dosage: "1–5% addition",
    effect: "High swelling capacity provides satiety, improves digestive function",
  },
];

const filterTags = ["All", "Food", "Pharma/Supplements", "Cosmetics", "Industrial", "Feed"];

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

export default function IndustrySolutions() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? solutions
      : solutions.filter((s) => s.category === activeFilter);

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
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Industry Solutions</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Application Guide & Selection Matrix
          </h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl">
            From food to industrial applications — precisely matched phospholipid solutions.
          </p>
        </div>
      </section>

      {/* Filter + Table */}
      <section className="py-12 lg:py-20 bg-warm-ivory">
        <div className="container">
          {/* Filter Tags */}
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-8">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    activeFilter === tag
                      ? "bg-earth-green text-white"
                      : "bg-white text-medium-gray border border-border hover:border-earth-green hover:text-earth-green"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Table */}
          <FadeIn delay={100}>
            <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-earth-green text-white">
                    <th className="px-4 py-3 text-left text-sm font-heading font-semibold">Industry</th>
                    <th className="px-4 py-3 text-left text-sm font-heading font-semibold">Key Pain Points</th>
                    <th className="px-4 py-3 text-left text-sm font-heading font-semibold">Recommended Products</th>
                    <th className="px-4 py-3 text-left text-sm font-heading font-semibold">Dosage</th>
                    <th className="px-4 py-3 text-left text-sm font-heading font-semibold">Technical Effect</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr
                      key={row.industry}
                      className={`${
                        i % 2 === 0 ? "bg-light-green/30" : "bg-white"
                      } hover:bg-soft-green transition-colors`}
                    >
                      <td className="px-4 py-3 text-sm font-heading font-semibold text-deep-brown align-top whitespace-nowrap">
                        {row.industry}
                      </td>
                      <td className="px-4 py-3 text-sm text-medium-gray align-top">
                        {row.painPoints}
                      </td>
                      <td className="px-4 py-3 text-sm text-earth-green font-medium align-top">
                        {row.products}
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-medium-gray align-top">
                        {row.dosage}
                      </td>
                      <td className="px-4 py-3 text-sm text-medium-gray align-top">
                        {row.effect}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Notes */}
          <FadeIn delay={200}>
            <div className="mt-6 bg-white rounded-lg p-5 border border-border text-sm text-medium-gray space-y-1">
              <p>* Recommended dosages are typical ranges. Adjust based on specific formulation and process.</p>
              <p>* For custom specifications or allergen-free solutions, contact our application engineers.</p>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={300}>
            <div className="mt-10 text-center">
              <a
                href={CONTACT_EMAIL}
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact an Engineer
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
