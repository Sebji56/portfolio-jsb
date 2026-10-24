import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

export const DIST = join(import.meta.dirname, '..', '..', 'dist');

/** HTML d'une route construite : '' = accueil FR, 'en' = accueil EN, 'securite', etc. */
export function readPage(route: string): string {
  const clean = route.replace(/^\/|\/$/g, '');
  for (const p of [join(DIST, clean, 'index.html'), join(DIST, `${clean}.html`)]) {
    if (existsSync(p)) return readFileSync(p, 'utf8');
  }
  throw new Error(`Page introuvable dans dist/ : "${route}"`);
}

/** Toutes les pages HTML construites, avec leur route. */
export function allPages(): { route: string; html: string }[] {
  const out: { route: string; html: string }[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name.endsWith('.html')) {
        const route = relative(DIST, p).split(sep).join('/').replace(/(\/)?index\.html$|\.html$/, '');
        out.push({ route, html: readFileSync(p, 'utf8') });
      }
    }
  };
  walk(DIST);
  return out;
}
