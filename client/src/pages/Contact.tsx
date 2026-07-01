/*
 * DESIGN: Agricultural Documentary - Cinematic Storytelling
 * Contact page: Contact details plus Web3Forms quote and inquiry forms
 */
import { type FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  formDataToWeb3FormsPayload,
  QUOTE_REQUIRED_FIELDS,
  submitWeb3FormsPayload,
  validateQuoteRequest,
  validateRequiredFields,
  WEB3FORMS_ACCESS_KEY,
  WEBSITE_FROM_NAME,
  type Web3FormsStatus,
} from "@/lib/web3Forms";
import { usePageSEO, buildBreadcrumbSchema } from "@/lib/usePageSEO";
import { useI18nContext, buildLocalizedPath } from "@/i18n";

const SPLIT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/about-company-scene-4hr3U7uoXgBrhJqFUv3tiL.webp";
const WHATSAPP_LINK = "https://wa.me/8618646556618";
const WEB3FORMS_ACTION = "https://api.web3forms.com/submit";

const inputClass =
  "w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-deep-brown shadow-sm transition-colors placeholder:text-medium-gray/70 focus:border-earth-green focus:outline-none focus:ring-2 focus:ring-earth-green/20 disabled:opacity-60";
const labelClass = "text-sm font-heading font-semibold text-deep-brown";
const statusBaseClass = "form-status min-h-5 text-sm font-medium transition-colors";

type ContactFormId = "quoteForm" | "inquiryForm";

function ContactDetail({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-earth-green" />
      <div>
        <p className="text-sm font-medium text-deep-brown">{title}</p>
        <p className="text-sm text-medium-gray">{children}</p>
      </div>
    </div>
  );
}

function HiddenWeb3Fields({ formType, subject }: { formType: string; subject: string }) {
  return (
    <>
      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      <input type="hidden" name="from_name" value={WEBSITE_FROM_NAME} />
      <input type="hidden" name="formType" value={formType} />
      <input type="hidden" name="subject" value={subject} />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} />
    </>
  );
}

