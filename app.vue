<script setup lang="ts">
// Liens favicon/icône relatifs à la baseURL → fonctionnent à la racine d'un domaine
// (duska.app) comme sous un sous-chemin GitHub Pages (/duska-landing/).
const base = useRuntimeConfig().app.baseURL
useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` },
    { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
