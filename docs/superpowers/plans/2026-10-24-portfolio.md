# Portfolio Seb Ji — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal :** construire et mettre en ligne le CV-portfolio bilingue de Jean-Sébastien Bisson, en direction hybride « Signal » (héros en particules) + « L'allée » (salons en 3D).

**Architecture :** site statique Astro, contenu dans `src/content/` et textes dans `src/i18n/`. Toute la logique testable (traduction, maths des animations, contraste, courriel) vit dans des modules TypeScript purs de `src/lib/`, sans import Astro. Les composants Astro ne font qu'assembler. Une seconde suite de tests lit le dossier `dist/` après la compilation pour vérifier sécurité, SEO, accessibilité et honnêteté du HTML livré.

**Tech Stack :** Astro (dernière version stable), Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript, `@astrojs/sitemap`, Fontsource (Schibsted Grotesk variable, Big Shoulders Display). Tests : `node --test` (Node 24, suppression des types native) : aucune dépendance de test.

**Spec :** `docs/superpowers/specs/2026-10-24-portfolio-design.md` (à lire avec ce plan).

## Global Constraints

- Dépendances limitées à : `astro`, `tailwindcss`, `@tailwindcss/vite`, `@astrojs/sitemap`, `@fontsource-variable/schibsted-grotesk`, `@fontsource/big-shoulders-display`. Toute autre dépendance exige l'accord de Seb.
- Honnêteté : aucun chiffre, client, résultat, certification ou compétence absent du brief. Donnée manquante → `[À COMPLÉTER : …]` visible dans la page + ligne dans `A_COMPLETER.md`.
- PL-900 toujours « en cours ». « Quatre pays », jamais « trois continents ». Pas de téléphone (`450 512-2489`) dans le HTML. Le CHSLD : une seule phrase, dans À propos.
- Titre du héros, mot pour mot : « Développement des affaires | Vente-conseil en solutions technologiques | Analyse des besoins • Démonstration de solutions • Partenariats ».
- Aucun script inline, aucun style inline écrit dans le HTML, aucun script ou traceur tiers. `build.inlineStylesheets: 'never'`.
- Liens externes : `target="_blank" rel="noopener noreferrer"`.
- Jetons de couleur, polices, comptes de particules, villes et salons : valeurs exactes de la spec, sections 4, 6 et 7.
- Les titres tiennent sur 2 lignes maximum à 360, 390 et 1440 px, en FR comme en EN.
- `prefers-reduced-motion` et l'absence de JavaScript affichent le même contenu, sans animation.
- Commandes documentées pour PowerShell. Chaque tâche ajoute 3 à 5 lignes à `JOURNAL_IA.md` : demande, proposition, correction.
- Commit à la fin de chaque tâche, avec le message indiqué et la ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Changement de langue sur une page à slug traduit** (`/securite` ↔ `/en/security`, `/merci` ↔ `/en/thanks`) : le sélecteur doit mener à la page équivalente, jamais à une 404. Test dans la tâche 2.
2. **Stockage local bloqué** (navigation privée, Safari strict) : la bascule de thème marche quand même ; le choix n'est simplement pas mémorisé. Test dans la tâche 3.
3. **Canvas indisponible ou photo du portrait introuvable** : le héros garde son texte et affiche la photo de repli au lieu d'un rectangle vide. Test dans la tâche 5.
4. **Textes anglais plus longs** : un titre EN ne déborde pas et ne dépasse pas 2 lignes à 360 px. Vérification dans les tâches 6 et 12.
5. **Formulaire envoyé sans JavaScript ou avec un courriel invalide** : la validation native bloque l'envoi ; Netlify reçoit `form-name` ; le pot de miel n'est pas visible. Test dans la tâche 7.

---

### Task 1 : Squelette du projet

**Files :**
- Create : `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/pages/index.astro`, `src/pages/en/index.astro`, `tests/dist/helpers.ts`, `tests/dist/skeleton.test.ts`
- Create : `CLAUDE.md`, `PRODUCT.md`, `JOURNAL_IA.md`, `A_COMPLETER.md`, `README.md`
- Move : les 13 photos reçues → `photos-originales/` ; CV → `public/cv-jean-sebastien-bisson.pdf`

