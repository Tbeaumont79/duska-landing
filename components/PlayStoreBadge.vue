<script setup lang="ts">
// Badge « Disponible sur Google Play » réutilisable (landing + blog).
// Lien réel tagué UTM quand l'app est publiée (STORE_LIVE), sinon état « Bientôt » non cliquable
// (pas de lien mort). Source de vérité : ~/data/store.
import { STORE_LIVE, playStoreUrl } from '~/data/store'

const props = withDefaults(
  defineProps<{
    source: string
    medium?: string
    campaign?: string
  }>(),
  { medium: 'badge', campaign: 'launch' },
)

const href = computed(() =>
  playStoreUrl({ source: props.source, medium: props.medium, campaign: props.campaign }),
)
</script>

<template>
  <a
    v-if="STORE_LIVE"
    :href="href"
    class="store"
    target="_blank"
    rel="noopener"
    aria-label="Disponible sur Google Play"
  >
    <span class="store-ico" aria-hidden="true">▶</span>
    <span class="store-txt"><small>Disponible sur</small><strong>Google Play</strong></span>
  </a>
  <span
    v-else
    class="store store--soon"
    role="link"
    aria-disabled="true"
    aria-label="Bientôt disponible sur Google Play"
  >
    <span class="store-ico" aria-hidden="true">▶</span>
    <span class="store-txt"><small>Bientôt sur</small><strong>Google Play</strong></span>
  </span>
</template>

<style scoped>
.store {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #1f1b2e;
  color: #fff;
  text-decoration: none;
  padding: 12px 22px;
  border-radius: 14px;
  min-width: 190px;
  transition: transform 0.16s ease;
}
.store:hover { transform: translateY(-2px); }
.store--soon { cursor: default; opacity: 0.92; }
.store--soon:hover { transform: none; }
.store-ico {
  font-size: 1.4rem;
  line-height: 1;
  width: 26px;
  display: inline-grid;
  place-items: center;
}
.store-txt { display: flex; flex-direction: column; text-align: left; line-height: 1.15; }
.store-txt small { font-size: 0.7rem; opacity: 0.8; }
.store-txt strong { font-family: var(--font-head); font-size: 1.12rem; }
</style>
