export type ClaimVerificationStatus = "unverified" | "reviewed" | "approved" | "expired";
export type ClaimPublicationStatus = "do-not-publish" | "publishable";

export interface EvidenceLedgerEntry {
  claimId: string;
  exactPublicWording: string;
  productGrade: string;
  sourceDocument: string;
  sourceOwner: string;
  sourceDate: string;
  applicableMarket: string;
  verificationStatus: ClaimVerificationStatus;
  reviewer: string;
  expiryDate: string;
  pageUsage: string[];
  publicationStatus: ClaimPublicationStatus;
}

export const evidenceLedger: EvidenceLedgerEntry[] = [
  {
    claimId: "cert-fssc-22000-public-certificate",
    exactPublicWording: "FSSC 22000",
    productGrade: "Small packaging production and selected documented scope",
    sourceDocument: "Quality page certificate download center",
    sourceOwner: "Business owner review required",
    sourceDate: "2026-07-01",
    applicableMarket: "Global B2B website",
    verificationStatus: "reviewed",
    reviewer: "Pending business owner confirmation",
    expiryDate: "Pending certificate expiry extraction",
    pageUsage: ["/quality/", "/products/soy-oligosaccharide-small-pack/"],
    publicationStatus: "publishable",
  },
  {
    claimId: "cert-iso-22000-public-certificate",
    exactPublicWording: "ISO 22000",
    productGrade: "Product grades with documented certificate scope",
    sourceDocument: "Quality page certificate download center",
    sourceOwner: "Business owner review required",
    sourceDate: "2026-07-01",
    applicableMarket: "Global B2B website",
    verificationStatus: "reviewed",
    reviewer: "Pending business owner confirmation",
    expiryDate: "Pending certificate expiry extraction",
    pageUsage: ["/quality/"],
    publicationStatus: "publishable",
  },
  {
    claimId: "high-risk-performance-percentages",
    exactPublicWording: "Performance percentage claims such as viscosity reduction or wetting time reduction",
    productGrade: "All product grades",
    sourceDocument: "Business-provided COA/TDS/application reports required before publication",
    sourceOwner: "Business owner",
    sourceDate: "Not provided",
    applicableMarket: "All markets",
    verificationStatus: "unverified",
    reviewer: "Not reviewed",
    expiryDate: "Not applicable until approved",
    pageUsage: [],
    publicationStatus: "do-not-publish",
  },
  {
    claimId: "high-risk-health-and-drug-claims",
    exactPublicWording: "Health, cognitive, liver, bioavailability, infant, pharmaceutical or drug-delivery claims",
    productGrade: "All product grades",
    sourceDocument: "Regulatory and technical evidence required before publication",
    sourceOwner: "Business owner",
    sourceDate: "Not provided",
    applicableMarket: "All markets",
    verificationStatus: "unverified",
    reviewer: "Not reviewed",
    expiryDate: "Not applicable until approved",
    pageUsage: [],
    publicationStatus: "do-not-publish",
  },
];

export function getPublishableClaims() {
  return evidenceLedger.filter((claim) => claim.publicationStatus === "publishable");
}
