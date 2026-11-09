import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { type Plugin, defineConfig } from "vite";
import { SITE_URL } from "./site.config";

/** Fills __SITE_URL__ in index.html and emits robots.txt + sitemap.xml for the configured domain. */
function siteUrl(): Plugin {
  const today = new Date().toISOString().slice(0, 10);
  return {
    name: "site-url",
    transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", SITE_URL),
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>\n`,
      });
    },
  };
}

/** Preloads the Latin woff2 files the hero renders with, so the headline font isn't discovered late. */
function preloadFonts(patterns: RegExp[]): Plugin {
  return {
    name: "preload-fonts",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler: (_html, ctx) =>
        Object.keys(ctx.bundle ?? {})
          .filter((file) => patterns.some((p) => p.test(file)))
          .map((file) => ({
            tag: "link",
            attrs: { rel: "preload", href: `/${file}`, as: "font", type: "font/woff2", crossorigin: "" },
            injectTo: "head" as const,
          })),
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(),
    siteUrl(),
    preloadFonts([/space-grotesk-latin-wght-normal-[\w-]+\.woff2$/, /inter-latin-wght-normal-[\w-]+\.woff2$/]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
  },
});
