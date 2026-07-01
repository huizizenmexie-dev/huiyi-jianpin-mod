import express from "express";
import { createServer } from "http";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Markdown conversion helper (simplified HTML to markdown)
function htmlToMarkdown(html: string): string {
  // Basic conversion - in production use a proper library like turndown
  let md = html;
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
  md = md.replace(/<strong>(.*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<em>(.*?)<\/em>/gi, "*$1*");
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<[^>]+>/g, "");
  md = md.replace(/&nbsp;/g, " ");
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/\n\s*\n\s*\n/g, "\n\n");
  return md.trim();
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Enable Gzip compression for all responses
  app.use(compression());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Add Link headers for agent discovery (RFC 8288)
  app.use((_req, res, next) => {
    const linkHeaders = [
      '</.well-known/api-catalog>; rel="api-catalog"; type="application/json"',
      '</.well-known/openid-configuration>; rel="openid-configuration"; type="application/json"',
      '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"; type="application/json"',
      '</.well-known/mcp/server-card.json>; rel="mcp-server"; type="application/json"',
      '</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"',
      '</auth.md>; rel="auth-doc"; type="text/markdown"',
    ];
    res.setHeader("Link", linkHeaders.join(", "));
    next();
  });

  // Markdown negotiation middleware
  app.use((req, res, next) => {
    const acceptHeader = req.headers.accept || "";

    // Check if client accepts markdown
    if (acceptHeader.includes("text/markdown") && req.path.endsWith(".html")) {
      // Read the HTML file and convert to markdown
      const htmlPath = path.join(staticPath, req.path);
      try {
        const html = readFileSync(htmlPath, "utf-8");
        const markdown = htmlToMarkdown(html);
        res.setHeader("Content-Type", "text/markdown; charset=utf-8");
        res.setHeader("X-Markdown-Tokens", "true");
        res.send(markdown);
        return;
      } catch {
        // Fall through to normal handling
      }
    }
    next();
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
