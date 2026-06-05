<template>
  <section id="top" class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Affirmations &amp; citations par humeur</span>
        <h1>Une parole douce<br />pour chaque humeur.</h1>
        <p class="lead">
          Duska t'offre chaque jour l'affirmation qui te ressemble — confiance, gratitude,
          énergie ou sérénité. Garde tes préférées, entretiens ta série, et reviens
          vers toi, un instant à la fois.
        </p>
        <div class="hero-cta">
          <a href="#telecharger" class="btn btn-primary">Installer Duska</a>
          <a href="#benefices" class="btn btn-ghost">Découvrir</a>
        </div>
        <ul class="hero-trust">
          <li>✦ Gratuit, sans publicité intrusive</li>
          <li>✦ Conçu pour la détente</li>
        </ul>
      </div>
      <div class="hero-visual">
        <AppMockup />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding-block: clamp(36px, 6vw, 76px) clamp(48px, 8vw, 96px); }
.hero-grid {
  display: grid;
  gap: clamp(28px, 5vw, 56px);
  align-items: center;
}
h1 { font-size: clamp(2.2rem, 6vw, 3.6rem); font-weight: 700; }
.lead { font-size: clamp(1.05rem, 2.4vw, 1.25rem); max-width: 36ch; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 26px; }
.hero-trust {
  list-style: none; padding: 0; margin: 28px 0 0;
  display: flex; flex-wrap: wrap; gap: 18px;
  font-weight: 600; color: var(--c-ink-mute); font-size: 0.92rem;
}
.hero-visual { display: flex; justify-content: center; }

@media (min-width: 880px) {
  .hero-grid { grid-template-columns: 1.05fr 0.95fr; }
}
</style>
