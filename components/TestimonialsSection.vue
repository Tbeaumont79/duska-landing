<script setup lang="ts">
const quotes = [
  { text: 'Le petit rituel du matin que je ne lâche plus. La série me motive sans me stresser.', name: 'Camille', role: 'utilisatrice bêta' },
  { text: 'Enfin une app douce, sans pub agressive. Les affirmations sont vraiment bien écrites.', name: 'Naïla', role: 'utilisatrice bêta' },
  { text: 'Je garde mes favorites pour les jours gris. Ça change la couleur de ma journée.', name: 'Thomas', role: 'utilisateur bêta' },
]
</script>

<template>
  <section id="temoignages" class="section">
    <div class="container">
      <div class="head">
        <span class="eyebrow">Elles &amp; ils en parlent</span>
        <h2>Une parenthèse qui fait du bien</h2>
      </div>
      <ul class="grid">
        <li v-for="q in quotes" :key="q.name" class="card quote">
          <p class="stars" aria-label="Note : 5 sur 5">★★★★★</p>
          <blockquote>« {{ q.text }} »</blockquote>
          <footer><strong>{{ q.name }}</strong> — {{ q.role }}</footer>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.head { max-width: 60ch; margin-bottom: 36px; }
h2 { font-size: clamp(1.7rem, 4vw, 2.5rem); }
.grid {
  list-style: none; padding: 0; margin: 0;
  display: grid; gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.quote { padding: 26px 24px; }
.stars { color: #f0b03e; margin: 0 0 10px; letter-spacing: 2px; }
blockquote {
  margin: 0 0 16px; font-family: var(--font-head); font-weight: 600;
  font-size: 1.08rem; color: var(--c-ink); line-height: 1.45;
}
footer { color: var(--c-ink-mute); font-size: 0.92rem; }
footer strong { color: var(--c-ink-soft); }
</style>
