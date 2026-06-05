<script setup lang="ts">
// Maquette de l'app rendue en CSS/SVG (léger → bon LCP, pas d'image lourde).
// À remplacer par de vraies captures dès qu'elles sont fournies par l'équipe app.
withDefaults(defineProps<{ affirmation?: string; category?: string }>(), {
  affirmation: 'Je mérite la douceur que je donne aux autres.',
  category: 'Confiance',
})
</script>

<template>
  <div class="phone" role="img"
       :aria-label="`Aperçu de l'app Duska : carte d'affirmation « ${affirmation} » dans la catégorie ${category}`">
    <div class="phone-notch" aria-hidden="true" />
    <div class="phone-screen">
      <div class="m-top">
        <span class="m-greet">Bonjour ☀️</span>
        <span class="m-streak" aria-hidden="true">🔥 7 jours</span>
      </div>
      <div class="m-card">
        <span class="m-cat">{{ category }}</span>
        <p class="m-aff">{{ affirmation }}</p>
        <div class="m-actions" aria-hidden="true">
          <span class="m-pill m-fav">♥ Favori</span>
          <span class="m-pill">Partager</span>
        </div>
      </div>
      <div class="m-cats" aria-hidden="true">
        <span class="chip chip-confiance">Confiance</span>
        <span class="chip chip-gratitude">Gratitude</span>
        <span class="chip chip-energie">Énergie</span>
        <span class="chip chip-serenite">Sérénité</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone {
  position: relative;
  width: min(300px, 78vw);
  aspect-ratio: 300 / 610;
  background: #fff;
  border-radius: 42px;
  padding: 14px;
  box-shadow: var(--shadow);
  border: 8px solid #2e2a3f;
}
.phone-notch {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 22px;
  background: #2e2a3f;
  border-radius: 0 0 14px 14px;
}
.phone-screen {
  height: 100%;
  border-radius: 30px;
  background:
    radial-gradient(120% 80% at 100% 0%, var(--c-accent-soft), transparent 55%),
    linear-gradient(180deg, var(--c-primary-soft), var(--c-bg));
  padding: 34px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.m-top { display: flex; justify-content: space-between; align-items: center; }
.m-greet { font-family: var(--font-head); font-weight: 700; color: var(--c-ink); }
.m-streak {
  font-size: 0.78rem; font-weight: 700; color: var(--c-primary-strong);
  background: #fff; padding: 4px 10px; border-radius: 999px; box-shadow: var(--shadow-sm);
}
.m-card {
  background: #fff;
  border-radius: 22px;
  padding: 22px 20px;
  box-shadow: var(--shadow-sm);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
}
.m-cat {
  align-self: flex-start;
  font-family: var(--font-head); font-weight: 700; font-size: 0.72rem;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--c-primary-strong); background: var(--c-primary-soft);
  padding: 4px 11px; border-radius: 999px;
}
.m-aff {
  font-family: var(--font-head); font-weight: 600; font-size: 1.18rem;
  color: var(--c-ink); margin: 0; line-height: 1.35;
}
.m-actions { display: flex; gap: 8px; }
.m-pill {
  font-size: 0.74rem; font-weight: 700; color: var(--c-ink-soft);
  background: var(--c-bg-soft); padding: 6px 12px; border-radius: 999px;
}
.m-fav { color: var(--c-accent); background: var(--c-accent-soft); }
.m-cats { display: flex; flex-wrap: wrap; gap: 7px; }
.chip {
  font-size: 0.72rem; font-weight: 700; color: var(--c-ink);
  padding: 6px 11px; border-radius: 999px;
}
.chip-confiance { background: var(--c-confiance); }
.chip-gratitude { background: var(--c-gratitude); }
.chip-energie { background: var(--c-energie); }
.chip-serenite { background: var(--c-serenite); }
</style>
