import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allPages, readPage } from './helpers.ts';

const text = (html: string) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
const pages = allPages();

test('aucun numéro de téléphone dans le HTML', () => {
  for (const { route, html } of pages) {
    assert.doesNotMatch(html, /450[\s.-]?512|512-2489/, `téléphone sur /${route}`);
  }
});

test('jamais « trois continents »', () => {
  for (const { route, html } of pages) {
    assert.doesNotMatch(text(html), /trois continents|three continents/i, `/${route}`);
  }
});

test('PL-900 est toujours présentée comme en cours', () => {
  for (const { route, html } of pages) {
    const t = text(html);
    for (const m of t.matchAll(/PL-900/g)) {
      const around = t.slice(Math.max(0, m.index - 160), m.index + 220);
      assert.match(around, /en cours|in progress/i, `PL-900 sans « en cours » sur /${route} : …${around}…`);
    }
  }
});

test('le CHSLD apparaît une seule fois, sur l’accueil FR, et jamais ailleurs', () => {
  assert.equal((text(readPage('')).match(/CHSLD/g) ?? []).length, 1);
  for (const { route, html } of pages.filter((p) => p.route !== '' && p.route !== 'en')) {
    assert.doesNotMatch(text(html), /CHSLD/, `/${route}`);
  }
});

test('le titre LinkedIn complet figure dans le héros', () => {
  assert.match(text(readPage('')), /Développement des affaires \| Vente-conseil en solutions technologiques \| Analyse des besoins • Démonstration de solutions • Partenariats/);
});

test('aucune préférence d’horaire affichée', () => {
  for (const { route, html } of pages) {
    assert.doesNotMatch(text(html), /horaire de jour|semaine seulement|day shift|weekdays only/i, `/${route}`);
  }
});
