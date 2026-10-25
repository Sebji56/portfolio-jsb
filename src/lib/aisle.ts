import { initSnap } from './snap.ts';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const FOCUS_Z = -350; // profondeur où un kiosque est « devant soi »

/** Position et opacité du kiosque i quand la caméra a avancé de `cam` px dans l'allée. */
export function boothState(i: number, cam: number, opts: { gap: number; side: number; rot?: number }) {
  const z = -i * opts.gap + cam; // > 0 : le kiosque est derrière la caméra
  const dir = i % 2 ? 1 : -1;
  return {
    x: dir * opts.side,
    z,
    rotY: -dir * (opts.rot ?? 14),
    opacity: clamp01((z + 4200) / 1400) * clamp01((420 - z) / 420),
  };
}

/** Avancée de la caméra pour une progression p (0..1) dans une allée de n kiosques. */
export const cameraAt = (p: number, n: number, gap: number): number => p * (n * gap + 400) - 300;

/** Kiosque le plus proche du point de lecture. */
export const nearestBooth = (cam: number, n: number, gap: number): number =>
  Math.max(0, Math.min(n - 1, Math.round((cam - FOCUS_Z) / gap)));

/** Progression qui amène le kiosque i au point de lecture (navigation au clavier). */
export const progressFor = (i: number, n: number, gap: number): number => clamp01((FOCUS_Z + i * gap + 300) / (n * gap + 400));

/** Scènes complètes de l'allée : chaque kiosque devant soi, puis l'écran de fin. */
export const aisleRests = (n: number, gap: number): number[] => [...Array.from({ length: n }, (_, i) => progressFor(i, n, gap)), 1];

/** Anime l'allée au défilement ; retourne la fonction d'arrêt. */
export function initAisle(section: HTMLElement): () => void {
  const stage = section.querySelector<HTMLElement>('.stage');
  const world = section.querySelector<HTMLElement>('[data-world]');
  const booths = [...section.querySelectorAll<HTMLElement>('[data-booth]')];
  const sign = section.querySelector<HTMLElement>('[data-sign]');
  const floor = section.querySelector<HTMLElement>('[data-floor]');
  const meter = section.querySelector<HTMLElement>('[data-meter]');
  const end = section.querySelector<HTMLElement>('[data-end]');
  if (!stage || !world || !booths.length) return () => {};
  const n = booths.length, gap = 1500;
  stage.style.setProperty('--n', String(n));
  let raf = 0, pS = 0, last = 0, lastSign = -1, running = true;

  const progress = () => {
    const max = stage.offsetHeight - innerHeight;
    return max > 0 ? clamp01(-stage.getBoundingClientRect().top / max) : 0;
  };
  const frame = (now: number) => {
    raf = 0;
    if (!running) return;
    const dt = last ? Math.min((now - last) / 1000, 0.5) : 0;
    last = now;
    const target = progress();
    pS += (target - pS) * (1 - Math.exp(-dt * 7));
    const mobile = innerWidth < 820;
    const opts = { gap, side: mobile ? innerWidth * 0.06 : Math.min(innerWidth * 0.25, 400), rot: mobile ? 6 : 14 };
    const cam = cameraAt(pS, n, gap);
    booths.forEach((b, i) => {
      const s = boothState(i, cam, opts);
      b.style.transform = `translate3d(calc(${s.x}px - 50%), -50%, ${s.z}px) rotateY(${s.rotY}deg)`;
      b.style.opacity = String(s.opacity);
      b.style.pointerEvents = s.opacity < 0.5 ? 'none' : ''; // reste focusable au clavier
    });
    const near = nearestBooth(cam, n, gap);
    if (sign && near !== lastSign) { sign.textContent = booths[near].dataset.sign ?? ''; lastSign = near; }
    const endP = clamp01((pS - 0.9) / 0.08);
    floor?.style.setProperty('--fy', `${cam * 0.6}px`);
    meter?.style.setProperty('--p', String(pS));
    end?.style.setProperty('--e', String(endP));
    sign?.style.setProperty('--s', String(1 - clamp01((pS - 0.88) / 0.06)));
    if (Math.abs(target - pS) > 0.0005) raf = requestAnimationFrame(frame);
    else last = 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  // Clavier : un kiosque qui reçoit le focus est amené devant la caméra
  const onFocus = (e: FocusEvent) => {
    const max = stage.offsetHeight - innerHeight;
    const top = stage.getBoundingClientRect().top + scrollY;
    if (end?.contains(e.target as Node)) { scrollTo({ top: top + max, behavior: 'instant' }); return; } // fin de l'allée
    const i = booths.findIndex((b) => b.contains(e.target as Node));
    if (i < 0) return;
    scrollTo({ top: top + progressFor(i, n, gap) * max, behavior: 'instant' });
  };
  section.addEventListener('focusin', onFocus);
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick);
  // Comme le héros : on ne reste jamais entre deux kiosques
  const stopSnap = initSnap(progress, aisleRests(n, gap), (t) => stage.getBoundingClientRect().top + scrollY + t * (stage.offsetHeight - innerHeight));
  kick();
  return () => {
    running = false; cancelAnimationFrame(raf); stopSnap();
    section.removeEventListener('focusin', onFocus);
    removeEventListener('scroll', kick); removeEventListener('resize', kick);
  };
}
