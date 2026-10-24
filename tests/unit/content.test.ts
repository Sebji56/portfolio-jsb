import { test } from 'node:test';
import assert from 'node:assert/strict';
import skills from '../../src/content/skills.json' with { type: 'json' };
import education from '../../src/content/education.json' with { type: 'json' };

test('la PL-900 est la seule formation « en cours » et figure en tête', () => {
  assert.equal(education[0].id, 'pl900');
  assert.equal(education[0].status, 'in-progress');
  assert.deepEqual(education.filter((e) => e.status === 'in-progress').map((e) => e.id), ['pl900']);
});

test('AEP et ASP sont des « autres formations » discrètes', () => {
  assert.deepEqual(education.filter((e) => !e.featured).map((e) => e.id).sort(), ['aep', 'asp']);
});

test('les quatre catégories d’outils du brief, dans l’ordre', () => {
  assert.deepEqual(skills.tools.map((c) => c.category.fr), ['IA', 'CRM et bureautique', 'VR/AR et développement', 'Création de contenu']);
});

test('chaque entrée bilingue a un texte FR et EN non vide', () => {
  const walk = (v: unknown): void => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>;
      if ('fr' in o && 'en' in o) assert.ok(String(o.fr).trim() && String(o.en).trim(), JSON.stringify(o));
      else Object.values(o).forEach(walk);
    }
  };
  walk(skills);
  walk(education);
});
