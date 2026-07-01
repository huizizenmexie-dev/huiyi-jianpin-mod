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

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
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

export const filterCategories = ["All", "Liquid", "Powder", "High-Purity", "Allergen-Free", "Protein/Fiber"];
