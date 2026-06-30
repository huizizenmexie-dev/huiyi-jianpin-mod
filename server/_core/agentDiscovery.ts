import crypto from "node:crypto";
import type { Express, Request, Response } from "express";

const SITE_NAME = "Huiyi Jianpin";
const PUBLIC_MARKDOWN = `# Huiyi Jianpin

Huiyi Jianpin supplies soy lecithin, phospholipid derivatives, soy protein, and dietary fiber systems for food, nutrition, pharmaceutical, cosmetic, feed, and industrial applications.

## Key Agent Resources

- Product catalog: /products
- Product detail pattern: /products/{slug}
- Contact and inquiry form: /contact#inquiryForm
- API catalog: /.well-known/api-catalog
- API documentation: /docs/api
- Agent authentication guidance: /auth.md
- MCP server card: /.well-known/mcp/server-card.json
- Agent skills index: /.well-known/agent-skills/index.json

## Primary Product Areas

- Soy lecithin liquid, powder, and granules
- Modified soy lecithin
- Phosphatidylcholine and phosphatidylserine
- Sunflower lecithin
- Soy dietary fiber and soy protein isolate
`;

const API_DOCS_MARKDOWN = `# Huiyi Jianpin API Documentation

This site exposes a public tRPC endpoint at /api/trpc for system-level metadata and application support endpoints.

## Public Discovery

- API catalog: /.well-known/api-catalog
- Health status relation target: /api/trpc/system.health
- Product pages are available as public HTML routes under /products and /products/{slug}

## Authentication

The public marketing and product discovery surface does not require OAuth. Contact and inquiry workflows are intended for browser-based users and public agents.
`;

const AUTH_MARKDOWN = `# Agent Authentication

This public marketing site does not require OAuth for product discovery, documentation discovery, or contact-page navigation.

Agents may inspect public product pages, the API catalog, the MCP server card, and the agent skills index without registering a client.

For commercial inquiries, agents should direct users to /contact#inquiryForm or prepare an email inquiry using the contact details published on the site.
`;

const PRODUCT_DISCOVERY_SKILL = `---
name: product-discovery
type: web
description: Discover Huiyi Jianpin product systems, product pages, and inquiry paths.
---

# Product Discovery

Use this skill when an agent needs to identify relevant Huiyi Jianpin ingredient systems or route a user toward a product inquiry.

1. Read /products for the complete public product list.
2. Open /products/{slug} for specifications, applications, and CTA copy.
3. Send inquiry traffic to /contact#inquiryForm when the user wants pricing, documentation, samples, or formulation support.
`;

function getOrigin(req: Request): string {
  if (process.env.PUBLIC_SITE_URL) {
    return process.env.PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  const forwardedProto = req.header("x-forwarded-proto")?.split(",")[0]?.trim();
  const proto = forwardedProto || req.protocol || "https";
  return `${proto}://${req.get("host")}`;
}

function markdownTokenCount(markdown: string): string {
  return String(markdown.trim().split(/\s+/).length);
}

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function setAgentLinkHeader(res: Response) {
  res.setHeader(
    "Link",
    [
      '</.well-known/api-catalog>; rel="api-catalog"',
      '</.well-known/api-catalog>; rel="service-desc"; type="application/linkset+json"',
      '</docs/api>; rel="service-doc"; type="text/markdown"',
      '</.well-known/mcp/server-card.json>; rel="mcp-server-card"; type="application/json"',
      '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
    ].join(", ")
  );
}

function wantsMarkdown(req: Request): boolean {
  const accept = req.header("accept") || "";
  return /\btext\/markdown\b/i.test(accept);
}

function sendMarkdown(res: Response, markdown: string) {
  res
    .status(200)
    .set({
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": markdownTokenCount(markdown),
    })
    .send(markdown);
}

export function registerAgentDiscoveryRoutes(app: Express) {
  app.get("/", (req, res, next) => {
    setAgentLinkHeader(res);
    if (wantsMarkdown(req)) {
      sendMarkdown(res, PUBLIC_MARKDOWN);
      return;
    }
    next();
  });

  app.get("/docs/api", (_req, res) => {
    sendMarkdown(res, API_DOCS_MARKDOWN);
  });

  app.get("/auth.md", (_req, res) => {
    sendMarkdown(res, AUTH_MARKDOWN);
  });

  app.get("/.well-known/api-catalog", (req, res) => {
    const origin = getOrigin(req);
    res
      .status(200)
      .set("Content-Type", "application/linkset+json; charset=utf-8")
      .json({
        linkset: [
          {
            anchor: `${origin}/api/trpc`,
            "service-desc": [
              {
                href: `${origin}/api/trpc`,
                type: "application/json",
              },
            ],
            "service-doc": [
              {
                href: `${origin}/docs/api`,
                type: "text/markdown",
              },
            ],
            status: [
              {
                href: `${origin}/api/trpc/system.health`,
                type: "application/json",
              },
            ],
          },
        ],
      });
  });

  app.get("/.well-known/mcp/server-card.json", (req, res) => {
    const origin = getOrigin(req);
    res.json({
      serverInfo: {
        name: "Huiyi Jianpin Agent Discovery",
        version: "1.0.0",
      },
      transport: {
        type: "webmcp",
        endpoint: origin,
      },
      capabilities: {
        tools: true,
        resources: true,
      },
      resources: [
        `${origin}/products`,
        `${origin}/contact#inquiryForm`,
        `${origin}/.well-known/api-catalog`,
      ],
    });
  });

  app.get("/.well-known/agent-skills/index.json", (req, res) => {
    const origin = getOrigin(req);
    res.json({
      $schema: "https://agentskills.io/schemas/agent-skills-discovery-v0.2.0.json",
      skills: [
        {
          name: "product-discovery",
          type: "web",
          description: "Discover Huiyi Jianpin product systems and route product inquiries.",
          url: `${origin}/.well-known/agent-skills/product-discovery/SKILL.md`,
          sha256: sha256(PRODUCT_DISCOVERY_SKILL),
        },
      ],
    });
  });

  app.get("/.well-known/agent-skills/product-discovery/SKILL.md", (_req, res) => {
    sendMarkdown(res, PRODUCT_DISCOVERY_SKILL);
  });
}
