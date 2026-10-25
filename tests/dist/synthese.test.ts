import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readPage } from './helpers.ts';

const section = (html: string, id: string) => html.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`))?.[0] ?? '';

for (const route of ['', 'en']) {
  const html = () => readPage(route);

  test(`/${route} : les piliers sont fusionnés dans Compétences (plus de section séparée)`, () => {
    assert.doesNotMatch(html(), /id="piliers"/);
    assert.equal((section(html(), 'competences').match(/class="[^"]*\bpillar\b[^"]*"/g) ?? []).length, 3);
  });

  test(`/${route} : 4 chiffres clés`, () => {
    const figs = html().match(/<section[^>]*class="figures"[\s\S]*?<\/section>/)?.[0] ?? '';
    assert.equal((figs.match(/<li\b/g) ?? []).length, 4);
  });

  test(`/${route} : À propos tient en 2 paragraphes`, () => {
    assert.equal((section(html(), 'parcours').match(/<p\b/g) ?? []).length, 2);
  });

  test(`/${route} : chaque expérience principale affiche ses pastilles de compétences`, () => {
    const cards = section(html(), 'experiences').match(/<article[^>]*class="[^"]*exp-main[\s\S]*?<\/article>/g) ?? [];
    assert.equal(cards.length, 3);
    for (const c of cards) assert.match(c, /class="tag tag-(service|sales|tech)"/);
  });

  test(`/${route} : l’encadré IA est résumé (plus de liste d’étapes)`, () => {
    assert.doesNotMatch(section(html(), 'ia'), /<ol\b/);
  });
}
