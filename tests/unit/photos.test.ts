import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { photoMeta } from '../../src/lib/photos.ts';

const dir = join(import.meta.dirname, '..', '..', 'src', 'assets', 'photos');
const files = readdirSync(dir).filter((f) => f.endsWith('.jpg')).map((f) => f.replace(/\.jpg$/, ''));

test('les 13 photos préparées sont présentes', () => {
  assert.equal(files.length, 13);
});

test('la photo SXSW aux droits inconnus n’est pas publiée', () => {
  assert.ok(!files.includes('sxsw-edu-austin-2024-demo-casque'));
});

test('chaque photo a un texte alternatif FR et EN descriptif', () => {
  for (const id of files) {
    const m = photoMeta[id as keyof typeof photoMeta];
    assert.ok(m, `métadonnées absentes pour ${id}`);
    assert.ok(m.alt.fr.length > 20 && m.alt.en.length > 20, `alt trop court pour ${id}`);
  }
});

test('la photo Collision porte le crédit et la licence CC BY 2.0 de Flickr', () => {
  const m = photoMeta['collision-toronto-portrait-casque-vr'];
  assert.match(m.credit?.fr ?? '', /Ramsey Cardy \/ Collision via Sportsfile/);
  assert.match(m.credit?.en ?? '', /Ramsey Cardy \/ Collision via Sportsfile/);
  assert.equal(m.creditUrl, 'https://www.flickr.com/photos/collisionconf/53802395183/');
  assert.equal(m.licenseUrl, 'https://creativecommons.org/licenses/by/2.0/');
});

