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

test('thème clair (Brume) : encre sur fond ≥ 7', () => {
  assert.ok(contrastRatio('#101A29', '#E8ECF1') >= 7);
});

test('thème clair (Brume) : accent sur fond et sur surface ≥ 4.5', () => {
  assert.ok(contrastRatio('#1B5FB8', '#E8ECF1') >= 4.5 && contrastRatio('#1B5FB8', '#F2F5F8') >= 4.5);
});

test('contrastRatio est symétrique et vaut 21 pour noir/blanc', () => {
  assert.equal(Math.round(contrastRatio('#000000', '#FFFFFF')), 21);
  assert.equal(contrastRatio('#123456', '#FFFFFF'), contrastRatio('#FFFFFF', '#123456'));
});

test('thème clair (Brume) : texte secondaire sur fond et sur surface ≥ 4.5', () => {
  assert.ok(contrastRatio('#475264', '#E8ECF1') >= 4.5);
  assert.ok(contrastRatio('#475264', '#F2F5F8') >= 4.5);
});

test('thème clair (Brume) : fond moins éblouissant qu’un blanc pur, sans contraste excessif', () => {
  assert.ok(contrastRatio('#E8ECF1', '#FFFFFF') > 1.1);
  assert.ok(contrastRatio('#101A29', '#E8ECF1') < 16);
});
