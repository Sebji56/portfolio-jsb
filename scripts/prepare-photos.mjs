// Prépare les photos publiées à partir des originaux (photos-originales/, non versionné).
// Recadre les visages de tiers et les éléments distrayants.
// Usage (PowerShell) : node scripts/prepare-photos.mjs
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'photos-originales';
const OUT = join('src', 'assets', 'photos');
const MAX = 2400; // plus long côté

// Régions en fractions de l'image d'origine : { x, y, w, h }
const CROPS = {
  // Auditoire au premier plan retiré : on garde le rideau, le podium et la bannière BCEDL
  'bcedl-vancouver-conference': { x: 0, y: 0.2, w: 1, h: 0.41 },
  // Passants retirés à gauche et à droite de l'enseigne NSTA
  'nsta-atlanta': { x: 0.12, y: 0, w: 0.83, h: 1 },
  // Exposant voisin (à gauche) et affiche avec visages (à droite) retirés
  'iste-denver-2024': { x: 0.25, y: 0.12, w: 0.5, h: 0.88 },
  // Écran « Check internet connection » (à gauche) et personne de dos (à droite) retirés
  'kiosque-proteus-quebec-a-identifier-2': { x: 0.28, y: 0.08, w: 0.58, h: 0.92 },
  // Personnes en arrière-plan à droite retirées (un flou laissait un rectangle visible)
  'sxsw-edu-austin-2024-demo-casque': { x: 0.05, y: 0, w: 0.67, h: 1 },
};


const px = (r, W, H) => ({
  left: Math.round(r.x * W), top: Math.round(r.y * H),
  width: Math.round(r.w * W), height: Math.round(r.h * H),
});

mkdirSync(OUT, { recursive: true });
for (const file of readdirSync(SRC).filter((f) => f.endsWith('.jpg'))) {
  const id = file.replace(/\.jpg$/, '');
  const input = join(SRC, file);
  const { width: W, height: H } = await sharp(input).metadata();
  let img = sharp(input).rotate();

  if (CROPS[id]) img = img.extract(px(CROPS[id], W, H));

  await img.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(OUT, file));
  console.log(`${id}${CROPS[id] ? ' (recadrée)' : ''}`);
}
