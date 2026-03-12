/**
 * Netlify Function: newsletter-subscribe
 * POST /api/newsletter
 *
 * Body: { email: string, name?: string, source?: string }
 *
 * In production, connect to your ESP (Mailchimp, ConvertKit,
 * Resend, Loops, etc.) using the NEWSLETTER_API_KEY env var.
 */

export const handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(), body: "" };
  }

  try {
    const { email, name = "", source = "website" } = JSON.parse(event.body || "{}");

    // Validate email
    if (!email || !isValidEmail(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: "Valid email address required" }),
      };
    }

    // ── Connect to your ESP here ────────────────────────────
    // Example: Mailchimp
    // await addToMailchimp(email, name, source);

    // Example: ConvertKit
    // await addToConvertKit(email, name);

    // Example: Resend
    // await resend.contacts.create({ email, firstName: name, audienceId: process.env.RESEND_AUDIENCE_ID });

    // For now, log the subscription (replace with real ESP call)
    console.log(`New subscriber: ${email} (${name}) via ${source}`);

    // Send welcome email (optional)
    // await sendWelcomeEmail(email, name);

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: true,
        message: "Successfully subscribed! Welcome to the ASilva Innovations newsletter.",
      }),
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: "Subscription failed. Please try again." }),
    };
  }
};

// ── Helpers ───────────────────────────────────────────────────

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.SITE_URL || "https://asilvainnovations.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// ── ESP Integrations (uncomment as needed) ────────────────────

/*
async function addToMailchimp(email, name, source) {
  const [firstName, ...rest] = name.split(" ");
  const response = await fetch(
    `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName || "",
          LNAME: rest.join(" ") || "",
        },
        tags: [source],
      }),
    }
  );
  if (!response.ok) throw new Error(`Mailchimp error: ${response.status}`);
  return response.json();
}
*/

/*
async function addToConvertKit(email, name) {
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
        first_name: name,
      }),
    }
  );
  if (!response.ok) throw new Error(`ConvertKit error: ${response.status}`);
  return response.json();
}
*/
