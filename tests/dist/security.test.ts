import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { allPages, DIST, readPage } from './helpers.ts';

export const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests";
const headers = () => readFileSync(join(DIST, '_headers'), 'utf8');

test('_headers contient la CSP exacte de la spec', () => {
  assert.ok(headers().includes(`Content-Security-Policy: ${CSP}`));
});

test('_headers contient les autres en-têtes de sécurité', () => {
  const h = headers();
  assert.match(h, /^\/\*$/m);
  assert.match(h, /Strict-Transport-Security: max-age=63072000; includeSubDomains; preload/);
  assert.match(h, /X-Content-Type-Options: nosniff/);
  assert.match(h, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(h, /Permissions-Policy: camera=\(\), microphone=\(\), geolocation=\(\), payment=\(\), usb=\(\)/);
  assert.match(h, /Cross-Origin-Opener-Policy: same-origin/);
});

test('tous les scripts viennent de la même origine', () => {
  for (const { route, html } of allPages()) {
    for (const [tag] of html.matchAll(/<script\b[^>]*\bsrc="[^"]*"[^>]*>/g)) {
      assert.match(tag, /src="\/[^/]/, `/${route} : ${tag}`);
    }
    assert.doesNotMatch(html, /\ssrc="https?:\/\//, `ressource externe sur /${route}`);
  }
});

test('security.txt existe, avec contact et date d’expiration lointaine', () => {
  const p = join(DIST, '.well-known', 'security.txt');
  assert.ok(existsSync(p));
  const txt = readFileSync(p, 'utf8');
  assert.match(txt, /^Contact: mailto:/m);
  const expires = new Date(txt.match(/^Expires: (.+)$/m)?.[1] ?? '');
  assert.ok(expires.getTime() - Date.now() > 30 * 864e5, 'Expires trop proche ou invalide');
});

test('les pages Sécurité existent dans les deux langues', () => {
  assert.match(readPage('securite'), /Content-Security-Policy/);
  assert.match(readPage('en/security'), /Content-Security-Policy/);
});
