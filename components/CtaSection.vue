<script setup lang="ts">
// Liens store via la source unique (THI-107). Le badge officiel Google Play s'affiche
// dès que NUXT_PUBLIC_PLAY_STORE_URL est défini ; sinon, état « bientôt disponible ».
const { isPlayStoreAvailable, playStoreLink } = useStoreLinks()
const playUrl = computed(() =>
  playStoreLink({ source: 'landing', medium: 'badge', campaign: 'launch' }),
)
const playBadge = useBaseAsset('/badges/google-play-fr.png')
</script>

<template>
  <section id="telecharger" class="cta-sec">
    <div class="container">
      <div class="cta-card">
        <span class="eyebrow">Commence aujourd'hui</span>
        <h2>Offre-toi un instant Duska</h2>
        <p>Installe l'app, choisis ton humeur, et laisse la bonne parole venir à toi.</p>

        <!-- Play Store publié : badge officiel + UTM (utm_source=landing&utm_medium=badge&utm_campaign=launch) -->
        <div v-if="isPlayStoreAvailable" class="badges">
          <a
            :href="playUrl"
            class="badge-link"
            target="_blank"
            rel="noopener"
            aria-label="Disponible sur Google Play"
          >
            <img
              :src="playBadge"
              alt="Disponible sur Google Play"
              width="207"
              height="80"
              loading="lazy"
              decoding="async"
            />
          </a>
          <span class="badge-soon">App Store — bientôt</span>
        </div>

        <!-- Pas encore publié : état « bientôt » -->
        <div v-else class="stores">
          <a href="#" class="store" aria-label="Télécharger sur l'App Store (bientôt disponible)">
            <span class="store-ico" aria-hidden="true"></span>
            <span class="store-txt"><small>Bientôt sur</small><strong>App Store</strong></span>
          </a>
          <a href="#" class="store" aria-label="Télécharger sur Google Play (bientôt disponible)">
            <span class="store-ico" aria-hidden="true">▶</span>
            <span class="store-txt"><small>Bientôt sur</small><strong>Google Play</strong></span>
          </a>
        </div>

        <p v-if="isPlayStoreAvailable" class="note">
          Disponible dès maintenant sur Android — version iOS bientôt.
        </p>
        <p v-else class="note">Lancement imminent — disponible très bientôt sur iOS et Android.</p>
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
.badges {
  display: flex; flex-wrap: wrap; gap: 16px; align-items: center;
  justify-content: center; margin: 28px 0 14px;
}
.badge-link {
  display: inline-flex; line-height: 0;
  border-radius: 12px; transition: transform 0.16s ease;
}
.badge-link:hover { transform: translateY(-2px); }
.badge-link img { height: 64px; width: auto; display: block; }
.badge-soon {
  font-size: 0.86rem; color: rgba(255, 255, 255, 0.82);
  font-family: var(--font-head); font-weight: 600;
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
