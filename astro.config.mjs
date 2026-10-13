// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import pageDates from './src/data/page-dates.json' with { type: 'json' };

export default defineConfig({
  site: 'https://fussballtore.de',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Produkt- und Torberater-Bilder aus dem anstoss24-Shop: scripts/fetch-shop-images.mjs (prebuild) → public/shop-bilder/
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        ![
          'https://fussballtore.de/datenschutz/',
          'https://fussballtore.de/impressum/',
          'https://fussballtore.de/404/',
        ].includes(page),
      // lastmod = letzte inhaltliche Änderung der Seite (src/data/page-dates.json), nicht der Build-Zeitpunkt
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/\//g, '') || 'index';
        const date = pageDates[slug];
        if (date) item.lastmod = date;
        return item;
      },
    }),
  ],
});
