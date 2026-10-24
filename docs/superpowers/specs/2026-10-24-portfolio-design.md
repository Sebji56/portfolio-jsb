# Spec de design — Portfolio de Jean-Sébastien Bisson (« Seb Ji »)

Date : 2026-10-24 · Statut : en relecture · Source de vérité du contenu : `prompt-portfolio-claude-code.md` et le CV PDF.

## 1. Objectif et critères de succès

Un CV-portfolio en ligne qui fait décrocher un emploi en vente-conseil / développement des affaires dans une entreprise établie en IA, en automatisation ou en cybersécurité.

Le site est réussi si :

- un recruteur comprend en moins de 10 secondes qui est Seb, ce qu'il apporte et comment le joindre (nom, titre et boutons « Me joindre » / « Télécharger mon CV (PDF) » visibles au premier écran, sans écran de chargement ni porte d'entrée) ;
- le site lui-même prouve un usage professionnel de l'IA : qualité visuelle, rapidité, sécurité, accessibilité, et transparence sur la démarche (encadré « Ce site a été conçu avec l'IA », `JOURNAL_IA.md`, dépôt public) ;
- Lighthouse mobile ≥ 95 dans les 4 catégories, WCAG 2.2 AA, `npm audit` sans vulnérabilité critique ;
- le site, le CV et LinkedIn concordent (titres et dates identiques).

## 2. Contraintes non négociables

