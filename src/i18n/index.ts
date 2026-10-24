import fr from './fr.json' with { type: 'json' };
import en from './en.json' with { type: 'json' };

export type Locale = 'fr' | 'en';
export type RouteId = 'home' | 'security' | 'thanks';

export const locales: Locale[] = ['fr', 'en'];
const dict: Record<Locale, unknown> = { fr, en };

const paths: Record<RouteId, Record<Locale, string>> = {
  home: { fr: '/', en: '/en/' },
  security: { fr: '/securite', en: '/en/security' },
  thanks: { fr: '/merci', en: '/en/thanks' },
};

/** Valeur brute d'une clé pointée ("nav.contact") ; lève une erreur si elle manque. */
export function tx<T = unknown>(locale: Locale, key: string): T {
  let node: unknown = dict[locale];
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object' || !(part in node)) {
      throw new Error(`Clé de traduction absente : ${locale}.${key}`);
    }
    node = (node as Record<string, unknown>)[part];
  }
  return node as T;
}

export const t = (locale: Locale, key: string): string => tx<string>(locale, key);

export const localizePath = (route: RouteId, locale: Locale): string => paths[route][locale];

export function routeFromPath(pathname: string): { route: RouteId; locale: Locale } {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  for (const [route, byLocale] of Object.entries(paths) as [RouteId, Record<Locale, string>][]) {
    for (const locale of locales) {
      if (byLocale[locale].replace(/\/+$/, '') === clean || byLocale[locale] === clean) return { route, locale };
    }
  }
  return { route: 'home', locale: clean === '/en' || clean.startsWith('/en/') ? 'en' : 'fr' };
}
