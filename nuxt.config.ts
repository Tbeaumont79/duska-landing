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
      // URL de la fiche Play Store, renseignée à la publication (WS-D, action fondateur).
      // Tant qu'elle est vide, les CTA store rendent l'état « bientôt disponible ».
      // Go-live = définir NUXT_PUBLIC_PLAY_STORE_URL au build. L'applicationId Android est
      // verrouillé `app.duska.app` (THI-64) → l'URL est déterministe dès maintenant :
      //   https://play.google.com/store/apps/details?id=app.duska.app
      // Aucune modif de code requise (var CI `NUXT_PUBLIC_PLAY_STORE_URL`, cf deploy.yml).
      // Voir composables/useStoreLinks.ts (THI-107 / THI-100).
      playStoreUrl: process.env.NUXT_PUBLIC_PLAY_STORE_URL || '',
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
    // Le module @nuxtjs/robots REFUSE de générer un robots.txt sous un baseURL (sous-chemin
    // Pages projet) → on laisse le module gérer le cas racine (duska.app), et sous sous-chemin
    // on sert un robots.txt STATIQUE depuis public/ (répond 200, déclare le sitemap). Voir THI-86.
    robotsTxt: baseURL === '/',
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
