import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, readPage } from './helpers.ts';

const css = () => readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(DIST, '_astro', f), 'utf8')).join('\n');

for (const route of ['', 'en']) {
  test(`/${route} : chaque kiosque de l’allée est atteignable au clavier`, () => {
    const booths = [...readPage(route).matchAll(/<li[^>]*data-booth[\s\S]*?<\/li>/g)].map((m) => m[0]);
    assert.equal(booths.length, 7);
    for (const b of booths) assert.match(b, /<article[^>]*tabindex="0"[^>]*aria-labelledby="[^"]+"/, b.slice(0, 120));
  });

  test(`/${route} : un menu de navigation existe pour les téléphones`, () => {
    const menu = readPage(route).match(/<details[^>]*class="[^"]*menu[^"]*"[\s\S]*?<\/details>/)?.[0] ?? '';
    for (const id of ['parcours', 'experiences', 'salons', 'competences', 'ia', 'contact']) {
      assert.match(menu, new RegExp(`href="#${id}"`), `lien #${id} absent du menu`);
    }
  });
}

test('la proposition de valeur reste visible sur téléphone', () => {
  assert.doesNotMatch(css(), /\.signal-on(\[[^\]]*\])? \.value(\[[^\]]*\])?\{display:none\}/);
});

test('la page Sécurité ne prétend pas que le courriel est absent de tout le code', () => {
  assert.doesNotMatch(readPage('securite'), /n’est pas écrite en clair dans le code/);
  assert.doesNotMatch(readPage('en/security'), /not written in plain text in the code/);
});
