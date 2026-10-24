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
