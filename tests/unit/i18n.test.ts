import { test } from 'node:test';
import assert from 'node:assert/strict';
import fr from '../../src/i18n/fr.json' with { type: 'json' };
import en from '../../src/i18n/en.json' with { type: 'json' };
import { localizePath, routeFromPath, t } from '../../src/i18n/index.ts';

const flatKeys = (o: object, prefix = ''): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? flatKeys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

test('fr.json et en.json ont exactement les mêmes clés', () => {
  assert.deepEqual(flatKeys(fr).sort(), flatKeys(en).sort());
});

test('localizePath traduit le slug de la page Sécurité', () => {
  assert.equal(localizePath('security', 'en'), '/en/security');
  assert.equal(localizePath('security', 'fr'), '/securite');
});

test('routeFromPath reconnaît /securite en français', () => {
  assert.deepEqual(routeFromPath('/securite'), { route: 'security', locale: 'fr' });
});

test("le changement de langue de /en/thanks mène à /merci", () => {
  assert.equal(localizePath(routeFromPath('/en/thanks').route, 'fr'), '/merci');
});

test('routeFromPath tolère la barre oblique finale', () => {
  assert.deepEqual(routeFromPath('/en/security/'), { route: 'security', locale: 'en' });
  assert.deepEqual(routeFromPath('/en/'), { route: 'home', locale: 'en' });
});

test("un chemin inconnu revient à l'accueil français", () => {
  assert.deepEqual(routeFromPath('/inconnu'), { route: 'home', locale: 'fr' });
});

test('t() lève une erreur pour une clé absente', () => {
  assert.throws(() => t('fr', 'cle.absente'));
});

test('t() résout une clé imbriquée', () => {
  assert.equal(t('fr', 'nav.contact'), 'Me joindre');
  assert.equal(t('en', 'nav.contact'), 'Contact me');
});
