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

test('chaque photo a un texte alternatif FR et EN descriptif', () => {
  for (const id of files) {
    const m = photoMeta[id as keyof typeof photoMeta];
    assert.ok(m, `métadonnées absentes pour ${id}`);
    assert.ok(m.alt.fr.length > 20 && m.alt.en.length > 20, `alt trop court pour ${id}`);
  }
});

test('les photos de photographes d’événement portent un crédit à confirmer', () => {
  for (const id of ['collision-toronto-portrait-casque-vr', 'sxsw-edu-austin-2024-demo-casque'] as const) {
    assert.match(photoMeta[id].credit?.fr ?? '', /À COMPLÉTER/);
  }
});
