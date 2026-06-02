# AGENTS.md — Re:Bumi Landing Page

## Project Overview

A premium B2B export landing page for Re:Bumi Recycled Sandals by Pijak Bumi. Targets wholesale buyers, importers, and distributors in Germany and the Netherlands. Built with TanStack Start, Tailwind CSS v4, and Framer Motion.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Forms | Netlify Forms |
| Fonts | Google Fonts (Playfair Display + Inter) |
| Language | TypeScript 5 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx        # HTML shell, SEO meta tags, Google Fonts link tags
    index.tsx         # Entire landing page — all section components
  components/
    animations.tsx    # Framer Motion helpers: FadeInWhenVisible, AnimatedCounter, variants
  styles.css          # Tailwind + CSS variables + utility classes
public/
  wholesale-inquiry.html  # Static Netlify Forms skeleton (required for form detection)
```

## Key Architecture Decisions

- **Single-file page**: All sections live in `src/routes/index.tsx` since this is a one-page marketing site with scroll-based navigation — no client-side routing needed.
- **Netlify Forms static skeleton**: TanStack Start renders React on the client, so Netlify cannot detect forms at build time. `public/wholesale-inquiry.html` mirrors all form fields. Netlify scans `public/` at build time and registers the `wholesale-inquiry` form.
- **Form fetch target**: The `fetch()` in `ContactSection` posts to `/wholesale-inquiry.html` (not `/`) to bypass the SSR catch-all and reach Netlify's form middleware.
- **CSS variables for brand colors**: Declared in `styles.css` for easy global updates.

## Color System

| Variable | Value | Usage |
|---|---|---|
| `--color-primary` | `#1F4D3A` | Forest green — hero, CTAs, headings |
| `--color-secondary` | `#D9C7A2` | Warm sand — accents, highlights |
| `--color-bg` | `#F8F7F4` | Off-white ivory — page background |
| `--color-text` | `#1A1A1A` | Near-black — body text |
| `--color-text-muted` | `#5a5a5a` | Gray — secondary text |

## Page Sections (in order)

1. `AnnouncementBar` — sticky top bar with CTA
2. `Navigation` — sticky nav with smooth scroll + hamburger mobile menu
3. `Hero` — full-screen parallax hero with stats
4. `TrustSection` — partner/certification logos
5. `AboutSection` — brand story + product specs summary
6. `SustainabilitySection` — circular economy flow + impact cards
7. `ProductSection` — product showcase with variant selector + spec table
8. `WhySection` — six benefit cards
9. `ComparisonSection` — Re:Bumi vs Allbirds vs Veja table
10. `WholesaleBenefitsSection` — retail advantage cards
11. `ProcessSection` — 6-step horizontal timeline
12. `ExportSection` — world map with animated pins
13. `TestimonialsSection` — carousel with animated transitions
14. `FAQSection` — accordion
15. `ContactSection` — Netlify Forms with 3 CTA actions
16. `Footer` — links, legal
17. `WhatsAppFloat` — fixed bottom-right WhatsApp button

## Coding Conventions

- Tailwind CSS v4 syntax (`@import "tailwindcss"` — no config file)
- Inline SVG icons to keep bundle lean
- `btn-ripple` CSS class adds click ripple via pseudo-element
- `section-padding` utility class for consistent vertical rhythm
- `encode()` utility serializes form data to `application/x-www-form-urlencoded`
- All section IDs match nav `href` anchors: `#product`, `#sustainability`, `#wholesale`, `#export`, `#faq`, `#contact`

## Development Commands

```bash
npm run dev    # Start dev server at localhost:3000
npm run build  # Production build
```