export default function Contact() {
  const { t, locale } = useI18nContext();
  const [submittingForm, setSubmittingForm] = useState<ContactFormId | null>(null);
  const [statuses, setStatuses] = useState<Record<ContactFormId, Web3FormsStatus>>({
    quoteForm: { type: "idle", message: "" },
    inquiryForm: { type: "idle", message: "" },
  });
  const [inquiryName, setInquiryName] = useState("");
  const [trackingFields, setTrackingFields] = useState({
    page_url: "",
    referrer: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const seoTitle = t("contact_page.seo_title", "Contact Huiyi Jianpin | Stable Soy Lecithin Supply Inquiry");
  const seoDescription = t("contact_page.seo_description", "Contact Huiyi Jianpin for soy lecithin, phospholipid, soy protein and fiber quote requests, documentation, samples and stable global supply support.");
  const seoKeywords = t("contact_page.seo_keywords", "contact soy lecithin supplier, phospholipid quote request, stable ingredient supply inquiry, Huiyi Jianpin contact");

  // Apply unified SEO
  usePageSEO({
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    path: "/contact",
    image: SPLIT_IMG,
    jsonLd: [
      buildBreadcrumbSchema([
        { name: t("common.home", "Home"), path: "/" },
        { name: t("common.contact", "Contact"), path: "/contact" },
      ], locale),
    ],
  });

  useEffect(() => {
    const timers = Object.entries(statuses)
      .filter(([, status]) => status.message)
      .map(([formId]) =>
        window.setTimeout(() => {
          setStatuses((current) => ({
            ...current,
            [formId]: { type: "idle", message: "" },
          }));
        }, 5000)
      );

    return () => timers.forEach(window.clearTimeout);
  }, [statuses]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTrackingFields({
      page_url: window.location.href,
      referrer: document.referrer,
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    });
  }, []);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    formId: ContactFormId,
    requiredFields: string[]
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = formDataToWeb3FormsPayload(formData);
    const validation =
      formId === "quoteForm"
        ? validateQuoteRequest(payload)
        : { valid: validateRequiredFields(payload, requiredFields) };

    if (!validation.valid) {
      setStatuses((current) => ({
        ...current,
        [formId]: { type: "error", message: t("contact_page.form.error_required", "Please complete required fields with a valid email.") },
      }));
      return;
    }

    setSubmittingForm(formId);
    setStatuses((current) => ({ ...current, [formId]: { type: "idle", message: "" } }));

    try {
      await submitWeb3FormsPayload(payload);
      form.reset();
      if (formId === "inquiryForm") setInquiryName("");
      setStatuses((current) => ({
        ...current,
        [formId]: { type: "success", message: t("contact_page.form.success", "Thank you! We will reply within 24 hours.") },
      }));
    } catch {
      setStatuses((current) => ({
        ...current,
        [formId]: { type: "error", message: t("contact_page.form.error", "Something went wrong. Please try again.") },
      }));
    } finally {
      setSubmittingForm(null);
    }
  };

  const statusClass = (status: Web3FormsStatus) =>
    `${statusBaseClass} ${status.type === "success" ? "text-earth-green" : ""} ${
      status.type === "error" ? "text-destructive" : ""
    }`;

  const emailInquirySubject = `New Email Inquiry from ${inquiryName.trim() || "Website Visitor"}`;

  return (
    <div>
      <section className="bg-warm-ivory pb-6 pt-24">
        <div className="container">
          <nav className="mb-2 flex items-center gap-2 text-sm text-medium-gray">
            <Link href={buildLocalizedPath(locale, "/")} className="transition-colors hover:text-earth-green">
              {t("common.home", "Home")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-deep-brown">{t("common.contact", "Contact")}</span>
          </nav>
        </div>
      </section>

      <section className="bg-warm-ivory pb-20 lg:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px] lg:min-h-full">
              <img
                src={SPLIT_IMG}
                alt={t("contact_page.hero_image_alt", "Soybean field and GMP factory for stable ingredient supply")}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                <p className="mb-2 text-sm font-heading font-medium text-white/80">
                  {t("contact_page.hero_subtitle", "From Heilongjiang Black Soil")}
                </p>
                <h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
                  {t("contact_page.hero_title", "Get in Touch")}
                </h1>
                <p className="max-w-md text-sm leading-relaxed text-white/85">
                  {t("contact_page.hero_description", "Tell us your application, target dosage, required specification, and supply timeline. Our team will respond within 1 business day.")}
                </p>

                <div className="mt-8 space-y-4 rounded-xl border border-white/15 bg-white/90 p-5 backdrop-blur-sm">
                  <h2 className="font-heading text-lg font-semibold text-deep-brown">
                    {t("contact_page.company_name", "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.")}
                  </h2>
                  <div className="space-y-3">
                    <ContactDetail icon={MapPin} title={t("contact_page.headquarters", "Headquarters")}>
                      {t("contact_page.headquarters_address", "Harbin, Heilongjiang Province, China")}
                    </ContactDetail>
                    <ContactDetail icon={MapPin} title={t("contact_page.factory", "Factory")}>
                      {t("contact_page.factory_address", "Liaocheng, Shandong Province, China (7,000㎡ GMP)")}
                    </ContactDetail>
                    <ContactDetail icon={Phone} title={t("contact_page.whatsapp_wechat", "WhatsApp / WeChat")}>
                      +86 18646556618
                    </ContactDetail>
                    <ContactDetail icon={Mail} title={t("contact_page.email", "Email")}>
                      jojowei@huiyijianpin.cn
                    </ContactDetail>
                    <ContactDetail icon={Clock} title={t("contact_page.business_hours", "Business Hours")}>
                      {t("contact_page.business_hours_value", "Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)")}
                    </ContactDetail>
                  </div>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-earth-green px-4 py-2.5 text-sm font-medium text-earth-green transition-colors hover:bg-earth-green hover:text-white"
                  >
                    <Phone className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white p-5 sm:p-8 lg:p-10">
              <form
                id="quoteForm"
                action={WEB3FORMS_ACTION}
                method="POST"
                noValidate
                onSubmit={(event) => handleSubmit(event, "quoteForm", [...QUOTE_REQUIRED_FIELDS])}
                className="rounded-xl border border-border bg-warm-ivory p-5 shadow-sm sm:p-6"
              >
                <HiddenWeb3Fields formType="Get a Quote" subject="New Quote Request from Huiyi Jianpin Website" />
                {/* Hidden fields for tracking */}
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="page_url" value={trackingFields.page_url} />
                <input type="hidden" name="referrer" value={trackingFields.referrer} />
                <input type="hidden" name="utm_source" value={trackingFields.utm_source} />
                <input type="hidden" name="utm_medium" value={trackingFields.utm_medium} />
                <input type="hidden" name="utm_campaign" value={trackingFields.utm_campaign} />

                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm font-heading font-semibold uppercase tracking-widest text-harvest-gold">
                      {t("contact_page.quote_request_label", "Quote Request")}
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-deep-brown">{t("contact_page.get_a_quote", "Get a Quote")}</h2>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 text-earth-green" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.company", "Company Name")} *</span>
                    <input className={inputClass} name="company" required autoComplete="organization" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.name", "Contact Name")} *</span>
                    <input className={inputClass} name="name" required autoComplete="name" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.email", "Business Email")} *</span>
                    <input className={inputClass} name="email" type="email" required autoComplete="email" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.phone", "Phone / WhatsApp")}</span>
                    <input className={inputClass} name="phoneOrWhatsapp" autoComplete="tel" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.country", "Country / Region")} *</span>
                    <input className={inputClass} name="country" required autoComplete="country-name" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.product", "Interested Product")} *</span>
                    <input className={inputClass} name="product" required placeholder={t("contact_page.form.product_placeholder", "Soy lecithin, PC, PS...")} />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.application", "Application / Industry")} *</span>
                    <input className={inputClass} name="application" required placeholder={t("contact_page.form.application_placeholder", "Food, Pharma, Cosmetics...")} />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.monthly_quantity", "Estimated Monthly Quantity")} *</span>
                    <input className={inputClass} name="monthlyQuantity" required placeholder={t("contact_page.form.monthly_quantity_placeholder", "100 kg, 1 ton, 10 tons...")} />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.port", "Destination Port / Incoterm")}</span>
                    <input className={inputClass} name="destinationPort" placeholder={t("contact_page.form.port_placeholder", "FOB, CIF, Shanghai Port...")} />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.sample", "Sample Request")}</span>
                    <select className={inputClass} name="sampleRequest">
                      <option value="">{t("contact_page.form.sample_select", "Select...")}</option>
                      <option value="yes">{t("contact_page.form.sample_yes", "Yes, I need samples")}</option>
                      <option value="no">{t("contact_page.form.sample_no", "No, not now")}</option>
                    </select>
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>{t("contact_page.form.requirements", "Message")}</span>
                    <textarea
                      className={`${inputClass} min-h-32 resize-y`}
                      name="message"
                      placeholder={t("contact_page.form.requirements_placeholder", "Tell us more about your requirements...")}
                    />
                  </label>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={statusClass(statuses.quoteForm)}>{statuses.quoteForm.message}</p>
                  <button
                    type="submit"
                    disabled={submittingForm === "quoteForm"}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-earth-green px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-earth-green-dark disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submittingForm === "quoteForm" ? t("contact_page.form.sending", "Sending...") : t("contact_page.form.submit_quote", "Submit Quote Request")}
                  </button>
                </div>
              </form>

              <form
                id="inquiryForm"
                action={WEB3FORMS_ACTION}
                method="POST"
                noValidate
                onSubmit={(event) => handleSubmit(event, "inquiryForm", ["name", "email", "message"])}
                className="rounded-xl border border-earth-green/20 bg-soft-green p-5 shadow-sm sm:p-6"
              >
                <HiddenWeb3Fields formType="Email Inquiry" subject={emailInquirySubject} />
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm font-heading font-semibold uppercase tracking-widest text-earth-green">
                      {t("contact_page.direct_message_label", "Direct Message")}
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-deep-brown">{t("contact_page.email_inquiry", "Email Inquiry")}</h2>
                  </div>
                  <Send className="mt-2 h-5 w-5 text-earth-green" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.name", "Name")} *</span>
                    <input
                      className={inputClass}
                      name="name"
                      required
                      autoComplete="name"
                      onChange={(event) => setInquiryName(event.target.value)}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>{t("contact_page.form.email", "Email")} *</span>
                    <input className={inputClass} name="email" type="email" required autoComplete="email" />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>{t("contact_page.form.subject", "Subject")}</span>
                    <input className={inputClass} name="inquirySubject" placeholder={t("contact_page.form.subject_placeholder", "Product question, sample request, documentation...")} />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>{t("contact_page.form.message", "Message")} *</span>
                    <textarea
                      className={`${inputClass} min-h-28 resize-y`}
                      name="message"
                      required
                      placeholder={t("contact_page.form.message_placeholder", "How can we help?")}
                    />
                  </label>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={statusClass(statuses.inquiryForm)}>{statuses.inquiryForm.message}</p>
                  <button
                    type="submit"
                    disabled={submittingForm === "inquiryForm"}
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-earth-green bg-white px-5 py-3 text-sm font-semibold text-earth-green transition-colors hover:bg-earth-green hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submittingForm === "inquiryForm" ? t("contact_page.form.sending", "Sending...") : t("contact_page.form.send_inquiry", "Send Inquiry")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
