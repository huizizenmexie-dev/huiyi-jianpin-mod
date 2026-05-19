export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "6e721c0e-322e-43c8-8dc7-723514cb3f2b";
export const WEBSITE_FROM_NAME = "My Website Inquiry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Web3FormsStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

export type Web3FormsSubmitResult = {
  success?: boolean;
  message?: string;
};

export function isValidEmail(email: string) {
  return EMAIL_PATTERN.test(email.trim());
}

export function validateRequiredFields(values: Record<string, FormDataEntryValue>, requiredFields: string[]) {
  for (const field of requiredFields) {
    const value = values[field];
    if (typeof value !== "string" || value.trim().length === 0) {
      return false;
    }
  }

  const email = values.email;
  return typeof email === "string" && isValidEmail(email);
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
