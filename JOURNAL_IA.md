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

## 2026-10-24 — Mise en ligne

- **Fait :** dépôt public créé sur GitHub (Sebji56/portfolio-jsb) et code envoyé ; projet Netlify branché sur le dépôt, adresse portfolio-jsb.netlify.app, formulaire détecté, projet rendu public. Seb a fait lui-même les connexions et l'autorisation GitHub.
- **Avant de publier :** la photo SXSW aux droits inconnus a été retirée du dépôt et de son historique.
- **Trouvé en ligne :** Netlify injectait un script de badge que la CSP bloquait (erreurs dans la console) ; badge désactivé, plus aucune erreur sur les pages vérifiées.

## 2026-10-25 — Itération : synthèse du contenu

- **Demande de Seb :** le site est très chargé, s'en tenir à l'essentiel ; réduire l'espacement entre l'animation et le texte sur mobile ; ne rien mettre en ligne. Accord de Joséphine reçu.
- **Fait (branche iteration/synthese, non publiée) :** piliers fusionnés dans Compétences, À propos réduit à deux phrases, 4 chiffres clés au lieu de 5, cartes d'expérience sans étiquettes, introduction des salons en une phrase, encadré IA résumé, marqueur de Joséphine retiré.
- **Mobile :** le portrait en particules se pose maintenant juste au-dessus du texte, quelle que soit la hauteur de l'écran (il était placé à une hauteur fixe, d'où un vide sur les grands téléphones).

## 2026-10-25 — Retours de Seb sur cellulaire

- **Demande :** captures à l'appui, trop d'espace entre le casque ou le globe et leur légende ; remettre les pastilles de compétences sur chaque expérience.
- **Fait :** sur mobile, la forme se pose juste au-dessus de sa légende et le bloc est centré à l'écran ; pastilles rétablies (pilier en couleur).

## 2026-10-25 — Synthèse du CV et du détail des expériences

- **Demande de Seb :** le CV téléchargeable est chargé ; le détail des expériences aussi, surtout Proteus-VR ; mettre Jack Flat BBQ avec les autres expériences.
- **Fait :** CV réécrit sur une seule page (au lieu de deux) à partir d'une source HTML (`docs/cv/cv-fr.html`) imprimée en PDF par Chrome ; mêmes postes, dates et résultats que le CV d'origine, rien d'ajouté, téléphone conservé dans le PDF seulement. Détail de Proteus-VR ramené à 4 points ; Jack Flat BBQ devient une carte d'expérience comme les autres.
- **Vérifié :** chaque affirmation du nouveau CV retrouvée dans l'ancien ; PDF d'une page ; tests à jour.

## 2026-10-25 — CV aéré

- **Demande :** le CV d'une page restait trop chargé (avis de l'entourage de Seb) ; garder le « Profil professionnel » du CV d'origine, qui le résume bien.
- **Fait :** profil d'origine remis mot pour mot ; retirés : « Compétences clés » (redite des expériences), la puce de Jack Flat et de PIXEL, la ligne AEP/ASP, le détail des outils ; une puce de moins pour Proteus-VR et L'Ardoisière. Texte remonté à 10 pt, interligne et marges plus généreux, toujours une page.
- **Leçon :** pour faire tenir sur une page, couper du contenu plutôt que rapetisser le texte.

## 2026-10-25 — CV « entre-deux »

- **Demande :** un juste milieu entre le CV dense et le CV aéré : synthétiser, garder un message clair sur les objectifs, et utiliser l'espace gagné pour bonifier.
- **Fait :** profil d'origine resserré (mêmes idées, objectif intact) ; « Compétences clés » rétablies en deux lignes (mots-clés lus par les recruteurs et les logiciels de tri) ; ajouts tirés du CV d'origine : chiffres ALBI suivis de la méthode de vente, une phrase de contexte Proteus-VR (premiers contacts jusqu'à la conclusion d'ententes avec la direction), Demo Slam du BCEDL, puce Jack Flat, deux puces pour les dix ans à L'Ardoisière, « Claude (skills et plugins) ». Toujours une page, texte à 9,6 pt.

