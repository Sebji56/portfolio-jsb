/** Apparitions au défilement : les éléments [data-reveal] reçoivent .is-in, décalés de 70 ms entre frères. */
export function initReveal(root: ParentNode = document): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const items = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (!items.length) return;
  document.documentElement.classList.add('js-reveal'); // le CSS ne masque qu'à partir d'ici
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.hasAttribute('data-reveal'));
        el.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(el), 6) * 70}ms`);
        el.classList.add('is-in');
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  items.forEach((el) => io.observe(el));
}
