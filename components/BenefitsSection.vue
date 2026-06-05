<script setup lang="ts">
const benefits = [
  {
    icon: '💬',
    title: 'Des affirmations qui te parlent',
    text: 'Une bibliothèque de citations et affirmations bienveillantes, écrites pour apaiser et encourager.',
  },
  {
    icon: '🎨',
    title: 'Quatre humeurs, une parité',
    text: 'Confiance, Gratitude, Énergie, Sérénité : autant de contenu pour chaque catégorie, jamais à court d\'inspiration.',
  },
  {
    icon: '🔥',
    title: 'Une série qui te motive',
    text: 'Reviens chaque jour et entretiens ta streak. Un petit rituel doux qui s\'installe sans pression.',
  },
  {
    icon: '♥',
    title: 'Tes favoris, toujours à portée',
    text: 'Garde les phrases qui te touchent, retrouve-les en un geste et compose ton recueil personnel.',
  },
]
</script>

<template>
  <section id="benefices" class="section">
    <div class="container">
      <div class="head">
        <span class="eyebrow">Pourquoi Duska</span>
        <h2>Un moment pour soi, chaque jour</h2>
        <p class="sub">Tout est pensé pour la douceur : pas de bruit, pas de culpabilité — juste la bonne parole, au bon moment.</p>
      </div>
      <ul class="grid">
        <li v-for="b in benefits" :key="b.title" class="card item">
          <span class="ico" aria-hidden="true">{{ b.icon }}</span>
          <h3>{{ b.title }}</h3>
          <p>{{ b.text }}</p>
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
  display: grid; gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(232px, 1fr));
}
.item { padding: 28px 24px; }
.ico {
  display: inline-grid; place-items: center;
  width: 52px; height: 52px; border-radius: 16px;
  background: var(--c-primary-soft); font-size: 1.5rem; margin-bottom: 16px;
}
.item h3 { font-size: 1.18rem; }
.item p { margin: 0; }
</style>