**Interfaces :**
- Produces : scripts npm `dev`, `build`, `check` (`astro check`), `test` (`node --test tests/unit/`), `test:dist` (`node --test tests/dist/`).
- Produces : `tests/dist/helpers.ts` → `readPage(route: string): string` (lit `dist/<route>/index.html` ou `dist/<route>.html`) et `allPages(): { route: string; html: string }[]`.

- [ ] **Step 1 :** copier `Downloads\photos-portfolio.zip` (extrait) dans `photos-originales/` et `Downloads\Jean-Sebastien_Bisson_CV_Vente_Technologique_1.pdf` dans `public/cv-jean-sebastien-bisson.pdf`.
- [ ] **Step 2 :** créer `package.json` (`"type": "module"`, `engines.node >= 22`), installer les dépendances permises, et configurer `astro.config.mjs` :
  - `site: 'https://portfolio-jsb.netlify.app'` (provisoire, noté dans `A_COMPLETER.md`) ;
  - `i18n: { defaultLocale: 'fr', locales: ['fr','en'], routing: { prefixDefaultLocale: false } }` ;
  - `build: { inlineStylesheets: 'never' }` ;
  - intégration `sitemap({ i18n: { defaultLocale: 'fr', locales: { fr: 'fr-CA', en: 'en-CA' } } })` ;
  - `vite.plugins: [tailwindcss()]`.
  Dans `tsconfig.json` : `extends astro/tsconfigs/strict`, `allowImportingTsExtensions: true`.
