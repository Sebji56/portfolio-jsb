# Portfolio de Jean-Sébastien Bisson (« Seb Ji »)

CV-portfolio bilingue (FR par défaut, EN sous `/en/`) dont le but unique est de faire décrocher à Seb un emploi en vente-conseil / développement des affaires dans une entreprise d'IA, d'automatisation ou de cybersécurité. Un recruteur doit comprendre en moins de 10 secondes qui il est, ce qu'il apporte et comment le joindre. Le site sert aussi de démonstration d'un usage professionnel de l'IA.

- Spec : `docs/superpowers/specs/2026-10-24-portfolio-design.md` (source de vérité du design)
- Plan : `docs/superpowers/plans/2026-10-24-portfolio.md`
- Journal de la démarche IA : `JOURNAL_IA.md` (ajouter une entrée à chaque étape)
- Données manquantes : `A_COMPLETER.md`

## Règle d'honnêteté absolue (mot pour mot du brief)

> N'ajoute aucun chiffre, résultat, client, projet, certification ou compétence qui n'est pas dans cette liste. Mets en valeur les résultats réels (ventes chez ALBI, partenariat Éditions CEC, salons internationaux) sans les arrondir à la hausse. Ne présente pas d'expertise technique en IA, en automatisation ou en cybersécurité que je n'ai pas : présente plutôt un intérêt sérieux, une utilisation concrète des outils et un apprentissage en cours. Si une donnée manque, insère un marqueur visible `[À COMPLÉTER : …]` et liste-les dans `A_COMPLETER.md`.

Aussi : PL-900 toujours « en cours » ; « quatre pays », jamais « trois continents » ; pas de numéro de téléphone sur le site ; le CHSLD en une seule phrase dans À propos ; aucune mention de préférence d'horaire ; pas de logos ; visages de tiers recadrés ou floutés.

## Stack et règles techniques

Astro + Tailwind v4 + TypeScript, déployé sur Netlify. Aucun script inline, aucun style inline, aucun script ou traceur tiers (CSP stricte dans `public/_headers`). Logique testable dans `src/lib/` (modules purs, sans import Astro). Ne pas ajouter de dépendance sans l'accord de Seb.

## Commandes (PowerShell)

```powershell
npm run dev        # serveur local http://localhost:4321
npm run build      # compile dans dist/
npm run check      # vérification TypeScript et Astro
npm test           # tests unitaires (tests/unit)
npm run test:dist  # tests sur le site compilé (tests/dist) — après npm run build
```

## Mettre le contenu à jour

- Expériences : `src/content/experiences/*.md`
- Salons, compétences, formation : `src/content/*.json`
- Projets : ajouter un fichier dans `src/content/projects/` (la section apparaît automatiquement)
- Textes d'interface : `src/i18n/fr.json` et `src/i18n/en.json` (mêmes clés dans les deux)
