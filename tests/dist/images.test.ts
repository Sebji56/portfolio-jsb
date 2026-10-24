import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { allPages, DIST } from './helpers.ts';

test('chaque <img> a largeur, hauteur et texte alternatif', () => {
  for (const { route, html } of allPages()) {
    for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(img, /\swidth="\d+"/, `/${route} : ${img.slice(0, 120)}`);
      assert.match(img, /\sheight="\d+"/, `/${route} : ${img.slice(0, 120)}`);
      assert.match(img, /\salt="[^"]{10,}"/, `/${route} : ${img.slice(0, 120)}`);
    }
  }
});

test('les images sont servies en AVIF et en WebP', () => {
  const files = readdirSync(join(DIST, '_astro'));
  assert.ok(files.some((f) => f.endsWith('.avif')), 'aucun AVIF');
  assert.ok(files.some((f) => f.endsWith('.webp')), 'aucun WebP');
});

test('l’accueil propose AVIF via <picture>', () => {
  const home = allPages().find((p) => p.route === '')!.html;
  assert.match(home, /<picture[\s\S]*?type="image\/avif"/);
});
