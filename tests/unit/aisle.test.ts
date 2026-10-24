import { test } from 'node:test';
import assert from 'node:assert/strict';
import { boothState, cameraAt, nearestBooth } from '../../src/lib/aisle.ts';

const o = { gap: 1500, side: 380 };

test('les kiosques alternent à gauche puis à droite', () => {
  assert.ok(boothState(0, 0, o).x < 0);
  assert.ok(boothState(1, 0, o).x > 0);
  assert.equal(Math.sign(boothState(0, 0, o).rotY), -Math.sign(boothState(1, 0, o).rotY));
});

test('un kiosque trop loin est invisible', () => {
  assert.equal(boothState(5, cameraAt(0, 7, 1500), o).opacity, 0);
});

test('un kiosque juste devant la caméra est pleinement opaque', () => {
  const cam = -350 + 3 * 1500; // place le kiosque 3 à z = -350
  assert.equal(boothState(3, cam, o).z, -350);
  assert.equal(boothState(3, cam, o).opacity, 1);
});

test('un kiosque dépassé (derrière la caméra) disparaît', () => {
  assert.equal(boothState(0, 420, o).opacity, 0);
  assert.equal(boothState(0, 900, o).opacity, 0);
});

test('la caméra parcourt toute l’allée', () => {
  assert.equal(cameraAt(0, 7, 1500), -300);
  assert.equal(cameraAt(1, 7, 1500), 10600);
});

test('nearestBooth donne le kiosque le plus proche du point de lecture', () => {
  assert.equal(nearestBooth(cameraAt(0, 7, 1500), 7, 1500), 0);
  assert.equal(nearestBooth(-350 + 4 * 1500, 7, 1500), 4);
  assert.equal(nearestBooth(1e6, 7, 1500), 6);
});

test('progressFor ramène le défilement sur un kiosque donné', async () => {
  const { progressFor } = await import('../../src/lib/aisle.ts');
  const p = progressFor(4, 7, 1500);
  assert.equal(nearestBooth(cameraAt(p, 7, 1500), 7, 1500), 4);
  assert.ok(p >= 0 && p <= 1);
});
