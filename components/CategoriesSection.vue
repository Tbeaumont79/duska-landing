<script setup lang="ts">
const categories = [
  { key: 'confiance', name: 'Confiance', line: 'Je m\'autorise à prendre ma place.', emoji: '🌿' },
  { key: 'gratitude', name: 'Gratitude', line: 'Je remarque ce qui va bien, ici et maintenant.', emoji: '🤍' },
  { key: 'energie', name: 'Énergie', line: 'Aujourd\'hui, je choisis mon élan.', emoji: '☀️' },
  { key: 'serenite', name: 'Sérénité', line: 'Je respire, et tout ralentit doucement.', emoji: '🌊' },
]
</script>

<template>
  <section id="categories" class="section cats-sec">
    <div class="container">
      <div class="head">
        <span class="eyebrow">Les catégories</span>
        <h2>Choisis ton humeur du jour</h2>
        <p class="sub">Quatre univers équilibrés pour t'accompagner, quoi que tu ressentes.</p>
      </div>
      <ul class="grid">
        <li v-for="c in categories" :key="c.key" :class="['card', 'cat', `cat-${c.key}`]">
          <span class="emoji" aria-hidden="true">{{ c.emoji }}</span>
          <h3>{{ c.name }}</h3>
          <p>« {{ c.line }} »</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.head { max-width: 60ch; margin-bottom: 40px; }
h2 { font-size: clamp(1.7rem, 4vw, 2.5rem); }
.sub { font-size: 1.08rem; }
.grid {
  list-style: none; padding: 0; margin: 0;
  display: grid; gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
.cat { padding: 26px 24px; border: none; position: relative; overflow: hidden; }
.cat::before {
  content: ''; position: absolute; inset: 0 0 auto 0; height: 6px;
}
.cat-confiance::before { background: var(--c-confiance); }
.cat-gratitude::before { background: var(--c-gratitude); }
.cat-energie::before { background: var(--c-energie); }
.cat-serenite::before { background: var(--c-serenite); }
.emoji {
  display: inline-grid; place-items: center; width: 48px; height: 48px;
  border-radius: 14px; font-size: 1.4rem; margin-bottom: 14px;
}
.cat-confiance .emoji { background: var(--c-confiance); }
.cat-gratitude .emoji { background: var(--c-gratitude); }
.cat-energie .emoji { background: var(--c-energie); }
.cat-serenite .emoji { background: var(--c-serenite); }
.cat h3 { font-size: 1.22rem; }
.cat p { margin: 0; font-style: italic; color: var(--c-ink-soft); }
</style>
