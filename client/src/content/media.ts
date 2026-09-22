import type { ProductSlug } from "./routes";

/** Raw public paths; resolve once at the rendering or metadata boundary. */
export const PRODUCT_IMAGES: Record<ProductSlug, string> = {
  "soy-lecithin-liquid": "/images/products/soy-lecithin-liquid.webp",
  "soy-lecithin-powder": "/images/products/soy-lecithin-powder.webp",
  "modified-soy-lecithin": "/images/products/modified-soy-lecithin.webp",
  phosphatidylcholine: "/images/products/phosphatidylcholine.webp",
  phosphatidylserine: "/images/products/phosphatidylserine.webp",
  "sunflower-lecithin": "/images/products/sunflower-lecithin.webp",
  "soy-dietary-fiber": "/images/products/soy-dietary-fiber.webp",
  "soy-protein-isolate": "/images/products/soy-protein-isolate.webp",
  "soy-oligosaccharide-small-pack": "/images/products/soy-oligosaccharide-small-pack.webp",
  "soy-lecithin-granules": "/images/products/soy-lecithin-granules.webp",
};

export const SITE_IMAGES = {
  hero: "/images/site/ingredient-still-life.webp",
  harvest: "/images/site/soybean-fields.webp",
  laboratory: "/images/site/quality-lab.webp",
  company: "/images/site/ingredient-workbench.webp",
  applications: "/images/site/food-applications.webp",
} as const;

export const BRAND_ASSETS = {
  icon: "/images/brand/lecprima-mark.png",
  favicon: "/images/brand/favicon-32.png",
  appleTouchIcon: "/images/brand/apple-touch-icon.png",
} as const;
