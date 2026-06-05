<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://duska.app'

const title = 'Duska — Affirmations & citations douces par humeur'
const description =
  'Duska t\'offre chaque jour l\'affirmation qui te ressemble : confiance, gratitude, énergie ou sérénité. Garde tes favoris, entretiens ta série. Bientôt sur iOS et Android.'
const ogImage = `${siteUrl}/og-image.png`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage,
  ogImageAlt: 'Duska — affirmations & citations douces par humeur',
  ogSiteName: 'Duska',
  ogLocale: 'fr_FR',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
})

// Données structurées (JSON-LD) : SoftwareApplication + WebSite.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Duska',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS, Android',
      description,
      url: siteUrl,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    },
    {
      '@type': 'WebSite',
      name: 'Duska',
      url: siteUrl,
      inLanguage: 'fr-FR',
    },
  ],
}

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd) }],
})
</script>

<template>
  <div>
    <SiteHeader />
    <main>
      <HeroSection />
      <BenefitsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
    <SiteFooter />
  </div>
</template>
