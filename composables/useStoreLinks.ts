// Source unique des liens store Duska (THI-107 — WS-E du lancement THI-93).
//
// L'URL de la fiche Play Store vient de `runtimeConfig.public.playStoreUrl`
// (env `NUXT_PUBLIC_PLAY_STORE_URL`). Tant qu'elle est vide, `isPlayStoreAvailable`
// est faux et les composants rendent l'état « bientôt disponible ». Le passage en
// live se fait donc SANS modification de code : il suffit de définir l'env au build.
//
// Attribution : on N'ajoute PAS les `utm_*` directement sur l'URL Play (ils sont
// ignorés par le Play Store). Google lit l'acquisition via le paramètre `referrer`
// (Play Install Referrer), qui encapsule la chaîne UTM. On respecte donc les valeurs
// UTM demandées tout en les rendant exploitables dans la Play Console.
//   ex. ...details?id=app.duska.app&referrer=utm_source%3Dlanding%26utm_medium%3Dbadge%26utm_campaign%3Dlaunch

export interface StoreUtm {
  /** utm_source (ex. 'landing', 'blog') */
  source: string
  /** utm_medium (ex. 'badge', 'cta') */
  medium?: string
  /** utm_campaign (défaut 'launch') */
  campaign?: string
}

export function useStoreLinks() {
  const config = useRuntimeConfig()
  const playStoreBase = (config.public.playStoreUrl as string) || ''

  const isPlayStoreAvailable = computed(() => Boolean(playStoreBase))

  /** Construit le lien Play Store avec UTM encapsulé dans `referrer`. '' si non publié. */
  function playStoreLink({ source, medium, campaign = 'launch' }: StoreUtm): string {
    if (!playStoreBase) return ''
    const utm = new URLSearchParams()
    utm.set('utm_source', source)
    if (medium) utm.set('utm_medium', medium)
    utm.set('utm_campaign', campaign)
    let url: URL
    try {
      url = new URL(playStoreBase)
    } catch {
      // URL mal formée → on dégrade proprement vers l'état non disponible.
      return ''
    }
    url.searchParams.set('referrer', utm.toString())
    return url.toString()
  }

  return { isPlayStoreAvailable, playStoreLink }
}
