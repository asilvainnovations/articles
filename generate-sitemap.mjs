/**
 * ASilva Innovations — Sitemap Generator
 *
 * Run with: node scripts/generate-sitemap.mjs
 * Or integrate into the Vite build pipeline.
 *
 * Generates /public/sitemap.xml with all pages and articles.
 */

import { writeFileSync } from "fs";
import { resolve } from "path";

const SITE_URL = "https://asilvainnovations.com";

const STATIC_PAGES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/blog", changefreq: "daily", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/newsletter", changefreq: "monthly", priority: "0.6" },
];

const CATEGORY_PAGES = [
  "systems-thinking",
  "integrated-risk-management",
  "resilience",
  "ai-analytics-strategic-management",
  "real-time-leadership",
].map((slug) => ({
  path: `/blog/category/${slug}`,
  changefreq: "weekly",
  priority: "0.8",
}));

/**
 * Generate XML for a single URL entry
 */
function urlEntry({ path, changefreq, priority, lastmod }) {
  return `  <url>
    <loc>${SITE_URL}${path}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : `<lastmod>${new Date().toISOString().split("T")[0]}</lastmod>`}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

/**
 * Generate the full sitemap XML
 * Pass in articles array from your data source
 */
export function generateSitemap(articles = []) {
  const articleEntries = articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      path: `/blog/${a.slug || a.id}`,
      changefreq: "monthly",
      priority: a.featured ? "0.9" : "0.7",
      lastmod: a.updatedAt || a.date,
    }));

  const authorEntries = [
    "alexandra-silva",
    "marcus-chen",
    "priya-nair",
    "jordan-blake",
    "sofia-mendez",
  ].map((slug) => ({
    path: `/author/${slug}`,
    changefreq: "monthly",
    priority: "0.6",
  }));

  const allUrls = [
    ...STATIC_PAGES,
    ...CATEGORY_PAGES,
    ...articleEntries,
    ...authorEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${allUrls.map(urlEntry).join("\n")}
</urlset>`;

  return xml;
}

// Run as script
if (process.argv[1].includes("generate-sitemap")) {
  const sitemap = generateSitemap();
  const outputPath = resolve(process.cwd(), "public/sitemap.xml");
  writeFileSync(outputPath, sitemap, "utf-8");
  console.log(`✅ Sitemap generated: ${outputPath}`);
  console.log(`   Entries: ${sitemap.match(/<url>/g)?.length || 0}`);
}
