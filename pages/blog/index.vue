<script setup lang="ts">
import { articles } from '~/data/articles'

const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://duska.app'
const blogUrl = `${siteUrl}/blog`

const title = 'Blog Duska — affirmations, gratitude, confiance & sérénité'
const description =
  "Le blog Duska : guides doux et concrets sur les affirmations positives, la gratitude, la confiance en soi et la gestion du stress. Des idées simples pour aller mieux au quotidien."

// Tri par date décroissante (le plus récent d'abord).
const posts = [...articles].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: blogUrl,
  ogImage: `${siteUrl}/og-image.png`,
  ogImageAlt: 'Blog Duska',
  ogSiteName: 'Duska',
  ogLocale: 'fr_FR',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: `${siteUrl}/og-image.png`,
})

// JSON-LD : Blog + liste des articles.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog Duska',
  url: blogUrl,
  inLanguage: 'fr-FR',
  publisher: { '@type': 'Organization', name: 'Duska', url: siteUrl },
  blogPost: posts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    url: `${siteUrl}/blog/${p.slug}`,
    datePublished: p.datePublished,
  })),
}

useHead({
  link: [{ rel: 'canonical', href: blogUrl }],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
})
</script>

<template>
  <div>
    <BlogHeader />
    <main>
      <section class="section blog-hero">
        <div class="container">
          <span class="eyebrow">Le journal Duska</span>
          <h1>Des idées douces pour aller mieux, au quotidien</h1>
          <p class="lede">
            Affirmations, gratitude, confiance en soi, sérénité : des guides simples et bienveillants,
            dans le même esprit que l'app.
          </p>
        </div>
      </section>

      <section class="container blog-list">
        <ul class="grid">
          <li v-for="post in posts" :key="post.slug">
            <NuxtLink :to="`/blog/${post.slug}`" class="card art" :class="`mood-${post.mood}`">
              <span class="badge">{{ post.moodLabel }}</span>
              <h2>{{ post.title }}</h2>
              <p>{{ post.excerpt }}</p>
              <span class="meta">{{ post.readingTime }} min de lecture · Lire l'article →</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </main>
    <BlogFooter />
  </div>
</template>

<style scoped>
.blog-hero { padding-block: clamp(48px, 7vw, 88px) clamp(24px, 4vw, 40px); }
.blog-hero h1 { font-size: clamp(1.9rem, 5vw, 3rem); max-width: 18ch; }
.lede { font-size: 1.15rem; max-width: 56ch; color: var(--c-ink-soft); }

.blog-list { padding-bottom: clamp(40px, 7vw, 88px); }
.grid {
  list-style: none; margin: 0; padding: 0;
  display: grid; gap: 22px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.art {
  display: flex; flex-direction: column; gap: 10px;
  padding: 26px 24px; text-decoration: none; height: 100%;
  border-top: 4px solid var(--c-primary-soft);
  transition: transform 0.16s ease, box-shadow 0.16s ease;
}
.art:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
.art h2 { font-size: 1.2rem; margin: 0; color: var(--c-ink); }
.art p { margin: 0; color: var(--c-ink-soft); flex: 1; }
.badge {
  align-self: flex-start;
  font-family: var(--font-head); font-weight: 700; font-size: 0.72rem;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--c-ink); background: var(--c-primary-soft);
  padding: 4px 12px; border-radius: 999px;
}
.meta {
  font-family: var(--font-head); font-weight: 600; font-size: 0.9rem;
  color: var(--c-primary-strong);
}
.mood-confiance { border-top-color: var(--c-confiance); }
.mood-confiance .badge { background: var(--c-confiance); }
.mood-gratitude { border-top-color: var(--c-gratitude); }
.mood-gratitude .badge { background: var(--c-gratitude); }
.mood-energie { border-top-color: var(--c-energie); }
.mood-energie .badge { background: var(--c-energie); }
.mood-serenite { border-top-color: var(--c-serenite); }
.mood-serenite .badge { background: var(--c-serenite); }
</style>
