import { test } from 'node:test';
import assert from 'node:assert/strict';
import { allPages, readPage } from './helpers.ts';

test('l’adresse courriel n’apparaît en clair dans aucune page', () => {
  for (const { route, html } of allPages()) {
    assert.doesNotMatch(html, /sebji56@gmail\.com/, `/${route}`);
  }
});

for (const [route, action] of [['', '/merci/'], ['en', '/en/thanks/']] as const) {
  const form = () => readPage(route).match(/<form[\s\S]*?<\/form>/)?.[0] ?? '';

  test(`/${route} : formulaire Netlify avec pot de miel`, () => {
    const f = form();
    assert.match(f, /name="contact"/);
    assert.match(f, /method="POST"/i);
    assert.match(f, /data-netlify="true"/);
    assert.match(f, /netlify-honeypot="bot-field"/);
    assert.match(f, /<input[^>]*type="hidden"[^>]*name="form-name"[^>]*value="contact"/);
    assert.match(f, new RegExp(`action="${action}"`));
  });

  test(`/${route} : chaque champ a une étiquette et une validation native`, () => {
    const f = form();
    for (const [name, extra] of [['nom', /required/], ['courriel', /type="email"[^>]*required|required[^>]*type="email"/], ['message', /minlength="10"/]] as const) {
      const field = f.match(new RegExp(`<(input|textarea)[^>]*name="${name}"[^>]*>`))?.[0] ?? '';
      assert.ok(field, `champ ${name} absent`);
      assert.match(field, extra, `validation manquante sur ${name}`);
      const id = field.match(/id="([^"]+)"/)?.[1];
      assert.ok(id && new RegExp(`<label[^>]*for="${id}"`).test(f), `étiquette absente pour ${name}`);
    }
  });

  test(`/${route} : le pot de miel est caché et hors du parcours clavier`, () => {
    const f = form();
    const wrap = f.match(/<[^>]*(?:class="[^"]*sr-only[^"]*"|hidden)[^>]*>\s*<label[^>]*>[\s\S]*?name="bot-field"[^>]*>/)?.[0] ?? '';
    assert.ok(wrap, 'pot de miel non caché');
    assert.match(wrap, /aria-hidden="true"/);
    assert.match(wrap, /name="bot-field"[^>]*tabindex="-1"|tabindex="-1"[^>]*name="bot-field"/);
  });
}

test('les pages de remerciement existent et ne sont pas indexées', () => {
  for (const r of ['merci', 'en/thanks']) assert.match(readPage(r), /<meta name="robots" content="noindex"/);
});
