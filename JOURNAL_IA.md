# Journal de la démarche IA

Ce site a été conçu avec Claude Code (Anthropic). Ce journal note, à chaque étape, ce que Seb a demandé, ce que l'IA a proposé et ce que Seb a corrigé ou décidé. Il sert de matière pour l'encadré « Ce site a été conçu avec l'IA ».

## 2026-10-24 — Brief et inventaire

- **Demande :** un brief détaillé (profil, règle d'honnêteté, structure, sécurité, design), le CV PDF et 13 photos de salons.
- **Proposition :** inventaire des skills et outils disponibles ; lecture du CV et des photos ; repérage des visages de tiers et des éléments à recadrer ; hypothèses sur les salons non identifiés, gardées comme marqueurs à confirmer.
- **Décisions de Seb :** titre LinkedIn complet dans le héros, hébergement Netlify, dépôt GitHub public.

## 2026-10-24 — Premières directions visuelles

- **Proposition :** deux maquettes statiques, A « Ardoise » (éditoriale, inspirée de l'ardoise familiale) et B « Badge » (style produit tech, portrait en badge de salon).
- **Correction de Seb :** préférence pour B, mais demande d'explorer « le livre de mon parcours » avec une animation.
- **Proposition :** maquette C, un livre dont les pages tournent au défilement, recommandée comme section plutôt que comme site entier (règle des 10 secondes).

## 2026-10-24 — Recherche Awwwards et directions animées

- **Correction de Seb :** pas convaincu ; demande de s'inspirer de la galerie Awwwards Technologie et de ses animations.
- **Proposition :** analyse de 5 sites primés (portrait en particules, mur de cartes courbé, jumeau IA, texte du flou au net, monde 3D) ; repérage des pièges (écrans de chargement, portes d'entrée audio). Deux maquettes animées : D « Signal » (particules : portrait → casque VR → globe des villes) et E « L'allée » (hall de salon en 3D).
- **Décision de Seb :** hybride D pour le héros et le parcours, E pour la section Salons.

## 2026-10-24 — Spec, plan et organisation

- **Proposition :** spec de design complète, puis plan d'implémentation en 12 tâches avec tests automatiques avant chaque fonctionnalité.
- **Décisions de Seb :** approbation de la spec (une seule identité visuelle, celle de D) ; projet déplacé hors de OneDrive pour éviter les problèmes de synchronisation ; exécution dans une seule session avec une revue complète à la fin.

## 2026-10-24 — Tâche 1 : squelette

- **Fait :** projet Astro 7 + Tailwind v4, configuration bilingue, compilation sans CSS inline, premiers tests sur le site compilé (langue des pages, absence de script inline).
- **Choix technique :** les tests utilisent l'outil intégré à Node, sans dépendance supplémentaire.

## 2026-10-24 — Tâche 2 : traductions

- **Fait :** tous les textes d'interface en français et en anglais, avec un test qui vérifie que les deux langues ont exactement les mêmes clés, et des chemins traduits (/securite ↔ /en/security).
- **Vigilance honnêteté :** « ce que je veux apprendre ensuite » n'était pas précisé dans le brief ; un marqueur [À COMPLÉTER] le remplace plutôt qu'une invention.

## 2026-10-24 — Tâche 3 : système visuel

- **Fait :** couleurs, polices auto-hébergées, thème clair/sombre (sombre par défaut), en-tête, pied de page, sélecteur de langue, lien d'évitement. Contrastes vérifiés par des tests.
- **Correction en cours de route :** Astro intégrait les petits scripts directement dans le HTML, ce que la politique de sécurité interdit ; ils sont maintenant servis en fichiers séparés.

## 2026-10-24 — Tâche 4 : contenu

- **Fait :** expériences, salons, compétences et formation en fichiers de données, validés automatiquement ; Seb peut les modifier sans toucher au code.
- **Choix :** titre « Représentant des ventes automobiles » repris du CV (harmonisé avec LinkedIn) plutôt que la forme courte du brief.

## 2026-10-24 — Tâche 5 : héros Signal

- **Fait :** le portrait en particules se transforme en casque VR puis en globe des villes au défilement ; les légendes se dévoilent mot à mot. Versions de repli vérifiées : mouvement réduit, photo qui ne charge pas, téléphone.
- **Débogage :** l'animation semblait « en retard » ; la cause était le navigateur de test en arrière-plan (2 images/s). Le lissage dépend maintenant du temps écoulé, ce qui aide aussi les téléphones lents. Rayures du portrait sur téléphone corrigées (tirage aléatoire des particules).

## 2026-10-24 — Tâche 6 : sections

- **Fait :** chiffres clés, À propos (avec la phrase unique sur le CHSLD), trois piliers, compétences et outils, technologies émergentes avec l'encadré « Ce site a été conçu avec l'IA », formation, et section Projets qui n'apparaît que lorsqu'un projet existe.
- **Vérifié :** aucun titre de plus de deux lignes à 360, 390 et 1440 px, en français comme en anglais ; aucun débordement horizontal.

## 2026-10-24 — Tâche 7 : contact

- **Fait :** formulaire Netlify avec champ « pot de miel » contre les robots, validation native et messages d'aide, courriel reconstitué en JavaScript (absent du HTML), pages de remerciement non indexées.

## 2026-10-24 — Tâche 8 : expériences

- **Fait :** cartes ALBI, Proteus-VR (progression de développeur à vice-président), L'Ardoisière, encadré Projet PIXEL, recommandation citée mot pour mot en anglais avec traduction française et marqueur d'accord, Jack Flat BBQ en une ligne. Tous les liens externes s'ouvrent en toute sécurité dans un nouvel onglet (vérifié par test).

## 2026-10-24 — Tâche 9 : photos

- **Fait :** script de préparation qui recadre les visages de tiers et les éléments distrayants (auditoire BCEDL, passants NSTA, exposant voisin, écran d'erreur) ; images servies en AVIF et WebP avec textes alternatifs FR/EN.
- **Correction :** un premier floutage laissait un rectangle visible sur la photo SXSW ; remplacé par un recadrage.

## 2026-10-24 — Tâche 10 : allée des salons

- **Fait :** au défilement, on marche dans un hall d'exposition en 3D : EduTECH Asia, SXSW EDU, NSTA, BCEDL (sur scène), OCTE, ISTE et Collision, jusqu'à « Prochain kiosque ? ». Au clavier, chaque kiosque qui reçoit le focus est amené devant soi. Sans animation : une grille de cartes. Salons de L'Ardoisière listés en dessous.
- **Débogage :** la progression était calculée sur toute la section au lieu de la scène, et les kiosques masqués n'étaient plus atteignables au clavier ; les deux sont corrigés.

## 2026-10-24 — Tâche 11 : sécurité

- **Fait :** en-têtes HTTP (CSP stricte, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP), fichier security.txt, page « Sécurité de ce site » en langage simple, configuration Netlify.
- **Vérifié :** la CSP réelle a été injectée dans le navigateur de test sur 4 pages : aucune ressource bloquée, toutes les fonctions marchent.

## 2026-10-24 — Tâche 12 : SEO, audits, mise en ligne

- **Fait :** méta-données par page, Open Graph avec image de partage, hreflang FR/EN, données structurées Person, sitemap, robots.txt, favicon, page 404 bilingue, guide de mise en ligne pas à pas.
- **Audits :** Lighthouse mobile — accueil 99 / 96 / 100 / 100, page Sécurité 100 partout ; 0 vulnérabilité npm ; 0 constat du détecteur Impeccable ; JavaScript total sous 25 Ko compressé.
- **Correction :** le lien « English » avait une étiquette accessible différente de son texte visible ; retirée.

## 2026-10-24 — Revue finale et corrections

- **Revue :** un relecteur indépendant (sous-agent sur le modèle le plus performant) a relu toute la branche : aucun problème critique, quatre importants.
- **Corrigé :** la phrase du héros disait « commercialisé dans quatre pays » alors que le brief parle de démarchage ; reformulée en « présenté à des districts scolaires dans quatre pays ». Kiosque Collision et fin de l'allée atteignables au clavier. Proposition de valeur rétablie sur téléphone. Adresses uniformisées avec barre oblique finale (évite une redirection qui aurait pu perdre les messages du formulaire). Menu ajouté pour les téléphones. Phrase inexacte corrigée sur la page Sécurité.
- **Leçon :** même avec une règle d'honnêteté écrite, une formulation peut glisser ; la relecture indépendante l'a attrapée.

## 2026-10-24 — Fusion

- **Décision de Seb :** validation des outils de développement @astrojs/check et typescript ; fusion de la branche de travail dans main, prête à publier avec GitHub Desktop.

## 2026-10-24 — Données fournies par Seb

- **Fourni :** l'objectif après la PL-900, intégré en français et en anglais (le titre devient « Mon objectif après la PL-900 »). Message envoyé à Joséphine pour son accord.
- **Décision :** les deux photos de photographes d'événement restent hors du site, faute de pouvoir les créditer.

## 2026-10-24 — Photos OCTE et ISTE

- **Fourni :** Seb a identifié les deux photos de kiosques ; elles correspondaient aux hypothèses faites au départ (ISTE : stand B-43 à Denver ; OCTE : exposant en enseignement technologique). Les 7 salons de l'allée ont maintenant une photo.
- **Débogage :** le nouveau test échouait d'abord pour une mauvaise raison (barre oblique inverse perdue dans une expression régulière) ; corrigé, puis vérifié qu'il échoue bien sans la photo.

## 2026-10-24 — Crédit photo et année NSTA

- **Fourni :** l'année de NSTA (2024) et le lien Flickr de la photo Collision.
- **Vérifié avant usage :** la licence de la photo sur Flickr est CC BY 2.0 et la page nomme le photographe (Ramsey Cardy / Collision via Sportsfile) ; la photo est maintenant dans la carte Proteus-VR avec son crédit et le lien vers la licence, ce qui règle aussi un doublon de photo signalé par la revue.
