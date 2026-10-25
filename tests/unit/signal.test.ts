import { test } from 'node:test';
import assert from 'node:assert/strict';
import { graticule, isPortraitBackground, project } from '../../src/lib/signal/shapes.ts';
import { easeInOutCubic, seg, stages, wordOpacity } from '../../src/lib/signal/timeline.ts';

test('le fond bleu du portrait est retiré', () => {
  assert.equal(isPortraitBackground(95, 135, 200), true);
});

test('la peau et le veston marine sombre sont gardés', () => {
  assert.equal(isPortraitBackground(220, 180, 160), false);
  assert.equal(isPortraitBackground(40, 50, 80), false);
});

test('au départ, Montréal est visible et Singapour caché', () => {
  assert.ok(project(45.5, -73.6, -88).z > 0);
  assert.ok(project(1.35, 103.8, -88).z < 0);
});

test('en fin de rotation, Singapour est visible', () => {
  assert.ok(project(1.35, 103.8, 115).z > 0);
});

test('la projection reste sur la sphère unité', () => {
  const { x, y, z } = project(37.6, 127, 40);
  assert.ok(Math.abs(x * x + y * y + z * z - 1) < 1e-9);
});

test('la grille du globe contient méridiens et parallèles', () => {
  const g = graticule();
  assert.ok(g.length > 1000);
  assert.ok(g.every(([lat, lon]) => lat >= -90 && lat <= 90 && lon >= -180 && lon < 180));
});

test('seg est borné entre 0 et 1', () => {
  assert.equal(seg(-1, 0, 1), 0);
  assert.equal(seg(2, 0, 1), 1);
  assert.equal(seg(0.5, 0, 1), 0.5);
});

test('easeInOutCubic garde ses extrémités', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(1), 1);
});

test('étapes du récit : portrait au départ', () => {
  assert.equal(stages(0).m1, 0);
  assert.equal(stages(0).heroOut, 0);
});

test('étapes du récit : casque formé à 0,4, globe pas encore commencé', () => {
  const s = stages(0.4);
  assert.equal(s.m1, 1);
  assert.equal(s.m2, 0);
  assert.equal(s.heroOut, 1);
});

test('étapes du récit : rotation finale à +115°', () => {
  assert.equal(stages(1).lon0, 115);
  assert.equal(stages(0).lon0, -88);
});

test('wordOpacity : mot entièrement visible, invisible, puis effacé à la sortie', () => {
  assert.equal(wordOpacity(1, 0, 5, 0), 1);
  assert.equal(wordOpacity(0, 0, 5, 0), 0);
  assert.equal(wordOpacity(1, 0, 5, 1), 0);
});

test('fitBox cale le portrait juste au-dessus du texte, sans le chevaucher', async () => {
  const { fitBox } = await import('../../src/lib/signal/shapes.ts');
  const b = fitBox(430, 72, 457, 0.7);
  assert.ok(b.cy + b.s / 2 <= 457 + 1e-9, 'déborde sur le texte');
  assert.ok(b.cy - b.s / 2 >= 72 - 1e-9, 'passe sous l’en-tête');
  assert.ok(Math.abs(b.cy + b.s / 2 - 457) < 1e-9, 'le bas du portrait touche la limite (pas de vide)');
  assert.ok(b.s <= 430 * 0.7 + 1e-9);
  assert.equal(b.cx, 215);
});

test('fitBox reste utilisable sur un très petit écran', async () => {
  const { fitBox } = await import('../../src/lib/signal/shapes.ts');
  const b = fitBox(320, 72, 120, 0.7);
  assert.ok(b.s >= 0 && b.s <= 48);
});

test('storyBoxes : sur mobile, casque et globe se posent juste au-dessus de la légende', async () => {
  const { storyBoxes, CAPTION_TOP } = await import('../../src/lib/signal/shapes.ts');
  for (const [W, H] of [[375, 667], [390, 844], [430, 932]]) {
    const { headset, globe } = storyBoxes(W, H);
    const capTop = H * CAPTION_TOP;
    assert.ok(Math.abs(headset.cy + headset.h / 2 - (capTop - 24)) < 1e-9, `casque mal posé à ${W}x${H}`);
    assert.ok(Math.abs(globe.cy + globe.R - (capTop - 24)) < 1e-9, `globe mal posé à ${W}x${H}`);
    assert.ok(globe.cy - globe.R >= 72, `globe sous l’en-tête à ${W}x${H}`);
  }
});
