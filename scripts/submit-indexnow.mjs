const siteOrigin = (process.env.SITE_ORIGIN || "https://lecprima.com").replace(/\/$/, "");
const key = "fe393f1f46b7ffcb746b5cff3661cfbfb127389f73ff6e422e73edfa9802fdba";
const sitemapUrl = `${siteOrigin}/sitemap.xml`;

const sitemapResponse = await fetch(sitemapUrl, {
  headers: { "User-Agent": "Lecprima-IndexNow/1.0" },
});

if (!sitemapResponse.ok) {
  throw new Error(`Could not fetch sitemap (${sitemapResponse.status}) from ${sitemapUrl}`);
}

const sitemap = await sitemapResponse.text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((match) => match[1])
  .slice(0, 10_000);

if (urlList.length === 0) {
  throw new Error("No URLs found in sitemap.");
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
