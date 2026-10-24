import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { allPages, DIST, readPage } from './helpers.ts';

const SITE = 'https://portfolio-jsb.netlify.app';
const INDEXABLE = ['', 'en', 'securite', 'en/security'];
const pair: Record<string, string> = { '': 'en/', en: '', securite: 'en/security', 'en/security': 'securite' };
const attr = (html: string, re: RegExp) => html.match(re)?.[1];

test('titres uniques et descriptions de 50 à 160 caractères', () => {
  const titles = INDEXABLE.map((r) => attr(readPage(r), /<title>([^<]+)<\/title>/));
  assert.equal(new Set(titles).size, INDEXABLE.length);
  for (const r of INDEXABLE) {
    const d = attr(readPage(r), /<meta name="description" content="([^"]+)"/) ?? '';
    assert.ok(d.length >= 50 && d.length <= 160, `/${r} : description de ${d.length} caractères`);
  }
});

test('Open Graph : image absolue et langue', () => {
  for (const r of INDEXABLE) {
    const html = readPage(r);
    assert.match(html, new RegExp(`<meta property="og:image" content="${SITE}/og-image.jpg"`), `/${r}`);
    assert.match(html, r.startsWith('en') ? /property="og:locale" content="en_CA"/ : /property="og:locale" content="fr_CA"/, `/${r}`);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/);
  }
  assert.ok(existsSync(join(DIST, 'og-image.jpg')));
});

test('hreflang réciproques et URL canonique', () => {
  for (const r of INDEXABLE) {
    const html = readPage(r);
    assert.match(html, /<link rel="canonical" href="https:\/\/portfolio-jsb\.netlify\.app\/[^"]*"/, `/${r}`);
    assert.match(html, /<link rel="alternate" hreflang="fr-CA" href="[^"]+"/);
    assert.match(html, /<link rel="alternate" hreflang="en-CA" href="[^"]+"/);
    assert.match(html, /<link rel="alternate" hreflang="x-default" href="[^"]+"/);
    assert.ok(html.includes(`${SITE}/${pair[r]}`), `/${r} ne pointe pas vers sa traduction`);
  }
});

test('JSON-LD Person sur les accueils', () => {
  for (const r of ['', 'en']) {
    const raw = readPage(r).match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(raw, `JSON-LD absent sur /${r}`);
    const data = JSON.parse(raw);
    assert.equal(data['@type'], 'Person');
    assert.equal(data.name, 'Jean-Sébastien Bisson');
    assert.equal(data.alternateName, 'Seb Ji');
    assert.ok(data.sameAs.some((u: string) => u.includes('linkedin.com/in/')));
  }
});

test('sitemap et robots', () => {
  assert.ok(existsSync(join(DIST, 'sitemap-index.xml')));
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
  assert.match(robots, new RegExp(`Sitemap: ${SITE}/sitemap-index.xml`));
});

test('pages non indexables marquées noindex, 404 bilingue présente', () => {
  for (const r of ['merci', 'en/thanks', '404']) assert.match(readPage(r), /<meta name="robots" content="noindex"/, `/${r}`);
  assert.match(readPage('404'), /English|anglais/i);
});

test('budget JavaScript : moins de 25 Ko gzip au total', () => {
  const dir = join(DIST, '_astro');
  const total = readdirSync(dir).filter((f) => f.endsWith('.js')).reduce((s, f) => s + gzipSync(readFileSync(join(dir, f))).length, 0);
  assert.ok(total < 25 * 1024, `${(total / 1024).toFixed(1)} Ko gzip`);
});

test('chaque page a un favicon', () => {
  for (const { route, html } of allPages()) assert.match(html, /<link rel="icon" href="\/favicon\.svg"/, `/${route}`);
  assert.ok(existsSync(join(DIST, 'favicon.svg')));
});
