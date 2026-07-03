import { readFile } from "node:fs/promises";

const siteOrigin = (process.env.SITE_ORIGIN || "https://lecprima.com").replace(/\/$/, "");
const key = "fe393f1f46b7ffcb746b5cff3661cfbfb127389f73ff6e422e73edfa9802fdba";
const sitemapUrl = `${siteOrigin}/sitemap.xml`;
const sitemapPath = process.env.INDEXNOW_SITEMAP_PATH || "dist/public/sitemap.xml";

async function loadSitemap() {
  try {
    const sitemap = await readFile(sitemapPath, "utf-8");
    console.log(`Loaded sitemap from ${sitemapPath}`);
    return sitemap;
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }

  const sitemapResponse = await fetch(sitemapUrl, {
    headers: { "User-Agent": "Lecprima-IndexNow/1.0" },
  });

  if (!sitemapResponse.ok) {
    throw new Error(`Could not fetch sitemap (${sitemapResponse.status}) from ${sitemapUrl}`);
  }

  console.log(`Fetched sitemap from ${sitemapUrl}`);
  return sitemapResponse.text();
}

const sitemap = await loadSitemap();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .slice(0, 10_000);

if (urlList.length === 0) {
  throw new Error("No URLs found in sitemap.");
}

if (process.env.INDEXNOW_DRY_RUN === "1") {
  console.log(`IndexNow dry run found ${urlList.length} URL(s).`);
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(siteOrigin).host,
    key,
    keyLocation: `${siteOrigin}/${key}.txt`,
    urlList,
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow submission failed: ${response.status} ${await response.text()}`);
}

console.log(`IndexNow accepted ${urlList.length} URL(s): ${response.status}`);
