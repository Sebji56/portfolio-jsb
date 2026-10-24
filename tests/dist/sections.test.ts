import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readPage } from './helpers.ts';

// Ancres partagées FR/EN ; chaque tâche ajoute la sienne (expériences, salons, contact)
export const ANCHORS = ['parcours', 'piliers', 'competences', 'ia', 'formation', 'contact', 'experiences', 'salons'];

for (const route of ['', 'en']) {
  test(`/${route} : chaque section attendue existe et porte un titre h2`, () => {
    const html = readPage(route);
    for (const id of ANCHORS) {
      const m = html.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`));
      assert.ok(m, `section #${id} absente sur /${route}`);
      assert.match(m[0], /<h2[\s>]/, `section #${id} sans h2 sur /${route}`);
    }
  });

  test(`/${route} : pas de section Projets tant qu’il n’y a aucun projet`, () => {
    assert.doesNotMatch(readPage(route), /id="projets"/);
  });

  test(`/${route} : l’encadré IA mène à la page Sécurité`, () => {
    const ia = readPage(route).match(/<section[^>]*id="ia"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.match(ia, route ? /href="\/en\/security\/"/ : /href="\/securite\/"/);
  });

  test(`/${route} : les données manquantes sont signalées par un marqueur visible`, () => {
    assert.match(readPage(route), /class="todo"/);
  });
}

for (const [route, phrase] of [['', 'technologies émergentes : intelligence artificielle, automatisation et cybersécurité'], ['en', 'emerging technologies: artificial intelligence, automation and cybersecurity']] as const) {
  test(`/${route} : l’objectif après la PL-900 est rempli (plus de marqueur)`, () => {
    const ia = readPage(route).match(/<section[^>]*id="ia"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.ok(ia.includes(phrase), 'objectif absent');
    assert.doesNotMatch(ia, /class="todo"/);
  });
}
