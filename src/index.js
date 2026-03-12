/**
 * ASilva Innovations Blog — Utility Functions
 */

import { formatDistance, format, parseISO, isValid } from "date-fns";

// ── Date Formatting ───────────────────────────────────────────

/**
 * Format a date string for display: "Dec 15, 2024"
 */
export const formatDate = (dateStr) => {
  try {
    const d = typeof dateStr === "string" ? parseISO(dateStr) : new Date(dateStr);
    return isValid(d) ? format(d, "MMM d, yyyy") : "Unknown date";
  } catch {
    return "Unknown date";
  }
};

/**
 * Format a date as relative time: "3 days ago"
 */
export const formatRelativeDate = (dateStr) => {
  try {
    const d = typeof dateStr === "string" ? parseISO(dateStr) : new Date(dateStr);
    return isValid(d) ? formatDistance(d, new Date(), { addSuffix: true }) : "Unknown";
  } catch {
    return "Unknown";
  }
};

/**
 * Format a datetime string for display: "Dec 15, 2024 at 9:00 AM"
 */
export const formatDateTime = (dateStr) => {
  try {
    const d = typeof dateStr === "string" ? parseISO(dateStr) : new Date(dateStr);
    return isValid(d) ? format(d, "MMM d, yyyy 'at' h:mm a") : "Unknown";
  } catch {
    return "Unknown";
  }
};

// ── Number Formatting ─────────────────────────────────────────

/**
 * Format a number with K/M abbreviations: 14200 → "14.2k"
 */
export const formatNumber = (n) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
};

/**
 * Format a number with locale commas: 14200 → "14,200"
 */
export const formatLocaleNumber = (n) =>
  new Intl.NumberFormat("en-US").format(n);

// ── String Utilities ──────────────────────────────────────────

/**
 * Generate a URL slug from text
 */
export const slugify = (text = "") =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

/**
 * Truncate text to a max length with ellipsis
 */
export const truncate = (text = "", maxLength = 160) =>
  text.length > maxLength ? `${text.substring(0, maxLength).trim()}…` : text;

/**
 * Strip HTML tags from a string
 */
export const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();

/**
 * Capitalize first letter
 */
export const capitalize = (s = "") =>
  s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Convert newlines to paragraph tags
 */
export const nl2p = (text = "") =>
  text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");

// ── SEO Utilities ─────────────────────────────────────────────

/**
 * Build structured data (JSON-LD) for a blog article
 */
export const buildArticleSchema = (article, siteUrl = "https://asilvainnovations.com") => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  image: article.image,
  datePublished: article.date,
  dateModified: article.updatedAt || article.date,
  author: {
    "@type": "Person",
    name: article.author,
    url: `${siteUrl}/author/${slugify(article.author)}`,
  },
  publisher: {
    "@type": "Organization",
    name: "ASilva Innovations",
    logo: {
      "@type": "ImageObject",
      url: "https://asilvainnovations.com/assets/apps/user_1097/app_13212/draft/icon/app_logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${siteUrl}/blog/${article.slug || slugify(article.title)}`,
  },
  wordCount: article.content?.split(/\s+/).length || 0,
  timeRequired: `PT${article.readTime || 5}M`,
  keywords: article.tags?.join(", "),
  articleSection: article.category,
  inLanguage: "en-US",
});

/**
 * Build breadcrumb schema
 */
export const buildBreadcrumbSchema = (crumbs, siteUrl = "https://asilvainnovations.com") => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: c.url ? `${siteUrl}${c.url}` : undefined,
  })),
});

// ── Content Utilities ─────────────────────────────────────────

/**
 * Estimate reading time from word count (200 wpm average)
 */
export const estimateReadTime = (content = "", wpm = 200) =>
  Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / wpm));

/**
 * Extract headings from markdown content for Table of Contents
 */
export const extractHeadings = (content = "") => {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].trim(),
      id: slugify(match[2]),
    });
  }
  return headings;
};

/**
 * Extract all image URLs from markdown content
 */
export const extractImages = (content = "") => {
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const images = [];
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    images.push({ alt: match[1], src: match[2] });
  }
  return images;
};

// ── Validation ────────────────────────────────────────────────

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidUrl = (url) => {
  try { new URL(url); return true; }
  catch { return false; }
};

// ── Analytics ─────────────────────────────────────────────────

/**
 * Fire a Google Analytics event (if GA is loaded)
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

/**
 * Track article read
 */
export const trackArticleRead = (article) =>
  trackEvent("article_read", {
    article_id: article.id,
    article_title: article.title,
    category: article.category,
    author: article.author,
    read_time: article.readTime,
  });

/**
 * Track newsletter subscription
 */
export const trackNewsletterSubscribe = (source) =>
  trackEvent("newsletter_subscribe", { source });