- **Honnêteté absolue** : aucun chiffre, client, résultat, certification ou compétence hors du brief. Aucune expertise IA / automatisation / cybersécurité revendiquée : intérêt sérieux, usage concret des outils, apprentissage en cours. PL-900 toujours « en cours ». Donnée manquante → marqueur visible `[À COMPLÉTER : …]` + entrée dans `A_COMPLETER.md`.
- « Quatre pays » (Canada, États-Unis, Singapour, Corée du Sud), jamais « trois continents ».
- Pas de numéro de téléphone sur le site (il reste dans le PDF). Pas de logos d'entreprises ou d'événements.
- Le CHSLD n'apparaît qu'une fois, en une phrase, dans À propos.
- La préférence d'horaire de jour n'apparaît nulle part.
- Visages de tiers reconnaissables recadrés ou floutés.
- Aucun script tiers, aucun traceur, aucune donnée personnelle envoyée à un tiers (sauf Netlify, l'hébergeur, pour le formulaire).
- Commandes données pour PowerShell (Windows).

## 3. Décisions déjà prises

| Sujet | Décision |
|---|---|
| Direction visuelle | Hybride : **D « Signal »** pour le héros et le récit du parcours, **E « L'allée »** pour la section Salons |
| Titre du héros | Titre LinkedIn complet : « Développement des affaires \| Vente-conseil en solutions technologiques \| Analyse des besoins • Démonstration de solutions • Partenariats » |
| Hébergement | Netlify (Netlify Forms pour le contact), adresse gratuite `*.netlify.app` d'abord |
| Dépôt | GitHub public (créé par Seb sur github.com ; `gh` n'est pas installé) |
| Livre du parcours (C) | Abandonné : le récit en particules de D remplit ce rôle |
| Langues | FR par défaut (`/`), EN (`/en/`) |

### Décision proposée dans cette spec (à confirmer)

Pour garder un système visuel unique, l'hybride reprend **la palette et la typographie de D**. De E, on garde la mécanique 3D de l'allée et la police d'enseigne, mais seulement pour les noms de salons. L'accent ambré de E est remplacé par le bleu de D : une seule couleur d'accent.

## 4. Système visuel

**Couleurs (thème sombre par défaut)**

| Rôle | Valeur |
|---|---|
| Fond | `#070A10` |
| Surface | `#0F141C` |
| Bordure fine | `rgba(255,255,255,.08)` |
| Encre | `#EEF2F8` |
| Texte secondaire | `#8F99AA` (uniquement pour les notes ; le texte courant est en encre pleine) |
| Accent « bleu signal » | `#4DA3FF` (rappelle le fond du portrait) |
| Pilier Service | `#F2B880` |
| Pilier Vente-conseil | `#4DA3FF` |
| Pilier Technologies émergentes | `#5FD6B0` |

**Thème clair** (bascule) : fond `#F6F7F9`, surface `#FFFFFF`, encre `#0B1220`, accent assombri `#1F6FD1` pour garder un contraste AA. Chaque paire de couleurs est vérifiée en AA.

**Typographie (auto-hébergée via Fontsource)**

- Schibsted Grotesk (variable) : affichage et texte.
- Big Shoulders Display : uniquement les noms de salons dans l'allée (police d'enseigne).
- Titres : interlettrage −0,045 em, interligne 0,92–1 ; texte : 17–18 px, interligne 1,55 ; mesure ≤ 75 caractères.
- Les titres tiennent sur 2 lignes maximum à toutes les largeurs (règle du skill Taste).

**Détails** : bordures fines, halo radial discret derrière les éléments forts, boutons pleins en pilule, `:active` à `scale(.97)`, survols limités aux appareils à pointeur fin (`@media (hover:hover)`).

## 5. Architecture

**Stack** : Astro (statique) + Tailwind CSS v4 (`@tailwindcss/vite`) + TypeScript. Animations en TypeScript natif (canvas 2D, transformations CSS 3D) : ni librairie d'animation, ni three.js, ni Lenis. Le défilement fluide vient d'un lissage maison.

**Dépendances prévues** (rien d'autre) : `astro`, `tailwindcss`, `@tailwindcss/vite`, `@astrojs/sitemap`, `@fontsource-variable/schibsted-grotesk`, `@fontsource/big-shoulders-display`. `sharp` est déjà fourni avec Astro pour les images.

```
portfolio-jsb/
├─ CLAUDE.md  PRODUCT.md  DESIGN.md  JOURNAL_IA.md  A_COMPLETER.md  README.md
├─ astro.config.mjs  netlify.toml  package.json  tsconfig.json  .gitignore
├─ docs/superpowers/specs/ · docs/superpowers/plans/
├─ photos-originales/            (photos reçues, jamais publiées telles quelles ; .gitignore)
├─ scripts/prepare-photos.mjs    (recadrages + floutages avec sharp → src/assets/photos)
├─ public/
│  ├─ _headers  robots.txt  cv-jean-sebastien-bisson.pdf  og-image.jpg  favicon.svg
│  ├─ .well-known/security.txt
│  └─ scripts/theme.js           (bascule de thème, chargé avant le rendu, sans script inline)
└─ src/
   ├─ content.config.ts
   ├─ content/  experiences/*.md · salons.json · skills.json · education.json · projects/ (vide)
   ├─ i18n/     fr.json · en.json · index.ts (t(), chemins localisés)
   ├─ assets/photos/*.jpg        (versions recadrées)
   ├─ lib/      signal.ts (particules) · aisle.ts (allée 3D) · reveal.ts (apparitions)
   ├─ components/  Header · SignalHero · KeyFigures · About · Pillars · ExperienceCard ·
   │               Experiences · Aisle · Skills · Emerging · BuiltWithAI · Education ·
   │               Contact · Projects · Footer · ThemeToggle · LangSwitch · PillarTag
   ├─ layouts/Base.astro          (SEO, Open Graph, hreflang, JSON-LD Person)
   ├─ styles/global.css           (jetons de couleur et de typographie)
   └─ pages/  index · securite · merci · 404 · en/index · en/security · en/thanks
```

**Contenu** : chaque expérience est un fichier Markdown avec un frontmatter bilingue (rôle, dates, lieu, URL, contexte, réalisations clés, détail, compétences étiquetées par pilier). Salons, compétences et formation sont en JSON. Les textes d'interface sont dans `fr.json` / `en.json`. Seb met son contenu à jour sans toucher aux composants.

**Section Projets** : affichée seulement si `src/content/projects/` contient au moins une entrée.

## 6. Pages et sections (page d'accueil, dans l'ordre)

1. **Héros + récit « Signal »** (section figée pendant environ 5 écrans de défilement)
   - État initial : nom (h1), titre LinkedIn, proposition de valeur, deux boutons ; à droite (en haut sur téléphone), le portrait en particules.
   - Au défilement, les particules forment le **casque VR** (« J'ai bâti le produit de l'intérieur », Proteus, 2023–2024), puis le **globe** des villes (« Puis je l'ai vendu, en personne », puis « Dans quatre pays »), qui tourne de l'Amérique du Nord vers Singapour et Séoul.
   - Les légendes se dévoilent mot à mot, du flou au net. Une barre de progression suit les étapes.
   - Villes affichées : Montréal, Québec, Toronto, London (Ont.), Vancouver, Austin, Atlanta, Denver, Singapour, Séoul.
2. **Chiffres clés** : 10+ ans en service et en vente · ~25 véhicules/mois chez ALBI · démarchage dans 4 pays · 7 grands salons et conférences · de développeur à vice-président de la technologie.
3. **À propos** : histoire courte (entreprise familiale → service → vente internationale de technologie → vente automobile → virage IA / automatisation / cybersécurité), avec la phrase unique sur le CHSLD. Une photo (BCEDL kiosque).
4. **Mes trois piliers** : 3 cartes (Service / Vente-conseil, développement des affaires et partenariats / Technologies émergentes), 3–4 compétences chacune et les expériences qui les prouvent.
5. **Expériences** : ordre chronologique inverse. ALBI Occasion · Proteus-VR (progression Développeur → VP dans une même carte) · L'Ardoisière. Puis l'encadré « Projet » PIXEL / EXCLAM et Jack Flat BBQ en une ligne. Chaque carte contient rôle, dates, contexte en une ligne, lien externe (`target="_blank" rel="noopener noreferrer"`), 3 réalisations, étiquettes de piliers et un bouton « Voir le détail » (`<details>` natif).
   - Sous la carte PIXEL, l'encadré « Ce qu'on dit de moi » : la recommandation de Joséphine Bories-Rao, en anglais mot pour mot (`lang="en"`), avec une traduction française discrète identifiée comme telle et le lien « Voir sur LinkedIn ». `[À COMPLÉTER : accord de Joséphine]`
6. **Sur le terrain : salons et événements** (« L'allée »)
   - Introduction : ce que les salons démontrent, et la progression accompagné → seul → conférencier.
   - Allée 3D : EduTECH Asia (Singapour, 2023) → SXSW EDU (Austin, 2024) → NSTA (Atlanta) → BCEDL Demo Slam (Vancouver, avril 2024, étiquette « Sur scène ») → OCTE (London, mai 2024) → ISTE (Denver, juin 2024) → Collision (Toronto, juin 2024, délégation québécoise d'Investissement Québec International).
   - Chaque kiosque montre le nom en police d'enseigne, la ville, la date connue, une ligne de description et le lien officiel. Sans photo confirmée, la carte est en typographie seulement.
   - Fin de l'allée : « Prochain kiosque ? » + « Me joindre ».
   - Sous l'allée : la liste des salons L'Ardoisière (Salon national de l'habitation, Expo habitat Québec, Salon Chalets et Maisons de campagne, « et plusieurs autres »).
7. **Compétences et outils** : compétences clés, puis outils par catégorie (IA · CRM et bureautique · VR/AR et développement · création de contenu), puis langues. Uniquement des étiquettes.
8. **Technologies émergentes : où j'en suis** : usage quotidien de ChatGPT et Claude (skills, plugins), PL-900 en cours, ce que Seb veut apprendre, postes visés. Encadré « Ce site a été conçu avec l'IA » (brief, démarche par étapes, vérifications, leçons) avec un lien vers la page Sécurité.
9. **Formation** : PL-900 (en cours), AEC réalité virtuelle et augmentée ; sous-titre discret « Autres formations » (AEP, ASP).
10. **Contact** : courriel protégé, LinkedIn, formulaire, modes de travail (présentiel, hybride, télétravail ; Grand Montréal).

Autres pages : `/securite` (en-têtes HTTP, CSP, absence de traceurs, en langage simple), `/merci` (après l'envoi du formulaire), `404`, et leurs équivalents anglais.

## 7. Animation, performance et solutions de repli

**Signal (canvas 2D)**
- Les particules sont échantillonnées à l'exécution à partir de la photo (le fond bleu est retiré), d'un casque dessiné en canvas et d'une grille de globe (méridiens et parallèles en points).
- Environ 5 200 particules sur bureau, 2 400 sur téléphone ; résolution limitée à DPR 2.
- L'animation s'arrête quand la section est hors écran (IntersectionObserver) ou quand l'onglet est caché.
- Le canvas est décoratif (`aria-hidden`) : tout le texte reste du vrai HTML.

**Allée (CSS 3D)**
- Seulement `transform` et `opacity`, avec `perspective` sur la scène ; les kiosques éloignés reçoivent `visibility:hidden`.
- Le sol est une grille en perspective dont la position suit le défilement.

**Apparitions** : à l'entrée de chaque section, titre puis texte puis image, décalés de 60–90 ms, montée de 16–24 px (`ease-out` personnalisé, 300–500 ms). Une seule fois, jamais de contenu bloqué si le script échoue.

**Repli** (`prefers-reduced-motion`, sans JavaScript, ou appareil très lent)
- Signal : le portrait recadré (photo réelle) et les trois légendes en liste statique, sans section figée.
- Allée : une grille de cartes de salons.
- Le contenu est identique dans tous les cas.

**Budgets** : JavaScript total < 25 Ko gzip ; LCP < 2,5 s sur téléphone (le h1 est l'élément LCP, pas le canvas) ; CLS ≈ 0.

## 8. Photos

`scripts/prepare-photos.mjs` (sharp) produit des versions recadrées dans `src/assets/photos/`. Astro `<Image>` les sert en AVIF/WebP avec dimensions explicites et un texte alternatif descriptif. Les métadonnées sont déjà retirées.

| Photo | Traitement |
|---|---|
| `portrait-professionnel` | Héros (repli), image Open Graph |
| `bcedl-vancouver-conference` | Recadrer au-dessus de l'auditoire (têtes au premier plan retirées) |
| `nsta-atlanta` | Recadrer sur Seb et l'enseigne (passants sur les côtés retirés) |
| `sxsw-edu-austin-2024-demo-casque` | Flouter les personnes en arrière-plan ; crédit photo `[À COMPLÉTER]` |
| `collision-toronto-portrait-casque-vr` | Crédit photo `[À COMPLÉTER]` |
| `kiosque-proteus-salon-a-identifier-1` | Recadrer l'exposant voisin et l'affiche avec visages ; salon `[À COMPLÉTER]` (hypothèse : ISTE Denver) |
| `kiosque-proteus-salon-a-identifier-2` | Salon `[À COMPLÉTER]` (hypothèse : OCTE) |
| `kiosque-proteus-quebec-a-identifier-2` | Retirer l'écran « Check internet connection » et la personne de dos ; salon `[À COMPLÉTER]` |
| Autres | Utilisés tels quels, en recadrage léger |

Une photo hypothétique n'est jamais rattachée à un salon tant que Seb ne l'a pas confirmée.

## 9. Sécurité

**`public/_headers`**
- `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()`
- `Cross-Origin-Opener-Policy: same-origin`

**Pour garder la CSP stricte** : `build.inlineStylesheets: 'never'` dans Astro, aucun script inline (thème et animations dans des fichiers), aucun attribut `style=` généré côté client (les variables CSS sont posées via `element.style.setProperty`, ce que la CSP autorise).

**Formulaire** : Netlify Forms (`data-netlify="true"`, champ pot de miel `netlify-honeypot`), validation HTML native + messages accessibles, redirection vers `/merci`.

**Courriel** : assemblé en JavaScript à partir de fragments, avec en repli sans JavaScript le texte « sebji56 [at] gmail.com ».

**Autres** : `/.well-known/security.txt` (Contact, Expires, Preferred-Languages fr, en), `.gitignore` propre, aucun secret, `npm audit` à chaque étape.

## 10. SEO et accessibilité

- Titre et description par page, `hreflang` FR/EN, URL canonique, `sitemap.xml` (`@astrojs/sitemap`), `robots.txt`, JSON-LD `Person` (nom, alternateName « Seb Ji », jobTitle, address Terrebonne, sameAs LinkedIn, knowsLanguage).
- Image Open Graph 1200×630 (portrait + nom + titre), générée une fois à partir d'une page HTML capturée avec Playwright, puis stockée en fichier statique.
- HTML sémantique (`header`, `main`, `section` avec titres, `nav`), lien d'évitement, focus visible, navigation au clavier (y compris dans l'allée : les kiosques sont aussi atteignables par Tab), contraste AA, `lang` correct pour la citation anglaise.

## 11. Vérifications

À chaque étape visuelle :
- captures Playwright à 360, 390 et 1440 px, comparées à la direction validée ;
- détecteur Impeccable (`impeccable detect`) et contrôle des règles du skill Taste qui ne contredisent pas le brief.

Avant de déclarer le travail terminé :
- `npm run build` et `astro check` sans erreur ;
- Lighthouse mobile ≥ 95 dans les 4 catégories ;
- `npm audit` sans vulnérabilité critique ;
- vérification des liens ;
- test du formulaire en préproduction Netlify ;
- revue de code et revue de sécurité.

## 12. Étapes et commits

1. Squelette Astro + Tailwind + i18n + `CLAUDE.md`, `PRODUCT.md`, `JOURNAL_IA.md`, `A_COMPLETER.md`
2. Système visuel (jetons, polices, thème clair/sombre, `DESIGN.md`)
3. Héros Signal (particules + replis)
4. Sections de contenu (chiffres, À propos, piliers, compétences, technologies émergentes, formation, contact)
5. Expériences et recommandation
6. Allée des salons (3D + repli)
7. Photos (recadrages, floutages, `<Image>`)
8. Sécurité (`_headers`, CSP, formulaire, `security.txt`, page Sécurité)
9. SEO et accessibilité (méta, Open Graph, JSON-LD, sitemap, audits)
10. Mise en ligne Netlify + guide pas à pas pour débutant + 5 noms de domaine disponibles

## 13. Hors périmètre

Jumeau IA conversationnel (idée de projet futur), analytique, blogue, CMS, formulaire autre que Netlify, domaine personnalisé (expliqué, pas branché).

## 14. Points ouverts

- Confirmer l'unification de l'hybride sur la palette et la typographie de D (section 3).
- Le dossier du projet est dans `OneDrive\Documents` : la synchronisation de `node_modules` peut ralentir ou verrouiller des fichiers pendant `npm install` / `npm run build`. Option : exclure le dossier de la synchronisation, ou déplacer le projet hors de OneDrive avant l'installation.
- Éléments `[À COMPLÉTER]` : accord de Joséphine Bories-Rao ; nom des salons des 4 photos de kiosques ; droits et crédits des 2 photos professionnelles ; année de NSTA (non fournie).
