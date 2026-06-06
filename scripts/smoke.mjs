#!/usr/bin/env node
/*
 * Smoke test du build statique de la landing Duska (THI-84).
 *
 * Objectif : empêcher qu'un build cassé (ou une page qui ne rend rien) ne parte en prod.
 * On teste l'ARTEFACT réellement publié (.output/public), pas juste la compilation,
 * car le bug THI-83 venait de l'hébergement, pas du code — ce filet couvre désormais
 * les régressions de rendu côté contenu.
 *
 * Prérequis : `nuxt generate` doit avoir tourné avant (CI / Netlify : generate && smoke).
 * Sortie : code 0 si tout passe, code 1 (avec rapport) à la première anomalie bloquante.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.output', 'public')

const failures = []
const ok = (msg) => console.log(`  ✓ ${msg}`)
const fail = (msg) => { failures.push(msg); console.log(`  ✗ ${msg}`) }

function read(rel) {
  const p = join(dist, rel)
  if (!existsSync(p)) { fail(`fichier manquant : ${rel}`); return null }
  return readFileSync(p, 'utf8')
}

// 1. Le dossier de build existe
if (!existsSync(dist)) {
  console.error('✗ .output/public introuvable — lance `nuxt generate` avant le smoke.')
  process.exit(1)
}

console.log('Smoke test — landing Duska (.output/public)')

// 2. Pages clés présentes (landing + SPA fallback + 404 + blog + articles)
const requiredPages = [
  'index.html',
  '200.html',
  '404.html',
  'blog/index.html',
  'blog/affirmations-positives-guide/index.html',
  'blog/affirmations-positives-matin/index.html',
  'blog/gerer-le-stress-au-quotidien/index.html',
  'blog/retrouver-confiance-en-soi/index.html',
  'blog/routine-gratitude/index.html',
  'sitemap.xml',
]
const pages = {}
for (const rel of requiredPages) {
  const html = read(rel)
  if (html) { pages[rel] = html; ok(`présent : ${rel}`) }
}

// 3. La landing rend bien son contenu (le H1 + l'accroche marketing)
const index = pages['index.html']
if (index) {
  if (/<h1[^>]*>\s*Une parole douce/i.test(index)) ok('landing : H1 "Une parole douce" rendu')
  else fail('landing : H1 attendu absent (page vide / non rendue ?)')

  if (index.includes('Duska')) ok('landing : marque "Duska" présente')
  else fail('landing : marque "Duska" absente')

  if (/Installer Duska/i.test(index)) ok('landing : CTA "Installer Duska" présent')
  else fail('landing : CTA principal absent')
}

// 4. Le blog rend bien la liste d'articles
const blog = pages['blog/index.html']
if (blog && /<a [^>]*href="[^"]*\/blog\//i.test(blog)) ok('blog : liens vers les articles présents')
else if (blog) fail('blog : aucun lien article dans le listing')

// 5. Pas de marqueur d'erreur Nuxt dans le HTML rendu
const errorMarkers = ['__nuxt_error', 'Application error', 'Internal Server Error', 'Cannot read propert', 'is not defined']
for (const [rel, html] of Object.entries(pages)) {
  if (rel.endsWith('.xml')) continue
  const hit = errorMarkers.find((m) => html.includes(m))
  if (hit) fail(`${rel} : marqueur d'erreur détecté ("${hit}")`)
}
if (!failures.some((f) => f.includes("marqueur d'erreur"))) ok("aucun marqueur d'erreur Nuxt dans les pages")

// 6. Cohérence baseURL : les assets _nuxt référencés par la landing existent sur le disque.
//    (Un mauvais baseURL = page blanche en prod même si le HTML existe.)
if (index) {
  const refs = [...index.matchAll(/(?:href|src)="([^"]*\/_nuxt\/[^"]+)"/g)].map((m) => m[1])
  if (refs.length === 0) {
    fail('landing : aucun asset _nuxt référencé (hydratation cassée ?)')
  } else {
    const base = refs[0].replace(/_nuxt\/.*$/, '') // ex: "/duska-landing/" ou "/"
    let missing = 0
    for (const ref of refs) {
      const local = ref.startsWith(base) ? ref.slice(base.length) : ref.replace(/^\//, '')
      if (!existsSync(join(dist, local))) missing++
    }
    if (missing === 0) ok(`landing : ${refs.length} assets _nuxt résolus (baseURL "${base}")`)
    else fail(`landing : ${missing}/${refs.length} assets _nuxt introuvables (baseURL "${base}" incohérent)`)
  }
}

// Verdict
console.log('')
if (failures.length) {
  console.error(`✗ SMOKE ÉCHEC — ${failures.length} anomalie(s) :`)
  failures.forEach((f) => console.error(`   - ${f}`))
  process.exit(1)
}
console.log('✓ SMOKE OK — la landing et le blog sont rendus correctement.')
