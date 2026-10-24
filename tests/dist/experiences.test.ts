import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allPages, readPage } from './helpers.ts';

const QUOTE = 'I highly recommend Seb Ji for his skills at managing a Virtual Live Production Show/Event. Seb was our technical partner for the show PIXEL at EXCLAM Festival (Montréal), produced by Grégoire Furrer (Montreux Comedy Festival). Seb has shown all his technical and soft skills to make this project a success. I would hire him for the next projects I will produce in Canada.';
const section = (route: string) => readPage(route).match(/<section[^>]*id="experiences"[\s\S]*?<\/section>/)?.[0] ?? '';
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');

test('tout lien externe s’ouvre dans un nouvel onglet en toute sécurité', () => {
  for (const { route, html } of allPages()) {
    for (const [a] of html.matchAll(/<a\b[^>]*href="https?:\/\/[^"]*"[^>]*>/g)) {
      assert.match(a, /target="_blank"/, `/${route} : ${a}`);
      assert.match(a, /rel="noopener noreferrer"/, `/${route} : ${a}`);
    }
  }
});

for (const route of ['', 'en']) {
  test(`/${route} : expériences principales en ordre chronologique inverse`, () => {
    const s = text(section(route));
    const order = ['ALBI', 'Proteus-VR', "L'Ardoisière"].map((c) => s.indexOf(c));
    assert.ok(order.every((i) => i >= 0), `société absente : ${order}`);
    assert.deepEqual([...order].sort((a, b) => a - b), order);
  });

  test(`/${route} : la carte Proteus montre la progression, VP d’abord`, () => {
    const s = text(section(route));
    const vp = s.indexOf(route ? 'VP of Technology' : 'Vice-président de la technologie');
    const dev = s.indexOf(route ? 'Unreal Engine VR/AR Developer' : 'Développeur Unreal Engine VR/AR');
    assert.ok(vp > 0 && dev > vp);
  });

  test(`/${route} : chaque carte principale a un bouton « Voir le détail »`, () => {
    const n = (section(route).match(/<details[\s\S]*?<summary[^>]*>[\s\S]*?(Voir le détail|See details)/g) ?? []).length;
    assert.equal(n, 3);
  });

  test(`/${route} : la recommandation est citée mot pour mot, en anglais`, () => {
    const q = section(route).match(/<blockquote[^>]*lang="en"[^>]*>[\s\S]*?<\/blockquote>/)?.[0];
    assert.ok(q, 'blockquote lang="en" absent');
    assert.ok(text(q).includes(QUOTE), 'texte de la citation modifié');
    assert.match(section(route), /linkedin\.com\/in\//);
  });
}

test('la version française ajoute une traduction identifiée comme telle', () => {
  assert.match(text(section('')), /Traduction/);
});
