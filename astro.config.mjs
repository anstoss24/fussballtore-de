// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fussballtore.de',
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
