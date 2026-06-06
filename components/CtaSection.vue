<script setup lang="ts">
// Lancement free-first Android : le badge Google Play est branché sur l'URL réelle
// (déterministe via l'applicationId `app.duska.app`) et tagué UTM — voir <PlayStoreBadge>
// et ~/data/store. iOS arrive plus tard → l'App Store reste en « bientôt ».
const appStoreUrl = '#'
</script>

<template>
  <section id="telecharger" class="cta-sec">
    <div class="container">
      <div class="cta-card">
        <span class="eyebrow">Commence aujourd'hui</span>
        <h2>Offre-toi un instant Duska</h2>
        <p>Installe l'app, choisis ton humeur, et laisse la bonne parole venir à toi.</p>
        <div class="stores">
          <a :href="appStoreUrl" class="store" aria-label="Télécharger sur l'App Store (bientôt disponible)">
            <span class="store-ico" aria-hidden="true"></span>
            <span class="store-txt"><small>Bientôt sur</small><strong>App Store</strong></span>
          </a>
          <PlayStoreBadge source="landing" medium="badge" campaign="launch" />
        </div>
        <p class="note">Lancement imminent — disponible très bientôt sur iOS et Android.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-sec { padding-block: clamp(40px, 7vw, 88px); }
.cta-card {
  text-align: center;
  background: linear-gradient(140deg, var(--c-primary), #9488d8 55%, var(--c-accent));
  color: #fff;
  border-radius: var(--radius-lg);
  padding: clamp(40px, 7vw, 72px) 24px;
  box-shadow: var(--shadow);
}
.cta-card .eyebrow { background: rgba(255, 255, 255, 0.22); color: #fff; }
.cta-card h2 { color: #fff; font-size: clamp(1.8rem, 4.5vw, 2.7rem); }
.cta-card p { color: rgba(255, 255, 255, 0.92); font-size: 1.1rem; }
.stores {
  display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin: 28px 0 14px;
}
.store {
  display: inline-flex; align-items: center; gap: 12px;
  background: #1f1b2e; color: #fff; text-decoration: none;
  padding: 12px 22px; border-radius: 14px; min-width: 190px;
  transition: transform 0.16s ease;
}
.store:hover { transform: translateY(-2px); }
.store-ico {
  font-size: 1.4rem; line-height: 1;
  width: 26px; display: inline-grid; place-items: center;
}
.store-txt { display: flex; flex-direction: column; text-align: left; line-height: 1.15; }
.store-txt small { font-size: 0.7rem; opacity: 0.8; }
.store-txt strong { font-family: var(--font-head); font-size: 1.12rem; }
.note { font-size: 0.92rem !important; opacity: 0.85; margin: 0; }
</style>
