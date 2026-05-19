import { describe, expect, it } from "vitest";
import { getEmailInquirySubject, isValidEmail, validateRequiredFields } from "./web3Forms";

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
});
