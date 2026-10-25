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
    assert.equal(cards.length, 4);
    for (const c of cards) assert.match(c, /class="tag tag-(service|sales|tech)"/);
  });

  test(`/${route} : l’encadré IA est résumé (plus de liste d’étapes)`, () => {
    assert.doesNotMatch(section(html(), 'ia'), /<ol\b/);
  });
}

for (const route of ['', 'en']) {
  const exp = () => readPage(route).match(/<section[^>]*id="experiences"[\s\S]*?<\/section>/)?.[0] ?? '';

  test(`/${route} : le détail de Proteus-VR tient en 4 points au plus`, () => {
    const card = exp().match(/<article[^>]*class="[^"]*exp-main[^"]*"[^>]*>(?:(?!<\/article>)[\s\S])*?Proteus-VR[\s\S]*?<\/article>/)?.[0] ?? '';
    const details = card.match(/<details[\s\S]*?<\/details>/)?.[0] ?? '';
    const n = (details.match(/<li\b/g) ?? []).length;
    assert.ok(n > 0 && n <= 4, `${n} points dans le détail`);
  });

  test(`/${route} : Jack Flat BBQ est une carte d’expérience comme les autres`, () => {
    assert.match(exp(), /<article[^>]*class="[^"]*exp-main[^"]*"[^>]*>(?:(?!<\/article>)[\s\S])*?Jack Flat BBQ/);
    assert.doesNotMatch(exp(), /class="compact"/);
  });
}
