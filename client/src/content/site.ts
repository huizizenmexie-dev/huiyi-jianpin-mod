/**
 * Site-wide constants — single source of truth
 */
import { SITE_ORIGIN } from "./url";

export const SITE_URL = SITE_ORIGIN;
export const SITE_NAME = "Lecprima";
export const SITE_BRAND_NAME = "Lecprima";
export const SITE_COMPANY_SHORT_NAME = "Huiyi Jianpin";
export const SITE_LEGAL_NAME = "Harbin Huiyi Jianpin Import & Export Trade Co., Ltd.";
export const SITE_LEGAL_NAME_ZH = "哈尔滨慧意建品进出口贸易有限公司";
export const SITE_TAGLINE = "Make Every Batch Perform";
export const SITE_MANUFACTURING_STATEMENT =
  "We operate our own manufacturing facility in Liaocheng, Shandong, China, providing global customers with reliable production, quality management and export services.";
export const SITE_BRAND_STATEMENT =
  "Lecprima is a global B2B brand operated by Harbin Huiyi Jianpin Import & Export Trade Co., Ltd. We operate our own manufacturing facility in Liaocheng, Shandong, China, providing global customers with reliable production, quality management and export services.";

export const CONTACT = {
  phone: "+86 18646556618",
  email: "jojowei@huiyijianpin.cn",
  whatsapp: "https://wa.me/8618646556618",
  headquarters: "Harbin, Heilongjiang Province, China",
  factory: "Liaocheng, Shandong Province, China (7,000㎡ GMP)",
  businessHours: "Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)",
} as const;

export const LIAOCHENG_FACILITY = {
  name: "Lecprima Liaocheng Manufacturing Facility",
  locality: "Liaocheng",
  region: "Shandong Province",
  country: "CN",
  address: "Liaocheng, Shandong Province, China",
  description: SITE_MANUFACTURING_STATEMENT,
} as const;

export const CERTIFICATIONS = [
  "ISO 22000:2018",
  "FSSC 22000",
  "HACCP",
  "Halal",
  "Non-GMO IP",
] as const;

export const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/hero-soybean-field-5mhsgZ9cxNzY2H9xAgjcJ4.webp";
