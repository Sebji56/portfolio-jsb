import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme } from '../../src/lib/theme.ts';

test('sombre par défaut sans choix mémorisé (brief : thème sombre par défaut)', () => {
  assert.equal(resolveTheme(null), 'dark');
});

test('le choix mémorisé du visiteur est respecté', () => {
  assert.equal(resolveTheme('light'), 'light');
  assert.equal(resolveTheme('dark'), 'dark');
});

test('une valeur mémorisée invalide est ignorée', () => {
  assert.equal(resolveTheme('garbage'), 'dark');
});
