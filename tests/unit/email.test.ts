import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleEmail } from '../../src/lib/email.ts';

test('assembleEmail recompose l’adresse à partir de ses fragments', () => {
  assert.equal(assembleEmail('sebji56', 'gmail.com'), 'sebji56@gmail.com');
});

test('assembleEmail refuse des fragments vides', () => {
  assert.throws(() => assembleEmail('', 'gmail.com'));
  assert.throws(() => assembleEmail('sebji56', ''));
});
