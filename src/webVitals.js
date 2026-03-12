/**
 * Web Vitals reporting for Core Web Vitals monitoring.
 * Reports LCP, FID, CLS, TTFB, and FCP to analytics.
 */

export async function reportWebVitals(onPerfEntry) {
  if (!onPerfEntry || typeof onPerfEntry !== "function") return;

  try {
    const { onCLS, onFID, onFCP, onLCP, onTTFB } = await import("web-vitals");
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  } catch {
    // web-vitals not installed — skip silently
  }
}

/**
 * Send vitals to analytics endpoint
 */
export function sendToAnalytics({ name, delta, value, id }) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, {
      value: Math.round(name === "CLS" ? delta * 1000 : delta),
      event_category: "Web Vitals",
      event_label: id,
      non_interaction: true,
    });
  }
}
