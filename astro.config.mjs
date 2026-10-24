// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Adresse provisoire Netlify (voir A_COMPLETER.md)
  site: 'https://portfolio-jsb.netlify.app',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  // Pas de CSS inline : la CSP n'autorise que style-src 'self'
  build: { inlineStylesheets: 'never' },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-CA', en: 'en-CA' } },
      filter: (page) => !/\/(merci|thanks)\/?$/.test(page),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
