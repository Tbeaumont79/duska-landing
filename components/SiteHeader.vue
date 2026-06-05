<script setup lang="ts">
const links = [
  { href: '#benefices', label: 'Bénéfices' },
  { href: '#categories', label: 'Catégories' },
  { href: '#temoignages', label: 'Témoignages' },
]
</script>

<template>
  <header class="hdr">
    <div class="container hdr-in">
      <a href="#top" class="brand" aria-label="Duska — accueil">
        <span class="brand-dot" aria-hidden="true" />
        Duska
      </a>
      <nav class="nav" aria-label="Navigation principale">
        <a v-for="l in links" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>
      <a href="#telecharger" class="btn btn-primary btn-sm">Installer l'app</a>
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
