// https://nuxt.com/docs/api/configuration/nuxt-config
// Origine (protocole + domaine, sans chemin) et baseURL séparés : permet un hébergement
// soit à la racine d'un domaine (duska.app), soit sous un sous-chemin (GitHub Pages projet)
// sans dupliquer le préfixe dans le sitemap / canonical.
const siteOrigin = (process.env.NUXT_PUBLIC_SITE_ORIGIN || 'https://duska.app').replace(/\/$/, '')
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
// URL canonique publique complète (sans slash final).
const siteUrl = `${siteOrigin}${baseURL}`.replace(/\/$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  // Pre-render everything to static HTML for SEO + perf (SSG).
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      // '/' et '/blog' comme points d'entrée ; crawlLinks découvre chaque article
      // via les liens du listing et du maillage interne.
      routes: ['/', '/blog'],
    },
  },

  // L'origine seule ; le chemin vient de app.baseURL → pas de doublon dans le sitemap.
  site: {
    url: siteOrigin,
    name: 'Duska',
  },

  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  modules: ['@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots'],

  fonts: {
    // Self-hosted at build time → no external request, better LCP/CLS.
    families: [
      { name: 'Quicksand', provider: 'google', weights: [500, 600, 700] },
      { name: 'Nunito', provider: 'google', weights: [400, 600, 700] },
    ],
  },

  robots: {
    allow: '/',
    sitemap: `${siteUrl}/sitemap.xml`,
    // Le module refuse de générer robots.txt sous un sous-chemin (base URL) — par design,
    // car robots.txt doit vivre à la racine du host. À la racine d'un domaine (duska.app) il
    // génère le fichier ; sous le sous-chemin Pages, on sert un robots.txt statique
    // (public/robots.txt), copié tel quel et qui répond 200 (critère de vérif publique THI-85).
    robotsTxt: baseURL === '/',
  },

  sitemap: {
    // L'URL canonique absolue (origine + baseURL) est captée par le crawler du module puis
    // re-préfixée par baseURL → entrée fantôme `${baseURL}duska-landing` (404). On l'exclut
    // pour garder un sitemap propre, sans URL morte.
    exclude: [`${baseURL.replace(/\/$/, '')}/duska-landing`],
  },

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#7C6FC9' },
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
      ],
    },
  },

  experimental: {
    // Lighter hydration payload for a mostly-static page.
    payloadExtraction: false,
  },

  devtools: { enabled: false },
})
