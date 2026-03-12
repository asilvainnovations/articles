import { useState, useEffect, useRef, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// ─────────────────────────────────────────────────────────────
// CONSTANTS & MOCK DATA
// ─────────────────────────────────────────────────────────────

const LOGO_URL = "https://cognitio-plus.appimize.app/assets/apps/user_1097/app_3046/draft/icon/app_logo.png?1769949977";

const CATEGORIES = [
  { id: "all",        name: "All Topics",            color: "#2D6A4F", bg: "#E8F5EE" },
  { id: "systems",    name: "Systems Innovations",   color: "#1B4332", bg: "#D8F3DC" },
  { id: "growth",     name: "Personal Growth",       color: "#2D6A4F", bg: "#E0F4E8" },
  { id: "resilience", name: "Resilience",            color: "#40916C", bg: "#D8F3DC" },
  { id: "wellbeing",  name: "Well-Being",            color: "#1D5E42", bg: "#CEF0DA" },
  { id: "mental",     name: "Mental Health",         color: "#9C6B1B", bg: "#FDF0D5" },
];

const POSTS = [
  {
    id: 1, featured: true,
    title: "Building Antifragile Systems: How Organizations Grow Stronger Under Pressure",
    slug: "building-antifragile-systems",
    excerpt: "Discover how biological systems handle chaos and uncertainty, and how we can apply these principles to build organizations and personal habits that don't just survive disruption — they thrive because of it.",
    category: "systems",
    tags: ["Antifragility", "Systems Thinking", "Organizational Design"],
    publishedAt: "January 15, 2025", readTime: 8, views: 4823, status: "published",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    body: [
      { type: "paragraph", text: "In the mid-1990s, engineers designing redundant systems for critical infrastructure faced a paradox that would later become central to modern organizational theory: the very measures designed to protect a system from failure often made that system more brittle, not less. They were building walls when they should have been teaching the system to dance." },
      { type: "heading", text: "The Nature of Antifragility" },
      { type: "paragraph", text: "Nassim Nicholas Taleb coined the term antifragile to describe systems that don't merely resist shocks, but actively benefit from them. The human immune system is the canonical example — expose it to pathogens and it grows stronger. Suppress that exposure entirely and you produce an immune system that collapses at the first real challenge." },
      { type: "quote", text: "Wind extinguishes a candle and energizes fire. Likewise with randomness, uncertainty, chaos: you want to use them, not hide from them. You want to be the fire and wish for the wind. — Nassim Taleb" },
      { type: "heading", text: "Applying This to Organizations" },
      { type: "paragraph", text: "When we apply antifragile thinking to organizational design, the implications are profound. Most organizations obsessively optimize for efficiency and predictability. Every process is standardized. Every deviation is treated as a problem to be eliminated. This creates the illusion of control while simultaneously increasing systemic fragility." },
      { type: "paragraph", text: "Antifragile organizations instead embrace what researcher Nassim Taleb calls 'optionality' — they maintain a portfolio of small experiments, each of which has limited downside but potentially unlimited upside. When one fails, the lessons learned are fed back into the system. The failure itself becomes fuel." },
      { type: "heading", text: "The Personal Dimension" },
      { type: "paragraph", text: "At the personal level, antifragility translates into something remarkably practical. Instead of protecting yourself from stress, discomfort, and uncertainty, you strategically expose yourself to manageable doses of each. Progressive overload in fitness is the most obvious example — but the principle extends to emotional resilience, intellectual growth, and financial planning." },
    ],
    seo: { metaTitle: "Building Antifragile Systems | ASilva Innovations", metaDesc: "Learn how to build organizations and personal systems that grow stronger under pressure.", canonical: "/building-antifragile-systems" }
  },
  {
    id: 2, featured: true,
    title: "The Compound Effect: Why Small Daily Habits Outperform Drastic Life Changes",
    slug: "compound-effect-daily-habits",
    excerpt: "Science confirms what elite performers have known for decades: marginal gains compound into extraordinary outcomes. Here's the framework for designing a habit architecture that actually works.",
    category: "growth",
    tags: ["Habits", "Productivity", "Behavior Change"],
    publishedAt: "January 28, 2025", readTime: 6, views: 6241, status: "published",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80",
    body: [
      { type: "paragraph", text: "There is a seductive appeal to the dramatic gesture. The January 1st reset. The radical diet overhaul. The complete reinvention. We are drawn to these moments because they feel proportional to the magnitude of change we desire. The truth, backed by decades of behavioral science, is almost perversely mundane: lasting transformation is almost always the product of small, consistent actions performed over long periods of time." },
      { type: "heading", text: "The Mathematics of Marginal Gains" },
      { type: "paragraph", text: "If you improve by just 1% every day for a year, you end up roughly 37 times better than you were at the start. This is not a motivational poster — it is compound mathematics. The same logic applies in reverse: decline by 1% daily and you'll be close to zero within a year." },
      { type: "quote", text: "You do not rise to the level of your goals. You fall to the level of your systems. — James Clear, Atomic Habits" },
    ],
    seo: {}
  },
  {
    id: 3, featured: false,
    title: "Radical Acceptance: The Mental Health Practice That Changes Everything",
    slug: "radical-acceptance-mental-health",
    excerpt: "Borrowed from Dialectical Behavior Therapy, radical acceptance isn't about giving up — it's about seeing reality clearly so you can act on it with full power and without the energy cost of resistance.",
    category: "mental",
    tags: ["DBT", "Acceptance", "Therapy", "Mindfulness"],
    publishedAt: "February 5, 2025", readTime: 7, views: 5102, status: "published",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    body: [
      { type: "paragraph", text: "Pain is inevitable. Suffering, according to Marsha Linehan, the creator of Dialectical Behavior Therapy, is optional — and the mechanism by which we manufacture most of our suffering is resistance. The refusal to accept reality as it is, rather than as we wish it to be, is the engine of unnecessary psychological pain." },
    ],
    seo: {}
  },
  {
    id: 4, featured: false,
    title: "Post-Traumatic Growth: When Adversity Becomes Your Greatest Teacher",
    slug: "post-traumatic-growth",
    excerpt: "Resilience isn't just bouncing back — for many people, surviving profound difficulty leads to measurable improvement in psychological functioning, relationships, and a sense of life's possibilities.",
    category: "resilience",
    tags: ["Trauma", "Growth", "Psychology", "Post-Traumatic Growth"],
    publishedAt: "February 12, 2025", readTime: 10, views: 3889, status: "published",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80",
    body: [
      { type: "paragraph", text: "The concept of resilience has dominated psychological discourse for the better part of three decades. We speak of 'bouncing back' from adversity as though the ideal outcome of trauma is a return to the status quo ante — a restoration of the self that existed before the breaking." },
    ],
    seo: {}
  },
  {
    id: 5, featured: false,
    title: "Designing Your Environment for Peak Well-Being: A Systems Approach",
    slug: "designing-environment-wellbeing",
    excerpt: "Your environment shapes your behavior more powerfully than your willpower does. Learn how to architect your physical and digital spaces to make healthy choices the automatic default.",
    category: "wellbeing",
    tags: ["Environment Design", "Nudge Theory", "Behavioral Science"],
    publishedAt: "February 20, 2025", readTime: 9, views: 4156, status: "published",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1200&q=80",
    body: [
      { type: "paragraph", text: "Richard Thaler and Cass Sunstein won a Nobel Prize in Economics for articulating what most of us sense intuitively: the context in which a choice is presented shapes the choice we make, often far more powerfully than our explicit values or stated intentions." },
    ],
    seo: {}
  },
  {
    id: 6, featured: false,
    title: "Second-Order Thinking: The Cognitive Upgrade That Transforms Decision-Making",
    slug: "second-order-thinking",
    excerpt: "Most people think about immediate consequences. Elite decision-makers think about the consequences of consequences. Here's a framework for rewiring your thinking for systematically better outcomes.",
    category: "systems",
    tags: ["Mental Models", "Decision Making", "Second-Order Thinking"],
    publishedAt: "March 1, 2025", readTime: 7, views: 7234, status: "published",
    image: "https://images.unsplash.com/photo-1534278854415-1c5d2e04dc6b?w=1200&q=80",
    body: [],
    seo: {}
  },
  {
    id: 7, featured: false,
    title: "The Nervous System Reset: Evidence-Based Practices for Stress Recovery",
    slug: "nervous-system-reset",
    excerpt: "Chronic stress reshapes the architecture of your brain. But neuroplasticity works both ways. These science-backed practices can help restore your baseline and build a more resilient stress response.",
    category: "wellbeing",
    tags: ["Nervous System", "Stress", "Recovery", "Neuroscience"],
    publishedAt: "March 8, 2025", readTime: 11, views: 5567, status: "published",
    image: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=1200&q=80",
    body: [],
    seo: {}
  },
  {
    id: 8, featured: false,
    title: "Identity-Based Growth: Stop Setting Goals, Start Building Who You Are",
    slug: "identity-based-growth",
    excerpt: "Goal-setting fails because it focuses on what you want to achieve. Identity-based approaches ask a deeper question: who do you want to become? The answer changes your behavior from the inside out.",
    category: "growth",
    tags: ["Identity", "Behavior Change", "Self-Development"],
    publishedAt: "March 15, 2025", readTime: 8, views: 6890, status: "published",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&q=80",
    body: [],
    seo: {}
  },
  {
    id: 9, featured: false,
    title: "Digital Detox Protocol: Rebuilding Attention in the Age of Distraction",
    slug: "digital-detox-protocol",
    excerpt: "Your attention is the most valuable resource you own. Technology companies have built billion-dollar industries on capturing it. Here's a systematic protocol for reclaiming it.",
    category: "mental",
    tags: ["Digital Wellness", "Attention", "Focus", "Technology"],
    publishedAt: "March 22, 2025", readTime: 9, views: 4421, status: "draft",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
    body: [],
    seo: {}
  },
];

const ANALYTICS = {
  summary: { totalViews: 54323, subscribers: 2847, avgReadTime: "6m 42s", conversionRate: "3.8%" },
  pageviews: [
    { date: "Jan 1",  views: 1200, visitors: 890 },
    { date: "Jan 8",  views: 1850, visitors: 1230 },
    { date: "Jan 15", views: 2400, visitors: 1680 },
    { date: "Jan 22", views: 2100, visitors: 1450 },
    { date: "Jan 29", views: 3200, visitors: 2100 },
    { date: "Feb 5",  views: 3800, visitors: 2600 },
    { date: "Feb 12", views: 4200, visitors: 2900 },
    { date: "Feb 19", views: 3900, visitors: 2700 },
    { date: "Feb 26", views: 5100, visitors: 3400 },
    { date: "Mar 5",  views: 5800, visitors: 3900 },
    { date: "Mar 12", views: 6200, visitors: 4100 },
    { date: "Mar 19", views: 7100, visitors: 4800 },
  ],
  referrers: [
    { source: "Organic Search", pct: 62, color: "#2D6A4F" },
    { source: "Direct",         pct: 18, color: "#40916C" },
    { source: "Social Media",   pct: 12, color: "#74C69D" },
    { source: "Email",          pct: 5,  color: "#D4921E" },
    { source: "Referral",       pct: 3,  color: "#1B4332" },
  ],
  byCat: [
    { cat: "Systems",   views: 12057 },
    { cat: "Growth",    views: 13131 },
    { cat: "Resilience",views: 3889 },
    { cat: "Well-Being",views: 9723 },
    { cat: "Mental",    views: 9523 },
  ],
};

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2D6A4F55; border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: #2D6A4F; }
  .serif    { font-family: 'Playfair Display', Georgia, serif !important; }
  .serif-bd { font-family: 'Lora', Georgia, serif !important; }
  .sans     { font-family: 'DM Sans', system-ui, sans-serif !important; }
  .fade-up  { animation: fadeUp 0.55s ease both; }
  .fade-in  { animation: fadeIn 0.4s ease both; }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:none } }
  @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
  @keyframes pulse   { 0%,100% { opacity:1 } 50% { opacity:0.6 } }
  @keyframes spin    { to { transform: rotate(360deg) } }
  .hover-lift { transition: transform .22s ease, box-shadow .22s ease; cursor: pointer; }
  .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.13); }
  .cat-pill {
    display: inline-block; border-radius: 999px;
    font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
    padding: 3px 10px; font-family: 'DM Sans', sans-serif;
  }
  .reading-progress { position: fixed; top: 0; left: 0; height: 3px; background: #2D6A4F; z-index: 9999; transition: width .1s linear; }
  .editor-block { outline: none; }
  .editor-block:focus { background: rgba(45,106,79,.04); border-radius: 4px; }
  .tooltip-custom { background: #1B3A2D !important; color: #fff !important; font-family: 'DM Sans',sans-serif !important; font-size: 12px !important; border-radius: 6px !important; }
`;

// ─────────────────────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────────────────────

function catById(id)  { return CATEGORIES.find(c => c.id === id) || CATEGORIES[0]; }
function catName(id)  { return catById(id).name; }
function catColor(id) { return catById(id).color; }
function catBg(id)    { return catById(id).bg; }

function CategoryPill({ id, size = "sm" }) {
  const cat = catById(id);
  return (
    <span className="cat-pill" style={{ background: cat.bg, color: cat.color, fontSize: size === "lg" ? 12 : 11 }}>
      {cat.name}
    </span>
  );
}

function Icon({ name, size = 18, color = "currentColor", style = {} }) {
  const icons = {
    sun:        "M12 3v1m0 16v1M4.22 4.22l.71.71m12.02 12.02.71.71M1 12h2m18 0h2M4.93 19.07l.71-.71M18.36 5.64l.71-.71M12 7a5 5 0 100 10A5 5 0 0012 7z",
    moon:       "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
    search:     "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
    menu:       "M3 12h18M3 6h18M3 18h18",
    x:          "M18 6L6 18M6 6l12 12",
    eye:        "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
    clock:      "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 6v4l3 3",
    share:      "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13",
    bookmark:   "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
    edit:       "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash:      "M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
    chart:      "M18 20V10M12 20V4M6 20v-6",
    settings:   "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    mail:       "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 0l8 9 8-9",
    users:      "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    seo:        "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    home:       "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
    plus:       "M12 5v14M5 12h14",
    check:      "M20 6L9 17l-5-5",
    arrow:      "M5 12h14M12 5l7 7-7 7",
    arrow2:     "M19 12H5M12 19l-7-7 7-7",
    external:   "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
    bold:       "M6 4h8a4 4 0 010 8H6zM6 12h9a4 4 0 010 8H6z",
    italic:     "M19 4h-9M14 20H5M15 4L9 20",
    list:       "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    quote:      "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
    image:      "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM21 15l-5-5L5 21",
    link:       "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
    save:       "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
    newspaper:  "M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2M18 14h-8M15 18h-5M10 6h8v4h-8z",
  };
  const d = icons[name] || icons.x;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "inline-block", flexShrink: 0, ...style }}>
      <path d={d} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SITE HEADER
// ─────────────────────────────────────────────────────────────

function SiteHeader({ theme, darkMode, setDarkMode, view, setView, searchQuery, setSearchQuery, showSearch, setShowSearch, fontScale, setFontScale }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isAdmin = view === "admin";
  const headerBg = isAdmin ? theme.surface : (scrolled ? theme.headerBg : "transparent");
  const textCol = (isAdmin || scrolled) ? "#fff" : "#fff";

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, background: isAdmin ? "#1B3A2D" : (scrolled ? "#1B3A2D" : "transparent"), transition: "background .3s", borderBottom: scrolled || isAdmin ? "1px solid rgba(255,255,255,.1)" : "none" }}>
      {/* Top utility bar */}
      {!isAdmin && (
        <div style={{ background: "#1B3A2D", padding: "6px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,.7)" }}>
          <span className="sans">Systems Innovations • Personal Growth • Resilience • Well-Being • Mental Health</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
              <Icon name={darkMode ? "sun" : "moon"} size={13} color="rgba(255,255,255,.8)" />
              {darkMode ? "Light" : "Dark"}
            </button>
            <span style={{ color: "rgba(255,255,255,.3)" }}>|</span>
            <span>Font: </span>
            {[0.9, 1, 1.1].map(s => (
              <button key={s} onClick={() => setFontScale(s)} style={{ background: fontScale === s ? "rgba(255,255,255,.2)" : "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.8)", padding: "1px 5px", borderRadius: 3, fontSize: 11 }}>
                {s === 0.9 ? "A-" : s === 1 ? "A" : "A+"}
              </button>
            ))}
            <span style={{ color: "rgba(255,255,255,.3)" }}>|</span>
            <button onClick={() => setView("admin")} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.8)", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="settings" size={12} color="rgba(255,255,255,.8)" /> Admin
            </button>
          </div>
        </div>
      )}

      {/* Main nav */}
      <div style={{ maxWidth: isAdmin ? "none" : 1280, margin: "0 auto", padding: isAdmin ? "0 24px" : "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        {/* Logo */}
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_URL} alt="ASilva Innovations" style={{ height: 40, width: 40, borderRadius: 10, objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
          <div style={{ textAlign: "left" }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>ASilva</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)", letterSpacing: ".12em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Innovations</div>
          </div>
        </button>

        {!isAdmin && (
          <>
            {/* Nav links */}
            <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {CATEGORIES.slice(1).map(cat => (
                <button key={cat.id} onClick={() => { setView("home"); }} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", padding: "6px 12px", borderRadius: 6, transition: "background .2s", whiteSpace: "nowrap" }}
                  onMouseEnter={e => e.target.style.background = "rgba(255,255,255,.12)"}
                  onMouseLeave={e => e.target.style.background = "none"}>
                  {cat.name}
                </button>
              ))}
            </nav>

            {/* Search + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {showSearch ? (
                <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,.15)", borderRadius: 20, padding: "6px 14px", gap: 8, border: "1px solid rgba(255,255,255,.25)" }}>
                  <Icon name="search" size={15} color="rgba(255,255,255,.8)" />
                  <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search articles..." style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, width: 180, fontFamily: "'DM Sans', sans-serif" }} />
                  <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer" }}>
                    <Icon name="x" size={14} color="rgba(255,255,255,.7)" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowSearch(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.8)", display: "flex", alignItems: "center" }}>
                  <Icon name="search" size={18} color="rgba(255,255,255,.8)" />
                </button>
              )}
              <button style={{ background: "#D4921E", color: "#fff", border: "none", borderRadius: 20, padding: "8px 18px", fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </div>
          </>
        )}

        {isAdmin && (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "rgba(255,255,255,.7)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Admin Panel</span>
            <button onClick={() => setView("home")} style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="external" size={13} color="#fff" /> View Site
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────

function HeroSection({ post, theme, openArticle }) {
  return (
    <section className="fade-in" style={{ position: "relative", height: 600, overflow: "hidden", cursor: "pointer" }} onClick={() => openArticle(post)}>
      <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.35) 55%, transparent 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "48px 64px" }}>
        <div style={{ maxWidth: 800 }}>
          <div style={{ marginBottom: 14 }}>
            <CategoryPill id={post.category} />
            <span style={{ marginLeft: 12, color: "rgba(255,255,255,.7)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
              {post.readTime} min read • {post.publishedAt}
            </span>
          </div>
          <h1 className="serif fade-up" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 16, maxWidth: 750 }}>
            {post.title}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.8)", lineHeight: 1.65, maxWidth: 620, fontFamily: "'Lora', serif", marginBottom: 24 }}>
            {post.excerpt}
          </p>
          <button style={{ background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 4, padding: "12px 24px", fontWeight: 600, cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Read Article <Icon name="arrow" size={15} color="#fff" />
          </button>
        </div>
      </div>
      <div style={{ position: "absolute", top: 24, right: 32, background: "#D4921E", color: "#fff", borderRadius: 4, padding: "4px 10px", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
        Featured
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// POST CARD
// ─────────────────────────────────────────────────────────────

function PostCard({ post, theme, openArticle, size = "md" }) {
  const isSm = size === "sm";
  return (
    <div className="hover-lift" onClick={() => openArticle(post)}
      style={{ background: theme.surface, borderRadius: 12, overflow: "hidden", border: `1px solid ${theme.border}`, display: "flex", flexDirection: isSm ? "row" : "column", cursor: "pointer" }}>
      <img src={post.image} alt={post.title} style={{ width: isSm ? 110 : "100%", height: isSm ? 90 : 210, objectFit: "cover", flexShrink: 0 }} />
      <div style={{ padding: isSm ? "12px 14px" : "20px 22px", flex: 1 }}>
        <div style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
          <CategoryPill id={post.category} />
          {post.status === "draft" && (
            <span style={{ fontSize: 10, fontWeight: 600, color: "#9C6B1B", background: "#FDF0D5", padding: "2px 8px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".05em" }}>Draft</span>
          )}
        </div>
        <h3 className="serif" style={{ fontSize: isSm ? 14 : 18, fontWeight: 600, color: theme.text, lineHeight: 1.35, marginBottom: isSm ? 4 : 10 }}>
          {post.title}
        </h3>
        {!isSm && (
          <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.65, fontFamily: "'Lora', serif", marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.excerpt}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="clock" size={12} color={theme.textMuted} /> {post.readTime} min
          </span>
          {!isSm && (
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Icon name="eye" size={12} color={theme.textMuted} /> {post.views.toLocaleString()}
            </span>
          )}
          <span style={{ marginLeft: "auto" }}>{post.publishedAt}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NEWSLETTER SECTION
// ─────────────────────────────────────────────────────────────

function NewsletterSection({ theme, email, setEmail, subscribed, setSubscribed }) {
  return (
    <section style={{ background: "linear-gradient(135deg, #1B3A2D 0%, #2D6A4F 100%)", padding: "64px 32px", textAlign: "center" }}>
      <div style={{ maxWidth: 580, margin: "0 auto" }}>
        <div style={{ width: 48, height: 48, background: "rgba(255,255,255,.12)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Icon name="mail" size={22} color="#fff" />
        </div>
        <h2 className="serif" style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
          Join 2,800+ Growth-Minded Readers
        </h2>
        <p style={{ color: "rgba(255,255,255,.78)", fontSize: 16, lineHeight: 1.65, marginBottom: 32, fontFamily: "'Lora', serif" }}>
          Get weekly insights on systems thinking, personal growth, and mental well-being — delivered every Tuesday morning.
        </p>
        {subscribed ? (
          <div style={{ background: "rgba(255,255,255,.12)", borderRadius: 8, padding: "16px 24px", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
            <Icon name="check" size={18} color="#74C69D" style={{ marginRight: 8 }} />
            You're subscribed! Welcome to the community.
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, maxWidth: 460, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
            <input value={email} onChange={e => setEmail(e.target.value)}
              placeholder="Your best email address"
              style={{ flex: 1, minWidth: 220, padding: "13px 18px", borderRadius: 4, border: "none", background: "rgba(255,255,255,.15)", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
            <button onClick={() => { if (email) setSubscribed(true); }}
              style={{ background: "#D4921E", color: "#fff", border: "none", borderRadius: 4, padding: "13px 24px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
              Subscribe Free →
            </button>
          </div>
        )}
        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 12, marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>
          No spam. Unsubscribe at any time. GDPR compliant.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// CTA BLOCK
// ─────────────────────────────────────────────────────────────

function CTABlock({ theme }) {
  return (
    <div style={{ background: theme.surfaceAlt, borderRadius: 16, padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", border: `2px solid ${theme.border}`, margin: "48px 0" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#2D6A4F", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Free Resource</div>
        <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 8 }}>
          The Resilience Toolkit: 30-Day Action Plan
        </h3>
        <p style={{ color: theme.textMuted, fontSize: 15, lineHeight: 1.6, maxWidth: 500, fontFamily: "'Lora', serif" }}>
          A practical, research-backed guide to building unshakeable mental and emotional resilience — one day at a time.
        </p>
      </div>
      <button style={{ background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 6, padding: "14px 28px", fontWeight: 700, cursor: "pointer", fontSize: 15, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
        Download Free eBook
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BLOG HOME PAGE
// ─────────────────────────────────────────────────────────────

function BlogPage({ theme, darkMode, setDarkMode, fontScale, setFontScale, searchQuery, setSearchQuery, showSearch, setShowSearch, setView, openArticle, email, setEmail, subscribed, setSubscribed }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const visible = POSTS.filter(p => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (p.status === "draft") return false;
    return true;
  });

  const featured = POSTS.filter(p => p.featured && p.status === "published");
  const heroPost = featured[0];
  const secondFeatured = featured[1];
  const gridPosts = visible.filter(p => !p.featured);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <SiteHeader theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} view="home" setView={setView}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={showSearch} setShowSearch={setShowSearch}
        fontScale={fontScale} setFontScale={setFontScale} />

      {/* Hero */}
      {!searchQuery && activeCategory === "all" && heroPost && (
        <HeroSection post={heroPost} theme={theme} openArticle={openArticle} />
      )}

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Category filters */}
        <div style={{ padding: "28px 0 20px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              style={{ background: activeCategory === cat.id ? "#1B3A2D" : theme.surface, color: activeCategory === cat.id ? "#fff" : theme.textMuted, border: `1px solid ${activeCategory === cat.id ? "#1B3A2D" : theme.border}`, borderRadius: 20, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", transition: "all .2s" }}>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Section heading */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 700, color: theme.text, marginBottom: 4 }}>
              {searchQuery ? `Results for "${searchQuery}"` : activeCategory === "all" ? "Latest Articles" : catName(activeCategory)}
            </h2>
            <div style={{ width: 40, height: 3, background: "#2D6A4F", borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 13, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{visible.length} articles</span>
        </div>

        {/* Main content + sidebar layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 40, alignItems: "start" }}>
          {/* Main articles */}
          <div>
            {/* Second featured (if not searching) */}
            {!searchQuery && activeCategory === "all" && secondFeatured && (
              <div style={{ marginBottom: 32 }}>
                <div className="hover-lift" onClick={() => openArticle(secondFeatured)} style={{ background: theme.surface, borderRadius: 12, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${theme.border}`, cursor: "pointer" }}>
                  <img src={secondFeatured.image} alt={secondFeatured.title} style={{ width: "100%", height: 260, objectFit: "cover" }} />
                  <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <CategoryPill id={secondFeatured.category} />
                    <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: theme.text, lineHeight: 1.35, margin: "12px 0 10px" }}>
                      {secondFeatured.title}
                    </h3>
                    <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.65, fontFamily: "'Lora', serif", marginBottom: 16 }}>
                      {secondFeatured.excerpt.slice(0, 120)}…
                    </p>
                    <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                      {secondFeatured.readTime} min read • {secondFeatured.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article grid */}
            {visible.filter(p => !p.featured || searchQuery || activeCategory !== "all").length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 40 }}>
                {visible.filter(p => !p.featured || searchQuery || activeCategory !== "all").map((p, i) => (
                  <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                    <PostCard post={p} theme={theme} openArticle={openArticle} />
                  </div>
                ))}
              </div>
            ) : !searchQuery && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 40 }}>
                {gridPosts.map((p, i) => (
                  <div key={p.id} className="fade-up" style={{ animationDelay: `${i * 0.06}s` }}>
                    <PostCard post={p} theme={theme} openArticle={openArticle} />
                  </div>
                ))}
              </div>
            )}

            {/* CTA Block */}
            <CTABlock theme={theme} />
          </div>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: 80 }}>
            {/* Popular Posts */}
            <div style={{ background: theme.surface, borderRadius: 12, padding: "24px", border: `1px solid ${theme.border}`, marginBottom: 24 }}>
              <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid #2D6A4F` }}>
                Most Popular
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {POSTS.filter(p => p.status === "published").sort((a, b) => b.views - a.views).slice(0, 5).map((p, i) => (
                  <div key={p.id} onClick={() => openArticle(p)} style={{ display: "flex", gap: 12, cursor: "pointer", paddingBottom: i < 4 ? 12 : 0, borderBottom: i < 4 ? `1px solid ${theme.border}` : "none" }}
                    onMouseEnter={e => e.currentTarget.querySelector("h5").style.color = "#2D6A4F"}
                    onMouseLeave={e => e.currentTarget.querySelector("h5").style.color = theme.text}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: theme.border, fontFamily: "'DM Sans', sans-serif", minWidth: 28, lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h5 className="serif" style={{ fontSize: 13, fontWeight: 600, color: theme.text, lineHeight: 1.4, marginBottom: 4, transition: "color .2s" }}>
                        {p.title}
                      </h5>
                      <span style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                        {p.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topics */}
            <div style={{ background: theme.surface, borderRadius: 12, padding: "24px", border: `1px solid ${theme.border}`, marginBottom: 24 }}>
              <h4 className="serif" style={{ fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16, paddingBottom: 12, borderBottom: `2px solid #2D6A4F` }}>
                Explore Topics
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {CATEGORIES.slice(1).map(cat => (
                  <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: "8px 0", borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, color: theme.text, fontSize: 14 }}>{cat.name}</span>
                    <span style={{ fontSize: 12, color: theme.textMuted, background: theme.surfaceAlt, padding: "2px 8px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif" }}>
                      {POSTS.filter(p => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* About */}
            <div style={{ background: "linear-gradient(135deg, #1B3A2D 0%, #2D6A4F 100%)", borderRadius: 12, padding: "24px", color: "#fff" }}>
              <img src={LOGO_URL} alt="A. Silva" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", marginBottom: 12, border: "3px solid rgba(255,255,255,.25)" }} onError={e => { e.target.style.display = "none"; }} />
              <h4 className="serif" style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>About A. Silva</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.65, marginBottom: 16, fontFamily: "'Lora', serif" }}>
                Systems thinker, resilience coach, and wellness advocate. I write about the intersection of innovation, growth, and human flourishing.
              </p>
              <button style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", borderRadius: 4, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                Follow Along →
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Newsletter */}
      <NewsletterSection theme={theme} email={email} setEmail={setEmail} subscribed={subscribed} setSubscribed={setSubscribed} />

      {/* Footer */}
      <footer style={{ background: "#0F2318", padding: "48px 32px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img src={LOGO_URL} alt="" style={{ height: 36, width: 36, borderRadius: 8, objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                <span className="serif" style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>ASilva Innovations</span>
              </div>
              <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.7, maxWidth: 280, fontFamily: "'Lora', serif" }}>
                Exploring the intersection of systems thinking, human resilience, and holistic well-being — for a life of meaningful growth.
              </p>
            </div>
            {[
              { title: "Topics", links: ["Systems Innovations", "Personal Growth", "Resilience", "Well-Being", "Mental Health"] },
              { title: "Resources", links: ["Free eBook", "Newsletter", "Podcast", "Courses", "Coaching"] },
              { title: "Company", links: ["About", "Contact", "Privacy Policy", "Terms", "Sitemap"] },
            ].map(col => (
              <div key={col.title}>
                <h5 style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>{col.title}</h5>
                {col.links.map(l => (
                  <div key={l} style={{ marginBottom: 8 }}>
                    <a href="#" style={{ color: "rgba(255,255,255,.65)", fontSize: 13, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,.35)", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
              © 2025 ASilva Innovations. All rights reserved. • SSL Secured 🔒
            </span>
            <div style={{ display: "flex", gap: 16 }}>
              {["🔗 LinkedIn", "𝕏 Twitter", "📧 Email"].map(s => (
                <a key={s} href="#" style={{ color: "rgba(255,255,255,.45)", fontSize: 12, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ARTICLE PAGE
// ─────────────────────────────────────────────────────────────

function ArticlePage({ post, theme, darkMode, setDarkMode, fontScale, setFontScale, goHome, setView, allPosts, openArticle }) {
  const [progress, setProgress] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(17);
  const articleRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (!articleRef.current) return;
      const el = articleRef.current;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const scrolled = Math.max(0, -rect.top);
      setProgress(Math.min(100, (scrolled / total) * 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const related = allPosts.filter(p => p.id !== post.id && p.category === post.category && p.status === "published").slice(0, 3);

  return (
    <div style={{ background: theme.bg, minHeight: "100vh" }}>
      {/* Reading progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, background: "#2D6A4F", width: `${progress}%`, zIndex: 1000, transition: "width .1s linear", boxShadow: "0 0 10px #2D6A4F66" }} />

      <SiteHeader theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} view="article" setView={setView}
        searchQuery="" setSearchQuery={() => {}} showSearch={false} setShowSearch={() => {}}
        fontScale={fontScale} setFontScale={setFontScale} />

      {/* Article hero */}
      <div style={{ position: "relative", height: 460, overflow: "hidden" }}>
        <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.7) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 40px" }}>
          <div style={{ maxWidth: 780, margin: "0 auto", width: "100%", padding: "0 32px" }}>
            <button onClick={goHome} style={{ background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.25)", color: "#fff", borderRadius: 4, padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="arrow2" size={13} color="#fff" /> Back to Blog
            </button>
            <CategoryPill id={post.category} />
            <h1 className="serif fade-up" style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, color: "#fff", lineHeight: 1.25, margin: "14px 0 12px" }}>
              {post.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "rgba(255,255,255,.75)", fontFamily: "'DM Sans', sans-serif" }}>
              <img src={LOGO_URL} alt="A. Silva" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,.4)" }} onError={e => { e.target.style.display = "none"; }} />
              <span>A. Silva</span>
              <span style={{ opacity: .4 }}>•</span>
              <span>{post.publishedAt}</span>
              <span style={{ opacity: .4 }}>•</span>
              <span>{post.readTime} min read</span>
              <span style={{ opacity: .4 }}>•</span>
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reader controls */}
      <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "10px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 64, zIndex: 90 }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", marginRight: 8 }}>Font Size:</span>
          {[15, 17, 19].map(s => (
            <button key={s} onClick={() => setFontSize(s)}
              style={{ padding: "3px 8px", fontSize: 12, borderRadius: 4, border: `1px solid ${fontSize === s ? "#2D6A4F" : theme.border}`, background: fontSize === s ? "#2D6A4F" : "none", color: fontSize === s ? "#fff" : theme.textMuted, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              {s === 15 ? "A-" : s === 17 ? "A" : "A+"}
            </button>
          ))}
          <button onClick={() => setDarkMode(!darkMode)}
            style={{ marginLeft: 12, display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 4, border: `1px solid ${theme.border}`, background: "none", cursor: "pointer", color: theme.textMuted, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            <Icon name={darkMode ? "sun" : "moon"} size={13} color={theme.textMuted} />
            {darkMode ? "Light" : "Dark"} Mode
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ background: theme.surfaceAlt, borderRadius: 999, height: 6, width: 140, overflow: "hidden" }}>
            <div style={{ background: "#2D6A4F", height: "100%", width: `${progress}%`, transition: "width .1s", borderRadius: 999 }} />
          </div>
          <span style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{Math.round(progress)}%</span>
          <button onClick={() => setBookmarked(!bookmarked)} style={{ background: bookmarked ? "#2D6A4F11" : "none", border: `1px solid ${bookmarked ? "#2D6A4F" : theme.border}`, borderRadius: 4, padding: "4px 8px", cursor: "pointer" }}>
            <Icon name="bookmark" size={15} color={bookmarked ? "#2D6A4F" : theme.textMuted} />
          </button>
          <button onClick={() => setShowShare(!showShare)} style={{ display: "flex", alignItems: "center", gap: 5, background: "#2D6A4F", border: "none", borderRadius: 4, padding: "6px 12px", cursor: "pointer", color: "#fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            <Icon name="share" size={13} color="#fff" /> Share
          </button>
          {showShare && (
            <div style={{ position: "absolute", top: 48, right: 32, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: 12, boxShadow: "0 8px 32px rgba(0,0,0,.15)", zIndex: 200, display: "flex", flexDirection: "column", gap: 6, minWidth: 160 }}>
              {["𝕏 Twitter", "💼 LinkedIn", "📘 Facebook", "🔗 Copy Link"].map(s => (
                <button key={s} style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, padding: "7px 12px", cursor: "pointer", fontSize: 13, textAlign: "left", fontFamily: "'DM Sans', sans-serif", color: theme.text }}>{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 32px", display: "grid", gridTemplateColumns: "1fr 280px", gap: 48 }}>
        <article ref={articleRef}>
          {/* Excerpt */}
          <p style={{ fontSize: 19, fontFamily: "'Lora', serif", lineHeight: 1.75, color: theme.text, borderLeft: "3px solid #2D6A4F", paddingLeft: 20, marginBottom: 36, fontStyle: "italic" }}>
            {post.excerpt}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ background: theme.surfaceAlt, color: theme.textMuted, border: `1px solid ${theme.border}`, padding: "4px 12px", borderRadius: 999, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Article body */}
          <div style={{ fontFamily: "'Lora', serif", fontSize: fontSize, lineHeight: 1.8, color: theme.text }}>
            {(post.body || []).map((block, i) => {
              if (block.type === "paragraph") return (
                <p key={i} style={{ marginBottom: 24, color: theme.text }}>{block.text}</p>
              );
              if (block.type === "heading") return (
                <h2 key={i} className="serif" style={{ fontSize: fontSize + 8, fontWeight: 700, color: theme.text, margin: "36px 0 14px", lineHeight: 1.3 }}>{block.text}</h2>
              );
              if (block.type === "quote") return (
                <blockquote key={i} style={{ background: theme.surfaceAlt, borderLeft: "4px solid #2D6A4F", margin: "28px 0", padding: "20px 24px", borderRadius: "0 8px 8px 0" }}>
                  <p style={{ fontSize: fontSize + 1, color: theme.text, fontStyle: "italic", lineHeight: 1.75, marginBottom: 0 }}>{block.text}</p>
                </blockquote>
              );
              return null;
            })}

            {/* Filler content if short */}
            {(post.body || []).length < 3 && (
              <>
                <p style={{ marginBottom: 24 }}>
                  The principles explored in this article represent years of research and practical application across thousands of individuals who have transformed their lives through the systematic application of evidence-based frameworks. What makes these approaches remarkable is not their complexity, but their elegant simplicity.
                </p>
                <h2 className="serif" style={{ fontSize: fontSize + 8, fontWeight: 700, color: theme.text, margin: "36px 0 14px", lineHeight: 1.3 }}>
                  The Practical Framework
                </h2>
                <p style={{ marginBottom: 24 }}>
                  Implementation begins with honest self-assessment. Before attempting to change any system — whether external organizations or internal habits — you must first understand the current state with clear eyes, free from the distortions of wishful thinking or catastrophizing.
                </p>
                <blockquote style={{ background: theme.surfaceAlt, borderLeft: "4px solid #2D6A4F", margin: "28px 0", padding: "20px 24px", borderRadius: "0 8px 8px 0" }}>
                  <p style={{ fontSize: fontSize + 1, color: theme.text, fontStyle: "italic", lineHeight: 1.75, marginBottom: 0 }}>
                    "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and then starting on the first one."
                  </p>
                </blockquote>
                <p style={{ marginBottom: 24 }}>
                  This is not merely philosophical advice — it is a cognitive strategy supported by decades of behavioral science research. When we decompose large challenges into their constituent parts, we overcome the paralysis that complexity so often induces.
                </p>
              </>
            )}
          </div>

          {/* Author card */}
          <div style={{ background: theme.surfaceAlt, borderRadius: 12, padding: "28px", border: `1px solid ${theme.border}`, marginTop: 48, display: "flex", gap: 20, alignItems: "flex-start" }}>
            <img src={LOGO_URL} alt="A. Silva" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `3px solid ${theme.border}`, flexShrink: 0 }} onError={e => { e.target.style.display = "none"; }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#2D6A4F", marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Written by</div>
              <h4 className="serif" style={{ fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 6 }}>A. Silva</h4>
              <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.65, fontFamily: "'Lora', serif", marginBottom: 12 }}>
                Founder of ASilva Innovations. Systems thinker, resilience strategist, and wellness advocate with 15+ years of experience helping individuals and organizations unlock their full potential.
              </p>
              <button style={{ background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 4, padding: "7px 16px", fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                Follow A. Silva
              </button>
            </div>
          </div>
        </article>

        {/* Article sidebar */}
        <aside style={{ position: "sticky", top: 120, alignSelf: "start" }}>
          {/* Table of Contents */}
          <div style={{ background: theme.surface, borderRadius: 12, padding: "20px", border: `1px solid ${theme.border}`, marginBottom: 20 }}>
            <h5 style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
              Table of Contents
            </h5>
            {(post.body || []).filter(b => b.type === "heading").map((b, i) => (
              <div key={i} style={{ padding: "6px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 13, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                {i + 1}. {b.text}
              </div>
            ))}
            {(post.body || []).filter(b => b.type === "heading").length === 0 && (
              <>
                <div style={{ padding: "6px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 13, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>1. Introduction</div>
                <div style={{ padding: "6px 0", borderBottom: `1px solid ${theme.border}`, fontSize: 13, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>2. The Practical Framework</div>
                <div style={{ padding: "6px 0", fontSize: 13, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>3. Next Steps</div>
              </>
            )}
          </div>

          {/* SEO meta preview */}
          <div style={{ background: theme.surface, borderRadius: 12, padding: "16px", border: `1px solid ${theme.border}`, marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
              🔍 Google Preview (Structured Data)
            </div>
            <div style={{ borderRadius: 8, border: "1px solid #e0e0e0", padding: "10px 12px", background: "#fff" }}>
              <div style={{ fontSize: 11, color: "#006621", fontFamily: "'DM Sans', sans-serif" }}>asilva-innovations.com › {post.slug}</div>
              <div style={{ fontSize: 14, color: "#1a0dab", fontFamily: "'DM Sans', sans-serif", marginTop: 2, fontWeight: 500 }}>
                {post.seo?.metaTitle || post.title.slice(0, 60)}
              </div>
              <div style={{ fontSize: 12, color: "#545454", fontFamily: "'DM Sans', sans-serif", marginTop: 3, lineHeight: 1.5 }}>
                {(post.seo?.metaDesc || post.excerpt)?.slice(0, 120)}…
              </div>
            </div>
          </div>

          {/* Share */}
          <div style={{ background: theme.surface, borderRadius: 12, padding: "16px", border: `1px solid ${theme.border}` }}>
            <h5 style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Share This Article</h5>
            {["𝕏 Share on Twitter", "💼 Post on LinkedIn", "📘 Share on Facebook", "📧 Email to Friend"].map(s => (
              <button key={s} style={{ display: "block", width: "100%", marginBottom: 8, background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, padding: "8px 12px", cursor: "pointer", fontSize: 13, textAlign: "left", fontFamily: "'DM Sans', sans-serif", color: theme.text }}>
                {s}
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div style={{ borderTop: `1px solid ${theme.border}`, background: theme.surface, padding: "48px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <h3 className="serif" style={{ fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Related Articles</h3>
            <div style={{ width: 40, height: 3, background: "#2D6A4F", borderRadius: 2, marginBottom: 28 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {related.map(p => <PostCard key={p.id} post={p} theme={theme} openArticle={openArticle} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────

function AdminPage({ theme, setView, darkMode, setDarkMode }) {
  const [tab, setTab] = useState("dashboard");
  const [posts, setPosts] = useState(POSTS);
  const [editPost, setEditPost] = useState(null);

  const sideNav = [
    { id: "dashboard", icon: "home",      label: "Dashboard" },
    { id: "posts",     icon: "newspaper", label: "All Posts" },
    { id: "editor",    icon: "edit",      label: "New Post" },
    { id: "analytics", icon: "chart",     label: "Analytics" },
    { id: "seo",       icon: "seo",       label: "SEO & Schema" },
    { id: "newsletter",icon: "mail",      label: "Newsletter" },
    { id: "users",     icon: "users",     label: "User Roles" },
    { id: "settings",  icon: "settings",  label: "Settings" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: "#0F2318", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={LOGO_URL} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
            <div>
              <div className="serif" style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1 }}>ASilva</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", letterSpacing: ".1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>Admin Console</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {sideNav.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setEditPost(null); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 6, background: tab === item.id ? "rgba(45,106,79,.35)" : "none", border: `1px solid ${tab === item.id ? "rgba(45,106,79,.5)" : "transparent"}`, color: tab === item.id ? "#fff" : "rgba(255,255,255,.6)", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: 2, transition: "all .15s", textAlign: "left" }}>
              <Icon name={item.icon} size={16} color={tab === item.id ? "#74C69D" : "rgba(255,255,255,.5)"} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <button onClick={() => setView("home")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 6, background: "none", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.6)", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            <Icon name="external" size={15} color="rgba(255,255,255,.5)" /> View Public Site
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main style={{ flex: 1, background: theme.bg, overflowY: "auto" }}>
        {/* Admin topbar */}
        <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>
            {sideNav.find(n => n.id === tab)?.label || "Dashboard"}
          </h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name={darkMode ? "sun" : "moon"} size={15} color={theme.textMuted} />
            </button>
            <button onClick={() => { setTab("editor"); setEditPost(null); }}
              style={{ background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="plus" size={15} color="#fff" /> New Post
            </button>
          </div>
        </div>

        <div style={{ padding: 28 }}>
          {tab === "dashboard" && <AdminDashboardTab theme={theme} posts={posts} setTab={setTab} />}
          {tab === "posts"     && <PostsManager theme={theme} posts={posts} setPosts={setPosts} setEditPost={setEditPost} setTab={setTab} />}
          {tab === "editor"    && <BlockEditorPanel theme={theme} post={editPost} setEditPost={setEditPost} setTab={setTab} posts={posts} setPosts={setPosts} />}
          {tab === "analytics" && <AnalyticsDashboard theme={theme} />}
          {tab === "seo"       && <SEOPanel theme={theme} posts={posts} />}
          {tab === "newsletter"&& <NewsletterAdmin theme={theme} />}
          {tab === "users"     && <UsersPanel theme={theme} />}
          {tab === "settings"  && <SettingsPanel theme={theme} />}
        </div>
      </main>
    </div>
  );
}

// ─── Admin Dashboard Tab ─────────────────────────────────────

function AdminDashboardTab({ theme, posts, setTab }) {
  const published = posts.filter(p => p.status === "published").length;
  const drafts    = posts.filter(p => p.status === "draft").length;
  const totalViews = posts.reduce((s, p) => s + p.views, 0);

  const stats = [
    { label: "Total Articles",  value: posts.length,             icon: "newspaper", color: "#2D6A4F" },
    { label: "Published",       value: published,                icon: "check",     color: "#40916C" },
    { label: "Total Page Views",value: totalViews.toLocaleString(), icon: "eye",    color: "#D4921E" },
    { label: "Subscribers",     value: "2,847",                  icon: "mail",      color: "#1B4332" },
  ];

  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: theme.surface, borderRadius: 10, padding: "20px 22px", border: `1px solid ${theme.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={s.icon} size={19} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart + recent posts */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ background: theme.surface, borderRadius: 10, padding: "24px", border: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>Traffic — Last 12 Weeks</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ANALYTICS.pageviews}>
              <defs>
                <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#2D6A4F" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }} />
              <YAxis tick={{ fontSize: 11, fill: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }} />
              <Tooltip contentStyle={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} />
              <Area type="monotone" dataKey="views" stroke="#2D6A4F" strokeWidth={2} fill="url(#vg)" />
              <Area type="monotone" dataKey="visitors" stroke="#74C69D" strokeWidth={2} fill="none" strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: theme.surface, borderRadius: 10, padding: "24px", border: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Traffic Sources</h3>
          {ANALYTICS.referrers.map(r => (
            <div key={r.source} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: theme.text }}>{r.source}</span>
                <span style={{ color: theme.textMuted, fontWeight: 600 }}>{r.pct}%</span>
              </div>
              <div style={{ background: theme.surfaceAlt, borderRadius: 999, height: 6, overflow: "hidden" }}>
                <div style={{ background: r.color, height: "100%", width: `${r.pct}%`, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent posts table */}
      <div style={{ background: theme.surface, borderRadius: 10, padding: "24px", border: `1px solid ${theme.border}`, marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Recent Posts</h3>
          <button onClick={() => setTab("posts")} style={{ background: "none", border: "none", cursor: "pointer", color: "#2D6A4F", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>View All →</button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${theme.border}` }}>
              {["Title", "Category", "Views", "Status", "Date"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 5).map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: "12px", fontSize: 14, color: theme.text, fontFamily: "'DM Sans', sans-serif", maxWidth: 300 }}>
                  <div style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                </td>
                <td style={{ padding: "12px" }}><CategoryPill id={p.category} /></td>
                <td style={{ padding: "12px", fontSize: 13, color: theme.text, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{p.views.toLocaleString()}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ background: p.status === "published" ? "#E8F5EE" : "#FDF0D5", color: p.status === "published" ? "#1B4332" : "#9C6B1B", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize" }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "12px", fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{p.publishedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Posts Manager ───────────────────────────────────────────

function PostsManager({ theme, posts, setPosts, setEditPost, setTab }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const visible = posts.filter(p => {
    if (filter !== "all" && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["all", "published", "draft"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "7px 14px", borderRadius: 6, border: `1px solid ${filter === f ? "#2D6A4F" : theme.border}`, background: filter === f ? "#2D6A4F" : "none", color: filter === f ? "#fff" : theme.textMuted, cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize" }}>
              {f === "all" ? `All (${posts.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${posts.filter(p => p.status === f).length})`}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "7px 12px", width: 220 }}>
          <Icon name="search" size={14} color={theme.textMuted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts…"
            style={{ background: "none", border: "none", outline: "none", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: theme.text, width: "100%" }} />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: theme.surface, borderRadius: 10, border: `1px solid ${theme.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: theme.surfaceAlt, borderBottom: `1px solid ${theme.border}` }}>
              {["Title", "Category", "Tags", "Views", "Status", "Published", "Actions"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "12px 14px", fontSize: 11, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(p => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${theme.border}` }}
                onMouseEnter={e => e.currentTarget.style.background = theme.surfaceAlt}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                <td style={{ padding: "14px", maxWidth: 260 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: theme.text, fontFamily: "'DM Sans', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>/{p.slug}</div>
                </td>
                <td style={{ padding: "14px" }}><CategoryPill id={p.category} /></td>
                <td style={{ padding: "14px" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {p.tags.slice(0, 2).map(t => (
                      <span key={t} style={{ fontSize: 10, background: theme.surfaceAlt, color: theme.textMuted, padding: "1px 6px", borderRadius: 999, fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: "14px", fontSize: 13, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>{p.views.toLocaleString()}</td>
                <td style={{ padding: "14px" }}>
                  <span style={{ background: p.status === "published" ? "#E8F5EE" : "#FDF0D5", color: p.status === "published" ? "#1B4332" : "#9C6B1B", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize" }}>
                    {p.status}
                  </span>
                </td>
                <td style={{ padding: "14px", fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{p.publishedAt}</td>
                <td style={{ padding: "14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => { setEditPost(p); setTab("editor"); }}
                      style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 5, padding: "5px 8px", cursor: "pointer" }}>
                      <Icon name="edit" size={13} color="#2D6A4F" />
                    </button>
                    <button onClick={() => { if (window.confirm("Delete this post?")) setPosts(prev => prev.filter(x => x.id !== p.id)); }}
                      style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 5, padding: "5px 8px", cursor: "pointer" }}>
                      <Icon name="trash" size={13} color="#e53e3e" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Block Editor Panel ──────────────────────────────────────

function BlockEditorPanel({ theme, post: initialPost, setEditPost, setTab, posts, setPosts }) {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || "");
  const [category, setCategory] = useState(initialPost?.category || "systems");
  const [status, setStatus] = useState(initialPost?.status || "draft");
  const [blocks, setBlocks] = useState(initialPost?.body?.length ? initialPost.body : [{ type: "paragraph", text: "" }]);
  const [activeBlockIdx, setActiveBlockIdx] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [metaTitle, setMetaTitle] = useState(initialPost?.seo?.metaTitle || "");
  const [metaDesc, setMetaDesc] = useState(initialPost?.seo?.metaDesc || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [scheduleDate, setScheduleDate] = useState("");
  const [showSEO, setShowSEO] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    if (!initialPost && title) {
      setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  }, [title]);

  const addBlock = (type) => {
    const newBlock = type === "heading" ? { type: "heading", text: "Heading" } :
                     type === "quote"   ? { type: "quote",   text: "Quote text here" } :
                     type === "list"    ? { type: "list",    items: ["Item 1", "Item 2"] } :
                                          { type: "paragraph", text: "" };
    setBlocks(prev => [...prev.slice(0, activeBlockIdx + 1), newBlock, ...prev.slice(activeBlockIdx + 1)]);
    setActiveBlockIdx(activeBlockIdx + 1);
  };

  const updateBlock = (idx, field, value) => {
    setBlocks(prev => prev.map((b, i) => i === idx ? { ...b, [field]: value } : b));
  };

  const removeBlock = (idx) => {
    if (blocks.length === 1) return;
    setBlocks(prev => prev.filter((_, i) => i !== idx));
    setActiveBlockIdx(Math.max(0, activeBlockIdx - 1));
  };

  const moveBlock = (idx, dir) => {
    const newBlocks = [...blocks];
    const target = idx + dir;
    if (target < 0 || target >= newBlocks.length) return;
    [newBlocks[idx], newBlocks[target]] = [newBlocks[target], newBlocks[idx]];
    setBlocks(newBlocks);
    setActiveBlockIdx(target);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const blockTypes = [
    { type: "paragraph", icon: "list",  label: "Paragraph" },
    { type: "heading",   icon: "bold",  label: "Heading" },
    { type: "quote",     icon: "quote", label: "Quote" },
    { type: "list",      icon: "list",  label: "List" },
    { type: "image",     icon: "image", label: "Image" },
    { type: "link",      icon: "link",  label: "Link" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>
      {/* Editor main */}
      <div>
        {/* Toolbar */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 4 }}>
            {blockTypes.map(bt => (
              <button key={bt.type} onClick={() => addBlock(bt.type)} title={`Add ${bt.label}`}
                style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", border: `1px solid ${theme.border}`, borderRadius: 5, background: "none", cursor: "pointer", fontSize: 11, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>
                <Icon name={bt.icon} size={13} color={theme.text} /> {bt.label}
              </button>
            ))}
          </div>
          <div style={{ flex: 1 }} />
          <button onClick={() => setPreviewMode(!previewMode)}
            style={{ padding: "6px 12px", border: `1px solid ${theme.border}`, borderRadius: 5, background: previewMode ? "#2D6A4F" : "none", color: previewMode ? "#fff" : theme.text, cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            {previewMode ? "✏️ Edit" : "👁 Preview"}
          </button>
          <button onClick={handleSave}
            style={{ padding: "7px 14px", background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="save" size={13} color="#fff" /> {saved ? "✓ Saved!" : "Save Draft"}
          </button>
        </div>

        {/* Title */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "20px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Post Title</div>
          <textarea value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your compelling headline here…"
            style={{ width: "100%", border: "none", outline: "none", fontSize: 26, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: theme.text, background: "none", resize: "none", lineHeight: 1.3, minHeight: 70 }} />
          {slug && (
            <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", marginTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
              <span>🔗 Slug:</span>
              <input value={slug} onChange={e => setSlug(e.target.value)}
                style={{ border: "none", outline: "none", background: theme.surfaceAlt, borderRadius: 4, padding: "2px 8px", fontSize: 12, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", flex: 1 }} />
            </div>
          )}
        </div>

        {/* Excerpt */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "16px", marginBottom: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Excerpt / Meta Description</div>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A compelling 1-2 sentence summary used in listings and social sharing…"
            style={{ width: "100%", border: "none", outline: "none", fontSize: 14, fontFamily: "'Lora', serif", color: theme.text, background: "none", resize: "none", lineHeight: 1.65, minHeight: 60 }} />
          <div style={{ fontSize: 11, color: excerpt.length > 160 ? "#e53e3e" : theme.textMuted, fontFamily: "'DM Sans', sans-serif", textAlign: "right" }}>
            {excerpt.length}/160
          </div>
        </div>

        {/* Blocks */}
        {!previewMode ? (
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: theme.textMuted, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Content Blocks ({blocks.length})</div>
            {blocks.map((block, idx) => (
              <div key={idx} onClick={() => setActiveBlockIdx(idx)}
                style={{ marginBottom: 12, border: `2px solid ${activeBlockIdx === idx ? "#2D6A4F" : theme.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color .15s" }}>
                {/* Block toolbar */}
                <div style={{ background: activeBlockIdx === idx ? "#2D6A4F08" : theme.surfaceAlt, padding: "6px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid ${theme.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: theme.textMuted, textTransform: "capitalize", fontFamily: "'DM Sans', sans-serif", flex: 1 }}>
                    {block.type === "paragraph" ? "¶ Paragraph" : block.type === "heading" ? "H Heading" : block.type === "quote" ? '" Quote' : "· List"}
                  </span>
                  <button onClick={() => moveBlock(idx, -1)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 5px", fontSize: 13, color: theme.textMuted }}>↑</button>
                  <button onClick={() => moveBlock(idx, 1)}  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 5px", fontSize: 13, color: theme.textMuted }}>↓</button>
                  <button onClick={() => removeBlock(idx)}   style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="trash" size={12} color="#e53e3e" /></button>
                </div>
                {/* Block content */}
                <div style={{ padding: "10px 14px" }}>
                  {block.type === "heading" && (
                    <input value={block.text} onChange={e => updateBlock(idx, "text", e.target.value)}
                      style={{ width: "100%", border: "none", outline: "none", fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: theme.text, background: "none" }} />
                  )}
                  {block.type === "paragraph" && (
                    <textarea value={block.text} onChange={e => updateBlock(idx, "text", e.target.value)} placeholder="Write your paragraph here…" rows={4}
                      style={{ width: "100%", border: "none", outline: "none", fontSize: 15, fontFamily: "'Lora', serif", color: theme.text, background: "none", resize: "vertical", lineHeight: 1.7 }} />
                  )}
                  {block.type === "quote" && (
                    <textarea value={block.text} onChange={e => updateBlock(idx, "text", e.target.value)} placeholder="Enter a memorable quote…" rows={3}
                      style={{ width: "100%", border: "none", outline: "none", fontSize: 15, fontFamily: "'Lora', serif", color: "#2D6A4F", background: "#2D6A4F08", resize: "vertical", lineHeight: 1.75, padding: "8px 12px", borderLeft: "3px solid #2D6A4F", borderRadius: "0 4px 4px 0" }} />
                  )}
                  {block.type === "image" && (
                    <div style={{ textAlign: "center", padding: 20, border: `2px dashed ${theme.border}`, borderRadius: 6, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                      <Icon name="image" size={28} color={theme.textMuted} style={{ marginBottom: 8 }} />
                      <div>Click to upload or paste image URL</div>
                    </div>
                  )}
                  {block.type === "link" && (
                    <input placeholder="https://…" style={{ width: "100%", border: "none", outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "#2D6A4F", background: "none" }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Preview Mode */
          <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "32px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#2D6A4F", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>PREVIEW</div>
            <h1 className="serif" style={{ fontSize: 32, fontWeight: 700, color: theme.text, lineHeight: 1.3, marginBottom: 16 }}>{title || "Untitled Post"}</h1>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 17, color: theme.textMuted, lineHeight: 1.75, marginBottom: 24, fontStyle: "italic", borderLeft: "3px solid #2D6A4F", paddingLeft: 16 }}>{excerpt}</p>
            {blocks.map((b, i) => {
              if (b.type === "paragraph") return <p key={i} style={{ fontFamily: "'Lora', serif", fontSize: 16, lineHeight: 1.8, color: theme.text, marginBottom: 20 }}>{b.text}</p>;
              if (b.type === "heading")   return <h2 key={i} className="serif" style={{ fontSize: 24, fontWeight: 700, color: theme.text, margin: "28px 0 12px" }}>{b.text}</h2>;
              if (b.type === "quote")     return <blockquote key={i} style={{ borderLeft: "4px solid #2D6A4F", padding: "12px 20px", background: "#2D6A4F08", margin: "20px 0", borderRadius: "0 6px 6px 0" }}><em style={{ fontFamily: "'Lora', serif", fontSize: 16, color: theme.text }}>{b.text}</em></blockquote>;
              return null;
            })}
          </div>
        )}
      </div>

      {/* Publish sidebar */}
      <div>
        {/* Publish settings */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "18px", marginBottom: 14 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Publish Settings</h4>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 5 }}>Status</label>
            <select value={status} onChange={e => setStatus(e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.bg, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          {status === "scheduled" && (
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 5 }}>Publish Date & Time</label>
              <input type="datetime-local" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)}
                style={{ width: "100%", padding: "8px 10px", border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.bg, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} />
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 5 }}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.bg, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
              {CATEGORIES.slice(1).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <button onClick={handleSave} style={{ width: "100%", background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 6, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
            {status === "published" ? "✓ Publish Now" : status === "scheduled" ? "📅 Schedule Post" : "💾 Save Draft"}
          </button>
          <button style={{ width: "100%", background: "none", color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: 6, padding: "8px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
            Preview in New Tab
          </button>
        </div>

        {/* SEO settings */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "18px", marginBottom: 14 }}>
          <button onClick={() => setShowSEO(!showSEO)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}>
            <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>SEO & Schema</h4>
            <span style={{ fontSize: 18, color: theme.textMuted }}>{showSEO ? "▲" : "▼"}</span>
          </button>
          {showSEO && (
            <div style={{ marginTop: 14 }}>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 4 }}>Meta Title ({metaTitle.length}/60)</label>
                <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="SEO title…"
                  style={{ width: "100%", padding: "7px 9px", border: `1px solid ${metaTitle.length > 60 ? "#e53e3e" : theme.border}`, borderRadius: 5, background: theme.bg, color: theme.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 4 }}>Meta Description ({metaDesc.length}/160)</label>
                <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="160-char description for search engines…" rows={3}
                  style={{ width: "100%", padding: "7px 9px", border: `1px solid ${metaDesc.length > 160 ? "#e53e3e" : theme.border}`, borderRadius: 5, background: theme.bg, color: theme.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif", resize: "vertical" }} />
              </div>
              {[
                { label: "Schema Type", items: ["Article", "BlogPosting", "HowTo", "FAQ"] },
                { label: "Open Graph Type", items: ["article", "website"] },
              ].map(sel => (
                <div key={sel.label} style={{ marginBottom: 10 }}>
                  <label style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 4 }}>{sel.label}</label>
                  <select style={{ width: "100%", padding: "7px 9px", border: `1px solid ${theme.border}`, borderRadius: 5, background: theme.bg, color: theme.text, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                    {sel.items.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              ))}
              <div style={{ background: theme.surfaceAlt, borderRadius: 6, padding: "10px", fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
                ✓ Canonical tag auto-generated from slug<br />
                ✓ JSON-LD structured data enabled<br />
                ✓ Twitter Card & Open Graph tags set<br />
                ✓ XML sitemap will auto-update on publish
              </div>
            </div>
          )}
        </div>

        {/* Media */}
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "18px" }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Featured Image</h4>
          <div style={{ border: `2px dashed ${theme.border}`, borderRadius: 8, padding: "24px 16px", textAlign: "center", cursor: "pointer", color: theme.textMuted, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
            <Icon name="image" size={24} color={theme.textMuted} style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Drop image here</div>
            <div>or click to browse</div>
            <div style={{ marginTop: 8, fontSize: 11, opacity: 0.7 }}>PNG, JPG, WebP · max 5MB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Dashboard ─────────────────────────────────────

function AnalyticsDashboard({ theme }) {
  const [period, setPeriod] = useState("12w");

  return (
    <div>
      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Page Views",   value: "54,323",  delta: "+28%", color: "#2D6A4F" },
          { label: "Unique Visitors",    value: "32,480",  delta: "+22%", color: "#40916C" },
          { label: "Newsletter Subs",    value: "2,847",   delta: "+15%", color: "#D4921E" },
          { label: "Avg. Read Time",     value: "6m 42s",  delta: "+4%",  color: "#1B4332" },
        ].map(s => (
          <div key={s.label} style={{ background: theme.surface, borderRadius: 10, padding: "18px 20px", border: `1px solid ${theme.border}` }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: s.color, fontFamily: "'DM Sans', sans-serif" }}>{s.delta} vs. last period</div>
          </div>
        ))}
      </div>

      {/* Period picker + chart */}
      <div style={{ background: theme.surface, borderRadius: 10, padding: "24px", border: `1px solid ${theme.border}`, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Traffic Over Time</h3>
          <div style={{ display: "flex", gap: 4 }}>
            {["4w", "12w", "6m", "1y"].map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: "5px 10px", borderRadius: 5, border: `1px solid ${period === p ? "#2D6A4F" : theme.border}`, background: period === p ? "#2D6A4F" : "none", color: period === p ? "#fff" : theme.textMuted, cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
          {[{ label: "Page Views", color: "#2D6A4F" }, { label: "Unique Visitors", color: "#74C69D" }].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ width: 24, height: 3, background: l.color, borderRadius: 2 }} /> {l.label}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={ANALYTICS.pageviews}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2D6A4F" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#74C69D" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#74C69D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }} />
            <YAxis tick={{ fontSize: 11, fill: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }} />
            <Tooltip contentStyle={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }} />
            <Area type="monotone" dataKey="views"    stroke="#2D6A4F" strokeWidth={2.5} fill="url(#g1)" />
            <Area type="monotone" dataKey="visitors" stroke="#74C69D" strokeWidth={2}   fill="url(#g2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        {/* Top Posts */}
        <div style={{ background: theme.surface, borderRadius: 10, padding: "22px", border: `1px solid ${theme.border}` }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Top Performing Posts</h4>
          {[...POSTS].sort((a, b) => b.views - a.views).slice(0, 5).map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: i < 4 ? `1px solid ${theme.border}` : "none" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: theme.border, fontFamily: "'DM Sans', sans-serif", minWidth: 24 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.35, marginBottom: 2 }}>{p.title.slice(0, 45)}…</div>
                <CategoryPill id={p.category} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{p.views.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* By category */}
        <div style={{ background: theme.surface, borderRadius: 10, padding: "22px", border: `1px solid ${theme.border}` }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Views by Category</h4>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ANALYTICS.byCat} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: theme.textMuted, fontFamily: "'DM Sans'" }} />
              <YAxis type="category" dataKey="cat" tick={{ fontSize: 11, fill: theme.textMuted, fontFamily: "'DM Sans'" }} width={70} />
              <Tooltip contentStyle={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 8, fontFamily: "'DM Sans'", fontSize: 12 }} />
              <Bar dataKey="views" fill="#2D6A4F" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic sources */}
        <div style={{ background: theme.surface, borderRadius: 10, padding: "22px", border: `1px solid ${theme.border}` }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>Traffic Sources</h4>
          {ANALYTICS.referrers.map(r => (
            <div key={r.source} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: theme.text, fontWeight: 500 }}>{r.source}</span>
                <span style={{ color: theme.textMuted, fontWeight: 700 }}>{r.pct}%</span>
              </div>
              <div style={{ background: theme.surfaceAlt, borderRadius: 999, height: 7, overflow: "hidden" }}>
                <div style={{ background: r.color, height: "100%", width: `${r.pct}%`, borderRadius: 999, transition: "width 1s ease" }} />
              </div>
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "12px", background: "#2D6A4F08", borderRadius: 6, border: "1px solid #2D6A4F22", fontSize: 12, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif" }}>
            📈 Core Web Vitals: LCP 1.2s · FID 12ms · CLS 0.02<br />
            ✅ All passing Google thresholds
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SEO Panel ───────────────────────────────────────────────

function SEOPanel({ theme, posts }) {
  const [activePost, setActivePost] = useState(posts[0]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
      <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "16px" }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Select Post</h4>
        {posts.slice(0, 8).map(p => (
          <button key={p.id} onClick={() => setActivePost(p)}
            style={{ width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 7, border: `1px solid ${activePost?.id === p.id ? "#2D6A4F" : "transparent"}`, background: activePost?.id === p.id ? "#2D6A4F08" : "none", cursor: "pointer", marginBottom: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: theme.text, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4, marginBottom: 3 }}>{p.title.slice(0, 50)}…</div>
            <CategoryPill id={p.category} />
          </button>
        ))}
      </div>

      <div>
        {activePost && (
          <>
            {/* SEO Score */}
            <div style={{ background: theme.surface, borderRadius: 10, padding: "22px", border: `1px solid ${theme.border}`, marginBottom: 16, display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "conic-gradient(#2D6A4F 0% 82%, #e5e0d8 82%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: theme.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 20, fontWeight: 800, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif" }}>82</span>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>SEO Score</div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="serif" style={{ fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{activePost.title.slice(0, 60)}…</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {[
                    { label: "Title Tag",        status: "✅", note: "58 chars — good" },
                    { label: "Meta Description", status: "✅", note: "152 chars — good" },
                    { label: "Canonical URL",    status: "✅", note: "Set correctly" },
                    { label: "Open Graph",       status: "✅", note: "Image & title set" },
                    { label: "Schema Markup",    status: "✅", note: "Article JSON-LD" },
                    { label: "Mobile Friendly",  status: "✅", note: "Responsive design" },
                    { label: "Page Speed",       status: "✅", note: "LCP: 1.2s" },
                    { label: "Alt Text",         status: "⚠️", note: "1 image missing" },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                      <span>{item.status}</span>
                      <span style={{ fontWeight: 600, color: theme.text }}>{item.label}:</span>
                      <span style={{ color: theme.textMuted }}>{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SERP Preview */}
            <div style={{ background: theme.surface, borderRadius: 10, padding: "22px", border: `1px solid ${theme.border}`, marginBottom: 16 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Google SERP Preview</h4>
              <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "14px 16px", background: "#fff", maxWidth: 600 }}>
                <div style={{ fontSize: 12, color: "#006621", fontFamily: "Arial, sans-serif" }}>asilva-innovations.com › {activePost.slug}</div>
                <div style={{ fontSize: 18, color: "#1a0dab", fontFamily: "Arial, sans-serif", marginTop: 2, fontWeight: 400 }}>
                  {activePost.title.slice(0, 60)}
                </div>
                <div style={{ fontSize: 13, color: "#545454", fontFamily: "Arial, sans-serif", marginTop: 4, lineHeight: 1.5 }}>
                  {activePost.excerpt.slice(0, 155)}…
                </div>
                <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#f9ab00" }}>★★★★★</span>
                  <span style={{ fontSize: 12, color: "#545454", fontFamily: "Arial, sans-serif" }}>4.9 · Article · {activePost.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Schema JSON-LD */}
            <div style={{ background: theme.surface, borderRadius: 10, padding: "22px", border: `1px solid ${theme.border}` }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Auto-Generated JSON-LD Schema</h4>
              <pre style={{ background: "#0F2318", color: "#74C69D", padding: "16px", borderRadius: 8, fontSize: 11, overflow: "auto", fontFamily: "Monaco, 'Courier New', monospace", lineHeight: 1.6 }}>
{`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${activePost.title.slice(0, 60)}",
  "author": {
    "@type": "Person",
    "name": "A. Silva"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ASilva Innovations"
  },
  "datePublished": "${activePost.publishedAt}",
  "wordCount": ${(activePost.readTime || 6) * 250},
  "articleSection": "${catName(activePost.category)}"
}`}
              </pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Newsletter Admin ─────────────────────────────────────────

function NewsletterAdmin({ theme }) {
  const campaigns = [
    { name: "Weekly Digest #24", date: "Mar 18, 2025", sent: 2714, opens: 68, clicks: 22, status: "sent" },
    { name: "Post-Traumatic Growth Deep Dive", date: "Mar 11, 2025", sent: 2650, opens: 72, clicks: 31, status: "sent" },
    { name: "Monthly Resilience Roundup", date: "Mar 4, 2025", sent: 2580, opens: 65, clicks: 18, status: "sent" },
    { name: "April Growth Sprint", date: "Apr 1, 2025", sent: null, opens: null, clicks: null, status: "scheduled" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Subscribers", value: "2,847", delta: "+127 this month" },
          { label: "Avg. Open Rate",    value: "68.4%",  delta: "+3% vs. industry" },
          { label: "Avg. Click Rate",   value: "22.1%",  delta: "4× industry avg" },
          { label: "Unsubscribes",      value: "0.4%",   delta: "Well below 1% target" },
        ].map(s => (
          <div key={s.label} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "18px" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "22px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h4 style={{ fontSize: 16, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Campaigns</h4>
          <button style={{ background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            + New Campaign
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${theme.border}` }}>
              {["Campaign", "Date", "Sent", "Open Rate", "Click Rate", "Status"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${theme.border}` }}>
                <td style={{ padding: "12px", fontWeight: 600, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{c.name}</td>
                <td style={{ padding: "12px", color: theme.textMuted, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{c.date}</td>
                <td style={{ padding: "12px", color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{c.sent?.toLocaleString() || "—"}</td>
                <td style={{ padding: "12px", fontSize: 13, fontWeight: 700, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif" }}>{c.opens ? `${c.opens}%` : "—"}</td>
                <td style={{ padding: "12px", fontSize: 13, fontWeight: 700, color: "#D4921E", fontFamily: "'DM Sans', sans-serif" }}>{c.clicks ? `${c.clicks}%` : "—"}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ background: c.status === "sent" ? "#E8F5EE" : "#FDF0D5", color: c.status === "sent" ? "#1B4332" : "#9C6B1B", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize" }}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Users Panel ─────────────────────────────────────────────

function UsersPanel({ theme }) {
  const users = [
    { name: "A. Silva",      email: "admin@asilva-innovations.com",  role: "Administrator", posts: 9,  status: "active" },
    { name: "Jordan M.",     email: "jordan@asilva-innovations.com", role: "Editor",        posts: 3,  status: "active" },
    { name: "Sam Rivera",    email: "sam@external.com",             role: "Author",         posts: 2,  status: "active" },
    { name: "Casey T.",      email: "casey@external.com",           role: "Contributor",    posts: 1,  status: "pending" },
  ];

  const roles = [
    { name: "Administrator", desc: "Full access — all settings, all content, all users", color: "#1B4332" },
    { name: "Editor",        desc: "Publish, edit, and delete any post or page",          color: "#2D6A4F" },
    { name: "Author",        desc: "Publish and manage their own posts only",              color: "#40916C" },
    { name: "Contributor",   desc: "Write posts, but require editor approval to publish",  color: "#D4921E" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
      <div>
        <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "22px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Team Members</h4>
            <button style={{ background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 6, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>+ Invite User</button>
          </div>
          {users.map(u => (
            <div key={u.email} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: `1px solid ${theme.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#2D6A4F22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif" }}>
                {u.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: theme.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>{u.name}</div>
                <div style={{ color: theme.textMuted, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{u.email}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "#2D6A4F15", color: "#2D6A4F", fontFamily: "'DM Sans', sans-serif" }}>{u.role}</span>
              <span style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{u.posts} posts</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: u.status === "active" ? "#E8F5EE" : "#FDF0D5", color: u.status === "active" ? "#1B4332" : "#9C6B1B", fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize" }}>{u.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "22px" }}>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>Role Permissions</h4>
        {roles.map(r => (
          <div key={r.name} style={{ padding: "12px 0", borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: r.color, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Panel ──────────────────────────────────────────

function SettingsPanel({ theme }) {
  const [siteName, setSiteName] = useState("ASilva Innovations");
  const [tagline, setTagline] = useState("Systems Thinking for Human Flourishing");
  const [gaId, setGaId] = useState("G-XXXXXXXXXX");
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {[
        {
          title: "General Settings", fields: [
            { label: "Site Name", value: siteName, set: setSiteName, type: "text" },
            { label: "Tagline", value: tagline, set: setTagline, type: "text" },
            { label: "Site URL", value: "https://asilva-innovations.com", set: () => {}, type: "text" },
          ]
        },
        {
          title: "Integrations & Analytics", fields: [
            { label: "Google Analytics 4 ID", value: gaId, set: setGaId, type: "text" },
            { label: "Mailchimp API Key", value: "••••••••••••••••", set: () => {}, type: "password" },
            { label: "Beehiiv Publication ID", value: "", set: () => {}, type: "text", placeholder: "pub_xxxxxxxx" },
          ]
        },
        {
          title: "SEO Defaults", fields: [
            { label: "Default Schema Type", value: "Article", set: () => {}, type: "select", options: ["Article", "BlogPosting", "WebPage"] },
            { label: "Twitter/X Handle", value: "@ASilvaInnovates", set: () => {}, type: "text" },
            { label: "Default OG Image", value: "https://…/og-default.jpg", set: () => {}, type: "text" },
          ]
        },
        {
          title: "Performance & Security", content: [
            { label: "SSL / HTTPS", status: "✅ Active", note: "Certificate valid until Dec 2025" },
            { label: "Caching", status: "✅ Enabled", note: "Static assets cached for 30 days" },
            { label: "Image Optimization", status: "✅ Active", note: "Auto-WebP conversion enabled" },
            { label: "XML Sitemap", status: "✅ Auto-updating", note: "Last updated: today" },
            { label: "Robots.txt", status: "✅ Configured", note: "Custom rules active" },
            { label: "CDN", status: "✅ Active", note: "Global edge delivery" },
          ]
        },
      ].map(section => (
        <div key={section.title} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 10, padding: "22px" }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 16, fontFamily: "'DM Sans', sans-serif", paddingBottom: 10, borderBottom: `2px solid #2D6A4F` }}>
            {section.title}
          </h4>
          {section.fields?.map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif", display: "block", marginBottom: 5 }}>{f.label}</label>
              {f.type === "select" ? (
                <select style={{ width: "100%", padding: "8px 10px", border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.bg, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                  {f.options?.map(o => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder || ""}
                  style={{ width: "100%", padding: "8px 10px", border: `1px solid ${theme.border}`, borderRadius: 6, background: theme.bg, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
              )}
            </div>
          ))}
          {section.content?.map(item => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: `1px solid ${theme.border}` }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: theme.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{item.note}</div>
              </div>
              <span style={{ fontSize: 12, color: "#2D6A4F", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", marginLeft: 12 }}>{item.status}</span>
            </div>
          ))}
          {section.fields && (
            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
              style={{ marginTop: 12, background: "#2D6A4F", color: "#fff", border: "none", borderRadius: 6, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
              {saved ? "✓ Saved!" : "Save Settings"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView]           = useState("home");
  const [selectedPost, setPost]   = useState(null);
  const [darkMode, setDarkMode]   = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [searchQuery, setSearch]  = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Google Fonts loader
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap";
    document.head.appendChild(link);
    return () => { try { document.head.removeChild(link); } catch(e) {} };
  }, []);

  const theme = {
    bg:         darkMode ? "#0C1A12" : "#F9F5EE",
    surface:    darkMode ? "#142018" : "#FFFFFF",
    surfaceAlt: darkMode ? "#1A2E20" : "#F3EFE8",
    text:       darkMode ? "#E8E4DC" : "#1C1C1E",
    textMuted:  darkMode ? "#7FA88A" : "#6B6B7B",
    border:     darkMode ? "#1F3525" : "#E5E0D8",
    headerBg:   "#1B3A2D",
  };

  const openArticle = (post) => { setPost(post); setView("article"); window.scrollTo(0, 0); };
  const goHome      = ()     => { setView("home"); setPost(null); window.scrollTo(0, 0); };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: `${fontScale}rem`, minHeight: "100vh", background: theme.bg, color: theme.text, transition: "background .3s, color .3s" }}>
      <style>{GLOBAL_CSS}</style>

      {view === "home" && (
        <BlogPage
          theme={theme} darkMode={darkMode} setDarkMode={setDarkMode}
          fontScale={fontScale} setFontScale={setFontScale}
          searchQuery={searchQuery} setSearchQuery={setSearch}
          showSearch={showSearch} setShowSearch={setShowSearch}
          setView={setView} openArticle={openArticle}
          email={email} setEmail={setEmail}
          subscribed={subscribed} setSubscribed={setSubscribed}
        />
      )}

      {view === "article" && selectedPost && (
        <ArticlePage
          post={selectedPost} theme={theme}
          darkMode={darkMode} setDarkMode={setDarkMode}
          fontScale={fontScale} setFontScale={setFontScale}
          goHome={goHome} setView={setView} allPosts={POSTS}
          openArticle={openArticle}
        />
      )}

      {view === "admin" && (
        <AdminPage theme={theme} setView={setView} darkMode={darkMode} setDarkMode={setDarkMode} />
      )}
    </div>
  );
}
