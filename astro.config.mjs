// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fussballtore.de',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Produkt- und Torberater-Bilder aus dem anstoss24-Shop werden beim Build zu WebP optimiert (src/utils/shop-image.ts)
  image: { domains: ['cdn02.plentyone.com'] },
  integrations: [
    tailwind(),
    sitemap({
      i18n: { defaultLocale: 'de', locales: { de: 'de-DE' } },
      filter: (page) =>
        ![
          'https://fussballtore.de/datenschutz/',
          'https://fussballtore.de/impressum/',
          'https://fussballtore.de/404/',
        ].includes(page),
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
