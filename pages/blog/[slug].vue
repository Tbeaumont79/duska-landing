<script setup lang="ts">
import { articles, getArticle } from '~/data/articles'

const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://duska.app'
const base = config.app.baseURL || '/'

// CTA store sur l'article (THI-107) : « Télécharger Duska » avec UTM utm_source=blog,
// dès que le Play Store est publié (NUXT_PUBLIC_PLAY_STORE_URL défini).
const { isPlayStoreAvailable, playStoreLink } = useStoreLinks()
const blogPlayUrl = computed(() =>
  playStoreLink({ source: 'blog', medium: 'cta', campaign: 'launch' }),
)

const slug = String(route.params.slug)
const article = getArticle(slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article introuvable', fatal: true })
}

const a = article!
const url = `${siteUrl}/blog/${a.slug}`
const ogImage = `${siteUrl}/og-image.png`

// Liens internes du corps : on applique la baseURL pour rester correct sous un sous-chemin.
const bodyHtml = a.bodyHtml.replace(/href="\//g, `href="${base}`)

// Articles connexes (maillage interne).
const related = a.related
  .map((s) => getArticle(s))
  .filter((x): x is NonNullable<typeof x> => Boolean(x))

const dateLabel = new Date(a.datePublished).toLocaleDateString('fr-FR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

useSeoMeta({
  title: `${a.title} | Duska`,
  description: a.description,
  ogTitle: a.title,
  ogDescription: a.description,
  ogType: 'article',
  ogUrl: url,
  ogImage,
  ogImageAlt: a.title,
  ogSiteName: 'Duska',
  ogLocale: 'fr_FR',
  articlePublishedTime: a.datePublished,
  articleModifiedTime: a.dateModified || a.datePublished,
  twitterCard: 'summary_large_image',
  twitterTitle: a.title,
  twitterDescription: a.description,
  twitterImage: ogImage,
})

// JSON-LD Article.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.description,
  inLanguage: 'fr-FR',
  datePublished: a.datePublished,
  dateModified: a.dateModified || a.datePublished,
  image: ogImage,
  author: { '@type': 'Organization', name: 'Duska', url: siteUrl },
  publisher: { '@type': 'Organization', name: 'Duska', url: siteUrl },
  mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  keywords: [a.keyword, ...a.keywordsSecondary].join(', '),
}

useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
})
</script>

<template>
  <div>
    <BlogHeader />
    <main>
      <article class="container art-wrap">
        <nav class="crumbs" aria-label="Fil d'Ariane">
          <NuxtLink to="/blog">← Tous les articles</NuxtLink>
        </nav>

        <header class="art-head">
          <span class="badge" :class="`mood-${a.mood}`">{{ a.moodLabel }}</span>
          <h1>{{ a.title }}</h1>
          <p class="art-meta">
            <time :datetime="a.datePublished">{{ dateLabel }}</time>
            · {{ a.readingTime }} min de lecture
          </p>
        </header>

        <!-- Contenu first-party de confiance ; liens internes base-aware. -->
        <div class="prose" v-html="bodyHtml" />

        <!-- CTA install (maillage vers la landing) -->
        <aside class="art-cta">
          <h2>Envie d'un moment Duska chaque jour ?</h2>
          <p>Choisis ton humeur, reçois l'affirmation qui te ressemble, entretiens ta série.</p>
          <!-- Play Store publié : lien direct « Télécharger Duska » + UTM utm_source=blog -->
          <a
            v-if="isPlayStoreAvailable"
            :href="blogPlayUrl"
            class="btn btn-primary"
            target="_blank"
            rel="noopener"
          >Télécharger Duska</a>
          <!-- Sinon : maillage interne vers la landing -->
          <NuxtLink v-else to="/#telecharger" class="btn btn-primary">Installer l'app</NuxtLink>
          <p class="cta-note">
            Découvre aussi <NuxtLink to="/">la présentation de Duska</NuxtLink>.
          </p>
        </aside>

        <!-- Articles connexes -->
        <section v-if="related.length" class="related" aria-label="À lire aussi">
          <h2>À lire aussi</h2>
          <ul>
            <li v-for="r in related" :key="r.slug">
              <NuxtLink :to="`/blog/${r.slug}`" class="card rel" :class="`mood-${r.mood}`">
                <span class="rel-badge">{{ r.moodLabel }}</span>
                <strong>{{ r.title }}</strong>
                <span class="rel-go">Lire →</span>
              </NuxtLink>
            </li>
          </ul>
        </section>
      </article>
    </main>
    <BlogFooter />
  </div>
</template>

<style scoped>
.art-wrap { max-width: 760px; padding-block: clamp(28px, 5vw, 56px); }
.crumbs {
  font-family: var(--font-head); font-weight: 600; font-size: 0.92rem; margin-bottom: 18px;
}
.crumbs a { text-decoration: none; color: var(--c-primary-strong); }

.art-head { margin-bottom: 28px; }
.badge {
  display: inline-block;
  font-family: var(--font-head); font-weight: 700; font-size: 0.72rem;
  letter-spacing: 0.06em; text-transform: uppercase; color: var(--c-ink);
  background: var(--c-primary-soft); padding: 5px 13px; border-radius: 999px; margin-bottom: 16px;
}
.art-head h1 { font-size: clamp(1.8rem, 4.6vw, 2.6rem); }
.art-meta { color: var(--c-ink-mute); font-size: 0.95rem; font-family: var(--font-head); }

.prose :deep(h2) {
  font-size: clamp(1.3rem, 3vw, 1.6rem); margin-top: 1.8em; margin-bottom: 0.5em;
}
.prose :deep(p) { font-size: 1.06rem; color: var(--c-ink-soft); }
.prose :deep(ul), .prose :deep(ol) { padding-left: 1.3em; margin: 0 0 1.2rem; }
.prose :deep(li) { color: var(--c-ink-soft); margin-bottom: 0.4em; line-height: 1.6; }
.prose :deep(a) {
  color: var(--c-primary-strong); text-decoration: underline;
  text-decoration-color: #d7cef3; text-underline-offset: 3px;
}
.prose :deep(a):hover { text-decoration-color: var(--c-primary-strong); }
.prose :deep(strong) { color: var(--c-ink); }

.art-cta {
  margin-top: 48px; text-align: center;
  background: linear-gradient(140deg, var(--c-primary-soft), var(--c-accent-soft));
  border-radius: var(--radius-lg); padding: clamp(32px, 5vw, 52px) 24px;
}
.art-cta h2 { font-size: clamp(1.4rem, 3.2vw, 1.9rem); }
.art-cta > p { color: var(--c-ink-soft); max-width: 44ch; margin-inline: auto; }
.art-cta .btn { margin-top: 10px; }
.cta-note { font-size: 0.92rem; margin-top: 16px; color: var(--c-ink-mute); }
.cta-note a { color: var(--c-primary-strong); }

.related { margin-top: 52px; }
.related h2 { font-size: 1.4rem; margin-bottom: 18px; }
.related ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.rel {
  display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  padding: 18px 20px; text-decoration: none;
  border-left: 4px solid var(--c-primary-soft);
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}
.rel:hover { transform: translateX(3px); box-shadow: var(--shadow-sm); }
.rel strong { color: var(--c-ink); font-family: var(--font-head); flex: 1; min-width: 200px; }
.rel-badge {
  font-family: var(--font-head); font-weight: 700; font-size: 0.68rem;
  letter-spacing: 0.05em; text-transform: uppercase; color: var(--c-ink);
  background: var(--c-primary-soft); padding: 4px 11px; border-radius: 999px;
}
.rel-go { font-family: var(--font-head); font-weight: 600; color: var(--c-primary-strong); }
.rel.mood-confiance { border-left-color: var(--c-confiance); }
.rel.mood-confiance .rel-badge { background: var(--c-confiance); }
.rel.mood-gratitude { border-left-color: var(--c-gratitude); }
.rel.mood-gratitude .rel-badge { background: var(--c-gratitude); }
.rel.mood-energie { border-left-color: var(--c-energie); }
.rel.mood-energie .rel-badge { background: var(--c-energie); }
.rel.mood-serenite { border-left-color: var(--c-serenite); }
.rel.mood-serenite .rel-badge { background: var(--c-serenite); }
.badge.mood-confiance { background: var(--c-confiance); }
.badge.mood-gratitude { background: var(--c-gratitude); }
.badge.mood-energie { background: var(--c-energie); }
.badge.mood-serenite { background: var(--c-serenite); }
</style>
