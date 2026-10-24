/** Comportements communs à toutes les pages : en-tête au défilement, fermeture du menu téléphone. */
export function initChrome(): void {
  const header = document.querySelector<HTMLElement>('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // Le menu se referme après un choix (les liens sont des ancres sur la même page)
  const menu = header.querySelector<HTMLDetailsElement>('details.menu');
  menu?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) menu.open = false; });
}
