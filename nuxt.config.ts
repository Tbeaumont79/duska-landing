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

  sitemap: {
    // Sous un sous-chemin Pages, le crawler prérend la home DEUX fois : en '/' et en
    // '/<baseURL>/' (les self-links sont préfixés par le baseURL et suivis comme route à
    // part entière). @nuxtjs/sitemap émet alors une entrée parasite dont le chemin est le
    // baseURL répété (ex. '/duska-landing/duska-landing') → 404. L'`exclude` matche le chemin
    // <loc> (baseURL déjà appliqué), donc on exclut précisément ce doublon. À la racine
    // (duska.app, baseURL '/') le doublon n'existe pas → liste vide, aucun effet de bord. THI-89.
    exclude: baseURL !== '/' ? [`${baseURL.replace(/\/$/, '')}${baseURL.replace(/\/$/, '')}`] : [],
  },

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
