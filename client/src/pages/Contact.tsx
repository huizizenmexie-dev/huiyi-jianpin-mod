/*
 * DESIGN: Agricultural Documentary — Cinematic Storytelling
 * Contact page: Split layout with image and contact info
 */
import { Link } from "wouter";
import { ChevronRight, Mail, Phone, MapPin, Clock } from "lucide-react";

const SPLIT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/about-company-scene-4hr3U7uoXgBrhJqFUv3tiL.webp";
const CONTACT_EMAIL =
  "mailto:jojowei@huiyijianpin.cn?subject=Product%20Inquiry%20-%20Website&body=Please%20fill%20in%3A%0ACompany%3A%0AProduct%20of%20Interest%3A%0AQuantity%3A%0AMessage%3A";
const WHATSAPP_LINK = "https://wa.me/8618646556618";

export default function Contact() {
  return (
    <div>
      {/* Breadcrumb Header */}
      <section className="pt-24 pb-6 bg-warm-ivory">
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-medium-gray mb-2">
            <Link href="/" className="hover:text-earth-green transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-deep-brown font-medium">Contact</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 lg:pb-28 bg-warm-ivory">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg">
            {/* Left: Image */}
            <div className="relative h-[300px] lg:h-auto min-h-[400px]">
              <img
                src={SPLIT_IMG}
                alt="Soybean field and GMP factory"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:bg-gradient-to-t lg:from-black/40 lg:to-transparent" />
              <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                <p className="text-white/80 text-sm font-heading font-medium">
                  From Heilongjiang Black Soil
                </p>
                <p className="text-white text-xl font-heading font-bold">
                  To Global Formulations
                </p>
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="bg-white p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="font-heading font-bold text-3xl text-deep-brown mb-2">
                Get in Touch
              </h1>
              <p className="text-medium-gray mb-8">
                We respond within 1 business day.
              </p>

              {/* Company Name */}
              <div className="mb-8">
                <h2 className="font-heading font-semibold text-deep-brown text-lg mb-4">
                  Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-earth-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-deep-brown">Headquarters</p>
                      <p className="text-sm text-medium-gray">Harbin, Heilongjiang Province, China</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-earth-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-deep-brown">Factory</p>
                      <p className="text-sm text-medium-gray">Liaocheng, Shandong Province, China (7,000㎡ GMP)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-earth-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-deep-brown">WhatsApp / WeChat</p>
                      <p className="text-sm text-medium-gray">+86 18646556618</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-earth-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-deep-brown">Email</p>
                      <p className="text-sm text-medium-gray">jojowei@huiyijianpin.cn</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-earth-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-deep-brown">Business Hours</p>
                      <p className="text-sm text-medium-gray">Monday – Friday, 9:00 AM – 6:00 PM (GMT+8)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Inquiry */}
              <div className="bg-soft-green rounded-xl p-6 mb-6">
                <h3 className="font-heading font-semibold text-deep-brown text-base mb-2">
                  Send an Inquiry
                </h3>
                <p className="text-sm text-medium-gray mb-4 leading-relaxed">
                  Click the email link below to open your default mail client automatically with the recipient and subject pre-filled. Please include your company name, product of interest, and quantity in the message body.
                </p>
                <a
                  href={CONTACT_EMAIL}
                  className="inline-flex w-full items-start gap-3 rounded-xl border border-earth-green/20 bg-white px-5 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-earth-green hover:shadow-md"
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-earth-green" />
                  <span className="flex flex-col">
                    <span className="text-sm font-heading font-semibold text-deep-brown">
                      jojowei@huiyijianpin.cn
                    </span>
                    <span className="mt-1 text-xs text-medium-gray">
                      Opens your default email app with recipient and subject pre-filled.
                    </span>
                  </span>
                </a>
              </div>

              {/* Alternative */}
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-earth-green text-earth-green rounded-md hover:bg-earth-green hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="mailto:jojowei@huiyijianpin.cn"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-border text-medium-gray rounded-md hover:border-earth-green hover:text-earth-green transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  jojowei@huiyijianpin.cn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
