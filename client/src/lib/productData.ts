import { DEFAULT_LOCALE, type Locale } from "../i18n/config";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ApplicationPainPoint {
  industry: string;
  painPoint: string;
  product: string;
  dosage: string;
  effect: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string;
  quickSpecs: string;
  form: string;
  moq: string;
  category: string[];
  image: string;
  listingSpecs: string;
  specifications: ProductSpec[];
  applications: ApplicationPainPoint[];
  ctaText: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "soy-lecithin-liquid",
    name: "Soy Lecithin Liquid System",
    subtitle: "Phospholipid ≥60% | ISO 22000 | Non-GMO IP Optional",
    quickSpecs: "Form: Amber viscous liquid | Models: HXY-1SP/3SP/5SP/1SPN | MOQ: 200 kg",
    form: "Liquid",
    moq: "200 kg",
    category: ["Liquid"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/soy-lecithin-liquid-system-comparison-Qs6rasutqQrGfEDeVMXK7D.webp",
    listingSpecs: "Phospholipid ≥60% | Non-GMO IP Optional",
    specifications: [
      { label: "Product Form", value: "Yellow to brown viscous liquid; bleached type lighter" },
      { label: "HXY-1SP (Concentrated)", value: "Acetone Insoluble ≥60%, Acid Value ≤30 mg KOH/g, Moisture ≤1.0%" },
      { label: "HXY-3SP (Bleached)", value: "Acetone Insoluble ≥62%, Acid Value ≤30 mg KOH/g, lighter color" },
      { label: "HXY-5SP (Transparent)", value: "Acetone Insoluble ≥62%, Acid Value ≤30 mg KOH/g, high clarity" },
      { label: "HXY-1SPN (Hydrolyzed)", value: "Acetone Insoluble ≥60%, Acid Value ≤25 mg KOH/g, enhanced water dispersibility" },
      { label: "Testing Methods", value: "Acetone Insoluble (AOCS Ja 4-46), Acid Value (AOCS Ja 6-55), Moisture (GB 5009.3)" },
      { label: "Certifications", value: "ISO 22000; Non-GMO IP Statement available for HXY-1SPN" },
      { label: "Packaging", value: "200kg Iron Drum / 1000kg IBC Tote" },
      { label: "Storage", value: "Sealed, cool, dry place at 15–30°C. Shelf life 24 months" },
    ],
    applications: [
      { industry: "Chocolate & Confectionery", painPoint: "High refining viscosity, difficult molding, cocoa butter overuse", product: "HXY-1SP / HXY-3SP", dosage: "0.3–0.5% of total fat", effect: "Supports flow and molding targets when validated in the buyer's formula" },
      { industry: "Dairy & Instant Beverages", painPoint: "Fat floating, clumping, slow dissolution", product: "HXY-1SPN", dosage: "0.5–2% spray or dry blend", effect: "Supports uniform dispersion after buyer-side process validation" },
      { industry: "Bakery & Dough", painPoint: "Sticky dough, low volume, fast staling", product: "HXY-1SP", dosage: "0.3%-1.0% of flour", effect: "Improves extensibility, increases volume, retains moisture" },
    ],
    ctaText: "Need technical selection support for HXY-1SP?",
  },
  {
    id: 2,
    slug: "soy-lecithin-powder",
    name: "Soy Lecithin Powder System",
    subtitle: "Phospholipid ≥96% | ISO 22000 | Non-GMO IP Optional",
    quickSpecs: "Form: Fine light yellow powder | Models: HXY-PLP/PLS/PLF/PLG | MOQ: 200 kg",
    form: "Powder",
    moq: "200 kg",
    category: ["Powder"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533550952/36JVCC6brZWby675y2RiTA/soy-lecithin-powder-system-comparison-AfqafPsyWYrHyfC6JPifdK.webp",
    listingSpecs: "Phospholipid ≥96% | Peroxide ≤5.0",
    specifications: [
      { label: "Product Form", value: "Fine light yellow powder" },
      { label: "Model Options", value: "Oil-dispersible (HXY-PLP/HXY-PLS) / Non-GMO (HXY-PLF) / Granules (HXY-PLG)" },
      { label: "Acetone Insoluble (Phospholipid)", value: "≥96% (AOCS Ja 4-46)" },
      { label: "Loss on Drying", value: "≤2.0%" },
      { label: "Acid Value", value: "≤36.0 mg KOH/g (AOCS Ja 6-55)" },
      { label: "Peroxide Value", value: "≤5.0 mmol/kg" },
      { label: "Certifications", value: "ISO 22000; Non-GMO IP available for HXY-PLF" },
      { label: "Packaging", value: "20kg Kraft Paper Bag with Aluminum Foil Liner" },
      { label: "Storage", value: "Sealed, moisture-proof, 15–30°C. Shelf life 24 months" },
    ],
    applications: [
      { industry: "Baking & Frying", painPoint: "Poor dough handling, fast oxidation, poor crispness", product: "HXY-PLP", dosage: "0.3%-0.8% of flour", effect: "Improves tolerance, delays oxidation, enhances crispness" },
      { industry: "Technical excipient evaluation", painPoint: "Poor aqueous dispersibility in trial formulations", product: "HXY-PLF", dosage: "As needed", effect: "Supports dispersibility screening; regulatory use requires buyer validation" },
      { industry: "Meat & Protein Processing", painPoint: "Fat separation, dust generation", product: "HXY-PLP", dosage: "0.2%-0.5%", effect: "Uniform fat/water mixing, reduces dust" },
    ],
    ctaText: "Need technical selection support for HXY-PL series?",
  },
  {
    id: 3,
    slug: "modified-soy-lecithin",
    name: "Modified Soy Lecithin System",
    subtitle: "HLB ~10 | ISO 22000 | O/W Emulsifier",
    quickSpecs: "Form: Liquid (HXY-2SP) / Powder (HXY-PLW) | HLB ~10 | MOQ: 200 kg",
    form: "Liquid / Powder",
    moq: "200 kg",
    category: ["Liquid", "Powder"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-modified-lecithin-ML39LJX3HarLmSbbPfjVkG.webp",
    listingSpecs: "HLB ~10 | Rapid Dispersion",
    specifications: [
      { label: "Product Form", value: "Liquid (HXY-2SP) / Powder (HXY-PLW)" },
      { label: "Acetone Insoluble", value: "≥60% (Liquid) / ≥96% (Powder)" },
      { label: "HLB Value", value: "~10 — Optimized for Oil-in-Water Emulsions" },
      { label: "Solubility", value: "Readily dispersible in water forming stable emulsions" },
      { label: "Certifications", value: "ISO 22000" },
      { label: "Packaging", value: "200kg Iron Drum (Liquid) / 20kg Kraft Bag (Powder)" },
      { label: "Storage", value: "Sealed, moisture-proof, 15–30°C" },
    ],
    applications: [
      { industry: "Milk Powder & Instant Beverages", painPoint: "Fat floating, clumping, sedimentation", product: "HXY-PLW", dosage: "0.2%-0.5% dry blending or spraying", effect: "Improves fat stability, anti-caking, reduces sedimentation" },
      { industry: "Bakery & Noodles", painPoint: "Long dough formation, poor tensile strength, fast staling", product: "HXY-2SP", dosage: "0.3%-0.8% of flour", effect: "Stabilizes rheology, improves moisture retention" },
      { industry: "Protein Isolate Processing", painPoint: "Slow solubility, lack of gloss, dust", product: "HXY-PLW", dosage: "As needed", effect: "Increases rapid solubility, enhances gloss" },
    ],
    ctaText: "Need technical selection support for Modified Lecithin?",
  },
  {
    id: 4,
    slug: "phosphatidylcholine",
    name: "Phosphatidylcholine System",
    subtitle: "Purity 30%–90% | ISO 22000 | Liposome Grade",
    quickSpecs: "Purity: 30%–90% | Cold Chain Required for ≥70%",
    form: "Powder / Waxy Solid",
    moq: "5 kg",
    category: ["High-Purity"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-phosphatidylcholine-mn2rCrodgbXPPiwaAe7HL9.webp",
    listingSpecs: "Liposome Grade | Cold Chain for High Purity",
    specifications: [
      { label: "Product Form", value: "Light yellow powder to yellow waxy solid (depending on purity)" },
      { label: "Model Options", value: "HXY-PC 30% / 40% / 50% / 70% / 90%" },
      { label: "PC Content", value: "30%–90%" },
      { label: "Acetone Insoluble", value: "≥96%" },
      { label: "Residual Protein (PC ≥70%)", value: "≤0.5%" },
      { label: "Certifications", value: "ISO 22000" },
      { label: "Packaging", value: "5kg / 20kg Aluminum Foil Bag" },
      { label: "Storage", value: "Sealed, moisture-proof. High-purity grades (70%–90%) require -5°C to -10°C cold storage" },
    ],
    applications: [
      { industry: "Functional foods and supplements", painPoint: "Need for documented phospholipid ingredient specifications", product: "PC 50%", dosage: "As formulated", effect: "Provides phosphatidylcholine content for buyer-reviewed formulations" },
      { industry: "Lipid formulation R&D", painPoint: "High-purity lipid material screening", product: "PC 70%-90%", dosage: "As formulated", effect: "Available for buyer-led technical evaluation; no drug efficacy claim is made" },
      { industry: "Cosmetics", painPoint: "Need for phospholipid-based emulsion materials", product: "PC 30%", dosage: "0.5%-2.0% in emulsions", effect: "Supports emulsion texture evaluation in buyer formulations" },
    ],
    ctaText: "Need high-purity PC for your formulation?",
  },
  {
    id: 5,
    slug: "phosphatidylserine",
    name: "Phosphatidylserine System",
    subtitle: "Purity 20%–70% | ISO 22000 | Phospholipid Ingredient",
    quickSpecs: "Purity: 20%–70% | Enzymatic Synthesis",
    form: "Light yellow powder",
    moq: "5 kg",
    category: ["High-Purity"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-phosphatidylserine-XM4LntbU7RREZPWVZ5CRNP.webp",
    listingSpecs: "Phospholipid Ingredient | Enzymatic Synthesis",
    specifications: [
      { label: "Product Form", value: "Light yellow powder" },
      { label: "Model Options", value: "HXY-PS 20% / 50% / 70%" },
      { label: "PS Content", value: "20%–70%" },
      { label: "Molecular Character", value: "Amphiphilic" },
      { label: "Heavy Metals", value: "Pb ≤0.5 ppm, As ≤0.3 ppm, Hg ≤0.1 ppm (typical)" },
      { label: "Certifications", value: "ISO 22000" },
      { label: "Packaging", value: "5kg / 20kg Aluminum Foil Bag" },
      { label: "Storage", value: "Sealed, moisture-proof, 15–30°C" },
    ],
    applications: [
      { industry: "Supplement ingredient evaluation", painPoint: "Need for phosphatidylserine specification options", product: "PS 50%", dosage: "As formulated", effect: "Provides PS content options for buyer-reviewed formulations" },
      { industry: "Dietary supplement blending", painPoint: "Need for documented phospholipid ingredient inputs", product: "PS 20%", dosage: "As formulated", effect: "Supports buyer formulation and label review processes" },
      { industry: "Technical formulation screening", painPoint: "Need for higher-purity PS material", product: "PS 70%", dosage: "As formulated", effect: "Available for buyer-side technical evaluation; no drug efficacy claim is made" },
    ],
    ctaText: "Need PS for cognitive health products?",
  },
  {
    id: 6,
    slug: "sunflower-lecithin",
    name: "Sunflower Lecithin System",
    subtitle: "Phospholipid ≥60% (Liquid) / ≥96% (Powder) | ISO 22000 | Soy-Free · Allergen-Free",
    quickSpecs: "Form: Liquid (HXY-SFL) / Powder (HXY-SFP) | Source: 100% Sunflower",
    form: "Liquid / Powder",
    moq: "200 kg",
    category: ["Allergen-Free"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-sunflower-lecithin-Vrcgik3YpbEZcvAGkfPVMf.webp",
    listingSpecs: "Soy-Free · Allergen-Free",
    specifications: [
      { label: "Product Form", value: "Liquid (HXY-SFL) / Powder (HXY-SFP)" },
      { label: "Acetone Insoluble", value: "≥60% (Liquid) / ≥96% (Powder)" },
      { label: "Source", value: "100% Sunflower oil byproduct" },
      { label: "Allergen Status", value: "Soy-Free, Allergen-Free" },
      { label: "Certifications", value: "ISO 22000" },
      { label: "Packaging", value: "200kg Iron Drum (Liquid) / 20kg Kraft Bag (Powder)" },
      { label: "Storage", value: "Sealed, moisture-proof, 15–30°C" },
    ],
    applications: [
      { industry: "Sensitive-label food evaluation", painPoint: "Soy allergen concerns", product: "HXY-SFL", dosage: "As formulated", effect: "Soy-free source option; final allergen and market claims require buyer review" },
      { industry: "Clean Label Foods", painPoint: "Consumers avoiding soy/GMO", product: "HXY-SFP", dosage: "1:1 replacement for soy lecithin", effect: 'Enables "Soy-Free" and "Non-GMO" claims' },
      { industry: "Cosmetics", painPoint: "Low allergenic potential", product: "HXY-SFL", dosage: "As formulated", effect: "Natural emulsifier and moisturizer for sensitive skin" },
    ],
    ctaText: "Need allergen-free lecithin solutions?",
  },
  {
    id: 7,
    slug: "soy-dietary-fiber",
    name: "Soy Dietary Fiber",
    subtitle: "Total Fiber ≥60% | ISO 22000 | High Water Holding",
    quickSpecs: "Models: J8000 / J18000 | Total Fiber ≥60%",
    form: "Powder",
    moq: "200 kg",
    category: ["Protein/Fiber"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-soy-dietary-fiber-5CnAZj8wYqg8tGGWeETC62.webp",
    listingSpecs: "Total Fiber ≥60% | High Water Holding",
    specifications: [
      { label: "Product Form", value: "Powder (J8000 / J18000)" },
      { label: "Total Dietary Fiber (Wet basis)", value: "≥60%" },
      { label: "Moisture", value: "≤10.0%" },
      { label: "Crude Protein", value: "≤25%" },
      { label: "Ash", value: "≤5%" },
      { label: "Source", value: "Heilongjiang non-GMO soybean base" },
      { label: "Certifications", value: "ISO 22000" },
      { label: "Packaging", value: "25kg Kraft Bag" },
      { label: "Storage", value: "Sealed, moisture-proof" },
    ],
    applications: [
      { industry: "Meat Products & Sausages", painPoint: "Low yield, fat/water separation", product: "J8000", dosage: "1%-3%", effect: "Improves water retention and emulsification, increases yield" },
      { industry: "Baking & Frozen Foods", painPoint: "Fast staling, poor freeze-thaw stability", product: "J8000", dosage: "1%-5% of flour", effect: "Delays starch aging, improves softness and stability" },
      { industry: "High-fiber foods", painPoint: "Need for fiber contribution and texture support", product: "J18000", dosage: "As formulated", effect: "Supports fiber-content and texture formulation targets after buyer validation" },
    ],
    ctaText: "Need fiber for texture and yield improvement?",
  },
  {
    id: 8,
    slug: "soy-protein-isolate",
    name: "Gel-Type Soy Protein Isolate",
    subtitle: "Protein ≥90% | ISO 22000 | Gel Value ≥20g",
    quickSpecs: "Model: J7501 | Protein ≥90% | Gel ≥20g",
    form: "Light yellow powder",
    moq: "200 kg",
    category: ["Protein/Fiber"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-soy-protein-isolate-8SKUhatJo4bHShdmeP7HhE.webp",
    listingSpecs: "Protein ≥90% | Gel Value ≥20g",
    specifications: [
      { label: "Product Form", value: "Light yellow powder (J7501)" },
      { label: "Protein Content", value: "≥90% (Dry basis)" },
      { label: "Moisture", value: "≤7.0%" },
      { label: "pH Value", value: "7.0 ± 0.5" },
      { label: "Gel Value", value: "≥20g" },
      { label: "Water Soluble Nitrogen Rate", value: "≥90%" },
      { label: "Total Bacterial Count", value: "≤30,000 cfu/g" },
      { label: "Coliforms", value: "Negative" },
      { label: "Certifications", value: "ISO 22000" },
      { label: "Packaging", value: "25kg Kraft Bag" },
      { label: "Storage", value: "Sealed, moisture-proof" },
    ],
    applications: [
      { industry: "Restructured Ham & Roast Meat", painPoint: "Poor sliceability, low yield", product: "J7501", dosage: "2%-4% direct powder addition", effect: "Forms stable 3D gel network, improves sliceability and water retention" },
      { industry: "Imitation Seafood", painPoint: "Lack of elasticity, poor bite", product: "J7501", dosage: "Added during low-temp chopping", effect: "Enhances elasticity and gel strength" },
      { industry: "Emulsified Sausages", painPoint: "Fat separation, high cooking loss", product: "J7501", dosage: "As formulated", effect: "Excellent emulsification, increases yield" },
    ],
    ctaText: "Need high-gel protein for meat analogs?",
  },
  {
    id: 9,
    slug: "soy-oligosaccharide-small-pack",
    name: "Soy Oligosaccharide & Protein (Small Packaging)",
    subtitle: "FSSC 22000 | Retail Ready | Small Batch",
    quickSpecs: "Oligosaccharide Purity ≥80% | FSSC 22000 Certified",
    form: "Powder / Liquid",
    moq: "50 kg",
    category: ["Protein/Fiber"],
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663542071909/f8VjjnvUts7et3XqyBkjBm/prod-soy-oligosaccharide-MKHUvqAVWmpChiqLRNppFS.webp",
    listingSpecs: "Prebiotic | Retail Ready",
    specifications: [
      { label: "Product Form", value: "Powder / Liquid (varies)" },
      { label: "Soy Oligosaccharide Purity", value: "≥80% (Stachyose + Raffinose, typical)" },
      { label: "Soy Protein Content (Small Pack)", value: "≥90% (Dry basis, typical)" },
      { label: "Production Scope", value: "Small packaging production and sales" },
      { label: "Certifications", value: "FSSC 22000 (GFSI Recognized) / HACCP" },
      { label: "Packaging", value: "Retail-ready small packaging / Custom small batch" },
      { label: "Storage", value: "Sealed, cool, dry environment" },
    ],
    applications: [
      { industry: "Retail supplement formats", painPoint: "Consumer-ready oligosaccharide or protein formats", product: "Sachets, capsules, small cans", dosage: "As packaged", effect: "Supports buyer-reviewed product format development" },
      { industry: "R&D & Small Batch Blending", painPoint: "Small quantities with full certification", product: "Custom small batch", dosage: "As needed", effect: "Reduces inventory waste, full traceability" },
      { industry: "Functional beverages", painPoint: "Oligosaccharide ingredient evaluation", product: "Soy Oligosaccharide", dosage: "As formulated", effect: "Supports buyer-side formulation review" },
    ],
    ctaText: "Need small-pack ingredients for retail or R&D?",
  },
  {
    id: 10,
    slug: "soy-lecithin-granules",
    name: "Soy Lecithin Granules",
    subtitle: "Total Phospholipids 97.2% | Non-GMO Soy | Clean Granular Format",
    quickSpecs: "Form: Light yellow granules | Acetone Insoluble: 97.2% | MOQ: 200 kg",
    form: "Granules",
    moq: "200 kg",
    category: ["Powder"],
    image: "/products/soy-lecithin-granules.png",
    listingSpecs: "Total Phospholipids 97.2% | Non-GMO Granules",
    specifications: [
      { label: "Product Form", value: "Light yellow soy lecithin granules for easy blending, dispersion, and handling" },
      { label: "Source", value: "Refined from non-GMO soybeans" },
      { label: "Acetone Insoluble (Total Phospholipids)", value: "97.2% reference value; standard limit ≥95.0% (SN/T 0802.2)" },
      { label: "Hexane Insoluble", value: "0.09% reference value; standard limit ≤0.30% (SN/T 0802.2)" },
      { label: "Moisture & Volatiles", value: "0.40% reference value; standard limit ≤1.0% (GB/T 5009.3)" },
      { label: "Acid Value", value: "22.0 mg KOH/g reference value; standard limit ≤30.0 mg KOH/g (GB/T 5530)" },
      { label: "Peroxide Value", value: "≤3.0 meq/kg reference value; standard limit ≤10.0 meq/kg (GB/T 5009.227)" },
      { label: "Heavy Metals", value: "Pb not detected; As not detected (GB/T 5009.74 / AOAC 986.15)" },
      { label: "Nutrition Profile (per 100g)", value: "Energy 3700 kJ, fat 91g, carbohydrates 8g, protein 0g, sodium 0.04g" },
      { label: "Key Active Components", value: "Natural phospholipid blend rich in phosphatidylcholine (PC), phosphatidylethanolamine (PE), and phosphatidylinositol (PI)" },
      { label: "Storage", value: "Keep sealed in a cool, dry place away from direct sunlight and moisture" },
    ],
    applications: [
      { industry: "Dietary supplements", painPoint: "Need natural phospholipid nutrition in a convenient solid format", product: "Soy Lecithin Granules", dosage: "As formulated", effect: "Supports buyer-reviewed nutrition formulations without making health efficacy claims" },
      { industry: "Bakery, Chocolate & Confectionery", painPoint: "Oil-water instability, poor texture, and shorter shelf life", product: "Soy Lecithin Granules", dosage: "0.3%-0.8% typical use depending on formula", effect: "Improves emulsification, texture uniformity, processing flow, and product stability" },
      { industry: "Dairy, Margarine & Processed Foods", painPoint: "Fat separation and inconsistent mouthfeel", product: "Soy Lecithin Granules", dosage: "As formulated", effect: "Stabilizes fat systems and improves texture in clean-label formulations" },
      { industry: "Feed & Animal Nutrition", painPoint: "Need better dispersion and palatability support", product: "Soy Lecithin Granules", dosage: "As formulated", effect: "Supports feed palatability and dispersion evaluation in buyer formulations" },
    ],
    ctaText: "Need Soy Lecithin Granules for supplements, food, or feed applications?",
  },
];

type LocalizedProductCopy = Pick<
  Product,
  "name" | "subtitle" | "quickSpecs" | "form" | "listingSpecs" | "ctaText"
>;

const PRODUCT_COPY: Partial<Record<Locale, Record<string, LocalizedProductCopy>>> = {
  "zh-CN": {
    "soy-lecithin-liquid": {
      name: "液体大豆卵磷脂系统",
      subtitle: "磷脂 ≥60% | ISO 22000 | 可选 Non-GMO IP",
      quickSpecs: "形态：琥珀色黏稠液体 | 型号：HXY-1SP/3SP/5SP/1SPN | MOQ：200 kg",
      form: "液体",
      listingSpecs: "磷脂 ≥60% | 可选 Non-GMO IP",
      ctaText: "需要 HXY-1SP 的技术选型支持？",
    },
    "soy-lecithin-powder": {
      name: "粉末大豆卵磷脂系统",
      subtitle: "磷脂 ≥96% | ISO 22000 | 可选 Non-GMO IP",
      quickSpecs: "形态：浅黄色细粉 | 型号：HXY-PLP/PLS/PLF/PLG | MOQ：200 kg",
      form: "粉末",
      listingSpecs: "磷脂 ≥96% | 过氧化值 ≤5.0",
      ctaText: "需要 HXY-PL 系列的技术选型支持？",
    },
    "modified-soy-lecithin": {
      name: "改性大豆卵磷脂系统",
      subtitle: "HLB 约 10 | ISO 22000 | O/W 乳化剂",
      quickSpecs: "形态：液体 (HXY-2SP) / 粉末 (HXY-PLW) | HLB 约 10 | MOQ：200 kg",
      form: "液体 / 粉末",
      listingSpecs: "HLB 约 10 | 快速分散",
      ctaText: "需要改性卵磷脂的技术选型支持？",
    },
    phosphatidylcholine: {
      name: "磷脂酰胆碱系统",
      subtitle: "纯度 30%–90% | ISO 22000 | 脂质体级",
      quickSpecs: "纯度：30%–90% | ≥70% 需要冷链",
      form: "粉末 / 蜡状固体",
      listingSpecs: "脂质体级 | 高纯度冷链",
      ctaText: "需要高纯度 PC 用于您的配方？",
    },
    phosphatidylserine: {
      name: "磷脂酰丝氨酸系统",
      subtitle: "纯度 20%–70% | ISO 22000 | 磷脂原料",
      quickSpecs: "纯度：20%–70% | 酶法合成",
      form: "浅黄色粉末",
      listingSpecs: "磷脂原料 | 酶法合成",
      ctaText: "需要用于认知健康产品的 PS？",
    },
    "sunflower-lecithin": {
      name: "葵花卵磷脂系统",
      subtitle: "磷脂 ≥60%（液体）/ ≥96%（粉末）| ISO 22000 | 无大豆 · 无过敏原",
      quickSpecs: "形态：液体 (HXY-SFL) / 粉末 (HXY-SFP) | 来源：100% 葵花",
      form: "液体 / 粉末",
      listingSpecs: "无大豆 · 无过敏原",
      ctaText: "需要无过敏原卵磷脂方案？",
    },
    "soy-dietary-fiber": {
      name: "大豆膳食纤维",
      subtitle: "总膳食纤维 ≥60% | ISO 22000 | 高持水性",
      quickSpecs: "型号：J8000 / J18000 | 总膳食纤维 ≥60%",
      form: "粉末",
      listingSpecs: "总膳食纤维 ≥60% | 高持水性",
      ctaText: "需要改善质构和出品率的纤维？",
    },
    "soy-protein-isolate": {
      name: "凝胶型大豆分离蛋白",
      subtitle: "蛋白 ≥90% | ISO 22000 | 凝胶值 ≥20g",
      quickSpecs: "型号：J7501 | 蛋白 ≥90% | 凝胶 ≥20g",
      form: "浅黄色粉末",
      listingSpecs: "蛋白 ≥90% | 凝胶值 ≥20g",
      ctaText: "需要用于肉制品或植物肉的高凝胶蛋白？",
    },
    "soy-oligosaccharide-small-pack": {
      name: "大豆低聚糖与蛋白小包装",
      subtitle: "FSSC 22000 | 零售包装 | 小批量",
      quickSpecs: "低聚糖纯度 ≥80% | FSSC 22000 认证",
      form: "粉末 / 液体",
      listingSpecs: "益生元 | 零售包装",
      ctaText: "需要零售或研发用小包装原料？",
    },
    "soy-lecithin-granules": {
      name: "大豆卵磷脂颗粒",
      subtitle: "总磷脂 97.2% | 非转基因大豆 | 清洁颗粒形态",
      quickSpecs: "形态：浅黄色颗粒 | 丙酮不溶物：97.2% | MOQ：200 kg",
      form: "颗粒",
      listingSpecs: "总磷脂 97.2% | 非转基因颗粒",
      ctaText: "需要用于营养、食品或饲料的大豆卵磷脂颗粒？",
    },
  },
  ru: {
    "soy-lecithin-liquid": {
      name: "Система жидкого соевого лецитина",
      subtitle: "Фосфолипиды ≥60% | ISO 22000 | Non-GMO IP опционально",
      quickSpecs: "Форма: янтарная вязкая жидкость | Модели: HXY-1SP/3SP/5SP/1SPN | MOQ: 200 кг",
      form: "Жидкость",
      listingSpecs: "Фосфолипиды ≥60% | Non-GMO IP опционально",
      ctaText: "Нужна техническая помощь по выбору HXY-1SP?",
    },
    "soy-lecithin-powder": {
      name: "Система порошкового соевого лецитина",
      subtitle: "Фосфолипиды ≥96% | ISO 22000 | Non-GMO IP опционально",
      quickSpecs: "Форма: мелкий светло-желтый порошок | Модели: HXY-PLP/PLS/PLF/PLG | MOQ: 200 кг",
      form: "Порошок",
      listingSpecs: "Фосфолипиды ≥96% | Пероксидное число ≤5.0",
      ctaText: "Нужна техническая помощь по выбору серии HXY-PL?",
    },
    "modified-soy-lecithin": {
      name: "Система модифицированного соевого лецитина",
      subtitle: "HLB около 10 | ISO 22000 | Эмульгатор O/W",
      quickSpecs: "Форма: жидкость (HXY-2SP) / порошок (HXY-PLW) | HLB около 10 | MOQ: 200 кг",
      form: "Жидкость / порошок",
      listingSpecs: "HLB около 10 | Быстрая дисперсия",
      ctaText: "Нужна техническая помощь по модифицированному лецитину?",
    },
    phosphatidylcholine: {
      name: "Система фосфатидилхолина",
      subtitle: "Чистота 30%–90% | ISO 22000 | Липосомальный класс",
      quickSpecs: "Чистота: 30%–90% | Для ≥70% требуется холодовая цепь",
      form: "Порошок / воскообразное твердое вещество",
      listingSpecs: "Липосомальный класс | Холодовая цепь для высокой чистоты",
      ctaText: "Нужен высокочистый PC для вашей рецептуры?",
    },
    phosphatidylserine: {
      name: "Система фосфатидилсерина",
      subtitle: "Чистота 20%–70% | ISO 22000 | Фосфолипидный ингредиент",
      quickSpecs: "Чистота: 20%–70% | Ферментативный синтез",
      form: "Светло-желтый порошок",
      listingSpecs: "Фосфолипидный ингредиент | Ферментативный синтез",
      ctaText: "Нужен PS для продуктов cognitive health?",
    },
    "sunflower-lecithin": {
      name: "Система подсолнечного лецитина",
      subtitle: "Фосфолипиды ≥60% (жидкость) / ≥96% (порошок) | ISO 22000 | Без сои · без аллергенов",
      quickSpecs: "Форма: жидкость (HXY-SFL) / порошок (HXY-SFP) | Источник: 100% подсолнечник",
      form: "Жидкость / порошок",
      listingSpecs: "Без сои · без аллергенов",
      ctaText: "Нужны решения лецитина без аллергенов?",
    },
    "soy-dietary-fiber": {
      name: "Соевые пищевые волокна",
      subtitle: "Общая клетчатка ≥60% | ISO 22000 | Высокое удержание воды",
      quickSpecs: "Модели: J8000 / J18000 | Общая клетчатка ≥60%",
      form: "Порошок",
      listingSpecs: "Общая клетчатка ≥60% | Высокое удержание воды",
      ctaText: "Нужна клетчатка для текстуры и выхода продукта?",
    },
    "soy-protein-isolate": {
      name: "Гелевый изолят соевого белка",
      subtitle: "Белок ≥90% | ISO 22000 | Гелевая прочность ≥20g",
      quickSpecs: "Модель: J7501 | Белок ≥90% | Гель ≥20g",
      form: "Светло-желтый порошок",
      listingSpecs: "Белок ≥90% | Гелевая прочность ≥20g",
      ctaText: "Нужен высокогелевый белок для мясных аналогов?",
    },
    "soy-oligosaccharide-small-pack": {
      name: "Соевые олигосахариды и белок в малой упаковке",
      subtitle: "FSSC 22000 | Готово для retail | Малые партии",
      quickSpecs: "Чистота олигосахаридов ≥80% | Сертификация FSSC 22000",
      form: "Порошок / жидкость",
      listingSpecs: "Пребиотик | Retail-ready",
      ctaText: "Нужны ингредиенты в малой упаковке для retail или R&D?",
    },
    "soy-lecithin-granules": {
      name: "Гранулы соевого лецитина",
      subtitle: "Общие фосфолипиды 97.2% | Non-GMO соя | Чистый гранулированный формат",
      quickSpecs: "Форма: светло-желтые гранулы | Ацетон-нерастворимые: 97.2% | MOQ: 200 кг",
      form: "Гранулы",
      listingSpecs: "Общие фосфолипиды 97.2% | Non-GMO гранулы",
      ctaText: "Нужны гранулы соевого лецитина для supplements, food или feed?",
    },
  },
};

const COMPACT_PRODUCT_NAMES: Partial<Record<Locale, Record<string, string>>> = {
  "zh-CN": {
    "soy-lecithin-liquid": "液体大豆卵磷脂",
    "soy-lecithin-powder": "粉末大豆卵磷脂",
    "modified-soy-lecithin": "改性大豆卵磷脂",
    phosphatidylcholine: "磷脂酰胆碱 (PC)",
    phosphatidylserine: "磷脂酰丝氨酸 (PS)",
    "sunflower-lecithin": "葵花卵磷脂",
    "soy-dietary-fiber": "大豆膳食纤维",
    "soy-protein-isolate": "凝胶型大豆分离蛋白",
    "soy-oligosaccharide-small-pack": "大豆低聚糖与小包装",
    "soy-lecithin-granules": "大豆卵磷脂颗粒",
  },
  ru: {
    "soy-lecithin-liquid": "Жидкий соевый лецитин",
    "soy-lecithin-powder": "Порошковый соевый лецитин",
    "modified-soy-lecithin": "Модифицированный соевый лецитин",
    phosphatidylcholine: "Фосфатидилхолин (PC)",
    phosphatidylserine: "Фосфатидилсерин (PS)",
    "sunflower-lecithin": "Подсолнечный лецитин",
    "soy-dietary-fiber": "Соевые пищевые волокна",
    "soy-protein-isolate": "Гелевый изолят соевого белка",
    "soy-oligosaccharide-small-pack": "Соевые олигосахариды и малая упаковка",
    "soy-lecithin-granules": "Гранулы соевого лецитина",
  },
};

const PRODUCT_NAME_TERMS: Partial<Record<Locale, Record<string, string>>> = {
  "pt-BR": {
    "Soy Lecithin Liquid System": "Sistema de lecitina de soja líquida",
    "Soy Lecithin Powder System": "Sistema de lecitina de soja em pó",
    "Modified Soy Lecithin System": "Sistema de lecitina de soja modificada",
    "Phosphatidylcholine System": "Sistema de fosfatidilcolina",
    "Phosphatidylserine System": "Sistema de fosfatidilserina",
    "Sunflower Lecithin System": "Sistema de lecitina de girassol",
    "Soy Dietary Fiber": "Fibra dietética de soja",
    "Gel-Type Soy Protein Isolate": "Isolado de proteína de soja tipo gel",
    "Soy Oligosaccharide & Protein (Small Packaging)": "Oligossacarídeo e proteína de soja (pequena embalagem)",
    "Soy Lecithin Granules": "Grânulos de lecitina de soja",
  },
  fr: {
    "Soy Lecithin Liquid System": "Système de lécithine de soja liquide",
    "Soy Lecithin Powder System": "Système de lécithine de soja en poudre",
    "Modified Soy Lecithin System": "Système de lécithine de soja modifiée",
    "Phosphatidylcholine System": "Système phosphatidylcholine",
    "Phosphatidylserine System": "Système phosphatidylsérine",
    "Sunflower Lecithin System": "Système de lécithine de tournesol",
    "Soy Dietary Fiber": "Fibre alimentaire de soja",
    "Gel-Type Soy Protein Isolate": "Isolat de protéine de soja type gel",
    "Soy Oligosaccharide & Protein (Small Packaging)": "Oligosaccharide et protéine de soja (petit conditionnement)",
    "Soy Lecithin Granules": "Granulés de lécithine de soja",
  },
  es: {
    "Soy Lecithin Liquid System": "Sistema de lecitina de soja líquida",
    "Soy Lecithin Powder System": "Sistema de lecitina de soja en polvo",
    "Modified Soy Lecithin System": "Sistema de lecitina de soja modificada",
    "Phosphatidylcholine System": "Sistema de fosfatidilcolina",
    "Phosphatidylserine System": "Sistema de fosfatidilserina",
    "Sunflower Lecithin System": "Sistema de lecitina de girasol",
    "Soy Dietary Fiber": "Fibra dietaria de soja",
    "Gel-Type Soy Protein Isolate": "Aislado de proteína de soja tipo gel",
    "Soy Oligosaccharide & Protein (Small Packaging)": "Oligosacárido y proteína de soja (empaque pequeño)",
    "Soy Lecithin Granules": "Gránulos de lecitina de soja",
  },
  ar: {
    "Soy Lecithin Liquid System": "نظام ليسيثين الصويا السائل",
    "Soy Lecithin Powder System": "نظام ليسيثين الصويا المسحوق",
    "Modified Soy Lecithin System": "نظام ليسيثين الصويا المعدل",
    "Phosphatidylcholine System": "نظام فوسفاتيديل كولين",
    "Phosphatidylserine System": "نظام فوسفاتيديل سيرين",
    "Sunflower Lecithin System": "نظام ليسيثين دوار الشمس",
    "Soy Dietary Fiber": "ألياف الصويا الغذائية",
    "Gel-Type Soy Protein Isolate": "معزول بروتين الصويا من نوع الجل",
    "Soy Oligosaccharide & Protein (Small Packaging)": "أوليغوسكاريد وبروتين الصويا (عبوات صغيرة)",
    "Soy Lecithin Granules": "حبيبات ليسيثين الصويا",
  },
};

const LABEL_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  "zh-CN": {
    "Product Form": "产品形态",
    "Model Options": "型号选项",
    "Acetone Insoluble (Phospholipid)": "丙酮不溶物（磷脂）",
    "Acetone Insoluble": "丙酮不溶物",
    "HLB Value": "HLB 值",
    "Solubility": "溶解性",
    "Certifications": "认证",
    "Packaging": "包装",
    "Storage": "储存",
    "Source": "来源",
    "Allergen Status": "过敏原状态",
    "Testing Methods": "检测方法",
    "Moisture": "水分",
    "Acid Value": "酸值",
    "Peroxide Value": "过氧化值",
    "Loss on Drying": "干燥失重",
    "PC Content": "PC 含量",
    "PS Content": "PS 含量",
    "Heavy Metals": "重金属",
    "Protein Content": "蛋白含量",
    "Total Dietary Fiber (Wet basis)": "总膳食纤维（湿基）",
    "Crude Protein": "粗蛋白",
    "Ash": "灰分",
    "Gel Value": "凝胶值",
    "Water Soluble Nitrogen Rate": "水溶性氮指数",
    "Total Bacterial Count": "菌落总数",
    "Coliforms": "大肠菌群",
    "Production Scope": "生产范围",
    "Soy Oligosaccharide Purity": "大豆低聚糖纯度",
    "Soy Protein Content (Small Pack)": "大豆蛋白含量（小包装）",
    "Nutrition Profile (per 100g)": "营养成分（每 100g）",
    "Key Active Components": "关键活性组分",
    "HXY-1SP (Concentrated)": "HXY-1SP（浓缩型）",
    "HXY-3SP (Bleached)": "HXY-3SP（脱色型）",
    "HXY-5SP (Transparent)": "HXY-5SP（透明型）",
    "HXY-1SPN (Hydrolyzed)": "HXY-1SPN（水解型）",
    "Residual Protein (PC ≥70%)": "残留蛋白（PC ≥70%）",
    "Molecular Character": "分子特性",
  },
  ru: {
    "Product Form": "Форма продукта",
    "Model Options": "Варианты моделей",
    "Acetone Insoluble (Phospholipid)": "Ацетон-нерастворимые вещества (фосфолипиды)",
    "Acetone Insoluble": "Ацетон-нерастворимые вещества",
    "HLB Value": "Значение HLB",
    "Solubility": "Растворимость",
    "Certifications": "Сертификации",
    "Packaging": "Упаковка",
    "Storage": "Хранение",
    "Source": "Источник",
    "Allergen Status": "Статус аллергенов",
    "Testing Methods": "Методы испытаний",
    "Moisture": "Влага",
    "Acid Value": "Кислотное число",
    "Peroxide Value": "Перекисное число",
    "Loss on Drying": "Потеря при сушке",
    "PC Content": "Содержание PC",
    "PS Content": "Содержание PS",
    "Heavy Metals": "Тяжелые металлы",
    "Protein Content": "Содержание белка",
    "Total Dietary Fiber (Wet basis)": "Общая пищевая клетчатка (влажная основа)",
    "Crude Protein": "Сырой протеин",
    "Ash": "Зола",
    "Gel Value": "Гелевая прочность",
    "Water Soluble Nitrogen Rate": "Доля водорастворимого азота",
    "Total Bacterial Count": "Общее бактериальное число",
    "Coliforms": "Колиформы",
    "Production Scope": "Производственный охват",
    "Soy Oligosaccharide Purity": "Чистота соевых олигосахаридов",
    "Soy Protein Content (Small Pack)": "Содержание соевого белка (малая упаковка)",
    "Nutrition Profile (per 100g)": "Пищевая ценность (на 100 г)",
    "Key Active Components": "Ключевые активные компоненты",
    "HXY-1SP (Concentrated)": "HXY-1SP (концентрированный)",
    "HXY-3SP (Bleached)": "HXY-3SP (осветленный)",
    "HXY-5SP (Transparent)": "HXY-5SP (прозрачный)",
    "HXY-1SPN (Hydrolyzed)": "HXY-1SPN (гидролизованный)",
    "Residual Protein (PC ≥70%)": "Остаточный белок (PC ≥70%)",
    "Molecular Character": "Молекулярная характеристика",
  },
  "pt-BR": {
    "Product Form": "Forma do produto",
    "Model Options": "Opções de modelo",
    "Certifications": "Certificações",
    "Packaging": "Embalagem",
    "Storage": "Armazenamento",
    "Source": "Fonte",
    "Testing Methods": "Métodos de teste",
  },
  fr: {
    "Product Form": "Forme produit",
    "Model Options": "Options modèle",
    "Certifications": "Certifications",
    "Packaging": "Conditionnement",
    "Storage": "Stockage",
    "Source": "Source",
    "Testing Methods": "Méthodes de test",
  },
  es: {
    "Product Form": "Forma del producto",
    "Model Options": "Opciones de modelo",
    "Certifications": "Certificaciones",
    "Packaging": "Empaque",
    "Storage": "Almacenamiento",
    "Source": "Fuente",
    "Testing Methods": "Métodos de ensayo",
  },
  ar: {
    "Product Form": "شكل المنتج",
    "Model Options": "خيارات الطراز",
    "Certifications": "الشهادات",
    "Packaging": "التعبئة",
    "Storage": "التخزين",
    "Source": "المصدر",
    "Testing Methods": "طرق الاختبار",
  },
};

const TEXT_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  "zh-CN": {
    "Yellow to brown viscous liquid; bleached type lighter": "黄色至棕色黏稠液体；脱色型颜色更浅",
    "Fine light yellow powder": "浅黄色细粉",
    "Light yellow powder": "浅黄色粉末",
    "Liquid": "液体",
    "Powder": "粉末",
    "Granules": "颗粒",
    "Liquid / Powder": "液体 / 粉末",
    "Sealed, cool, dry place at 15–30°C. Shelf life 24 months": "密封，置于 15–30°C 阴凉干燥处。保质期 24 个月",
    "Chocolate & Confectionery": "巧克力与糖果",
    "Dairy & Instant Beverages": "乳品与速溶饮品",
    "Bakery & Dough": "烘焙与面团",
    "High refining viscosity, difficult molding, cocoa butter overuse": "精炼黏度高、成型困难、可可脂使用量偏高",
    "Fat floating, clumping, slow dissolution": "脂肪上浮、结团、溶解慢",
    "Sticky dough, low volume, fast staling": "面团发黏、体积不足、老化快",
    "Supports flow and molding targets when validated in the buyer's formula": "经买方配方验证后，支持流动性和成型目标",
    "Supports uniform dispersion after buyer-side process validation": "经买方工艺验证后，支持均匀分散",
    "Improves extensibility, increases volume, retains moisture": "改善延展性、提升体积并保持水分",
  },
  ru: {
    "Yellow to brown viscous liquid; bleached type lighter": "Желтая или коричневая вязкая жидкость; осветленный тип имеет более светлый цвет",
    "Fine light yellow powder": "Мелкий светло-желтый порошок",
    "Light yellow powder": "Светло-желтый порошок",
    "Liquid": "Жидкость",
    "Powder": "Порошок",
    "Granules": "Гранулы",
    "Liquid / Powder": "Жидкость / порошок",
    "Sealed, cool, dry place at 15–30°C. Shelf life 24 months": "Герметично, в прохладном сухом месте при 15–30°C. Срок годности 24 месяца",
    "Chocolate & Confectionery": "Шоколад и кондитерские изделия",
    "Dairy & Instant Beverages": "Молочные и растворимые напитки",
    "Bakery & Dough": "Выпечка и тесто",
    "High refining viscosity, difficult molding, cocoa butter overuse": "Высокая вязкость при рафинировании, сложное формование, перерасход какао-масла",
    "Fat floating, clumping, slow dissolution": "Всплывание жира, комкование, медленное растворение",
    "Sticky dough, low volume, fast staling": "Липкое тесто, низкий объем, быстрое черствение",
    "Supports flow and molding targets when validated in the buyer's formula": "Поддерживает цели по текучести и формованию после проверки в рецептуре покупателя",
    "Supports uniform dispersion after buyer-side process validation": "Поддерживает равномерную дисперсию после проверки процесса покупателем",
    "Improves extensibility, increases volume, retains moisture": "Улучшает растяжимость, увеличивает объем и удерживает влагу",
  },
};

const TERM_TRANSLATIONS: Partial<Record<Locale, Record<string, string>>> = {
  "pt-BR": {
    "Phospholipid": "Fosfolipídio",
    "Form": "Forma",
    "Models": "Modelos",
    "Light yellow powder": "Pó amarelo claro",
    "Yellow to brown viscous liquid": "Líquido viscoso amarelo a marrom",
    "Liquid": "Líquido",
    "Powder": "Pó",
    "Granules": "Grânulos",
    "Packaging": "Embalagem",
    "Storage": "Armazenamento",
    "Chocolate & Confectionery": "Chocolate e confeitaria",
    "Dairy & Instant Beverages": "Lácteos e bebidas instantâneas",
    "Bakery & Dough": "Panificação e massa",
    "Supports": "Apoia",
    "Improves": "Melhora",
    "Need": "Necessidade de",
  },
  fr: {
    "Phospholipid": "Phospholipide",
    "Form": "Forme",
    "Models": "Modèles",
    "Light yellow powder": "Poudre jaune clair",
    "Yellow to brown viscous liquid": "Liquide visqueux jaune à brun",
    "Liquid": "Liquide",
    "Powder": "Poudre",
    "Granules": "Granulés",
    "Packaging": "Conditionnement",
    "Storage": "Stockage",
    "Chocolate & Confectionery": "Chocolat et confiserie",
    "Dairy & Instant Beverages": "Laitier et boissons instantanées",
    "Bakery & Dough": "Boulangerie et pâte",
    "Supports": "Soutient",
    "Improves": "Améliore",
    "Need": "Besoin de",
  },
  es: {
    "Phospholipid": "Fosfolípido",
    "Form": "Forma",
    "Models": "Modelos",
    "Light yellow powder": "Polvo amarillo claro",
    "Yellow to brown viscous liquid": "Líquido viscoso amarillo a marrón",
    "Liquid": "Líquido",
    "Powder": "Polvo",
    "Granules": "Gránulos",
    "Packaging": "Empaque",
    "Storage": "Almacenamiento",
    "Chocolate & Confectionery": "Chocolate y confitería",
    "Dairy & Instant Beverages": "Lácteos y bebidas instantáneas",
    "Bakery & Dough": "Panificación y masa",
    "Supports": "Apoya",
    "Improves": "Mejora",
    "Need": "Necesidad de",
  },
  ar: {
    "Phospholipid": "فوسفوليبيد",
    "Form": "الشكل",
    "Models": "الطرازات",
    "Light yellow powder": "مسحوق أصفر فاتح",
    "Yellow to brown viscous liquid": "سائل لزج أصفر إلى بني",
    "Liquid": "سائل",
    "Powder": "مسحوق",
    "Granules": "حبيبات",
    "Packaging": "التعبئة",
    "Storage": "التخزين",
    "Chocolate & Confectionery": "الشوكولاتة والحلويات",
    "Dairy & Instant Beverages": "الألبان والمشروبات الفورية",
    "Bakery & Dough": "المخبوزات والعجين",
    "Supports": "يدعم",
    "Improves": "يحسن",
    "Need": "حاجة إلى",
  },
  "zh-CN": {
    "Phospholipid": "磷脂",
    "Form": "形态",
    "Models": "型号",
    "Liquid": "液体",
    "Powder": "粉末",
    "Granules": "颗粒",
    "Packaging": "包装",
    "Storage": "储存",
    "Supports": "支持",
    "Improves": "改善",
    "Need": "需要",
  },
  ru: {
    "Phospholipid": "Фосфолипид",
    "Form": "Форма",
    "Models": "Модели",
    "Light yellow powder": "Светло-желтый порошок",
    "Liquid": "Жидкость",
    "Powder": "Порошок",
    "Granules": "Гранулы",
    "Packaging": "Упаковка",
    "Storage": "Хранение",
    "Supports": "Поддерживает",
    "Improves": "Улучшает",
    "Need": "Потребность в",
  },
};

function localizeText(value: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return value;
  const exact = TEXT_TRANSLATIONS[locale]?.[value];
  if (exact) return exact;

  const terms = TERM_TRANSLATIONS[locale];
  if (!terms) return value;

  return Object.entries(terms)
    .sort(([a], [b]) => b.length - a.length)
    .reduce((text, [source, target]) => text.replaceAll(source, target), value);
}

function localizeLabel(value: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return value;
  return LABEL_TRANSLATIONS[locale]?.[value] || localizeText(value, locale);
}

function localizedProduct(product: Product, locale: Locale): Product {
  const copy =
    PRODUCT_COPY[locale]?.[product.slug] ||
    (PRODUCT_NAME_TERMS[locale]?.[product.name]
      ? {
          name: PRODUCT_NAME_TERMS[locale][product.name],
          subtitle: localizeText(product.subtitle, locale),
          quickSpecs: localizeText(product.quickSpecs, locale),
          form: localizeText(product.form, locale),
          listingSpecs: localizeText(product.listingSpecs, locale),
          ctaText: localizeText(product.ctaText, locale),
        }
      : undefined);

  if (locale === DEFAULT_LOCALE && !copy) return product;

  return {
    ...product,
    ...copy,
    specifications: product.specifications.map(spec => ({
      label: localizeLabel(spec.label, locale),
      value: localizeText(spec.value, locale),
    })),
    applications: product.applications.map(application => ({
      industry: localizeText(application.industry, locale),
      painPoint: localizeText(application.painPoint, locale),
      product: application.product,
      dosage: localizeText(application.dosage, locale),
      effect: localizeText(application.effect, locale),
    })),
  };
}

export function getProducts(locale: Locale = DEFAULT_LOCALE): Product[] {
  return products.map(product => localizedProduct(product, locale));
}

export function getProductBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE
): Product | undefined {
  const product = products.find(p => p.slug === slug);
  return product ? localizedProduct(product, locale) : undefined;
}

export const productListingNames: { slug: string; name: string }[] = [
  { slug: "soy-lecithin-liquid", name: "Soy Lecithin Liquid" },
  { slug: "soy-lecithin-powder", name: "Soy Lecithin Powder" },
  { slug: "modified-soy-lecithin", name: "Modified Soy Lecithin" },
  { slug: "phosphatidylcholine", name: "Phosphatidylcholine (PC)" },
  { slug: "phosphatidylserine", name: "Phosphatidylserine (PS)" },
  { slug: "sunflower-lecithin", name: "Sunflower Lecithin" },
  { slug: "soy-dietary-fiber", name: "Soy Dietary Fiber" },
  { slug: "soy-protein-isolate", name: "Gel-Type Soy Protein Isolate" },
  { slug: "soy-oligosaccharide-small-pack", name: "Soy Oligosaccharide & Small Pack" },
  { slug: "soy-lecithin-granules", name: "Soy Lecithin Granules" },
];

export function getProductListingNames(
  locale: Locale = DEFAULT_LOCALE
): { slug: string; name: string }[] {
  if (locale === DEFAULT_LOCALE) return productListingNames;

  return products.map(product => ({
    slug: product.slug,
    name:
      COMPACT_PRODUCT_NAMES[locale]?.[product.slug] ||
      PRODUCT_COPY[locale]?.[product.slug]?.name ||
      PRODUCT_NAME_TERMS[locale]?.[product.name] ||
      product.name,
  }));
}

export const filterCategories = ["All", "Liquid", "Powder", "High-Purity", "Allergen-Free", "Protein/Fiber"];
