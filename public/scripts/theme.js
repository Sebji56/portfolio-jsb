// Thème : chargé dans <head> pour éviter le flash. Garder en phase avec src/lib/theme.ts.
(() => {
  const KEY = 'theme';
  const root = document.documentElement;
  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const save = (v) => { try { localStorage.setItem(KEY, v); } catch { /* stockage bloqué : le choix n'est pas mémorisé */ } };
  const resolve = (stored) => (stored === 'light' ? 'light' : 'dark');

  root.dataset.theme = resolve(read());

  const sync = () => document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-pressed', String(root.dataset.theme === 'light')));
  document.addEventListener('DOMContentLoaded', () => {
    sync();
    document.querySelectorAll('[data-theme-toggle]').forEach((b) =>
      b.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
        save(root.dataset.theme);
        sync();
      }),
    );
  });
})();
