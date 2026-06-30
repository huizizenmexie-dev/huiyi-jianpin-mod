import express, { type Express } from "express";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { registerAgentDiscoveryRoutes } from "./_core/agentDiscovery";

function createTestApp(): Express {
  const app = express();
  registerAgentDiscoveryRoutes(app);
  app.get("*", (_req, res) => {
    res.type("html").send("<!doctype html><html><body>Home</body></html>");
  });
  return app;
}

async function request(app: Express, path: string, headers: HeadersInit = {}) {
  const server = app.listen(0);
  try {
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Expected test server to listen on a TCP port");
    }

    return await fetch(`http://127.0.0.1:${address.port}${path}`, {
      headers,
    });
  } finally {
    await new Promise<void>((resolve, reject) => {
      server.close(error => (error ? reject(error) : resolve()));
    });
  }
}

describe("agent discovery routes", () => {
  let app: Express;

  beforeEach(() => {
    app = createTestApp();
  });

  afterEach(() => {
    delete process.env.PUBLIC_SITE_URL;
  });

  it("advertises agent discovery resources from the homepage Link header", async () => {
    const res = await request(app, "/");

    const link = res.headers.get("link");
    const html = await res.text();
    expect(link).toContain('</.well-known/api-catalog>; rel="api-catalog"');
    expect(link).toContain('</.well-known/api-catalog>; rel="service-desc"');
    expect(link).toContain('</docs/api>; rel="service-doc"');
    expect(link).toContain('</.well-known/mcp/server-card.json>; rel="mcp-server-card"');
    expect(link).toContain('</.well-known/agent-skills/index.json>; rel="describedby"');
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(html).toContain("<!doctype html>");
  });

  it("returns an RFC 9727 API catalog as application/linkset+json", async () => {
    process.env.PUBLIC_SITE_URL = "https://lecprima.com";

    const res = await request(app, "/.well-known/api-catalog");
    const body = await res.json();

    expect(res.headers.get("content-type")).toContain("application/linkset+json");
    expect(body.linkset[0].anchor).toBe("https://lecprima.com/api/trpc");
    expect(body.linkset[0]["service-desc"][0].href).toBe("https://lecprima.com/api/trpc");
    expect(body.linkset[0]["service-doc"][0].href).toBe("https://lecprima.com/docs/api");
    expect(body.linkset[0].status[0].href).toBe("https://lecprima.com/api/trpc/system.health");
  });

  it("returns homepage markdown when agents request text/markdown", async () => {
    const res = await request(app, "/", { Accept: "text/markdown" });
    const markdown = await res.text();

    expect(res.headers.get("content-type")).toContain("text/markdown");
    expect(res.headers.get("x-markdown-tokens")).toMatch(/^\d+$/);
    expect(markdown).toContain("# Huiyi Jianpin");
    expect(markdown).toContain("## Key Agent Resources");
  });

  it("serves auth.md as markdown for agent registration guidance", async () => {
    const res = await request(app, "/auth.md");
    const markdown = await res.text();

    expect(res.headers.get("content-type")).toContain("text/markdown");
    expect(markdown).toContain("# Agent Authentication");
    expect(markdown).toContain("This public marketing site does not require OAuth");
  });

  it("publishes an MCP server card", async () => {
    const res = await request(app, "/.well-known/mcp/server-card.json");
    const body = await res.json();

    expect(body.serverInfo.name).toBe("Huiyi Jianpin Agent Discovery");
    expect(body.transport.type).toBe("webmcp");
    expect(body.capabilities.tools).toBe(true);
  });

  it("publishes an agent skills discovery index with digests", async () => {
    const res = await request(app, "/.well-known/agent-skills/index.json");
    const body = await res.json();

    expect(body.$schema).toContain("agent-skills");
    expect(body.skills[0]).toMatchObject({
      name: "product-discovery",
      type: "web",
      description: expect.stringContaining("product"),
    });
    expect(body.skills[0].sha256).toMatch(/^[a-f0-9]{64}$/);
  });
});
