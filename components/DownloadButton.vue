<script setup lang="ts">
// CTA bouton « Télécharger Duska » (utilisé sur le blog).
// Pointe vers le Play Store tagué UTM quand l'app est publiée (STORE_LIVE), sinon libellé
// « bientôt » non cliquable. Source de vérité : ~/data/store.
import { STORE_LIVE, playStoreUrl } from '~/data/store'

const props = withDefaults(
  defineProps<{
    source: string
    medium?: string
    campaign?: string
    label?: string
  }>(),
  { medium: 'cta', campaign: 'launch', label: 'Télécharger Duska' },
)

const href = computed(() =>
  playStoreUrl({ source: props.source, medium: props.medium, campaign: props.campaign }),
)
</script>

<template>
  <a
    v-if="STORE_LIVE"
    :href="href"
    class="btn btn-primary"
    target="_blank"
    rel="noopener"
  >
    {{ label }}
  </a>
  <span v-else class="btn btn-primary btn--soon" role="link" aria-disabled="true">
    {{ label }} — bientôt
  </span>
</template>

<style scoped>
.btn--soon { cursor: default; opacity: 0.9; }
.btn--soon:hover { transform: none; box-shadow: none; }
</style>
