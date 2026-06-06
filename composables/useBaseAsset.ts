// Préfixe un chemin d'asset `public/` par la baseURL de l'app, pour rester correct
// sous un sous-chemin (GitHub Pages projet) comme à la racine d'un domaine. (THI-107)
//   useBaseAsset('/badges/google-play-fr.png')
//     racine        → '/badges/google-play-fr.png'
//     /duska-landing → '/duska-landing/badges/google-play-fr.png'
export function useBaseAsset(path: string): string {
  const base = (useRuntimeConfig().app.baseURL || '/').replace(/\/$/, '')
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base}${clean}`
}
