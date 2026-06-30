type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => unknown;
};

type ModelContextProvider = {
  provideContext: (context: { tools: WebMcpTool[] }) => void | Promise<void>;
};

declare global {
  interface Navigator {
    modelContext?: ModelContextProvider;
  }
}

const productSlugs = [
  "soy-lecithin-liquid",
  "soy-lecithin-powder",
  "modified-soy-lecithin",
  "phosphatidylcholine",
  "phosphatidylserine",
  "sunflower-lecithin",
  "soy-dietary-fiber",
  "soy-protein-isolate",
  "soy-oligosaccharide-small-pack",
  "soy-lecithin-granules",
];

export function registerWebMcpTools() {
  if (typeof navigator === "undefined" || !navigator.modelContext) {
    return;
  }

  void navigator.modelContext.provideContext({
    tools: [
      {
        name: "open_product_page",
        description: "Return the public URL for a Huiyi Jianpin product page.",
        inputSchema: {
          type: "object",
          properties: {
            slug: {
              type: "string",
              enum: productSlugs,
            },
          },
          required: ["slug"],
        },
        execute(input) {
          const slug = String(input.slug ?? "");
          return {
            url: productSlugs.includes(slug) ? `/products/${slug}` : "/products",
          };
        },
      },
      {
        name: "start_product_inquiry",
        description: "Return the public inquiry URL for quotes, samples, documentation, or formulation support.",
        inputSchema: {
          type: "object",
          properties: {
            product: {
              type: "string",
            },
          },
        },
        execute(input) {
          return {
            url: "/contact#inquiryForm",
            product: String(input.product ?? ""),
          };
        },
      },
    ],
  });
}
