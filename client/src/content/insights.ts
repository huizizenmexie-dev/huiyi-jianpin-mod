import { LOCALES, type Locale, type ProductSlug, type TranslationStatus } from "./routes";

export type InsightCtaType = "application" | "procurement";

export type InsightSection = {
  heading: string;
  body: string[];
};

export type InsightArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intent: string;
  keywords: string[];
  ctaType: InsightCtaType;
  productSlugs: ProductSlug[];
  relatedSlugs: string[];
  sections: InsightSection[];
  localeStatus: Record<Locale, TranslationStatus>;
};

const draftLocales = Object.fromEntries(
  LOCALES.map((locale) => [locale, locale === "en" ? "ready" : "draft"])
) as Record<Locale, TranslationStatus>;

export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    slug: "soy-lecithin-aquafeed-guide",
    title: "Soy Lecithin for Aquafeed: A Practical B2B Selection Guide",
    metaTitle: "Soy Lecithin for Aquafeed | B2B Buyer Selection Guide",
    metaDescription:
      "A practical guide for aquafeed teams evaluating soy lecithin forms, documentation, handling, and supplier questions before requesting a quote.",
    summary:
      "Aquafeed buyers can use soy lecithin as a formulation input, but selection should start with form, specification fit, processing route, documentation, and buyer-side validation.",
    intent: "Help aquafeed procurement and formulation teams shortlist lecithin forms without unsupported performance promises.",
    keywords: ["soy lecithin aquafeed", "aquafeed lecithin supplier", "feed grade lecithin buyer guide"],
    ctaType: "application",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder", "soy-lecithin-granules"],
    relatedSlugs: ["liquid-vs-powder-lecithin-aquafeed", "feed-grade-lecithin-buyer-checklist"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Start with the feed process, not only the ingredient name",
        body: [
          "Aquafeed projects often begin with a broad request for soy lecithin, but the practical question is how the material will enter the feed process. A liquid system can suit oil-phase handling, while powder or granular formats may be easier for dry blending, premix preparation, or smaller trial batches. The right format depends on the buyer's equipment, ingredient flow, and internal validation plan.",
          "Lecprima's current product pages include liquid, powder, and granular soy lecithin systems. Those pages provide the approved visible product data that should guide the first comparison, including form, model options, packaging, storage, and selected specification fields.",
        ],
      },
      {
        heading: "Compare specification fit before discussing commercial terms",
        body: [
          "For aquafeed procurement, a useful RFQ should identify the product form, target application, estimated quantity, destination country or port, and any internal specification target. Buyers should also state whether they are screening liquid lecithin, deoiled powder, or granules, because these formats are not interchangeable in handling.",
          "Avoid asking suppliers to guarantee feed performance before a trial. A responsible supplier discussion should focus on available documentation, batch specification, packaging, storage requirements, and whether the grade is suitable for the buyer's intended process after buyer-side evaluation.",
        ],
      },
      {
        heading: "Documentation to request for aquafeed evaluation",
        body: [
          "Before a sample or purchase discussion, procurement teams commonly request a product specification, COA format, safety documentation, packing details, storage instructions, and any documents already available for the selected grade. Certification or claim language should only be used when it is present in approved product records or verified documents.",
          "If a buyer needs feed-market or destination-specific documents, that requirement should be stated early. Lecprima can discuss available technical documents after the product, application, and target requirement are confirmed.",
        ],
      },
      {
        heading: "How to build the shortlist",
        body: [
          "A practical shortlist can include liquid soy lecithin for liquid handling, soy lecithin powder for dry handling, and soy lecithin granules where a clean granular format is preferred. The product page should remain the source for final names and visible specifications.",
          "When the formulation target is still open, it is safer to send an application brief through the Contact page rather than forcing a grade selection too early. Include process notes, existing ingredient form, expected monthly quantity, and destination so the sales team can route the inquiry accurately.",
        ],
      },
    ],
  },
  {
    slug: "liquid-vs-powder-lecithin-aquafeed",
    title: "Liquid vs Powder Lecithin for Aquafeed: Handling and RFQ Differences",
    metaTitle: "Liquid vs Powder Lecithin for Aquafeed | Handling Guide",
    metaDescription:
      "Compare liquid and powder lecithin options for aquafeed procurement, including handling, packaging, documentation, and RFQ details.",
    summary:
      "Liquid and powder lecithin should be compared by handling route, equipment fit, packaging, and documentation rather than by a single generic ingredient label.",
    intent: "Clarify form-selection differences for aquafeed buyers preparing RFQs.",
    keywords: ["liquid lecithin aquafeed", "powder lecithin feed", "lecithin handling feed mill"],
    ctaType: "application",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder"],
    relatedSlugs: ["soy-lecithin-aquafeed-guide", "liquid-lecithin-feed-mill-handling"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Liquid lecithin is usually a handling decision",
        body: [
          "Liquid soy lecithin can be a practical option when a buyer already has liquid ingredient handling, oil-phase mixing, drum or IBC receiving, and suitable pumping or warming procedures. The approved product record lists liquid forms and packaging options, so buyers should confirm whether their site can manage the material before requesting samples.",
          "Procurement should avoid treating liquid lecithin as a universal substitute for powder. Viscosity, storage temperature, drum handling, and line clean-down are operational questions that need site-level confirmation.",
        ],
      },
      {
        heading: "Powder lecithin fits different plant constraints",
        body: [
          "Powder lecithin may be preferred when a plant wants dry blending, premix preparation, bagged storage, or simpler small-lot trial handling. The current soy lecithin powder page lists a fine powder format, model options, specification fields, packaging, and storage guidance.",
          "A powder request should still include process details. Dust control, mixing order, and compatibility with other dry ingredients are buyer-side process questions, so the supplier discussion should focus on grade selection and available documentation.",
        ],
      },
      {
        heading: "Ask different RFQ questions for each form",
        body: [
          "For liquid lecithin, ask about product model, packaging format, storage instructions, document availability, and whether the intended application has special handling requirements. For powder lecithin, ask about grade option, packaging, storage, specification fields, and trial quantity planning.",
          "Do not request unverified promises such as guaranteed growth, improved immunity, or a universal addition rate. Those statements require evidence and buyer-side testing that is outside a simple product page comparison.",
        ],
      },
      {
        heading: "When to send a combined inquiry",
        body: [
          "If a team is still choosing between liquid and powder, send both routes in one inquiry. Include current equipment, preferred packaging, estimated quantity, destination, and any target specification. This lets the sales team compare realistic options instead of answering a vague ingredient request.",
          "The final selection should be validated in the buyer's feed process and documentation review. Lecprima's product pages are the correct starting point for real product names and currently published specifications.",
        ],
      },
    ],
  },
  {
    slug: "feed-grade-lecithin-buyer-checklist",
    title: "Feed-Use Lecithin Buyer Checklist for Procurement Teams",
    metaTitle: "Feed Lecithin Buyer Checklist | Procurement and Documents",
    metaDescription:
      "A buyer checklist for feed-use lecithin inquiries covering product form, documents, packaging, destination, and supplier questions.",
    summary:
      "A clear feed-use lecithin RFQ should separate product form, application, documentation, packaging, destination, and validation needs.",
    intent: "Give feed procurement teams a safe RFQ checklist without inventing feed claims.",
    keywords: ["feed lecithin checklist", "feed grade lecithin procurement", "lecithin RFQ"],
    ctaType: "procurement",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder", "soy-lecithin-granules"],
    relatedSlugs: ["soy-lecithin-aquafeed-guide", "soy-lecithin-fish-feed"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Define the buying need in operational terms",
        body: [
          "Instead of sending only the phrase feed-grade lecithin, procurement teams should define the intended use, preferred material form, estimated volume, packaging preference, destination, and technical requirements. This improves supplier matching and reduces repeated clarification.",
          "The current Lecprima site has real product pages for liquid soy lecithin, soy lecithin powder, and soy lecithin granules. It does not publish a separate feed-grade product page, so inquiries should map to those existing product pages or the Contact page.",
        ],
      },
      {
        heading: "Document questions to include",
        body: [
          "Ask what documents are available for the selected grade, such as specification, COA format, safety documentation, storage guidance, and packing information. If a destination market needs additional documents, name that requirement rather than assuming global applicability.",
          "Do not use supplier marketing language as a substitute for document review. Certification, origin, and claim wording should be verified against approved records before it appears in public copy or purchase documents.",
        ],
      },
      {
        heading: "Specification and sample alignment",
        body: [
          "A useful checklist links the requested sample or quote to a target specification. If the buyer is comparing liquid and powder forms, each should have a separate line item in the RFQ because handling and packaging differ.",
          "Sample discussions should happen after requirements are confirmed. Avoid asking for sample arrangements, delivery timing, or commercial terms without first providing the product name, application, destination, and quantity expectation.",
        ],
      },
      {
        heading: "Internal review before supplier selection",
        body: [
          "Before selecting a supplier, align procurement, formulation, quality, and logistics teams. Each group may care about a different risk: product form, document set, packing unit, storage instruction, or import requirement.",
          "A well-structured inquiry gives the supplier enough context to recommend a real existing product page and avoids unsupported claims about animal performance, regulatory status, or universal use rates.",
        ],
      },
    ],
  },
  {
    slug: "soy-lecithin-shrimp-feed",
    title: "Soy Lecithin for Shrimp Feed: Buyer Questions Before Trial Work",
    metaTitle: "Soy Lecithin for Shrimp Feed | Buyer Questions",
    metaDescription:
      "Procurement and formulation questions for shrimp feed teams evaluating soy lecithin forms, documentation, and trial planning.",
    summary:
      "Shrimp feed teams should discuss soy lecithin through product form, feed process, documentation, and trial objectives, without relying on unsupported performance claims.",
    intent: "Support shrimp feed buyers with safe application-oriented supplier questions.",
    keywords: ["soy lecithin shrimp feed", "shrimp feed lecithin supplier", "lecithin feed trial"],
    ctaType: "application",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder"],
    relatedSlugs: ["soy-lecithin-aquafeed-guide", "feed-grade-lecithin-buyer-checklist"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Frame the inquiry around the feed process",
        body: [
          "Shrimp feed inquiries should begin with the buyer's process route. State whether the material will enter a liquid phase, dry premix, or other preparation step. That context helps determine whether liquid soy lecithin or powder soy lecithin is a more realistic starting point.",
          "The supplier should not be asked to promise shrimp growth, survival, immunity, or a best addition rate from a website inquiry. Those outcomes require controlled buyer-side validation and are not part of the current public product data.",
        ],
      },
      {
        heading: "Identify the product form and grade target",
        body: [
          "The liquid soy lecithin page lists model options and liquid packaging; the soy lecithin powder page lists powder model options and bag packaging. Link the RFQ to one or both of those real product pages so the sales team can respond against visible product records.",
          "If the buyer does not know which form is suitable, the Contact page is the safer first route. Include target application, expected quantity, destination, and technical requirements so grade discussion can begin with real constraints.",
        ],
      },
      {
        heading: "Prepare documentation questions early",
        body: [
          "Quality teams may need a specification, COA format, storage guidance, packing information, and other available documents. The document set should be discussed before commercial terms are finalized, especially when the destination country or internal approval process has specific requirements.",
          "If the buyer requires a claim such as certification, origin, or special feed-market wording, that claim must be backed by verified documents before it is used externally.",
        ],
      },
      {
        heading: "Use trial language carefully",
        body: [
          "A responsible trial request describes the test objective without promising outcomes. For example, the buyer can state the current formulation challenge, process route, and comparison material, then ask which existing Lecprima product page is closest to the requirement.",
          "After requirements are confirmed, the team can discuss technical documents, sample arrangements, quotation, contract terms, and shipment through the normal sales process.",
        ],
      },
    ],
  },
  {
    slug: "soy-lecithin-fish-feed",
    title: "Soy Lecithin for Fish Feed: Product Form and Procurement Notes",
    metaTitle: "Soy Lecithin for Fish Feed | Product Form Guide",
    metaDescription:
      "Fish feed procurement notes for comparing soy lecithin liquid, powder, and granule formats using real product pages and careful RFQ language.",
    summary:
      "Fish feed buyers can compare soy lecithin forms by handling route, document needs, and internal validation plan before requesting a quote.",
    intent: "Help fish feed buyers map application needs to real Lecprima product pages.",
    keywords: ["soy lecithin fish feed", "fish feed lecithin", "lecithin supplier feed"],
    ctaType: "application",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder", "soy-lecithin-granules"],
    relatedSlugs: ["soy-lecithin-aquafeed-guide", "liquid-vs-powder-lecithin-aquafeed"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Map the feed application to a real product page",
        body: [
          "Fish feed buyers should avoid generic product names that do not match a supplier's published catalog. Lecprima has real pages for soy lecithin liquid, soy lecithin powder, and soy lecithin granules; those pages are the correct internal link targets for fish feed discussions.",
          "If the project needs a feed-use evaluation but no exact grade has been selected, link the inquiry to the product category or Contact page rather than inventing a separate product URL.",
        ],
      },
      {
        heading: "Choose the first comparison by handling route",
        body: [
          "Liquid lecithin may be relevant where liquid ingredient handling is already available. Powder or granules may be simpler where dry storage, bag handling, or premix preparation is preferred. The selection should reflect the buyer's plant and trial plan.",
          "The product page should be used for visible specification and packaging details. Do not transfer unverified specifications from one form to another.",
        ],
      },
      {
        heading: "Quality and procurement questions",
        body: [
          "Ask for available documents, storage guidance, packing unit, grade name, and whether the selected product aligns with the intended application discussion. Destination country or port should be included because documentation and logistics questions often depend on it.",
          "Procurement should also clarify estimated quantity and packaging preference. That does not guarantee price or availability, but it gives the supplier enough context to prepare a meaningful response.",
        ],
      },
      {
        heading: "Keep performance evaluation inside the buyer's trial",
        body: [
          "Fish feed performance depends on formulation, process, species, feed format, and trial design. Public B2B content should not promise growth, digestibility, immunity, or a universal inclusion level unless verified evidence exists.",
          "A careful supplier conversation can still be useful: it narrows the product form, confirms documents, and prepares a quote request after the buyer defines the application and target specification.",
        ],
      },
    ],
  },
  {
    slug: "liquid-lecithin-feed-mill-handling",
    title: "Liquid Lecithin Feed Mill Handling: RFQ and Storage Questions",
    metaTitle: "Liquid Lecithin Feed Mill Handling | RFQ Questions",
    metaDescription:
      "Feed mill handling questions for liquid soy lecithin buyers, including packaging, storage, pumping, documentation, and quote preparation.",
    summary:
      "Liquid lecithin sourcing should include receiving, storage, pumping, documentation, and packaging questions before a buyer confirms commercial details.",
    intent: "Help feed mills decide whether liquid lecithin handling is practical before requesting a quote.",
    keywords: ["liquid lecithin feed mill", "liquid soy lecithin handling", "feed mill lecithin RFQ"],
    ctaType: "procurement",
    productSlugs: ["soy-lecithin-liquid"],
    relatedSlugs: ["liquid-vs-powder-lecithin-aquafeed", "feed-grade-lecithin-buyer-checklist"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Confirm that the plant can receive liquid material",
        body: [
          "Liquid soy lecithin is not only a formulation choice; it is also a plant-handling choice. Buyers should confirm drum or IBC receiving, storage area, transfer equipment, operator procedures, and clean-down expectations before starting a quote discussion.",
          "The current liquid soy lecithin page lists liquid form and packaging options. Those visible records should be the reference point for any RFQ.",
        ],
      },
      {
        heading: "Ask practical storage and handling questions",
        body: [
          "A useful RFQ asks for storage guidance, packing format, available documents, and grade details. If the buyer has temperature or pumping constraints, those should be shared because liquid ingredient handling can vary by site.",
          "Do not assume a liquid material can be handled like a dry premix. If the mill has no liquid ingredient infrastructure, powder or granule options may be easier to evaluate first.",
        ],
      },
      {
        heading: "Separate technical discussion from commercial negotiation",
        body: [
          "Before asking for price, send the intended application, estimated quantity, destination, packaging preference, and target technical requirements. This helps the sales team understand whether the inquiry fits the published liquid product system.",
          "Commercial terms, sample arrangements, and shipment details should be discussed after requirements are confirmed. The website should not publish fixed price, stock, delivery time, or sample commitments unless verified business data exists.",
        ],
      },
      {
        heading: "Build a fallback option",
        body: [
          "If liquid handling is uncertain, ask the sales team to compare the inquiry with powder lecithin as a fallback. This does not mean the two forms are identical; it simply keeps the sourcing conversation grounded in real available product pages.",
          "A documented comparison can save time for procurement, formulation, and operations teams before formal approval.",
        ],
      },
    ],
  },
  {
    slug: "food-grade-soy-lecithin-selection",
    title: "Food-Use Soy Lecithin Selection: Forms, Documents, and RFQ Details",
    metaTitle: "Food-Use Soy Lecithin Selection | B2B Buyer Guide",
    metaDescription:
      "A food ingredient buyer guide to selecting soy lecithin forms using real product pages, documentation questions, and application context.",
    summary:
      "Food ingredient buyers should select soy lecithin by application, material form, visible specification, documentation, and processing needs.",
    intent: "Guide food procurement teams through soy lecithin form selection without unsupported food claims.",
    keywords: ["food grade soy lecithin", "soy lecithin food applications", "lecithin food ingredient supplier"],
    ctaType: "procurement",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder", "soy-lecithin-granules", "modified-soy-lecithin"],
    relatedSlugs: ["soy-lecithin-bakery-applications", "soy-lecithin-chocolate-confectionery"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Match form to the food process",
        body: [
          "Food-use soy lecithin selection should begin with the application and process. Liquid systems may suit fat-phase or liquid handling; powders and granules may suit dry blending, premixes, or cleaner handling in smaller batches.",
          "Lecprima's real product pages include liquid soy lecithin, powder soy lecithin, modified soy lecithin, and soy lecithin granules. These pages are the approved sources for visible product names and published details.",
        ],
      },
      {
        heading: "Use application language carefully",
        body: [
          "Food applications such as bakery, chocolate, confectionery, beverages, and processed foods can involve different process targets. Public content should describe evaluation areas and supplier questions rather than guaranteeing formula outcomes.",
          "When a buyer needs a specific claim, certification, allergen statement, or market compliance document, it should be requested and reviewed as a document, not inferred from a generic article.",
        ],
      },
      {
        heading: "Prepare an RFQ that quality teams can use",
        body: [
          "A good food ingredient RFQ includes product name or grade, application, estimated quantity, packaging preference, destination, and target technical requirements. If the buyer has an internal specification, attach or summarize the relevant limits.",
          "This structure helps the supplier identify whether an existing published product page is suitable or whether the inquiry should start with a broader technical discussion.",
        ],
      },
      {
        heading: "Documentation before scale-up",
        body: [
          "Before scale-up, quality and procurement teams typically review specifications, COA format, safety documents, storage guidance, and packing information. Availability should be confirmed by the sales team for the selected grade.",
          "Use the Contact page when the requirement is not yet mapped to a product. Include the application and target specification so the response can be specific.",
        ],
      },
    ],
  },
  {
    slug: "soy-lecithin-bakery-applications",
    title: "Soy Lecithin in Bakery Applications: What Buyers Should Specify",
    metaTitle: "Soy Lecithin Bakery Applications | Buyer Specification Guide",
    metaDescription:
      "Bakery ingredient buyers can use this guide to specify soy lecithin form, process needs, documentation, and RFQ details.",
    summary:
      "Bakery teams should define process needs, material form, documentation, and validation goals before selecting a soy lecithin grade.",
    intent: "Help bakery procurement teams request soy lecithin information without overstating product effects.",
    keywords: ["soy lecithin bakery", "bakery lecithin supplier", "lecithin dough applications"],
    ctaType: "application",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder", "soy-lecithin-granules", "modified-soy-lecithin"],
    relatedSlugs: ["food-grade-soy-lecithin-selection", "water-dispersible-lecithin-instant-beverages"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Define the bakery format first",
        body: [
          "Bakery covers many processes, from bread and buns to biscuits, cakes, fillings, and frozen dough. A supplier cannot select a responsible grade from the word bakery alone. The buyer should describe the product type, process step, current challenge, and preferred ingredient form.",
          "Lecprima's published product data includes soy lecithin liquid, powder, granules, and modified soy lecithin. Each form should be evaluated against the buyer's process rather than treated as the same material.",
        ],
      },
      {
        heading: "Keep claims tied to buyer validation",
        body: [
          "Existing product records may describe application areas and process targets, but a new article should not promise a universal bakery result. Dough behavior, texture, shelf life, and processing performance depend on the full formulation and process.",
          "Use conditional language in the RFQ: state what the buyer wants to evaluate and ask which existing grade may be suitable for testing.",
        ],
      },
      {
        heading: "Specify handling and packaging requirements",
        body: [
          "Bakery facilities may prefer liquid handling, dry blending, or granular ingredients depending on equipment and operator workflow. Packaging preference, storage conditions, and batch size can affect the practical choice.",
          "Include these details before discussing price. A quote request without handling context often leads to multiple clarification rounds.",
        ],
      },
      {
        heading: "Documents to request",
        body: [
          "Ask for the available specification, COA format, safety documentation, packing details, storage guidance, and any grade-specific document needed by the buyer's quality team. Do not assume an unsupported claim is available.",
          "After the application and target requirements are clear, Lecprima's sales team can discuss technical documents, sample arrangements, quotation, contract terms, and shipment.",
        ],
      },
    ],
  },
  {
    slug: "soy-lecithin-chocolate-confectionery",
    title: "Soy Lecithin for Chocolate and Confectionery: Buyer Evaluation Notes",
    metaTitle: "Soy Lecithin for Chocolate and Confectionery | Buyer Notes",
    metaDescription:
      "B2B notes for chocolate and confectionery teams comparing soy lecithin forms, documentation, and application requirements.",
    summary:
      "Chocolate and confectionery buyers should map soy lecithin requests to process needs, visible product data, and document review before scale-up.",
    intent: "Support confectionery buyers with cautious product selection language and real internal links.",
    keywords: ["soy lecithin chocolate", "confectionery lecithin supplier", "lecithin for chocolate processing"],
    ctaType: "application",
    productSlugs: ["soy-lecithin-liquid", "soy-lecithin-powder", "soy-lecithin-granules"],
    relatedSlugs: ["food-grade-soy-lecithin-selection", "soy-lecithin-bakery-applications"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Start with the product system and process point",
        body: [
          "Chocolate and confectionery teams may evaluate soy lecithin for processing and formulation reasons, but the request should identify the process point and material form. Liquid soy lecithin may be discussed where liquid or fat-phase handling is suitable; powder or granules may fit other handling preferences.",
          "The supplier conversation should reference real product pages rather than a generic claim. Lecprima publishes liquid, powder, and granular soy lecithin pages that can anchor the discussion.",
        ],
      },
      {
        heading: "Do not overstate formula outcomes",
        body: [
          "Viscosity, flow, molding, texture, and stability depend on the full chocolate or confectionery system. Public B2B content should avoid guaranteed outcomes and instead describe the questions buyers should ask before testing.",
          "If a buyer has a target specification or process benchmark, that should be shared through the quote request so the sales team can discuss grade fit and available documents.",
        ],
      },
      {
        heading: "Quality review matters before purchasing",
        body: [
          "Before purchase, request the selected grade's specification, COA format, storage guidance, packaging details, and any required documents for internal approval. Claims about certifications, allergen status, or market use should be verified through approved evidence.",
          "If the buyer compares several forms, each form should be listed separately in the RFQ because handling and documentation may differ.",
        ],
      },
      {
        heading: "When to contact sales",
        body: [
          "Contact sales when the buyer can provide application, product form preference, estimated quantity, destination, and target technical requirements. That information is enough to start a grounded discussion without inventing price, stock, or delivery commitments.",
          "If the product form is uncertain, send the application brief first and ask for a comparison between the existing soy lecithin product pages.",
        ],
      },
    ],
  },
  {
    slug: "water-dispersible-lecithin-instant-beverages",
    title: "Water-Dispersible Lecithin for Instant Beverages: Selection Questions",
    metaTitle: "Water-Dispersible Lecithin for Instant Beverages | Buyer Guide",
    metaDescription:
      "Selection questions for instant beverage buyers evaluating water-dispersible or modified lecithin options using real product pages.",
    summary:
      "Instant beverage teams should evaluate dispersibility needs, process route, product form, and available documentation before requesting a quote.",
    intent: "Guide beverage buyers toward modified or hydrolyzed lecithin discussions without unsupported dispersion guarantees.",
    keywords: ["water dispersible lecithin", "instant beverage lecithin", "modified lecithin beverage"],
    ctaType: "application",
    productSlugs: ["modified-soy-lecithin", "soy-lecithin-liquid", "soy-lecithin-powder"],
    relatedSlugs: ["food-grade-soy-lecithin-selection", "liquid-vs-powder-lecithin-aquafeed"],
    localeStatus: draftLocales,
    sections: [
      {
        heading: "Clarify what dispersibility means in the buyer's process",
        body: [
          "Instant beverage projects often use terms such as water-dispersible, fast wetting, or reduced clumping. These are process goals that depend on the full formula, powder system, liquid phase, mixing order, and equipment.",
          "Lecprima's modified soy lecithin and selected soy lecithin liquid or powder records include visible information relevant to dispersion discussions. The article should direct buyers to those real pages rather than inventing a separate beverage grade.",
        ],
      },
      {
        heading: "Compare modified and standard lecithin carefully",
        body: [
          "Modified soy lecithin may be a starting point when a buyer is discussing oil-in-water or water-dispersible applications. Standard liquid or powder lecithin may still be relevant depending on how the ingredient is added and processed.",
          "A responsible RFQ should describe the beverage format, powder or liquid process, target specification, and packaging preference. Do not ask for a guaranteed dispersion result without buyer-side testing.",
        ],
      },
      {
        heading: "Documentation and sensory questions",
        body: [
          "Beverage teams may care about color, odor, particle behavior, storage, and document availability. Public content should describe these as evaluation questions, not fixed universal outcomes.",
          "Ask the supplier which documents are available for the selected grade and whether the product form is appropriate for the intended application discussion.",
        ],
      },
      {
        heading: "Build the RFQ around a target application",
        body: [
          "For a useful quote request, provide the beverage type, target ingredient form, estimated quantity, destination, preferred packaging, and technical requirements. This helps the sales team discuss grade selection, documents, samples, quote, and contract terms in the right order.",
          "If the buyer is still screening options, request a comparison between modified soy lecithin, liquid soy lecithin, and soy lecithin powder using the published product pages.",
        ],
      },
    ],
  },
];

export const INSIGHT_SLUGS = INSIGHT_ARTICLES.map((article) => article.slug) as [string, ...string[]];

export function getInsightBySlug(slug: string) {
  return INSIGHT_ARTICLES.find((article) => article.slug === slug);
}

export function insightRoute(slug: string) {
  return `/insights/${slug}`;
}