## 2026-10-25 — Animation du héros : jamais à mi-chemin

- **Demande :** captures à l'appui, l'animation de particules pouvait rester figée entre deux formes (nuage de points, légende à moitié écrite) quand on arrête de défiler.
- **Fait :** quand le défilement s'arrête entre deux scènes, la page glisse d'elle-même jusqu'à la scène suivante dans le sens du défilement (casque, globe, Asie), forme complète et légende lisible. Rien ne bouge tant que le doigt est sur l'écran, et la fin du récit laisse descendre librement vers la suite du site. Logique dans `restTarget` (`src/lib/signal/timeline.ts`), testée.
- **Vérifié :** en navigateur à taille de cellulaire, un arrêt à 15 %, 50 % ou 80 % du récit se pose sur la bonne scène.
- **Retour de Seb (cellulaire) :** l'aimantation hésitait, comme si elle ne savait pas où aller. Cause : on attendait la fin complète de l'élan du doigt, plus 160 ms, avant de lancer un second mouvement. Correctif : au toucher, la scène visée est choisie dès que le doigt se lève, selon le sens du geste, et le glissement part aussitôt (un seul mouvement). La souris et le clavier gardent l'ancien comportement.
- **Retour suivant :** « beaucoup plus fluide », mais bascule un peu trop rapide. Le défilement doux du navigateur n'a pas de vitesse réglable : remplacé par un glissement maison de 0,9 s (puis 1,2 s à la demande de Seb) (départ vif dans l'élan du doigt, arrivée douce), interrompu dès qu'on touche l'écran ou la molette.
- **Précision de Seb :** ce n'est pas le glissement qui est trop rapide, mais la transformation des particules (portrait → casque) : on n'a pas le temps de les voir voyager. Cause : la transformation suivait le défilement, qui franchit sa zone en environ 0,35 s au début du glissement. Correctif : chaque transformation a maintenant une durée minimale (1,8 s pour portrait → casque et casque → globe, 2,4 s pour la rotation du globe vers l'Asie), quelle que soit la vitesse du défilement (`approach` dans `timeline.ts`, testée).

## 2026-10-25 — Mise en ligne de l'itération, puis allée des salons

- **Mise en ligne :** à la demande de Seb, la branche iteration/synthese est fusionnée dans main et poussée ; Netlify a publié le nouveau contenu, le CV d'une page et le récit aimanté (vérifié sur portfolio-jsb.netlify.app).
- **Demande suivante :** appliquer la même logique à l'allée des salons.
- **Fait (branche iteration/salons, non publiée) :** l'aimantation est sortie du héros dans un module commun (`src/lib/snap.ts`) et branchée sur l'allée : on se pose toujours avec un kiosque bien devant soi, ou sur l'écran de fin ; au-delà, défilement libre. Pas de durée minimale à ajouter ici : le mouvement de caméra s'étale déjà sur tout le glissement de 1,2 s.
- **Vérifié :** arrêts entre deux kiosques → kiosque suivant ou précédent selon le sens ; après le dernier kiosque → écran de fin ; le héros fonctionne toujours.

## 2026-10-25 — Mode jour « Brume »

- **Demande :** le fond blanc du mode jour est trop intense ; voir des alternatives.
- **Proposé :** quatre palettes (Papier, Brume, Pierre, Aube), présentées côte à côte avec l'actuelle ; contrastes vérifiés pour chacune.
- **Choix de Seb :** Brume, un gris bleuté doux, fidèle au mode nuit. Fond `#E8ECF1` au lieu de `#F6F7F9`, cartes `#F2F5F8` au lieu du blanc pur, contraste du texte ramené de 17,5 à 14,7 (toujours bien au-dessus du seuil de 7) ; accent et pastilles foncés pour rester lisibles. Branche iteration/salons, non publiée.
