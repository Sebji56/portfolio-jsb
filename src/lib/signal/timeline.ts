/** Progression locale de p entre a et b, bornée à 0..1. */
export const seg = (p: number, a: number, b: number): number => Math.max(0, Math.min(1, (p - a) / (b - a)));

export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Avancement linéaire (avant lissage) de chaque transformation : portrait → casque, casque → globe, Amérique du Nord → Asie. */
export const morphs = (p: number): [number, number, number] => [seg(p, 0.12, 0.32), seg(p, 0.45, 0.62), seg(p, 0.62, 0.98)];

/** Formes à l'écran à partir des avancements linéaires u. */
export const shapesAt = ([u1, u2, u3]: readonly number[]) => ({
  m1: easeInOutCubic(u1),
  m2: easeInOutCubic(u2),
  lon0: -88 + 203 * easeInOutCubic(u3),
});

/** Étapes du récit selon la progression p (0..1) du défilement de la section. */
export function stages(p: number): { m1: number; m2: number; lon0: number; heroOut: number } {
  return { ...shapesAt(morphs(p)), heroOut: seg(p, 0.06, 0.14) };
}

/** Rapproche v de target d'au plus maxStep : une transformation ne va jamais plus vite que prévu, même si le défilement saute. */
export const approach = (v: number, target: number, maxStep: number): number => v + Math.max(-maxStep, Math.min(maxStep, target - v));

/** Opacité d'un mot d'une légende : apparition mot à mot (tin), effacement global (tout). */
export const wordOpacity = (tin: number, index: number, count: number, tout: number): number =>
  Math.max(0, Math.min(1, tin * (count + 2) - index)) * (1 - tout);

/** Progressions où une scène est complète (portrait, casque, globe, Asie) : formes en place, légende lisible (plages des légendes dans SignalHero). */
export const RESTS = [0, 0.41, 0.72, 0.95];
