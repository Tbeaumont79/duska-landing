# Hébergement Duska — évaluation Netlify (THI-84)

> Recommandation CTO. Décision finale + création du compte = founder/CEO.

## TL;DR — **GO sur Netlify** ✅

Netlify résout la cause racine de la panne (dépôt privé non servi par GitHub Pages),
donne une vraie barrière de tests au déploiement, et nous rend indépendants du verrou
de facturation GitHub. Coût : **0 €** (offre gratuite largement suffisante). Risque : **faible**.
Une seule action humaine est requise : créer le compte Netlify et autoriser GitHub.

## Cause racine de la panne (THI-83)

- Le dépôt `duska-landing` est **privé** ; le compte GitHub est sur l'offre **gratuite**.
- **GitHub Pages ne sert pas un dépôt privé sur l'offre gratuite** → l'URL renvoie
  « Site not found ». Vérifié via l'API : `POST .../pages` → *« Your current plan does not
  support GitHub Pages for this repository »* (HTTP 422).
- Le site Élan Gym fonctionne parce que son dépôt est **public** ; Duska est privé.
- Aggravant : les workflows GitHub Actions (CI + déploiement) **ne démarrent pas** (verrou
  de facturation du compte) → la « CI » actuelle est en réalité décorative.
- **Le code n'était pas en cause** : `nuxt generate` est vert (13 routes pré-rendues).

## Critères d'évaluation

| Critère | Netlify | Verdict |
|---|---|---|
| **Dépôt privé** | Servi gratuitement (build côté Netlify) | ✅ règle la cause racine |
| **Build Nuxt SSG** | Détecte Nuxt + pnpm ; `nuxt generate` → `.output/public` | ✅ natif, `netlify.toml` fourni |
| **Coût** | Offre gratuite : 100 GB bande passante/mois, 300 min build/mois | ✅ très au-dessus des besoins d'une landing |
| **Barrière de tests (CI gate)** | Le build (`generate && smoke`) tourne à chaque deploy ; **rouge = pas de mise en ligne** | ✅ la vraie protection que le board demande |
| **Deploy previews** | URL de prévisualisation **automatique par PR** | ✅ revue avant merge |
| **Indépendance du verrou GitHub** | Build sur l'infra Netlify, pas GitHub Actions | ✅ insensible au verrou facturation |
| **Domaine `duska.app`** | Sous-domaine `*.netlify.app` immédiat ; domaine custom + HTTPS auto | ✅ migration domaine simple plus tard |
| **Rollback** | 1 clic vers un deploy précédent ; historique conservé | ✅ |

## Blocages / prérequis (action humaine)

1. **Créer un compte Netlify** (gratuit) et **autoriser l'app GitHub** sur le dépôt
   `Tbeaumont79/duska-landing`. Aucun agent ne peut le faire (OAuth/compte = humain).
2. À la connexion, Netlify lit `netlify.toml` (déjà au dépôt) → aucune config manuelle.
3. Après le 1er deploy : copier l'URL `*.netlify.app` dans la variable d'env Netlify
   `NUXT_PUBLIC_SITE_ORIGIN` (canonical/SEO correct) — ou plus tard `https://duska.app`.

## Comparaison rapide des options

- **GitHub Pages (statu quo)** : ❌ ne sert pas le privé sur l'offre gratuite. Faudrait rendre
  le dépôt **public** (gratuit, instantané — _solution de repli immédiate_) ou payer GitHub Pro.
- **Cloudflare Pages** : techniquement valable (choisi pour Élan Gym), mais le board demande
  explicitement Netlify, et Netlify est légèrement plus simple pour le SSG Nuxt + previews.
- **Netlify** : ✅ recommandé — privé OK, gate réel, previews, gratuit, indépendant du verrou.

## Repli immédiat (zéro coût, zéro compte) si remise en ligne urgente

Rendre le dépôt **public** → GitHub Pages le sert aussitôt (playbook Élan Gym déjà validé,
aucun secret dans le dépôt — vérifié). Réversible. À n'utiliser que si le board accepte
d'exposer la source de la landing en attendant Netlify.

## Plan de migration (faible risque, ~30 min une fois le compte créé)

1. Founder crée le compte Netlify + autorise GitHub. _(humain)_
2. « Add new site » → import `duska-landing` → Netlify lit `netlify.toml` → 1er deploy.
3. Vérifier l'URL `*.netlify.app` (landing + /blog + articles), renseigner `NUXT_PUBLIC_SITE_ORIGIN`.
4. (Plus tard) relier `duska.app` + HTTPS automatique.
5. Retirer le déploiement GitHub Pages (`deploy.yml`, branche `gh-pages`) une fois Netlify confirmé.
