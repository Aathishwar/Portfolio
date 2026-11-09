# Portfolio v2 — plan (Nov 2026)

## Goal
Replace the 2025 portfolio at aathi.online with current content and a faster, more interactive UI, then move hosting from GitHub Pages to Cloudflare Pages.

## Decisions (from the owner)
- Look: direction A (dark, precise, terminal) in dark mode; warm-paper palette from direction B in light mode; theme toggle.
- Current role shown as "Technology & Security Lead · IT services & AI solutions firm". No employer or client names.
- Coventus: Software Developer Intern (Aug–Oct 2025), AIML Engineer Intern (Oct 2025 – Sep 2026).
- No photo for now.
- Phone number must not appear anywhere a hover or the page source would show it plainly.
- Reveal animations in the spirit of jld2nd.dev, but original: decrypting headings, redaction-wipe text, pixel-dissolve cards, scroll rail.
- Click effect brought back, built so it costs nothing when idle.
- A Bruno Simon–style 3D site is a separate, later project.

## Tasks
1. Back up v1, strip unused code and dependencies (vly toolbar, shadcn kit, three.js, faker, hono, router) → `npm run build` passes.
2. Content in one typed file `src/data/profile.ts` → every section reads from it.
3. Theme tokens (dark/light), self-hosted fonts, no-flash theme script → toggle works, no flash on reload.
4. Reveal system (one shared IntersectionObserver, CSS transforms only, off under reduced motion) → no long tasks while scrolling.
5. Sections: hero (pixel padlock), capabilities, experience, work (filterable), stack, credentials, contact (EmailJS + honeypot), footer.
6. Click sparks on one canvas, animation loop sleeps when idle.
7. SEO + Cloudflare Pages files: meta, JSON-LD, robots, sitemap, `_headers` (CSP and security headers), static 404.
8. Audit: lint, type check, build, web-design-guidelines review, checklist.py.
9. Deploy to Cloudflare Pages (owner confirms account and method first).
