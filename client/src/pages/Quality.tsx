/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Quality & Compliance: Certifications, QC system, traceability flow, documentation
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  Shield,
  Award,
  CheckCircle,
  ArrowRight,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";
import { usePageSEO, buildBreadcrumbSchema } from "@/lib/usePageSEO";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

const QUALITY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/banner-quality-samples-iG6mFTz7k7z8wbBtmTUuWG.webp";

const certifications = [
  { name: "ISO 22000:2018", desc: "Food Safety Management System — Full production lines", icon: Shield },
  { name: "FSSC 22000", desc: "GFSI Recognized — Full production lines", icon: Award },
  { name: "HACCP", desc: "Hazard Analysis Critical Control Points — Full production lines", icon: CheckCircle },
  { name: "Halal Certification", desc: "Selected product lines", icon: Shield },
  { name: "Non-GMO IP", desc: "Identity Preserved — Designated grades", icon: CheckCircle },
];

const traceabilitySteps = [
  { step: "01", title: "Heilongjiang Non-GMO Farm", desc: "Identity Preserved sourcing from certified farms" },
  { step: "02", title: "IP Segregated Handling", desc: "Dedicated storage and transport channels" },
  { step: "03", title: "GMP Production", desc: "Computer-controlled automated production lines" },
  { step: "04", title: "Batch Testing", desc: "Full parameter testing per AOCS/GB standards" },
  { step: "05", title: "COA Issued", desc: "Traceable Certificate of Analysis per batch" },
];

const qcParams = [
  { param: "Acetone Insoluble", method: "AOCS Ja 4-46" },
  { param: "Acid Value", method: "AOCS Ja 6-55" },
  { param: "Peroxide Value", method: "GB 5009.227" },
  { param: "Moisture", method: "GB 5009.3" },
  { param: "Heavy Metals", method: "ICP-MS" },
];

const documents = [
  {
    name: "FSSC 22000 Certificate",
    desc: "Food safety system certification copy",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/FSSC22000_2c7eff42.pdf",
  },
  {
    name: "ISO 22000 Certificate",
    desc: "Food safety management system certificate",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/ISO22000_98d8885b.pdf",
  },
  {
    name: "HACCP Certificate",
    desc: "Hazard analysis and critical control points certification",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/HACCP_2b462d8e.pdf",
  },
  {
    name: "Container Inspection Report",
    desc: "Loading and container inspection documentation",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/ContainerinspectionReport_88c2c3fb.pdf",
  },
  {
    name: "GB 1886.358-2022 Standard",
    desc: "Applicable China national standard reference",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/GB1886.358-2022_cd773ea9.pdf",
  },
  {
    name: "Non-GMO Testing Report 1SP",
    desc: "Reference report for HXY-1SP grade",
    href: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/Non-gmotestingreport1SP_758a277c.pdf",
  },
];

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

