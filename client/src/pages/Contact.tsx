/*
 * DESIGN: Agricultural Documentary - Cinematic Storytelling
 * Contact page: Contact details plus Web3Forms quote and inquiry forms
 */
import { type FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import {
  formDataToWeb3FormsPayload,
  submitWeb3FormsPayload,
  validateRequiredFields,
  WEB3FORMS_ACCESS_KEY,
  WEBSITE_FROM_NAME,
  type Web3FormsStatus,
} from "@/lib/web3Forms";
import { applyPageSeo, buildBreadcrumbSchema } from "@/lib/seo";

const SPLIT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/about-company-scene-4hr3U7uoXgBrhJqFUv3tiL.webp";
const WHATSAPP_LINK = "https://wa.me/8618646556618";
const WEB3FORMS_ACTION = "https://api.web3forms.com/submit";
const SUCCESS_MESSAGE = "Thank you! We will reply within 24 hours.";
const ERROR_MESSAGE = "Something went wrong. Please try again.";

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
  const [submittingForm, setSubmittingForm] = useState<ContactFormId | null>(null);
  const [statuses, setStatuses] = useState<Record<ContactFormId, Web3FormsStatus>>({
    quoteForm: { type: "idle", message: "" },
    inquiryForm: { type: "idle", message: "" },
  });
  const [inquiryName, setInquiryName] = useState("");

  useEffect(
    () =>
      applyPageSeo({
        title: "Contact Huiyi Jianpin | Stable Soy Lecithin Supply Inquiry",
        description:
          "Contact Huiyi Jianpin for soy lecithin, phospholipid, soy protein and fiber quote requests, documentation, samples and stable global supply support.",
        keywords:
          "contact soy lecithin supplier, phospholipid quote request, stable ingredient supply inquiry, Huiyi Jianpin contact, lecithin samples documentation",
        path: "/contact",
        image: SPLIT_IMG,
        jsonLd: [
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ],
      }),
    []
  );

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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    formId: ContactFormId,
    requiredFields: string[]
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = formDataToWeb3FormsPayload(formData);

    if (!validateRequiredFields(payload, requiredFields)) {
      setStatuses((current) => ({
        ...current,
        [formId]: { type: "error", message: "Please complete required fields with a valid email." },
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
        [formId]: { type: "success", message: SUCCESS_MESSAGE },
      }));
    } catch {
      setStatuses((current) => ({
        ...current,
        [formId]: { type: "error", message: ERROR_MESSAGE },
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
            <Link href="/" className="transition-colors hover:text-earth-green">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-deep-brown">Contact</span>
          </nav>
        </div>
      </section>

      <section className="bg-warm-ivory pb-20 lg:pb-28">
        <div className="container">
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl shadow-lg lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[360px] lg:min-h-full">
              <img
                src={SPLIT_IMG}
                alt="Soybean field and GMP factory for stable ingredient supply"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
                <p className="mb-2 text-sm font-heading font-medium text-white/80">
                  From Heilongjiang Black Soil
                </p>
                <h1 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
                  Get in Touch
                </h1>
                <p className="max-w-md text-sm leading-relaxed text-white/85">
                  Tell us your application, target dosage, required specification, and supply timeline. Our team will respond within 1 business day.
                </p>

                <div className="mt-8 space-y-4 rounded-xl border border-white/15 bg-white/90 p-5 backdrop-blur-sm">
                  <h2 className="font-heading text-lg font-semibold text-deep-brown">
                    Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.
                  </h2>
                  <div className="space-y-3">
                    <ContactDetail icon={MapPin} title="Headquarters">
                      Harbin, Heilongjiang Province, China
                    </ContactDetail>
                    <ContactDetail icon={MapPin} title="Factory">
                      Liaocheng, Shandong Province, China (7,000㎡ GMP)
                    </ContactDetail>
                    <ContactDetail icon={Phone} title="WhatsApp / WeChat">
                      +86 18646556618
                    </ContactDetail>
                    <ContactDetail icon={Mail} title="Email">
                      jojowei@huiyijianpin.cn
                    </ContactDetail>
                    <ContactDetail icon={Clock} title="Business Hours">
                      Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)
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
                onSubmit={(event) => handleSubmit(event, "quoteForm", ["name", "email", "message"])}
                className="rounded-xl border border-border bg-warm-ivory p-5 shadow-sm sm:p-6"
              >
                <HiddenWeb3Fields formType="Get a Quote" subject="New Quote Request from Huiyi Jianpin Website" />
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-sm font-heading font-semibold uppercase tracking-widest text-harvest-gold">
                      Quote Request
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-deep-brown">Get a Quote</h2>
                  </div>
                  <ArrowRight className="mt-2 h-5 w-5 text-earth-green" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClass}>Name *</span>
                    <input className={inputClass} name="name" required autoComplete="name" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>Company</span>
                    <input className={inputClass} name="company" autoComplete="organization" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>Email *</span>
                    <input className={inputClass} name="email" type="email" required autoComplete="email" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>Phone / WhatsApp</span>
                    <input className={inputClass} name="phoneOrWhatsapp" autoComplete="tel" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>Country / Region</span>
                    <input className={inputClass} name="countryOrRegion" autoComplete="country-name" />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>Product of Interest</span>
                    <input className={inputClass} name="productOfInterest" placeholder="Soy lecithin, PC, PS..." />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>Quantity</span>
                    <input className={inputClass} name="quantity" placeholder="Trial order, 200 kg, 1 FCL..." />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>Requirements / Message *</span>
                    <textarea
                      className={`${inputClass} min-h-32 resize-y`}
                      name="message"
                      required
                      placeholder="Tell us the application, target specification, packaging, destination port, and timeline."
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
                    {submittingForm === "quoteForm" ? "Sending..." : "Submit Quote Request"}
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
                      Direct Message
                    </p>
                    <h2 className="font-heading text-2xl font-bold text-deep-brown">Email Inquiry</h2>
                  </div>
                  <Send className="mt-2 h-5 w-5 text-earth-green" />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className={labelClass}>Name *</span>
                    <input
                      className={inputClass}
                      name="name"
                      required
                      autoComplete="name"
                      onChange={(event) => setInquiryName(event.target.value)}
                    />
                  </label>
                  <label className="space-y-2">
                    <span className={labelClass}>Email *</span>
                    <input className={inputClass} name="email" type="email" required autoComplete="email" />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>Subject</span>
                    <input className={inputClass} name="inquirySubject" placeholder="Product question, sample request, documentation..." />
                  </label>
                  <label className="space-y-2 sm:col-span-2">
                    <span className={labelClass}>Message *</span>
                    <textarea
                      className={`${inputClass} min-h-28 resize-y`}
                      name="message"
                      required
                      placeholder="How can we help?"
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
                    {submittingForm === "inquiryForm" ? "Sending..." : "Send Inquiry"}
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
