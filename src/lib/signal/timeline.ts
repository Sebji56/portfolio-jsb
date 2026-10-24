/** Progression locale de p entre a et b, bornée à 0..1. */
export const seg = (p: number, a: number, b: number): number => Math.max(0, Math.min(1, (p - a) / (b - a)));

export const easeInOutCubic = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Étapes du récit selon la progression p (0..1) du défilement de la section. */
export function stages(p: number): { m1: number; m2: number; lon0: number; heroOut: number } {
  return {
    m1: easeInOutCubic(seg(p, 0.12, 0.32)), // portrait → casque
    m2: easeInOutCubic(seg(p, 0.45, 0.62)), // casque → globe
    lon0: -88 + 203 * easeInOutCubic(seg(p, 0.62, 0.98)), // Amérique du Nord → Asie
    heroOut: seg(p, 0.06, 0.14),
  };
}

/** Opacité d'un mot d'une légende : apparition mot à mot (tin), effacement global (tout). */
export const wordOpacity = (tin: number, index: number, count: number, tout: number): number =>
  Math.max(0, Math.min(1, tin * (count + 2) - index)) * (1 - tout);
