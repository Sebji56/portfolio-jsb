import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allPages, readPage } from './helpers.ts';

test("l'accueil FR déclare la langue fr-CA", () => {
  assert.match(readPage(''), /<html[^>]*lang="fr-CA"/);
});

test("l'accueil EN déclare la langue en-CA", () => {
  assert.match(readPage('en'), /<html[^>]*lang="en-CA"/);
});

test('aucune page ne contient de script inline', () => {
  for (const { route, html } of allPages()) {
    const inline = [...html.matchAll(/<script\b([^>]*)>/g)].filter(([, attrs]) => !/\bsrc=/.test(attrs) && !/type="application\/ld\+json"/.test(attrs));
    assert.equal(inline.length, 0, `script inline dans /${route}`);
  }
});
