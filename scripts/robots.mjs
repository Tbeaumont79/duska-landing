#!/usr/bin/env node
/*
 * Génère `.output/public/robots.txt` après `nuxt generate` (THI-90).
 *
 * POURQUOI un script plutôt que @nuxtjs/robots ou un fichier statique :
 *  - @nuxtjs/robots REFUSE de générer un robots.txt sous un baseURL (sous-chemin Pages projet)
 *    et, quand il est actif, RENOMME `public/robots.txt` → `public/_robots.txt`. Toute la chaîne
 *    devenait fragile : un build racine déplaçait le fichier source, et le build sous-chemin
 *    suivant ne produisait alors plus aucun robots.txt → un déploiement automatisé
 *    (`gh-pages -d .output/public`) effaçait silencieusement le robots.txt live. Voir THI-90/THI-89.
 *  - Le contenu dépend de l'environnement (l'URL du sitemap diffère entre la racine duska.app et
 *    le sous-chemin github.io) : un fichier statique committé ne peut pas servir les deux et
 *    divergeait entre branches (THI-85 vs THI-86).
 *
 * Ce script est la SOURCE UNIQUE du robots.txt. Il calcule l'URL canonique avec EXACTEMENT la
 * même logique que `nuxt.config.ts`, écrit le fichier directement dans l'artefact publié, et est
 * branché sur `postgenerate` (npm/pnpm le lance automatiquement après `generate`). Il fonctionne
 * à l'identique pour la racine et le sous-chemin, et est immunisé contre le module.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// Même logique que nuxt.config.ts (origine + baseURL → URL canonique sans slash final).
const siteOrigin = (process.env.NUXT_PUBLIC_SITE_ORIGIN || 'https://duska.app').replace(/\/$/, '')
const baseURL = process.env.NUXT_APP_BASE_URL || '/'
const siteUrl = `${siteOrigin}${baseURL}`.replace(/\/$/, '')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.output', 'public')

const content = `# robots.txt généré au build (scripts/robots.mjs, THI-90) — source unique.
# Sitemap déclaré pour l'environnement courant (racine duska.app ou sous-chemin Pages).
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

if (!existsSync(dist)) mkdirSync(dist, { recursive: true })
const out = join(dist, 'robots.txt')
writeFileSync(out, content, 'utf8')
console.log(`✓ robots.txt généré → .output/public/robots.txt (Sitemap: ${siteUrl}/sitemap.xml)`)
