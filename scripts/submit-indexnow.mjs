import { readFile } from "node:fs/promises";

const siteOrigin = (process.env.SITE_ORIGIN || "https://lecprima.com").replace(
  /\/$/,
  ""
);
const defaultKey =
  "fe393f1f46b7ffcb746b5cff3661cfbfb127389f73ff6e422e73edfa9802fdba";
const key = process.env.INDEXNOW_KEY || defaultKey;
const sitemapUrl = `${siteOrigin}/sitemap.xml`;
const sitemapPath =
  process.env.INDEXNOW_SITEMAP_PATH || "dist/public/sitemap.xml";
const keyLocation =
  process.env.INDEXNOW_KEY_LOCATION || `${siteOrigin}/${key}.txt`;
const endpoint =
  process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const strict = process.env.INDEXNOW_STRICT === "1";
const maxAttempts = Number.parseInt(
  process.env.INDEXNOW_MAX_ATTEMPTS || "3",
  10
);
const retryDelayMs = Number.parseInt(
  process.env.INDEXNOW_RETRY_DELAY_MS || "10000",
  10
);
const userAgent = "Lecprima-IndexNow/1.0";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function stopAfterIndexNowFailure(message) {
  if (strict) {
    throw new Error(message);
  }

  console.warn(message);
  console.warn(
    "Skipping IndexNow submission without failing deployment. Set INDEXNOW_STRICT=1 to make this fatal."
  );
  process.exit(0);
}

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
    headers: { "User-Agent": userAgent },
  });

  if (!sitemapResponse.ok) {
    throw new Error(
      `Could not fetch sitemap (${sitemapResponse.status}) from ${sitemapUrl}`
    );
  }

  console.log(`Fetched sitemap from ${sitemapUrl}`);
  return sitemapResponse.text();
}

async function verifyKeyLocation() {
  try {
    const response = await fetch(keyLocation, {
      headers: { "User-Agent": userAgent },
    });

    if (!response.ok) {
      return {
        ok: false,
        message: `IndexNow key file returned ${response.status} from ${keyLocation}.`,
      };
    }

    const body = (await response.text()).trim();
    if (body !== key) {
      return {
        ok: false,
        message: `IndexNow key file content does not match INDEXNOW_KEY at ${keyLocation}.`,
      };
    }

    console.log(`Verified IndexNow key file at ${keyLocation}`);
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      message: `Could not verify IndexNow key file at ${keyLocation}: ${error?.message || error}`,
    };
  }
}

const sitemap = await loadSitemap();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(match => match[1])
  .slice(0, 10_000);

if (urlList.length === 0) {
  throw new Error("No URLs found in sitemap.");
}

if (process.env.INDEXNOW_DRY_RUN === "1") {
  console.log(`IndexNow dry run found ${urlList.length} URL(s).`);
  console.log(`IndexNow keyLocation would be ${keyLocation}.`);
  process.exit(0);
}

const keyCheck = await verifyKeyLocation();
if (!keyCheck.ok) {
  stopAfterIndexNowFailure(keyCheck.message);
}

const payload = {
  host: new URL(siteOrigin).host,
  key,
  keyLocation,
  urlList,
};

let lastFailure = "";
const retryableStatuses = new Set([
  403, 408, 409, 425, 429, 500, 502, 503, 504,
]);

for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
  console.log(
    `Submitting ${urlList.length} URL(s) to IndexNow (attempt ${attempt}/${maxAttempts}) via ${endpoint}`
  );

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  if (response.ok) {
    console.log(
      `IndexNow accepted ${urlList.length} URL(s): ${response.status}`
    );
    process.exit(0);
  }

  lastFailure = `IndexNow submission failed: ${response.status} ${responseText}`;
  if (attempt < maxAttempts && retryableStatuses.has(response.status)) {
    console.warn(`${lastFailure}; retrying in ${retryDelayMs}ms.`);
    await sleep(retryDelayMs);
  }
}

stopAfterIndexNowFailure(`${lastFailure}. Key location was ${keyLocation}.`);
