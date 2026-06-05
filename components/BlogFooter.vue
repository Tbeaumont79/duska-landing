<script setup lang="ts">
const year = 2026
</script>

<template>
  <footer class="ftr">
    <div class="container ftr-in">
      <div class="ftr-brand">
        <NuxtLink to="/" class="brand"><span class="brand-dot" aria-hidden="true" />Duska</NuxtLink>
        <p>Des affirmations &amp; citations douces, pour chaque humeur.</p>
      </div>
      <nav class="ftr-nav" aria-label="Pied de page">
        <NuxtLink to="/">Accueil</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/#telecharger">Installer</NuxtLink>
      </nav>
    </div>
    <div class="container ftr-bottom">
      <span>© {{ year }} Duska. Tous droits réservés.</span>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  margin-top: clamp(32px, 6vw, 64px);
  background: var(--c-bg-soft);
  border-top: 1px solid #ece6fa;
  padding-block: 44px 24px;
}
.ftr-in {
  display: flex; flex-wrap: wrap; gap: 28px; justify-content: space-between;
  align-items: flex-start; padding-bottom: 28px;
}
.brand {
  display: inline-flex; align-items: center; gap: 9px;
  font-family: var(--font-head); font-weight: 700; font-size: 1.25rem;
  color: var(--c-ink); text-decoration: none;
}
.brand-dot {
  width: 14px; height: 14px; border-radius: 50%;
  background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
}
.ftr-brand p { margin: 12px 0 0; max-width: 32ch; color: var(--c-ink-mute); }
.ftr-nav { display: flex; flex-wrap: wrap; gap: 18px; font-weight: 600; }
.ftr-nav a { text-decoration: none; color: var(--c-ink-soft); }
.ftr-nav a:hover { color: var(--c-primary-strong); }
.ftr-bottom {
  border-top: 1px solid #e6dff7; padding-top: 18px;
  color: var(--c-ink-mute); font-size: 0.88rem;
}
</style>
