export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "6e721c0e-322e-43c8-8dc7-723514cb3f2b";
export const WEBSITE_FROM_NAME = "Huiyi Jianpin Website Inquiry";

export const QUOTE_REQUIRED_FIELDS = [
  "company",
  "name",
  "email",
  "country",
  "product",
  "application",
  "monthlyQuantity",
] as const;

export const QUOTE_TRACKING_FIELDS = [
  "locale",
  "page_url",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "product",
  "application",
  "destinationPort",
  "sampleRequest",
  "monthlyQuantity",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Web3FormsStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

export type Web3FormsSubmitResult = {
  success?: boolean;
  message?: string;
};

export type QuoteValidationResult = {
  valid: boolean;
  errors: string[];
  payload: Record<string, FormDataEntryValue>;
};

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email.trim());
}

function isPresent(value: FormDataEntryValue | undefined) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateRequiredFields(values: Record<string, FormDataEntryValue>, requiredFields: string[]) {
  for (const field of requiredFields) {
    if (!isPresent(values[field])) {
      return false;
    }
  }

  const email = values.email;
  return typeof email === "string" && isValidEmail(email);
}

export function validateQuoteRequest(values: Record<string, FormDataEntryValue>): QuoteValidationResult {
  const errors: string[] = [];

  for (const field of QUOTE_REQUIRED_FIELDS) {
    if (!isPresent(values[field])) {
      errors.push(field);
    }
  }

  if (typeof values.email !== "string" || !isValidEmail(values.email)) {
    errors.push("email");
  }

  if (isPresent(values.botcheck)) {
    errors.push("botcheck");
  }

  return {
    valid: errors.length === 0,
    errors: Array.from(new Set(errors)),
    payload: values,
  };
}

export function getEmailInquirySubject(name: FormDataEntryValue | undefined) {
  const normalizedName = typeof name === "string" && name.trim() ? name.trim() : "Website Visitor";
  return `New Email Inquiry from ${normalizedName}`;
}

export function formDataToWeb3FormsPayload(formData: FormData) {
  const payload = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;

  if (payload.formType === "Email Inquiry") {
    payload.subject = getEmailInquirySubject(payload.name);
  }

  return payload;
}

export async function submitWeb3FormsPayload(payload: Record<string, FormDataEntryValue>) {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as Web3FormsSubmitResult;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Submit failed");
  }

  return result;
}
