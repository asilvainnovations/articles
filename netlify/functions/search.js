/**
 * Netlify Function: search
 * GET /api/search?q=systems+thinking&category=ai&limit=10
 *
 * Full-text search across articles.
 * In production, connect to Algolia, Typesense, or a DB.
 */

export const handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { q = "", category = "", tag = "", limit = "10", offset = "0" } =
      event.queryStringParameters || {};

    if (!q.trim()) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: "Search query required" }),
      };
    }

    // ── In production: query Algolia / Typesense / database ──
    // const results = await algoliaClient.search({ query: q, filters: category ? `category:${category}` : "" });

    // Mock response for development
    const mockResults = {
      query: q,
      hits: [],
      total: 0,
      processingTimeMs: 2,
      filters: { category, tag },
    };

    return {
      statusCode: 200,
      headers: { ...corsHeaders(), "Cache-Control": "public, max-age=60" },
      body: JSON.stringify(mockResults),
    };
  } catch (error) {
    console.error("Search error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Search failed" }),
    };
  }
};

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.SITE_URL || "https://asilvainnovations.com",
  };
}
