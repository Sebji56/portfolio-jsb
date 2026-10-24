/** Recompose une adresse courriel à partir de fragments (protection contre la récolte automatique). */
export function assembleEmail(user: string, domain: string): string {
  if (!user || !domain) throw new Error('Fragments de courriel manquants');
  return `${user}@${domain}`;
}

/** Remplace chaque [data-email] (texte de repli « … [at] … ») par un lien mailto. */
export function revealEmails(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>('[data-email]').forEach((el) => {
    const address = assembleEmail(el.dataset.u ?? '', el.dataset.d ?? '');
    const a = document.createElement('a');
    a.href = `mailto:${address}`;
    a.textContent = address;
    el.replaceChildren(a);
  });
}
