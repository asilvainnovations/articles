/**
 * ASilva Innovations Blog — Mock Data & Seed Store
 *
 * In production, replace these with API calls to your CMS or backend.
 * All data is structured to match a standard headless CMS schema.
 */

export const CATEGORIES = [
  {
    id: "systems",
    label: "Systems Thinking",
    slug: "systems-thinking",
    color: "#2563EB",
    bg: "#EFF6FF",
    description: "Exploring interconnected organizational architectures and feedback loops that drive complex outcomes.",
    icon: "🔄",
    articleCount: 4,
  },
  {
    id: "risk",
    label: "Integrated Risk Management",
    slug: "integrated-risk-management",
    color: "#D97706",
    bg: "#FFFBEB",
    description: "Next-generation frameworks for quantifying, predicting, and managing enterprise risk in real time.",
    icon: "🛡️",
    articleCount: 3,
  },
  {
    id: "resilience",
    label: "Resilience",
    slug: "resilience",
    color: "#16A34A",
    bg: "#F0FDF4",
    description: "Building organizations that don't just recover from disruption — they emerge stronger.",
    icon: "🌱",
    articleCount: 3,
  },
  {
    id: "ai",
    label: "AI & Analytics",
    slug: "ai-analytics-strategic-management",
    color: "#DC2626",
    bg: "#FFF1F2",
    description: "Rigorous frameworks for deploying AI and analytics to power strategic decision-making.",
    icon: "🤖",
    articleCount: 3,
  },
  {
    id: "leadership",
    label: "Real-Time Leadership",
    slug: "real-time-leadership",
    color: "#0891B2",
    bg: "#ECFEFF",
    description: "Neuroscience-backed strategies for leaders navigating high-velocity, high-stakes environments.",
    icon: "⚡",
    articleCount: 3,
  },
];

export const AUTHORS = [
  {
    id: 1,
    name: "Alexandra Silva",
    slug: "alexandra-silva",
    email: "alex@asilvainnovations.com",
    role: "admin",
    title: "Founder & Principal Strategist",
    bio: "Alexandra brings 20+ years of experience in systems transformation for Fortune 500 companies. She holds an MBA from Wharton and a Systems Engineering degree from MIT.",
    avatar: "AS",
    avatarColor: "#0F4C81",
    twitter: "@alexandra_silva",
    linkedin: "alexandra-silva-innovations",
    articles: 24,
    joined: "2023-01-15",
    expertise: ["Systems Thinking", "AI Strategy", "Analytics Governance"],
  },
  {
    id: 2,
    name: "Marcus Chen",
    slug: "marcus-chen",
    email: "m.chen@asilvainnovations.com",
    role: "editor",
    title: "Senior Risk Strategist",
    bio: "Marcus specializes in enterprise risk management and has led ERM transformations at 12 global financial institutions.",
    avatar: "MC",
    avatarColor: "#D97706",
    articles: 18,
    joined: "2023-03-22",
    expertise: ["Integrated Risk Management", "Climate Risk", "ERM"],
  },
  {
    id: 3,
    name: "Priya Nair",
    slug: "priya-nair",
    email: "p.nair@asilvainnovations.com",
    role: "author",
    title: "Resilience & Operations Lead",
    bio: "Priya focuses on building adaptive organizational capacity, with deep expertise in supply chain resilience and crisis management.",
    avatar: "PN",
    avatarColor: "#16A34A",
    articles: 12,
    joined: "2023-06-10",
    expertise: ["Resilience Engineering", "Supply Chain", "Operations"],
  },
  {
    id: 4,
    name: "Jordan Blake",
    slug: "jordan-blake",
    email: "j.blake@asilvainnovations.com",
    role: "contributor",
    title: "Leadership Development Specialist",
    bio: "Jordan designs and delivers real-time leadership programs for executive teams, drawing on neuroscience and behavioral economics.",
    avatar: "JB",
    avatarColor: "#0891B2",
    articles: 5,
    joined: "2024-01-05",
    expertise: ["Real-Time Leadership", "Neuroscience", "Executive Coaching"],
  },
  {
    id: 5,
    name: "Sofia Mendez",
    slug: "sofia-mendez",
    email: "s.mendez@asilvainnovations.com",
    role: "author",
    title: "Complex Systems Researcher",
    bio: "Sofia applies complexity science and systems dynamics to organizational design challenges, with a focus on emergent behavior.",
    avatar: "SM",
    avatarColor: "#7C3AED",
    articles: 9,
    joined: "2023-09-14",
    expertise: ["Complex Systems", "Systems Dynamics", "Emergence"],
  },
];

export const SITE_CONFIG = {
  name: "ASilva Innovations",
  tagline: "Transforming Systems, Empowering Resilience",
  url: "https://asilvainnovations.com",
  logo: "https://asilvainnovations.com/assets/apps/user_1097/app_13212/draft/icon/app_logo.png?1769949231",
  description: "Expert insights at the intersection of systems thinking, integrated risk management, AI analytics, and real-time leadership.",
  social: {
    twitter: "https://twitter.com/asilvainnovations",
    linkedin: "https://linkedin.com/company/asilvainnovations",
    youtube: "https://youtube.com/@asilvainnovations",
  },
  newsletter: {
    headline: "Stay Ahead of the Curve",
    subheadline: "Join 480+ leaders receiving weekly insights on systems thinking, risk management, and AI strategy.",
    placeholder: "Your professional email address",
    cta: "Subscribe — It's Free",
    disclaimer: "No spam, ever. Unsubscribe anytime.",
  },
  analytics: {
    googleAnalyticsId: import.meta?.env?.VITE_GA_ID || "",
  },
};

/**
 * Utility: Get category by ID
 */
export const getCategoryById = (id) =>
  CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];

/**
 * Utility: Get author by ID
 */
export const getAuthorById = (id) =>
  AUTHORS.find((a) => a.id === id) || AUTHORS[0];

/**
 * Utility: Format large numbers (14200 → "14.2k")
 */
export const formatNumber = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

/**
 * Utility: Estimate read time from word count
 */
export const estimateReadTime = (text = "") =>
  Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 200));

/**
 * Utility: Generate slug from title
 */
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