export default function Quality() {
  const { t, locale } = useI18nContext();

  // Apply unified SEO
  usePageSEO({
    title: t("quality_page.seo_title", "Quality Documents & Batch Verification | Lecprima"),
    description: t("quality_page.seo_description", "Review Lecprima quality systems, certificates, COA documentation, TDS support and traceability inputs for supplier qualification."),
    keywords: t("quality_page.seo_keywords", "soy lecithin COA, lecithin TDS, phospholipid quality documents, supplier qualification lecithin, batch verification lecithin"),
    path: "/quality",
    image: QUALITY_IMG,
    jsonLd: [
      buildBreadcrumbSchema([
        { name: t("common.home", "Home"), path: "/" },
        { name: t("common.quality", "Quality"), path: "/quality" },
      ], locale),
    ],
  });

  return (
    <div>
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${QUALITY_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative container pb-12">
          <nav className="flex items-center gap-2 text-sm text-white/60 mb-4">
            <Link href={buildLocalizedPath(locale, "/")} className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Quality & Compliance</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white">
            Quality Documents for Formulation Confidence
          </h1>
          <p className="text-harvest-gold font-heading font-medium text-lg mt-2">
            COA, TDS, certificate and batch inputs for supplier qualification.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28 bg-warm-ivory">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Globally Recognized
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Certifications
              </h2>
              <p className="text-medium-gray mt-3 max-w-2xl mx-auto">
                Certificates, COA, TDS and related records help QA and procurement teams verify supplier fit before formulation trials and production discussions.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto sm:grid-cols-2 lg:grid-cols-6">
            {certifications.map((cert, i) => (
              <FadeIn
                key={cert.name}
                delay={i * 80}
                className={`h-full lg:col-span-2 ${
                  i === 3 ? "lg:col-start-2" : i === 4 ? "lg:col-start-4" : ""
                }`}
              >
                <div className="h-full bg-white rounded-xl p-6 border border-harvest-gold/20 shadow-sm text-center hover:shadow-md hover:border-harvest-gold/40 transition-all">
                  <div className="w-14 h-14 mx-auto rounded-full bg-harvest-gold/15 flex items-center justify-center mb-4">
                    <cert.icon className="w-7 h-7 text-harvest-gold" />
                  </div>
                  <h3 className="font-heading font-semibold text-deep-brown text-base mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-medium-gray text-sm">{cert.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control System */}
      <section className="py-16 lg:py-24 bg-soft-green">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Rigorous Testing
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Quality Control System
              </h2>
              <p className="text-medium-gray mt-3 max-w-2xl mx-auto">
                Batch testing and technical documents support repeatable formulation decisions, procurement review and buyer-side qualification workflows.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="max-w-3xl mx-auto bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="bg-earth-green px-6 py-3">
                <h3 className="text-white font-heading font-semibold text-sm">
                  Monitored Parameters
                </h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 text-left text-sm font-heading font-semibold text-deep-brown">
                      Parameter
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-heading font-semibold text-deep-brown">
                      Testing Method
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {qcParams.map((item, i) => (
                    <tr
                      key={item.param}
                      className={`${i % 2 === 0 ? "bg-light-green/30" : "bg-white"}`}
                    >
                      <td className="px-6 py-3 text-sm text-deep-brown font-medium">
                        {item.param}
                      </td>
                      <td className="px-6 py-3 text-sm font-mono text-medium-gray">
                        {item.method}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Traceability */}
      <section className="py-20 lg:py-28 bg-warm-ivory">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Seed to Shipment
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Traceability Chain
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row items-stretch gap-0">
              {traceabilitySteps.map((step, i) => (
                <FadeIn key={step.step} delay={i * 100} className="flex-1">
                  <div className="relative flex flex-col items-center text-center p-4 lg:p-5">
                    {/* Connector line */}
                    {i < traceabilitySteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2 z-10">
                        <ArrowRight className="w-5 h-5 text-harvest-gold" />
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-full bg-harvest-gold/15 border-2 border-harvest-gold flex items-center justify-center mb-3">
                      <span className="font-heading font-bold text-harvest-gold text-lg">
                        {step.step}
                      </span>
                    </div>
                    <h4 className="font-heading font-semibold text-deep-brown text-sm mb-1">
                      {step.title}
                    </h4>
                    <p className="text-medium-gray text-xs leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-16 lg:py-24 bg-soft-green">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-harvest-gold font-heading font-semibold text-sm uppercase tracking-widest mb-3">
                Technical Resources
              </p>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-deep-brown">
                Documentation Download Center
              </h2>
              <p className="text-medium-gray mt-3 max-w-2xl mx-auto">
                COA, certificate files, inspection reports and standards help buyers verify documented phospholipid inputs before purchase or sample evaluation.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto items-stretch">
            {documents.map((doc, i) => (
              <FadeIn key={doc.name} delay={i * 60} className="h-full">
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="block h-full w-full min-h-[126px] bg-white rounded-lg p-5 border border-border hover:border-earth-green shadow-sm hover:shadow-md transition-all text-left group"
                >
                  <div className="flex h-full items-start gap-3">
                    <FileText className="w-5 h-5 text-earth-green shrink-0 mt-0.5" />
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-heading font-semibold text-deep-brown text-sm group-hover:text-earth-green transition-colors">
                        {doc.name}
                      </h4>
                      <p className="text-medium-gray text-xs mt-1">{doc.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-medium-gray group-hover:text-earth-green transition-colors shrink-0 mt-0.5" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="text-center mt-10">
              <a
                href="https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/FSSC22000_2c7eff42.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-earth-green text-white font-medium rounded-md hover:bg-earth-green-dark transition-colors"
              >
                <Download className="w-4 h-4" />
                Open FSSC 22000 Certificate
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
