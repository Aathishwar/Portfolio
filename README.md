# Aathishwar V — portfolio

Personal site of Aathishwar V, AI & Security Engineer in Coimbatore, India.

React 19 · TypeScript · Tailwind CSS 4 · Vite · hosted on Cloudflare Pages.

## Features

- Dark and light themes with a circular wipe between them; the saved theme loads before first paint.
- Reveal animations built on one shared `IntersectionObserver`: decrypting headings, redaction-wipe text and pixel-dissolve cards. All of them switch off under `prefers-reduced-motion`.
- Click sparks drawn on a single canvas whose animation loop sleeps when idle.
- An interactive pixel padlock in the hero, a filterable project list, a scroll-progress rail and an EmailJS contact form with a honeypot.
- Strict Content-Security-Policy and security headers (`frontend/public/_headers`), self-hosted fonts, and a static 404 page.

## Editing content

All text lives in [`frontend/src/data/profile.ts`](frontend/src/data/profile.ts): roles, projects, stack, certifications and links.
The public URL lives in [`frontend/site.config.ts`](frontend/site.config.ts). The build uses it for the canonical link, Open Graph tags, `robots.txt` and `sitemap.xml`.

## Develop

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
npm run build      # type check + production build into frontend/dist
npm run lint
```

## Deploy (Cloudflare Pages)

| Setting | Value |
|---|---|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Output directory | `dist` |

## Contact

[LinkedIn](https://www.linkedin.com/in/aathishwar-v/) · [GitHub](https://github.com/Aathishwar) · aathishwar885@gmail.com
