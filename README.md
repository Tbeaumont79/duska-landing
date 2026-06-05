# Duska — Landing page

Landing page marketing publique de **Duska**, l'app d'affirmations & citations douces par
humeur (Confiance · Gratitude · Énergie · Sérénité). Objectif : convertir le trafic organique
en installs. ([THI-74](https://github.com/Tbeaumont79/duska-landing))

- **Stack** : [Nuxt 3](https://nuxt.com) en **SSG** (`nuxt generate`) — Vue 3 `<script setup>` + TypeScript.
- **SEO** : SSR/SSG, meta + OpenGraph/Twitter, JSON-LD (`SoftwareApplication` + `WebSite`),
  `sitemap.xml` (@nuxtjs/sitemap), `robots.txt` (@nuxtjs/robots), titres sémantiques, alt images.
- **Perf** : polices auto-hébergées (`@nuxt/fonts`), visuels CSS/SVG légers, hydratation minimale.
- **Design** : ton Duska — clair, pastel, détente (palette lavande/aube). Tokens dans
  `assets/css/main.css`.

## Scripts

```bash
pnpm install
pnpm dev          # serveur de dev
pnpm typecheck    # vue-tsc (0 erreur)
pnpm generate     # build statique → .output/public
pnpm serve        # sert le build statique localement
pnpm deploy       # build + publie sur la branche gh-pages
```

## Lighthouse (build statique)

| Profil  | Performance | SEO | Accessibilité | Best practices |
| ------- | ----------- | --- | ------------- | -------------- |
| Mobile  | 92          | 100 | 95            | 100            |
| Desktop | 99          | 100 | 94            | 100            |

Objectif board (SEO ≥ 90, Perf ≥ 90) : **atteint** sur les deux profils.

## Déploiement

GitHub Pages via la branche `gh-pages` (source = branche), aligné sur le site Élan Gym.
Tant que le domaine `duska.app` n'est pas relié ([THI-67]), le site est servi sous le
sous-chemin projet `https://tbeaumont79.github.io/duska-landing/`.

Variables de build (override possible via GitHub repo *Variables*) :

- `NUXT_PUBLIC_SITE_URL` — URL canonique publique (défaut `https://duska.app`).
- `NUXT_APP_BASE_URL` — préfixe de chemin (défaut `/` ; `/duska-landing/` pour Pages projet).

> Le compte est temporairement verrouillé pour facturation : les workflows GitHub Actions
> peuvent ne pas démarrer. Le build par branche Pages, lui, n'est pas affecté et sert le site ;
> en attendant, le déploiement se fait via `pnpm run deploy`.

[THI-67]: https://github.com/Tbeaumont79/duska-landing

## Structure

```
app.vue                 # racine (favicon baseURL-aware)
pages/index.vue         # page unique : SEO meta + JSON-LD + sections
components/             # SiteHeader, HeroSection, AppMockup, BenefitsSection,
                        # CategoriesSection, TestimonialsSection, CtaSection, SiteFooter
assets/css/main.css     # design tokens (palette lavande/aube) + base
public/                 # favicon.svg, apple-touch-icon.png, og-image.png, .nojekyll
scripts/*.svg           # sources des visuels (rasterisés vers public/)
```

Les visuels de l'app sont des maquettes CSS/SVG légères, à remplacer par de vraies captures
dès qu'elles sont fournies par l'équipe app. Les liens stores seront renseignés à la
publication (gated TM/domaines [THI-67]).
