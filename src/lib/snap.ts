/** Scène où se poser quand le défilement s'arrête entre deux scènes : la suivante dans le sens du défilement (dir), la plus proche si dir = 0 ; null si déjà posé ou hors du récit. */
export function restTarget(p: number, dir: number, rests: readonly number[], eps = 0.01): number | null {
  if (p <= rests[0] + eps || p >= rests[rests.length - 1] - eps || rests.some((r) => Math.abs(r - p) <= eps)) return null;
  if (dir > 0) return rests.find((r) => r > p)!;
  if (dir < 0) return rests.findLast((r) => r < p)!;
  return rests.reduce((a, r) => (Math.abs(r - p) < Math.abs(a - p) ? r : a));
}

// Glissement maison : le défilement doux du navigateur est trop rapide et sa vitesse n'est pas réglable
const GLIDE_MS = 1200;

/**
 * Aimante un récit au défilement sur ses scènes complètes (`rests`, en progression 0..1) : on ne reste jamais à mi-chemin.
 * `topFor(p)` donne la position de défilement de la progression p. Retourne la fonction d'arrêt.
 */
export function initSnap(progress: () => number, rests: readonly number[], topFor: (p: number) => number): () => void {
  let lastY = scrollY, dir = 0, timer = 0, glideId = 0, touchY: number | null = null;
  const glide = (top: number) => {
    cancelAnimationFrame(glideId);
    const y0 = scrollY, t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / GLIDE_MS);
      scrollTo(0, y0 + (top - y0) * (1 - (1 - k) ** 3)); // départ vif (dans l'élan du doigt), arrivée douce
      if (k < 1) glideId = requestAnimationFrame(step);
    };
    glideId = requestAnimationFrame(step);
  };
  const settle = (d = dir) => {
    const t = restTarget(progress(), d, rests);
    if (t !== null) glide(topFor(t));
  };
  const schedule = () => { clearTimeout(timer); if (touchY === null) timer = window.setTimeout(settle, 160); };
  const onScroll = () => { dir = Math.sign(scrollY - lastY) || dir; lastY = scrollY; schedule(); };
  const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; clearTimeout(timer); cancelAnimationFrame(glideId); };
  // Au toucher, on décide dès que le doigt se lève, sans attendre la fin de l'élan : un seul mouvement continu
  const onTouchEnd = (e: TouchEvent) => {
    const dy = touchY === null ? 0 : touchY - e.changedTouches[0].clientY;
    touchY = null;
    if (Math.abs(dy) > 10) settle(Math.sign(dy)); else schedule();
  };
  const onWheel = () => cancelAnimationFrame(glideId); // la main reprend toujours le dessus
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('touchstart', onTouchStart, { passive: true });
  addEventListener('touchend', onTouchEnd, { passive: true });
  addEventListener('touchcancel', onTouchEnd, { passive: true });
  addEventListener('wheel', onWheel, { passive: true });
  return () => {
    clearTimeout(timer); cancelAnimationFrame(glideId);
    removeEventListener('scroll', onScroll);
    removeEventListener('touchstart', onTouchStart);
    removeEventListener('touchend', onTouchEnd);
    removeEventListener('touchcancel', onTouchEnd);
    removeEventListener('wheel', onWheel);
  };
}
