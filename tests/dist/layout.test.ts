import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allPages } from './helpers.ts';
import { localizePath, routeFromPath } from '../../src/i18n/index.ts';

const pages = allPages().filter((p) => p.route !== '404');

test('chaque page a un lien d’évitement vers <main id="contenu">', () => {
  for (const { route, html } of pages) {
    assert.match(html, /<a[^>]+href="#contenu"/, `lien d’évitement absent sur /${route}`);
    assert.match(html, /<main[^>]+id="contenu"/, `main#contenu absent sur /${route}`);
  }
});

test('chaque page a un bouton de thème avec aria-pressed', () => {
  for (const { route, html } of pages) {
    assert.match(html, /<button[^>]*data-theme-toggle[^>]*aria-pressed=/, `bouton de thème absent sur /${route}`);
  }
});

test('le sélecteur de langue mène à la page équivalente', () => {
  for (const { route, html } of pages) {
    const { route: id, locale } = routeFromPath(`/${route}`);
    const other = localizePath(id, locale === 'fr' ? 'en' : 'fr');
    const m = html.match(/<a[^>]*data-lang-switch[^>]*>/);
    assert.ok(m, `sélecteur de langue absent sur /${route}`);
    assert.match(m[0], new RegExp(`href="${other}"`), `mauvaise cible depuis /${route}`);
  }
});

test('aucun attribut style inline (CSP style-src self)', () => {
  for (const { route, html } of pages) {
    assert.doesNotMatch(html, /\sstyle="/, `style inline sur /${route}`);
  }
});

test('le script de thème est chargé dans <head>, depuis la même origine', () => {
  for (const { route, html } of pages) {
    const head = html.split('</head>')[0];
    assert.match(head, /<script[^>]+src="\/scripts\/theme\.js"/, `theme.js absent du head sur /${route}`);
  }
});
