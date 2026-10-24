import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contrastRatio } from '../../src/lib/contrast.ts';

test('thème sombre : encre sur fond ≥ 7', () => {
  assert.ok(contrastRatio('#EEF2F8', '#070A10') >= 7);
});

test('thème sombre : texte secondaire sur fond ≥ 4.5', () => {
  assert.ok(contrastRatio('#8F99AA', '#070A10') >= 4.5);
});

test('thème sombre : accent sur fond ≥ 4.5', () => {
  assert.ok(contrastRatio('#4DA3FF', '#070A10') >= 4.5);
});

test('thème clair : encre sur fond ≥ 7', () => {
  assert.ok(contrastRatio('#0B1220', '#F6F7F9') >= 7);
});

test('thème clair : accent sur surface blanche ≥ 4.5', () => {
  assert.ok(contrastRatio('#1F6FD1', '#FFFFFF') >= 4.5);
});

test('contrastRatio est symétrique et vaut 21 pour noir/blanc', () => {
  assert.equal(Math.round(contrastRatio('#000000', '#FFFFFF')), 21);
  assert.equal(contrastRatio('#123456', '#FFFFFF'), contrastRatio('#FFFFFF', '#123456'));
});
