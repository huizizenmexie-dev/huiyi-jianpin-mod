import { describe, expect, it } from "vitest";
import {
  getEmailInquirySubject,
  isValidEmail,
  QUOTE_REQUIRED_FIELDS,
  validateQuoteRequest,
  validateRequiredFields,
  WEBSITE_FROM_NAME,
} from "./web3Forms";

describe("web3Forms helpers", () => {
  it("validates email format", () => {
    expect(isValidEmail("buyer@example.com")).toBe(true);
    expect(isValidEmail("buyer.example.com")).toBe(false);
  });

  it("requires configured fields and a valid email", () => {
    expect(
      validateRequiredFields(
        {
          name: "Jo Wei",
          email: "jo@example.com",
          message: "Please quote soy lecithin.",
        },
        ["name", "email", "message"]
      )
    ).toBe(true);

    expect(
      validateRequiredFields(
        {
          name: "Jo Wei",
          email: "not-an-email",
          message: "Please quote soy lecithin.",
        },
        ["name", "email", "message"]
      )
    ).toBe(false);
  });

  it("builds the Email Inquiry subject from the sender name", () => {
    expect(getEmailInquirySubject(" Alice Buyer ")).toBe("New Email Inquiry from Alice Buyer");
    expect(getEmailInquirySubject("")).toBe("New Email Inquiry from Website Visitor");
  });

  it("uses a branded Web3Forms sender name", () => {
    expect(WEBSITE_FROM_NAME).toBe("Huiyi Jianpin Website Inquiry");
  });

  it("accepts a complete quote request with monthlyQuantity and tracking fields", () => {
    const payload = {
      company: "Lecprima Buyer Ltd.",
      name: "Alice Buyer",
      email: "alice@example.com",
      country: "Brazil",
      product: "Soy Lecithin Liquid",
      application: "Chocolate",
      monthlyQuantity: "2 tons",
      locale: "pt-BR",
      page_url: "https://lecprima.com/pt-BR/contact/",
      referrer: "https://example.com/source",
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "lecithin-q3",
      destinationPort: "Santos",
      sampleRequest: "yes",
      botcheck: "",
    };

    const result = validateQuoteRequest(payload);

    expect(result.valid).toBe(true);
    expect(result.payload.locale).toBe("pt-BR");
    expect(result.payload.page_url).toBe("https://lecprima.com/pt-BR/contact/");
    expect(result.payload.referrer).toBe("https://example.com/source");
    expect(result.payload.utm_source).toBe("newsletter");
    expect(result.payload.monthlyQuantity).toBe("2 tons");
  });

  it.each(QUOTE_REQUIRED_FIELDS)("rejects quote requests missing %s", (field) => {
    const payload: Record<string, string> = {
      company: "Lecprima Buyer Ltd.",
      name: "Alice Buyer",
      email: "alice@example.com",
      country: "Brazil",
      product: "Soy Lecithin Liquid",
      application: "Chocolate",
      monthlyQuantity: "2 tons",
      botcheck: "",
    };
    delete payload[field];

    const result = validateQuoteRequest(payload);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(field);
  });

  it("rejects invalid email and filled honeypot fields", () => {
    expect(
      validateQuoteRequest({
        company: "Lecprima Buyer Ltd.",
        name: "Alice Buyer",
        email: "alice.example.com",
        country: "Brazil",
        product: "Soy Lecithin Liquid",
        application: "Chocolate",
        monthlyQuantity: "2 tons",
        botcheck: "",
      }).valid
    ).toBe(false);

    expect(
      validateQuoteRequest({
        company: "Lecprima Buyer Ltd.",
        name: "Alice Buyer",
        email: "alice@example.com",
        country: "Brazil",
        product: "Soy Lecithin Liquid",
        application: "Chocolate",
        monthlyQuantity: "2 tons",
        botcheck: "spam",
      }).valid
    ).toBe(false);
  });
});
