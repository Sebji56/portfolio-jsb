import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitTodo } from '../../src/lib/todo.ts';

test('un marqueur À COMPLÉTER est isolé', () => {
  assert.deepEqual(splitTodo('Avant [À COMPLÉTER : nom du salon] après'), [
    { text: 'Avant ', todo: false },
    { text: '[À COMPLÉTER : nom du salon]', todo: true },
    { text: ' après', todo: false },
  ]);
});

test('le marqueur anglais est reconnu', () => {
  assert.equal(splitTodo('[TO COMPLETE: x]')[0].todo, true);
});

test('un texte sans marqueur reste intact', () => {
  assert.deepEqual(splitTodo('Rien à signaler'), [{ text: 'Rien à signaler', todo: false }]);
});
