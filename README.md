# ASilva Innovations Blog Platform

> **Transforming Systems, Empowering Resilience** — A sophisticated thought leadership blog for ASilva Innovations, built with React + Vite, deployed on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/asilvainnovations/deploys)
[![CI/CD](https://github.com/asilvainnovations/blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/asilvainnovations/blog/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Deployment (Netlify)](#deployment-netlify)
8. [GitHub Actions CI/CD](#github-actions-cicd)
9. [Content Pillars](#content-pillars)
10. [SEO Configuration](#seo-configuration)
11. [Contributing](#contributing)

---

## Overview

A production-ready blog platform and CMS for ASilva Innovations, featuring:

- 📰 **Public Blog** — Magazine-style layout with rotating hero, article grid, filters, and full-text search
- 🔧 **Admin Dashboard** — Article management, comment moderation, user management, subscriber tracking, and analytics
- ✍️ **Rich Editor** — Block-based editor with auto-save, version history, preview mode, and scheduled publishing
- 📋 **Draft Management** — Full lifecycle management for unpublished content

---

## Features

### Blog (Public)
- ✅ Rotating hero section with featured articles (5s cycle)
- ✅ Reading progress indicator
- ✅ Magazine-style grid layout (1 featured + responsive 3-col grid)
- ✅ Category filters (5 content pillars) + real-time text search
- ✅ Article modal with related articles (AI-powered recommendations)
- ✅ Newsletter signup modal (triggered at 8s)
- ✅ Smooth hover micro-interactions and staggered animations

### Admin Dashboard
- ✅ Role-based access (Admin, Editor, Author, Contributor)
- ✅ Article management with status filtering and bulk actions
- ✅ Comment moderation (approve / reject / spam)
- ✅ User management with role assignment
- ✅ Newsletter subscriber list with CSV export
- ✅ Analytics: page view charts, subscriber growth, traffic sources, Core Web Vitals

### Editor
- ✅ 10+ insertable content blocks
- ✅ Auto-save every 30 seconds + save on page unload
- ✅ Version history with restore capability
- ✅ Live preview mode
- ✅ Scheduled publishing with timezone support
- ✅ SEO preview panel + auto Table of Contents
- ✅ Word count, read time estimation

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router v6 |
| State | Zustand (with localStorage persistence) |
| Styling | CSS-in-JS + CSS Variables design tokens |
| Fonts | Poppins (UI) + Lora (editorial body) |
| Testing | Vitest + Testing Library |
| Linting | ESLint 9 + Prettier |
| CI/CD | GitHub Actions |
| Hosting | Netlify |
| Functions | Netlify Functions (Node.js) |
| Performance | Lighthouse CI (score ≥ 85) |
| SEO | JSON-LD schemas, OG tags, automated sitemap |

---

## Project Structure

```
asilva-blog/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # CI/CD pipeline
│   └── PULL_REQUEST_TEMPLATE.md
├── netlify/
│   └── functions/
│       ├── newsletter-subscribe.js   # ESP integration
│       └── search.js                 # Full-text search API
├── public/
│   ├── robots.txt
│   ├── sitemap.xml             # Auto-generated
│   └── site.webmanifest        # PWA manifest
├── scripts/
│   └── generate-sitemap.mjs    # Sitemap generator
├── src/
│   ├── components/             # Reusable UI components
│   ├── data/
│   │   ├── config.js           # Categories, authors, site config
│   │   └── store.js            # Zustand global state
│   ├── hooks/
│   │   └── index.js            # Custom React hooks
│   ├── styles/
│   │   └── global.css          # Design tokens + global styles
│   ├── test/
│   │   ├── setup.js
│   │   └── utils.test.js
│   ├── utils/
│   │   ├── index.js            # Shared utilities
│   │   └── webVitals.js
│   ├── App.jsx                 # Main application
│   └── main.jsx                # Entry point
├── .env.example                # Environment variable template
├── .eslintrc.js
├── .gitignore
├── .lighthouserc.json
├── .prettierrc
├── index.html
├── netlify.toml                # Netlify configuration
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### Installation

```bash
# 1. Clone the repository
git clone [(https://github.com/asilvainnovations/articles.git)
cd blog

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start development server
npm run dev
# → http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run test         # Run tests (watch mode)
npm run test:ui      # Run tests with Vitest UI
npm run test:coverage  # Generate coverage report
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Key variables:

| Variable | Description | Required |
|---|---|---|
| `VITE_GA_ID` | Google Analytics 4 Measurement ID | No |
| `MAILCHIMP_API_KEY` | Mailchimp API key for newsletter | If using Mailchimp |
| `CONVERTKIT_API_KEY` | ConvertKit API key | If using ConvertKit |
| `RESEND_API_KEY` | Resend API key | If using Resend |
| `VITE_ALGOLIA_APP_ID` | Algolia app ID for search | If using Algolia |

See `.env.example` for the full list.

---

## Deployment (Netlify)

### Option A: Netlify CLI (Recommended for first deploy)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod --dir=dist
```

### Option B: Connect GitHub repo via Netlify UI

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import from Git**
2. Select your GitHub repository
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `20`
4. Add environment variables under **Site settings → Environment variables**
5. Click **Deploy**

### Option C: GitHub Actions (auto-deploys on push to `main`)

Set these **GitHub repository secrets** (`Settings → Secrets → Actions`):

| Secret | Where to find it |
|---|---|
| `NETLIFY_AUTH_TOKEN` | Netlify → User settings → Personal access tokens |
| `NETLIFY_SITE_ID` | Netlify → Site settings → General → Site ID |
| `VITE_GA_ID` | Google Analytics → Admin → Data Streams |

Pushes to `main` will automatically deploy to production. PRs get deploy previews.

---

## GitHub Actions CI/CD

The pipeline in `.github/workflows/deploy.yml` runs:

| Job | Trigger | What it does |
|---|---|---|
| `lint` | All pushes/PRs | ESLint + Prettier format check |
| `test` | After lint | Vitest tests + coverage upload |
| `build` | After tests | `npm run build` + artifact upload |
| `lighthouse` | PRs only | Lighthouse CI audit (perf, a11y, SEO) |
| `deploy-production` | Push to `main` | Deploys to asilvainnovations.com |
| `deploy-preview` | PRs | Deploys preview URL, comments on PR |

---

## Content Pillars

| Pillar | Color | Focus |
|---|---|---|
| 🔄 Systems Thinking | Electric Blue `#2563EB` | Organizational architecture, feedback loops, complexity |
| 🛡️ Integrated Risk Management | Warm Amber `#D97706` | ERM, predictive risk, climate risk |
| 🌱 Resilience | Forest Green `#16A34A` | Adaptive capacity, supply chain, antifragility |
| 🤖 AI & Analytics | Soft Coral `#DC2626` | Strategic AI deployment, governance, analytics |
| ⚡ Real-Time Leadership | Calming Blue `#0891B2` | Neuroscience, crisis leadership, distributed teams |

---

## SEO Configuration

The platform includes:

- **Automated XML sitemap** — run `node scripts/generate-sitemap.mjs` or integrate into CI
- **JSON-LD schemas** — Organization, Blog, Article, BreadcrumbList
- **Open Graph + Twitter Card** meta tags on every page
- **Canonical URLs** — prevents duplicate content issues
- **robots.txt** — configured for major crawlers
- **Core Web Vitals monitoring** — tracked via Lighthouse CI and GA4

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m 'feat: add your feature'`
4. Push to branch: `git push origin feature/your-feature-name`
5. Open a Pull Request using the provided template

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add scheduled publishing with timezone support
fix: correct reading progress bar on mobile
docs: update deployment instructions
style: fix button hover states
refactor: extract article card into component
test: add utility function tests
chore: bump vite to 5.4.10
```

---

## License

MIT © [ASilva Innovations](https://asilvainnovations.com)
