// Source de vérité unique pour les liens « store » de Duska (WS-E / THI-100).
//
// L'applicationId Android est verrouillé sur `app.duska.app` (THI-64, mergé sur `main` du
// repo app). L'URL Play Store est donc DÉTERMINISTE dès maintenant, avant même la publication :
//   https://play.google.com/store/apps/details?id=app.duska.app
//
// On la branche tout de suite ; elle ne résout vers une vraie fiche store qu'une fois l'app
// publiée par le fondateur (WS-D : compte Play Console + upload AAB + soumission). Tant que ce
// n'est pas fait, `STORE_LIVE = false` → on affiche « Bientôt sur Google Play » (aucun lien mort).
// À la publication : passer `STORE_LIVE` à `true` (one-liner) → le badge/CTA pointe vers l'URL
// taguée pour l'attribution.

export const ANDROID_APPLICATION_ID = 'app.duska.app'
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_APPLICATION_ID}`

// 🔴 À BASCULER À `true` LE JOUR DE LA PUBLICATION PLAY STORE (sortie WS-D, soumission fondateur).
export const STORE_LIVE = false

export interface Utm {
  /** Origine du clic : `landing`, `blog`, … */
  source: string
  /** Support : `badge`, `cta`, … */
  medium?: string
  /** Campagne : `launch` par défaut. */
  campaign?: string
}

/**
 * URL Play Store avec attribution.
 * Google Play attribue les installs via le paramètre `referrer` (Play Install Referrer API),
 * qui doit contenir la chaîne UTM url-encodée — c'est l'équivalent Play Store des UTM web.
 */
export function playStoreUrl(utm: Utm): string {
  const utmString = new URLSearchParams({
    utm_source: utm.source,
    utm_medium: utm.medium ?? 'badge',
    utm_campaign: utm.campaign ?? 'launch',
  }).toString()
  return `${PLAY_STORE_URL}&referrer=${encodeURIComponent(utmString)}`
}
