# DESIGN — Portfolio Seb Ji

Direction : hybride **« Signal »** (héros en particules) + **« L'allée »** (salons en 3D), unifiée sur la palette et la typographie de Signal. Référence complète : `docs/superpowers/specs/2026-10-24-portfolio-design.md`.

## Jetons (`src/styles/global.css`)

| Rôle | Sombre (défaut) | Clair (« Brume ») |
|---|---|---|
| `--bg` | `#070A10` | `#E8ECF1` |
| `--surface` | `#0F141C` | `#F2F5F8` |
| `--line` | blanc 8 % | encre 10 % |
| `--ink` | `#EEF2F8` | `#101A29` |
| `--mute` | `#8F99AA` | `#475264` |
| `--acc` (bleu signal) | `#4DA3FF` | `#1B5FB8` |
| Pilier Service | `#F2B880` | `#9A5414` |
| Pilier Vente-conseil | `#4DA3FF` | `#1B5FB8` |
| Pilier Tech | `#5FD6B0` | `#13705A` |

Les contrastes des paires principales sont vérifiés par `tests/unit/contrast.test.ts`.

Le thème sombre est le défaut ; seul un choix explicite du visiteur passe en clair (mémorisé si le stockage local est permis).

## Typographie

- **Schibsted Grotesk** (variable) : tout le texte et les titres.
- **Big Shoulders Display 800** : uniquement les noms de salons dans l'allée.
- Titres : interlettrage −0,035 em (plancher −0,04 em), interligne 1, `text-wrap: balance`, 2 lignes maximum.
- Texte : 17 px, interligne 1,55, mesure ≤ 75 caractères.

## Composants

- Boutons en pilule : `.btn-primary` (encre pleine) et `.btn-ghost` (contour fin). `:active` à `scale(.97)` ; survols seulement sur pointeur fin.
- Cartes : surface + bordure fine, rayon 16 px, jamais de cartes imbriquées.
- Étiquettes de piliers : pastille de couleur + texte (la couleur n'est jamais le seul indice).
- En-tête fixe qui prend un fond voilé dès qu'on défile (lisibilité au-dessus du contenu).

## Mouvement

- Un moment signature : le récit en particules du héros. Un second, scénarisé : l'allée des salons.
- Ailleurs : apparitions discrètes (titre → texte → image, décalage 70 ms, montée de 20 px, `cubic-bezier(.23,1,.32,1)`).
- Seulement `transform` et `opacity` (et le canvas). `prefers-reduced-motion` : aucune animation de déplacement, contenu identique.

## Interdits (Impeccable / Taste, compatibles avec le brief)

Pas d'étiquette au-dessus des titres, pas de texte en dégradé, pas de numérotation 01/02/03, pas de cartes icône + titre identiques en grille, pas de logos d'entreprises ou d'événements, pas d'emoji.