- [ ] **Step 3 :** écrire le test d'échec `tests/dist/skeleton.test.ts` : `readPage('')` contient `<html lang="fr-CA"` ; `readPage('en')` contient `<html lang="en-CA"` ; aucune page ne contient `<script>` sans attribut `src`.
- [ ] **Step 4 :** lancer `npm run build; npm run test:dist`. Attendu : échec (les pages n'existent pas encore).
- [ ] **Step 5 :** créer les deux pages minimales (un `<h1>` chacune) ; relancer. Attendu : succès.
- [ ] **Step 6 :** rédiger les documents :
  - `CLAUDE.md` : résumé du brief, règle d'honnêteté mot pour mot, commandes, renvoi vers la spec et le plan ;
  - `PRODUCT.md` : public visé, objectif, mode « Persuade » d'Impeccable ;
  - `JOURNAL_IA.md` : entrées de toutes les étapes depuis le début de la session (brief, maquettes A/B, livre C, recherche Awwwards, D/E, choix de l'hybride, déplacement hors de OneDrive) ;
  - `A_COMPLETER.md` : les points ouverts de la spec (section 14) + l'URL provisoire.
- [ ] **Step 7 :** commit `chore: squelette Astro, documents de projet et suite de tests dist`.

### Task 2 : Traductions et chemins localisés

**Files :**
- Create : `src/i18n/fr.json`, `src/i18n/en.json`, `src/i18n/index.ts`, `tests/unit/i18n.test.ts`

**Interfaces :**
- Produces : `type Locale = 'fr' | 'en'` ; `t(locale: Locale, key: string): string` (lève une erreur si la clé manque) ; `localizePath(route: RouteId, locale: Locale): string` ; `routeFromPath(pathname: string): { route: RouteId; locale: Locale }` ; `type RouteId = 'home' | 'security' | 'thanks'`.
- Table des slugs : home `/` ↔ `/en/` ; security `/securite` ↔ `/en/security` ; thanks `/merci` ↔ `/en/thanks`.

- [ ] **Step 1 :** écrire `tests/unit/i18n.test.ts` :
  - les deux JSON ont exactement le même ensemble de clés (aplaties) ;
  - `localizePath('security','en') === '/en/security'` ;
  - `routeFromPath('/securite')` donne `{ route:'security', locale:'fr' }` ;
  - `localizePath(routeFromPath('/en/thanks').route, 'fr') === '/merci'` ;
  - `routeFromPath('/inconnu')` donne `{ route:'home', locale:'fr' }` ;
  - `t('fr','cle.absente')` lève une erreur.
- [ ] **Step 2 :** `npm test`. Attendu : échec, module introuvable.
- [ ] **Step 3 :** implémenter `src/i18n/index.ts` et remplir les JSON avec tous les textes d'interface de la spec (navigation, boutons, titres de sections, légendes du récit Signal, libellés du formulaire, messages d'erreur). Contenu anglais : traduction fidèle, même ton.
- [ ] **Step 4 :** `npm test`. Attendu : succès.
- [ ] **Step 5 :** commit `feat(i18n): textes FR/EN et chemins localisés`.

### Task 3 : Système visuel, mise en page de base et thème

**Files :**
- Create : `src/styles/global.css`, `src/lib/contrast.ts`, `src/lib/theme.ts`, `public/scripts/theme.js`, `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/ThemeToggle.astro`, `src/components/LangSwitch.astro`, `DESIGN.md`
- Test : `tests/unit/contrast.test.ts`, `tests/unit/theme.test.ts`, `tests/dist/layout.test.ts`

**Interfaces :**
- Produces : `contrastRatio(a: string, b: string): number` (hex, WCAG 2.x).
- Produces : `resolveTheme(stored: string | null, prefersDark: boolean): 'dark' | 'light'` (le sombre par défaut si rien n'est stocké et aucune préférence claire).
- Produces : `Base.astro` avec les props `{ locale: Locale; route: RouteId; title: string; description: string }`, qui pose `<html lang data-theme>` et charge `/scripts/theme.js` dans `<head>` (pas en `async` pour éviter le flash).
- Produces : variables CSS `--bg --surface --line --ink --mute --acc --pillar-service --pillar-sales --pillar-tech` dans les deux thèmes (valeurs de la spec, section 4).

- [ ] **Step 1 :** écrire les tests unitaires :
  - `contrastRatio('#EEF2F8','#070A10') >= 7` ; `contrastRatio('#8F99AA','#070A10') >= 4.5` ;
  - `contrastRatio('#0B1220','#F6F7F9') >= 7` ; `contrastRatio('#1F6FD1','#FFFFFF') >= 4.5` ;
  - `resolveTheme(null,false) === 'dark'` ; `resolveTheme('light',true) === 'light'` ; `resolveTheme('garbage',false) === 'dark'`.
- [ ] **Step 2 :** `npm test`. Attendu : échec.
- [ ] **Step 3 :** implémenter `contrast.ts` et `theme.ts`. `public/scripts/theme.js` reproduit `resolveTheme` (c'est un fichier public, donc pas d'import possible) et enveloppe chaque accès à `localStorage` dans un `try/catch`. Ajouter un commentaire `// garder en phase avec src/lib/theme.ts`.
- [ ] **Step 4 :** `npm test`. Attendu : succès.
- [ ] **Step 5 :** écrire `tests/dist/layout.test.ts`. Chaque page doit avoir :
  - un lien d'évitement `href="#contenu"` et `<main id="contenu">` ;
  - un bouton de thème avec `aria-pressed` ;
  - un sélecteur de langue dont le `href` vient de `localizePath` (sur `/securite`, il pointe vers `/en/security`) ;
  - zéro attribut `style="` dans le HTML.
- [ ] **Step 6 :** construire `global.css` (import des polices Fontsource, jetons, `@theme` Tailwind, focus visible 2 px accent, `::selection`, courbes `--ease-out: cubic-bezier(.23,1,.32,1)` et `--ease-in-out: cubic-bezier(.77,0,.175,1)`), puis `Base`, `Header` (mot-symbole « Seb Ji », 4 liens d'ancre, bouton « Me joindre »), `Footer`, `ThemeToggle` et `LangSwitch`.
- [ ] **Step 7 :** `npm run build; npm run test:dist`. Attendu : succès. Captures Playwright des deux thèmes à 390 et 1440 px pour vérification visuelle.
- [ ] **Step 8 :** rédiger `DESIGN.md` (jetons, typographie, règles de mouvement) ; commit `feat(design): jetons, thème clair/sombre, mise en page de base`.

### Task 4 : Contenu structuré

**Files :**
- Create : `src/content.config.ts`, `src/content/experiences/{albi,proteus,ardoisiere,pixel,jackflat}.md`, `src/content/salons.json`, `src/content/skills.json`, `src/content/education.json`, `src/content/projects/.gitkeep`
- Test : `tests/dist/honesty.test.ts`

**Interfaces :**
- Produces : collection `experiences`. Schéma :
  - `order: number`, `kind: 'main' | 'project' | 'compact'`, `company: string`, `url?: string`, `location: {fr, en}`, `mode?: {fr, en}` ;
  - `roles: { title: {fr,en}; start: 'MM/AAAA'; end: 'MM/AAAA' }[]` (Proteus : 2 rôles, VP en premier) ;
  - `context: {fr,en}`, `highlights: {fr: string[], en: string[]}` (exactement 3), `details: {fr: string[], en: string[]}`, `skills: { label: {fr,en}; pillar: 'service' | 'sales' | 'tech' }[]`.
- Produces : collection `salons`. Schéma : `id, name, fullName?, city: {fr,en}, date?: {fr,en}, description: {fr,en}, url?, group: 'proteus' | 'ardoisiere', photo?: string, stage?: boolean`. Les 7 salons Proteus dans l'ordre de la spec, section 6.6, et les 3 salons L'Ardoisière.
- Produces : collection `projects` (même forme minimale : `title, summary, url?, order`), vide.

- [ ] **Step 1 :** écrire `tests/dist/honesty.test.ts`. Sur toutes les pages construites :
  - `450 512` et `512-2489` absents ;
  - `trois continents` / `three continents` absents ;
  - le texte qui suit `PL-900` contient `en cours` (FR) ou `in progress` (EN) ;
  - `CHSLD` apparaît exactement 1 fois sur `/` et 0 fois ailleurs ;
  - `Partenariats` présent dans le h1 ou le titre du héros de `/`.
- [ ] **Step 2 :** remplir les collections à partir du brief, sans rien ajouter. `astro check` valide les schémas.
- [ ] **Step 3 :** `npm run check`. Attendu : 0 erreur. (Le test d'honnêteté passera à la tâche 6, quand les sections afficheront ce contenu.)
- [ ] **Step 4 :** commit `feat(content): expériences, salons, compétences et formation en données`.

### Task 5 : Héros « Signal »

**Files :**
- Create : `src/lib/signal/shapes.ts`, `src/lib/signal/timeline.ts`, `src/lib/signal/engine.ts`, `src/components/SignalHero.astro`
- Test : `tests/unit/signal.test.ts`

**Interfaces :**
- Produces (`shapes.ts`, tout pur) :
  - `isPortraitBackground(r: number, g: number, b: number): boolean` : vrai si `b - r > 45` et la luminance moyenne `> 95` ;
  - `graticule(stepDeg = 20, densityDeg = 2.2): [lat: number, lon: number][]` ;
  - `project(lat: number, lon: number, lon0: number, lat0 = 22): { x: number; y: number; z: number }` : projection orthographique sur la sphère unité ; `z > 0` = face visible.
- Produces (`timeline.ts`) :
  - `seg(p: number, a: number, b: number): number` (borné à 0..1) et `easeInOutCubic(t: number): number` ;
  - `stages(p: number): { m1: number; m2: number; lon0: number; heroOut: number }` avec les bornes 0,12–0,32 (portrait → casque), 0,45–0,62 (casque → globe), rotation `lon0` de −88 à +115 sur 0,62–0,98, et `heroOut` sur 0,06–0,14 ;
  - `wordOpacity(tin: number, index: number, count: number, tout: number): number`.
- Produces (`engine.ts`) : `startSignal(canvas: HTMLCanvasElement, opts: { portraitSrc: string; cities: City[]; onFail: () => void }): () => void`. Retourne une fonction d'arrêt. Appelle `onFail` si `getContext('2d')` est nul ou si l'image ne charge pas. 5 200 particules si largeur ≥ 820 px, sinon 2 400 ; DPR plafonné à 2 ; boucle suspendue hors écran (IntersectionObserver) et quand `document.hidden`.
- `City = { name: string; lat: number; lon: number; label: 'always' | 'desktop' | 'never-mobile' }` : les 10 villes de la spec, section 6.1. Québec et London (Ont.) n'ont pas d'étiquette sur bureau.

- [ ] **Step 1 :** écrire `tests/unit/signal.test.ts` :
  - `isPortraitBackground(95,135,200) === true` ; `(220,180,160) === false` (peau) ; `(40,50,80) === false` (veston marine sombre) ;
  - `project(45.5,-73.6,-88).z > 0` (Montréal visible au départ) ; `project(1.35,103.8,-88).z < 0` (Singapour caché) ; `project(1.35,103.8,115).z > 0` ;
  - `stages(0).m1 === 0` ; `stages(0.4).m1 === 1 && stages(0.4).m2 === 0` ; `stages(1).lon0 === 115` ;
  - `seg(-1,0,1) === 0` et `seg(2,0,1) === 1` ;
  - `wordOpacity(1,0,5,0) === 1` ; `wordOpacity(0,0,5,0) === 0` ; `wordOpacity(1,0,5,1) === 0`.
- [ ] **Step 2 :** `npm test`. Attendu : échec.
- [ ] **Step 3 :** implémenter `shapes.ts` et `timeline.ts`. Reprendre la logique de la maquette `directions/signal.html` (référence locale, non versionnée), découpée selon ces interfaces.
- [ ] **Step 4 :** `npm test`. Attendu : succès.
- [ ] **Step 5 :** implémenter `engine.ts`, puis `SignalHero.astro` :
  - une section de 520vh avec une scène figée (`position: sticky`) ;
  - h1, titre et boutons en HTML réel ;
  - les 3 légendes (textes dans `fr.json`/`en.json`) et la barre de progression ;
  - `<img>` de repli du portrait (Astro `<Image>`, `loading="eager"`) affichée par défaut et masquée seulement quand le moteur démarre (classe `signal-on` posée par le script) ;
  - avec `prefers-reduced-motion`, le moteur ne démarre pas : la section prend sa hauteur naturelle et affiche les légendes en liste.
- [ ] **Step 6 :** vérifier avec Playwright à 360, 390 et 1440 px aux progressions 0 ; 0,4 ; 0,7 ; 0,95. Puis émuler `reduced-motion`, puis bloquer l'image du portrait : le repli doit apparaître et le texte rester lisible.
- [ ] **Step 7 :** commit `feat(hero): récit Signal en particules avec replis`.

### Task 6 : Sections de contenu

**Files :**
- Create : `src/components/{KeyFigures,About,Pillars,PillarTag,Skills,Emerging,BuiltWithAI,Education,Projects}.astro`
- Modify : `src/pages/index.astro`, `src/pages/en/index.astro` (assemblage complet dans l'ordre de la spec, section 6)
- Create : `src/lib/reveal.ts`
- Test : `tests/dist/sections.test.ts`

**Interfaces :**
- Consumes : collections de la tâche 4, `t()` de la tâche 2.
- Produces : `PillarTag.astro` props `{ pillar: 'service' | 'sales' | 'tech'; label: string }` (pastille de couleur et texte ; la couleur n'est jamais le seul indice).
- Produces : `reveal.ts` → `initReveal(root: ParentNode = document): void`. Les éléments `[data-reveal]` reçoivent `is-in` à l'entrée dans l'écran, avec un délai de 70 ms entre frères. Sans JavaScript ou avec `reduced-motion`, rien n'est caché : le CSS ne masque qu'à partir de `html.js-reveal`.

- [ ] **Step 1 :** écrire `tests/dist/sections.test.ts` :
  - sur `/` et `/en/`, les ancres `#parcours #piliers #experiences #salons #competences #ia #formation #contact` existent (mêmes ids dans les deux langues), chacune avec un titre `h2` ;
  - aucun élément `id="projets"` tant que `src/content/projects/` est vide ;
  - le lien vers la page Sécurité est présent dans l'encadré IA.
- [ ] **Step 2 :** `npm run build; npm run test:dist`. Attendu : échec.
- [ ] **Step 3 :** construire les composants avec le contenu de la spec :
  - chiffres clés (5) ; À propos (avec la phrase CHSLD, tirée du brief) ; 3 piliers ;
  - compétences en étiquettes, sans barres ; langues ;
  - Technologies émergentes + encadré « Ce site a été conçu avec l'IA » (résumé de `JOURNAL_IA.md`) ;
  - formation (PL-900 en cours, AEC, puis « Autres formations » en petit) ;
  - Projects (rendu seulement si la collection n'est pas vide).
- [ ] **Step 4 :** `npm run build; npm run test:dist`. Attendu : succès, y compris `honesty.test.ts`.
- [ ] **Step 5 :** captures à 360, 390 et 1440 px en FR et en EN : aucun titre de plus de 2 lignes, aucun débordement horizontal (`document.documentElement.scrollWidth === innerWidth`).
- [ ] **Step 6 :** commit `feat(sections): chiffres, à propos, piliers, compétences, IA, formation`.

### Task 7 : Contact, courriel protégé et page de remerciement

**Files :**
- Create : `src/lib/email.ts`, `src/components/Contact.astro`, `src/pages/merci.astro`, `src/pages/en/thanks.astro`
- Test : `tests/unit/email.test.ts`, `tests/dist/contact.test.ts`

**Interfaces :**
- Produces : `assembleEmail(user: string, domain: string): string`. Le composant passe les fragments par `data-u="sebji56"` et `data-d="gmail.com"`, et un petit module remplace le texte de repli « sebji56 [at] gmail.com » par un lien `mailto:`.

- [ ] **Step 1 :** écrire les tests :
  - unitaire : `assembleEmail('sebji56','gmail.com') === 'sebji56@gmail.com'` ;
  - dist : `sebji56@gmail.com` n'apparaît dans aucune page HTML ;
  - le formulaire a `name="contact"`, `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, un `<input type="hidden" name="form-name" value="contact">` et `action="/merci"` (`/en/thanks` en anglais) ;
  - les champs `nom` (required), `courriel` (`type="email"` required) et `message` (required, `minlength="10"`) ont chacun un `<label for>` ;
  - le champ pot de miel est dans un conteneur `hidden` ou `.sr-only` avec `aria-hidden="true"` et `tabindex="-1"`.
- [ ] **Step 2 :** `npm test; npm run build; npm run test:dist`. Attendu : échec.
- [ ] **Step 3 :** implémenter `email.ts`, `Contact.astro` (LinkedIn, modes de travail, formulaire ; messages d'erreur natifs complétés par des `aria-describedby`) et les pages merci/thanks (`noindex`).
- [ ] **Step 4 :** relancer les tests. Attendu : succès.
- [ ] **Step 5 :** commit `feat(contact): formulaire Netlify, pot de miel, courriel protégé`.

### Task 8 : Expériences et recommandation

**Files :**
- Create : `src/components/ExperienceCard.astro`, `src/components/Experiences.astro`, `src/components/Recommendation.astro`
- Test : `tests/dist/experiences.test.ts`

**Interfaces :**
- Consumes : collection `experiences`, `PillarTag`.
- Produces : `ExperienceCard` props `{ entry: CollectionEntry<'experiences'>; locale: Locale }`. Les rôles multiples s'affichent en progression (le plus récent en haut, ligne verticale avec un point accent pour le rôle actuel de la carte).

- [ ] **Step 1 :** écrire `tests/dist/experiences.test.ts` :
  - chaque lien externe (`href^="http"`) a `target="_blank"` et `rel="noopener noreferrer"` ;
  - l'ordre des sociétés dans `#experiences` est ALBI, Proteus-VR, L'Ardoisière ;
  - la carte Proteus contient « Vice-président de la technologie » avant « Développeur Unreal Engine VR/AR » ;
  - chaque carte principale a un `<details>` dont le `<summary>` vaut « Voir le détail » / « See details » ;
  - la citation est dans un `<blockquote lang="en">` avec le texte exact du brief, et la traduction FR est marquée « Traduction ».
- [ ] **Step 2 :** build + test:dist. Attendu : échec.
- [ ] **Step 3 :** implémenter les composants. Jack Flat BBQ s'affiche en une ligne compacte ; PIXEL en encadré « Projet » suivi de la recommandation (`[À COMPLÉTER : accord de Joséphine]` visible).
- [ ] **Step 4 :** relancer. Attendu : succès. Captures 390 / 1440, avec un `<details>` ouvert et un fermé.
- [ ] **Step 5 :** commit `feat(experiences): cartes, progression Proteus, recommandation`.

### Task 9 : Photos

**Files :**
- Create : `scripts/prepare-photos.mjs`, `src/assets/photos/*.jpg` (générées et versionnées), `src/lib/photos.ts`

**Interfaces :**
- Produces : `photos.ts` → `photoMeta: Record<PhotoId, { alt: {fr,en}; credit?: {fr,en} }>`. Les ids sont les noms de fichiers sans extension.
- Le script lit `photos-originales/` et écrit `src/assets/photos/`. Il applique la table de la spec (section 8) : `extract` pour les recadrages, `blur` composité sur une région pour les floutages. Les régions sont des constantes nommées, en pixels de l'image d'origine.

- [ ] **Step 1 :** écrire le script. Lancer : `node scripts/prepare-photos.mjs`. Attendu : 13 fichiers dans `src/assets/photos/`, aucune erreur.
- [ ] **Step 2 :** ouvrir chaque fichier produit et vérifier : aucun visage de tiers reconnaissable ; plus d'écran « Check internet connection » ; Seb toujours entier dans le cadre.
- [ ] **Step 3 :** brancher les photos dans À propos, la carte Proteus, l'allée (tâche 10) et le repli du héros, avec `<Image>` (AVIF/WebP, `widths`, `sizes`, `alt` depuis `photoMeta`). Les photos hypothétiques ne sont rattachées à aucun salon.
- [ ] **Step 4 :** build. Vérifier dans `dist/_astro/` la présence de `.avif` et `.webp`, et que chaque `<img>` a `width`, `height` et `alt` non vide (ajouter ces assertions à `tests/dist/layout.test.ts`).
- [ ] **Step 5 :** commit `feat(photos): recadrages, floutages et images optimisées`.

### Task 10 : L'allée des salons

**Files :**
- Create : `src/lib/aisle.ts`, `src/components/Aisle.astro`
- Test : `tests/unit/aisle.test.ts`

**Interfaces :**
- Produces : `boothState(i: number, cam: number, opts: { gap: number; side: number }): { x: number; z: number; rotY: number; opacity: number }` :
  - `z = -i*gap + cam` ; `x = ±side` (pair à gauche, impair à droite) ; `rotY = ±14` ;
  - `opacity = clamp((z+4200)/1400) * clamp((420 - z)/420)`.
- Produces : `cameraAt(p: number, n: number, gap: number): number` = `p*(n*gap + 400) - 300`. Valeurs : `gap = 1500` ; `side = min(0.25*largeur, 400)` (bureau), `0.06*largeur` (téléphone).
- Produces : `initAisle(section: HTMLElement): () => void`.

- [ ] **Step 1 :** écrire `tests/unit/aisle.test.ts` :
  - `boothState(0,0,o).x < 0` et `boothState(1,0,o).x > 0` ;
  - `boothState(5, cameraAt(0,7,1500), o).opacity === 0` (trop loin) ;
  - le kiosque `i` est pleinement opaque quand `z = -350` ;
  - `opacity === 0` quand `z >= 420` (passé derrière la caméra) ;
  - `cameraAt(1,7,1500) === 10600`.
- [ ] **Step 2 :** `npm test`. Attendu : échec.
- [ ] **Step 3 :** implémenter `aisle.ts`.
- [ ] **Step 4 :** `npm test`. Attendu : succès.
- [ ] **Step 5 :** implémenter `Aisle.astro` :
  - section `#salons` avec introduction et progression accompagné → seul → conférencier ;
  - scène 3D figée, noms en Big Shoulders Display, sol en perspective, « Prochain kiosque ? » à la fin ;
  - chaque kiosque est un `<article>` focusable via son lien officiel. Au focus clavier, la caméra se place sur ce kiosque.
  - Repli (sans JS ou `reduced-motion`) : grille de cartes.
  - Sous l'allée : les salons L'Ardoisière et la mention « et plusieurs autres salons… ».
- [ ] **Step 6 :** vérifier avec Playwright aux progressions 0,1 ; 0,5 ; 0,99 à 390 et 1440 px. Tabuler à travers les kiosques. Émuler `reduced-motion`.
- [ ] **Step 7 :** commit `feat(salons): allée 3D des salons avec repli en grille`.

### Task 11 : Sécurité

**Files :**
- Create : `public/_headers`, `netlify.toml`, `public/.well-known/security.txt`, `src/pages/securite.astro`, `src/pages/en/security.astro`
- Test : `tests/dist/security.test.ts`

**Interfaces :**
- Produces : `_headers`, appliqué à `/*`, avec les en-têtes exacts de la spec (section 9).
- Produces : `netlify.toml` → `[build] command = "npm run build"`, `publish = "dist"`, `[build.environment] NODE_VERSION = "22"`.

- [ ] **Step 1 :** écrire `tests/dist/security.test.ts` :
  - `dist/_headers` contient la ligne CSP exacte de la spec, plus HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy` et `Cross-Origin-Opener-Policy` ;
  - toute balise `<script>` de chaque page a un `src` qui commence par `/` (même origine) ;
  - aucune URL `http(s)://` dans un attribut `src` ;
  - `dist/.well-known/security.txt` contient `Contact: mailto:` et une date `Expires:` future de plus de 30 jours.
- [ ] **Step 2 :** build + test:dist. Attendu : échec.
- [ ] **Step 3 :** créer les fichiers. Rédiger les pages Sécurité en langage simple : chaque en-tête expliqué en une phrase, la CSP, l'absence de traceurs et de cookies, le formulaire traité par Netlify. Liens « Me joindre » et retour.
- [ ] **Step 4 :** relancer. Attendu : succès. Puis `npm run build; npx astro preview` et vérifier dans la console du navigateur qu'aucune violation CSP n'apparaît. (L'aperçu local n'applique pas `_headers` : la vérification CSP réelle se fait sur l'aperçu Netlify, tâche 12.)
- [ ] **Step 5 :** commit `feat(securite): en-têtes HTTP, CSP stricte, security.txt, page Sécurité`.

### Task 12 : SEO, audits et mise en ligne

**Files :**
- Create : `public/robots.txt`, `public/og-image.jpg`, `public/favicon.svg`, `src/pages/404.astro`
- Modify : `src/layouts/Base.astro` (méta, `hreflang`, canonique, JSON-LD), `README.md` (guide de mise en ligne), `A_COMPLETER.md`, `JOURNAL_IA.md`
- Test : `tests/dist/seo.test.ts`

**Interfaces :**
- Consumes : `localizePath` (pour `hreflang` et la canonique).

- [ ] **Step 1 :** écrire `tests/dist/seo.test.ts`. Pour chaque page indexable :
  - un `<title>` unique et une `meta description` de 50 à 160 caractères ;
  - `og:image` absolue vers `/og-image.jpg`, `og:locale` `fr_CA` ou `en_CA` ;
  - liens `hreflang` `fr-CA`, `en-CA` et `x-default` réciproques ;
  - `link rel=canonical` ;
  - sur `/` et `/en/`, un JSON-LD analysable avec `@type: "Person"`, `name: "Jean-Sébastien Bisson"`, `alternateName: "Seb Ji"`, `sameAs` contenant l'URL LinkedIn.
  - `dist/sitemap-index.xml` existe ; `robots.txt` le référence ; `/merci` et `/en/thanks` ont `noindex`.
- [ ] **Step 2 :** build + test:dist. Attendu : échec.
- [ ] **Step 3 :** implémenter les méta et le JSON-LD, la 404 bilingue, le favicon (monogramme « SJ », formes SVG simples) et l'image Open Graph (page HTML temporaire 1200×630 avec portrait, nom et titre, capturée avec Playwright puis supprimée ; seul le JPG est versionné).
- [ ] **Step 4 :** relancer. Attendu : succès.
- [ ] **Step 5 :** audits finaux :
  - `npm run check`, `npm test`, `npm run test:dist` : tout passe ;
  - `npm audit --omit=dev` : 0 vulnérabilité critique ;
  - budget JavaScript : la somme gzip des fichiers `dist/_astro/*.js` est < 25 Ko (ajouter cette assertion à `tests/dist/seo.test.ts` avec `zlib.gzipSync`) ;
  - `impeccable detect --json src/` : corriger les constats ;
  - captures 360, 390 et 1440 px, FR et EN, thèmes clair et sombre ;
  - Lighthouse mobile (`npx lighthouse http://localhost:4321 --preset=perf --form-factor=mobile`, puis les 4 catégories) : ≥ 95 partout, sinon corriger et relancer.
- [ ] **Step 6 :** mise en ligne, que Seb fait lui-même avec le guide pas à pas du `README.md` :
  1. GitHub Desktop → Add local repository → `C:\Users\SebJi\portfolio-jsb` → Publish repository (public).
  2. Netlify → Add new site → Import from GitHub → choisir le dépôt (les réglages viennent de `netlify.toml`).
  3. Activer la détection des formulaires dans Netlify → Forms.
  4. Envoyer un message test depuis le site publié.

  Ensuite : vérifier les en-têtes sur l'URL publiée (securityheaders.com, saisi par Seb), et la CSP dans la console.
- [ ] **Step 7 :** remettre à Seb :
  - un résumé de ce qui est fait ;
  - `A_COMPLETER.md` à jour ;
  - 5 noms de domaine `.com` / `.ca` vérifiés disponibles au moment de la recherche, et comment en brancher un ;
  - 3 idées de petits projets pour la préparation au PL-900 (dont le jumeau IA, avec ses implications de sécurité).
  
  Commit `feat(seo): méta, Open Graph, JSON-LD, sitemap ; docs de mise en ligne`.
