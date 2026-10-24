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
