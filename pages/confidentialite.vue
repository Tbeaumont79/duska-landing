<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl as string) || 'https://duska.app'
const url = `${siteUrl}/confidentialite`

const title = 'Politique de confidentialité — Duska'
const description =
  'Comment Duska traite tes données : application locale-first, aucun compte, aucune vente de données. Mesure d\'audience anonyme (PostHog, UE) et gestion des achats (RevenueCat).'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogUrl: url,
  ogSiteName: 'Duska',
  ogLocale: 'fr_FR',
  robots: 'index, follow',
})

// Date de dernière mise à jour (statique, pas de Date.now() au build).
const lastUpdated = '6 juin 2026'
const contactEmail = 'contact@duska.app'
</script>

<template>
  <div>
    <SiteHeader />
    <main class="legal">
      <div class="container legal-in">
        <h1>Politique de confidentialité</h1>
        <p class="updated">Dernière mise à jour : {{ lastUpdated }}</p>

        <p>
          Duska est une application mobile d'affirmations et de citations douces, pensée pour
          respecter ta vie privée. Cette politique explique simplement quelles données sont
          traitées, pourquoi, et quels sont tes droits. Duska est conçue
          <strong>« local-first »</strong> : par défaut, tes contenus restent sur ton appareil.
        </p>

        <h2>1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement de l'application Duska est l'éditeur de Duska.
          Pour toute question relative à tes données, écris-nous à
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
        </p>

        <h2>2. Le principe : tes données restent sur ton appareil</h2>
        <p>
          Duska fonctionne sans compte et sans serveur applicatif. Tes affirmations favorites,
          ton humeur du jour, ta série (streak) et tes préférences sont stockées
          <strong>localement, sur ton téléphone</strong>. Elles ne sont pas envoyées à un serveur
          et ne sont accessibles qu'à toi. Si tu désinstalles l'application, ces données locales
          sont supprimées.
        </p>

        <h2>3. Les seules données qui quittent l'appareil</h2>
        <p>Trois services tiers, et eux seuls, peuvent recevoir des données techniques :</p>
        <ul>
          <li>
            <strong>Mesure d'audience anonyme (PostHog) :</strong> pour comprendre comment
            l'application est utilisée (écrans visités, actions clés comme révéler une affirmation
            ou activer le premium) et l'améliorer. Ces statistiques sont
            <strong>anonymes</strong> : elles ne contiennent ni nom, ni e-mail, ni numéro de
            téléphone. Les données sont hébergées dans l'<strong>Union européenne</strong>
            (Francfort, Allemagne).
          </li>
          <li>
            <strong>Gestion des achats premium (RevenueCat) :</strong> si tu souscris à Duska
            Premium, des informations liées à ton achat (identifiant d'achat, statut de
            l'abonnement) sont traitées pour activer et restaurer ton accès. Le paiement lui-même
            est géré par l'App Store (Apple) ou le Play Store (Google) ; Duska ne voit jamais tes
            coordonnées bancaires.
          </li>
          <li>
            <strong>Rapports de plantage et de stabilité (Sentry) :</strong> en cas d'erreur ou de
            plantage, un rapport technique (type d'erreur, modèle d'appareil, version de l'app) est
            envoyé pour nous aider à corriger les bugs. Ces rapports ne servent qu'au diagnostic.
          </li>
        </ul>

        <h2>4. Ce que Duska ne fait pas</h2>
        <ul>
          <li>Duska <strong>ne vend pas</strong> tes données, à personne.</li>
          <li>Duska <strong>ne partage pas</strong> tes données à des fins publicitaires.</li>
          <li>Duska <strong>n'affiche pas de publicité</strong> et n'utilise pas de traceur publicitaire.</li>
          <li>Duska ne te demande <strong>aucun compte</strong> ni aucune donnée personnelle pour fonctionner.</li>
        </ul>

        <h2>5. Bases légales (RGPD)</h2>
        <p>
          La gestion des achats repose sur l'exécution du contrat (te fournir le premium). La mesure
          d'audience et les rapports de plantage reposent sur notre intérêt légitime à améliorer
          l'application, mis en œuvre de façon anonyme et minimisée ; tu peux t'y opposer à tout
          moment (voir section 7).
        </p>

        <h2>6. Durée de conservation</h2>
        <p>
          Les données locales restent sur ton appareil tant que tu utilises l'application. Les
          statistiques anonymes et les rapports techniques sont conservés pour une durée limitée
          par nos prestataires, puis supprimés ou agrégés.
        </p>

        <h2>7. Tes droits et tes choix</h2>
        <ul>
          <li>
            <strong>Mesure d'audience :</strong> tu peux la désactiver depuis les réglages de
            l'application.
          </li>
          <li>
            <strong>Suppression :</strong> désinstaller l'application supprime toutes tes données
            locales. Pour toute demande relative aux statistiques anonymes, écris-nous à
            <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
          </li>
          <li>
            Conformément au RGPD, tu disposes des droits d'accès, de rectification, d'effacement,
            d'opposition et de limitation. Pour les exercer, contacte-nous à l'adresse ci-dessus.
            Tu peux aussi introduire une réclamation auprès de la CNIL (www.cnil.fr).
          </li>
        </ul>

        <h2>8. Enfants</h2>
        <p>
          Duska n'est pas destinée aux enfants de moins de 13 ans et ne collecte pas sciemment de
          données les concernant.
        </p>

        <h2>9. Sécurité</h2>
        <p>
          Les échanges avec nos prestataires sont chiffrés en transit (HTTPS). Les données sensibles
          restent, par conception, sur ton appareil.
        </p>

        <h2>10. Modifications</h2>
        <p>
          Cette politique peut évoluer. En cas de changement important, la date de « dernière mise à
          jour » ci-dessus sera actualisée.
        </p>

        <h2>11. Contact</h2>
        <p>
          Une question sur tes données ? Écris-nous à
          <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
        </p>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.legal {
  padding-block: clamp(32px, 6vw, 72px);
}
.legal-in {
  max-width: 760px;
}
.legal h1 {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  color: var(--c-ink);
  margin: 0 0 8px;
}
.legal .updated {
  color: var(--c-ink-mute);
  font-size: 0.92rem;
  margin: 0 0 28px;
}
.legal h2 {
  font-family: var(--font-head);
  font-weight: 600;
  font-size: clamp(1.15rem, 3vw, 1.4rem);
  color: var(--c-ink);
  margin: 32px 0 10px;
}
.legal p,
.legal li {
  color: var(--c-ink-soft);
  line-height: 1.7;
}
.legal ul {
  padding-left: 1.2em;
  margin: 10px 0;
}
.legal li {
  margin-bottom: 10px;
}
.legal a {
  color: var(--c-primary-strong);
  text-decoration: underline;
}
</style>
