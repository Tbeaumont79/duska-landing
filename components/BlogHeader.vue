<script setup lang="ts">
// En-tête du blog : liens base-aware (NuxtLink) vers la landing et la section install,
// pour fonctionner aussi bien à la racine (duska.app) que sous un sous-chemin (Pages).
</script>

<template>
  <header class="hdr">
    <div class="container hdr-in">
      <NuxtLink to="/" class="brand" aria-label="Duska — accueil">
        <span class="brand-dot" aria-hidden="true" />
        Duska
      </NuxtLink>
      <nav class="nav" aria-label="Navigation principale">
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/#benefices">L'app</NuxtLink>
      </nav>
      <NuxtLink to="/#telecharger" class="btn btn-primary btn-sm">Installer l'app</NuxtLink>
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: saturate(1.2) blur(10px);
  background: rgba(251, 250, 255, 0.72);
  border-bottom: 1px solid #efeafb;
}
.hdr-in {
  display: flex;
  align-items: center;
  gap: 18px;
  height: 66px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1.32rem;
  color: var(--c-ink);
  text-decoration: none;
  margin-right: auto;
}
.brand-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c-primary), var(--c-accent));
}
.nav {
  display: none;
  gap: 26px;
  font-family: var(--font-head);
  font-weight: 600;
}
.nav a {
  text-decoration: none;
  color: var(--c-ink-soft);
}
.nav a:hover { color: var(--c-primary-strong); }
.btn-sm { padding: 10px 18px; font-size: 0.95rem; }

@media (min-width: 860px) {
  .nav { display: flex; }
}
</style>
