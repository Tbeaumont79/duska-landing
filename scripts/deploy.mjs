#!/usr/bin/env node
/*
 * Déploiement gh-pages DURCI (THI-111).
 *
 * Contexte : plusieurs agents publient sur la même branche `gh-pages` depuis des checkouts
 * différents. Un `pnpm deploy` lancé depuis un état partiel/obsolète (mauvais sous-chemin,
 * branche pas à jour, page manquante) republie TOUT le site et fait disparaître des pages
 * sans bruit — c'est la régression observée le 2026-06-06 (/confidentialite 200→404→200).
 *
 * Ce script est le SEUL chemin de déploiement manuel fiable. Il refuse de publier tant que :
 *   1. l'arbre de travail n'est pas propre,
 *   2. HEAD n'est pas aligné sur `origin/main` (on ne déploie QUE du main à jour),
 *   3. le sous-chemin de build (NUXT_APP_BASE_URL) n'est pas posé,
 *   4. le smoke pré-publication ne valide pas le set de routes attendu
 *      (/, /confidentialite/, /blog/, robots.txt, sitemap.xml, articles…).
 *
 * Tant qu'une de ces gardes échoue, RIEN n'est poussé sur gh-pages → impossible d'écraser
 * une page existante avec un build partiel.
 *
 * Usage :
 *   pnpm deploy              # build canonique Pages + gardes + publication
 *   pnpm deploy --dry-run    # tout sauf la publication (build + gardes + smoke)
 *   pnpm deploy --allow-stale  # bypass explicite de la garde branche (urgence, à éviter)
 *
 * Override d'env (domaine racine duska.app, THI-67) : poser NUXT_APP_BASE_URL=/ et
 * NUXT_PUBLIC_SITE_ORIGIN=https://duska.app avant la commande.
 */
import { execSync } from 'node:child_process'
import { existsSync, copyFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, '.output', 'public')
const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const allowStale = args.includes('--allow-stale')

// Valeurs canoniques du déploiement Pages projet (cf .github/workflows/deploy.yml).
// Bakées ici pour qu'un `pnpm deploy` ne puisse JAMAIS partir avec un mauvais sous-chemin.
// Surchargeables par l'environnement (migration domaine racine).
const env = {
  ...process.env,
  NUXT_PUBLIC_SITE_ORIGIN: process.env.NUXT_PUBLIC_SITE_ORIGIN || 'https://tbeaumont79.github.io',
  NUXT_APP_BASE_URL: process.env.NUXT_APP_BASE_URL || '/duska-landing/',
  NUXT_PUBLIC_PLAY_STORE_URL: process.env.NUXT_PUBLIC_PLAY_STORE_URL || '',
}

const sh = (cmd, opts = {}) => { const out = execSync(cmd, { cwd: root, encoding: 'utf8', ...opts }); return typeof out === 'string' ? out.trim() : '' }
const die = (msg) => { console.error(`\n✗ DÉPLOIEMENT REFUSÉ — ${msg}\n`); process.exit(1) }
const step = (msg) => console.log(`\n▸ ${msg}`)

console.log(`Déploiement gh-pages durci — Duska (THI-111)${dryRun ? ' [DRY-RUN]' : ''}`)
console.log(`  sous-chemin : NUXT_APP_BASE_URL=${env.NUXT_APP_BASE_URL}`)
console.log(`  origine     : NUXT_PUBLIC_SITE_ORIGIN=${env.NUXT_PUBLIC_SITE_ORIGIN}`)

// ── Garde 1 : sous-chemin posé ──────────────────────────────────────────────
if (!env.NUXT_APP_BASE_URL) die('NUXT_APP_BASE_URL non défini (sous-chemin de build absent).')

// ── Garde 2 : arbre de travail propre ───────────────────────────────────────
step('Vérification de l’arbre de travail…')
const dirty = sh('git status --porcelain')
if (dirty) die(`arbre de travail non propre :\n${dirty}\n  → committe/stash avant de déployer.`)

// ── Garde 3 : HEAD aligné sur origin/main ───────────────────────────────────
step('Synchronisation avec origin/main…')
try { sh('git fetch origin main --quiet') } catch { console.warn('  ⚠ git fetch a échoué (réseau ?) — comparaison sur la ref locale.') }
const head = sh('git rev-parse HEAD')
const branch = sh('git rev-parse --abbrev-ref HEAD')
const originMain = sh('git rev-parse origin/main')
if (head !== originMain) {
  const detail = `HEAD (${branch} @ ${head.slice(0, 8)}) ≠ origin/main (${originMain.slice(0, 8)})`
  if (allowStale) console.warn(`  ⚠ --allow-stale : garde branche ignorée — ${detail}`)
  else die(`${detail}\n  → on ne déploie que du main à jour. Fais \`git checkout main && git pull\`, ou --allow-stale en urgence.`)
} else {
  console.log(`  ✓ HEAD aligné sur origin/main (${head.slice(0, 8)})`)
}

// ── Build statique avec l’environnement canonique ───────────────────────────
step('Build statique (nuxt generate)…')
sh('npx nuxt generate', { stdio: 'inherit', env })

// ── robots.txt : repli statique si le module ne l’a pas émis (THI-90) ────────
// Le module @nuxtjs/robots renomme public/robots.txt → _robots.txt et n’émet PAS de
// robots.txt sous un sous-chemin. On restaure le fichier statique pour garantir un 200.
const robotsOut = join(dist, 'robots.txt')
const robotsSrc = join(root, 'public', '_robots.txt')
if (!existsSync(robotsOut) && existsSync(robotsSrc)) {
  copyFileSync(robotsSrc, robotsOut)
  console.log('  ✓ robots.txt restauré depuis public/_robots.txt (repli THI-90)')
}

// ── Garde 4 : smoke pré-publication (set de routes attendu) ──────────────────
step('Smoke pré-publication…')
try {
  sh('node scripts/smoke.mjs', { stdio: 'inherit', env })
} catch {
  die('le smoke a détecté un build incomplet/cassé → publication annulée (aucune page écrasée).')
}

// ── Publication ─────────────────────────────────────────────────────────────
if (dryRun) {
  console.log('\n✓ DRY-RUN OK — toutes les gardes passent. Aucune publication effectuée.')
  process.exit(0)
}
step('Publication sur gh-pages…')
const msg = `deploy: ${branch} @ ${head.slice(0, 8)} (gardes THI-111 OK) [skip ci]`
sh(`npx -y gh-pages@6 --dotfiles -d .output/public -b gh-pages -m "${msg}"`, { stdio: 'inherit' })
console.log('\n✓ DÉPLOIEMENT OK — build complet vérifié publié sur gh-pages.')
