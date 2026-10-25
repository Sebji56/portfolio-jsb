const rad = (d: number) => (d * Math.PI) / 180;

/** Vrai pour le fond bleu uni du portrait (à retirer avant l'échantillonnage). */
export const isPortraitBackground = (r: number, g: number, b: number): boolean => b - r > 45 && (r + g + b) / 3 > 95;

/** Points [lat, lon] le long des parallèles et des méridiens, tous les `stepDeg` degrés. */
export function graticule(stepDeg = 20, densityDeg = 2.2): [number, number][] {
  const pts: [number, number][] = [];
  for (let lat = -80; lat <= 80; lat += stepDeg) for (let lon = -180; lon < 180; lon += densityDeg) pts.push([lat, lon]);
  for (let lon = -180; lon < 180; lon += stepDeg) for (let lat = -88; lat <= 88; lat += densityDeg) pts.push([lat, lon]);
  return pts;
}

/** Projection orthographique sur la sphère unité, centrée sur (lat0, lon0) ; z > 0 = face visible. */
export function project(lat: number, lon: number, lon0: number, lat0 = 22): { x: number; y: number; z: number } {
  const φ = rad(lat), λ = rad(lon - lon0), φ0 = rad(lat0);
  return {
    x: Math.cos(φ) * Math.sin(λ),
    y: Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ),
    z: Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λ),
  };
}

/** Échantillonne les pixels opaques d'un canvas : [x, y, intensité] normalisés 0..1. */
export function sampleOpaque(data: Uint8ClampedArray, w: number, h: number, step = 1): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
    const i = (y * w + x) * 4;
    if (data[i + 3] > 128) pts.push([x / w, y / h, data[i] / 255]);
  }
  return pts;
}

/** Boîte carrée du portrait sur mobile : le plus grande possible entre top et bottom, posée sur bottom (aucun vide avant le texte). */
export function fitBox(W: number, top: number, bottom: number, maxRatio = 0.7): { cx: number; cy: number; s: number } {
  const s = Math.max(0, Math.min(W * maxRatio, bottom - top));
  return { cx: W / 2, cy: bottom - s / 2, s };
}

/** Haut des légendes du récit sur mobile, en fraction de la hauteur (garder en phase avec `.signal-on .cap` dans SignalHero.astro). */
export const CAPTION_TOP = 0.58;

/** Mobile : casque et globe posés juste au-dessus de la légende, pour former un bloc unique (sans vide au milieu). */
export function storyBoxes(W: number, H: number) {
  const capTop = H * CAPTION_TOP, gap = 24, header = 72;
  const w = W * 0.72, h = w * (130 / 220);
  const R = Math.min(W * 0.36, (capTop - gap - header) / 2);
  return {
    headset: { cx: W / 2, cy: capTop - gap - h / 2, w, h },
    globe: { cx: W / 2, cy: capTop - gap - R, R },
  };
}
