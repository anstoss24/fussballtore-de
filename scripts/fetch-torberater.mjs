#!/usr/bin/env node
/**
 * Holt den Torberater von anstoss24.de und schreibt ihn nach src/data/torberater.json.
 *
 * Quelle der Wahrheit bleibt der Shop:
 * 1. Fragebaum (Fragen, Antworten, Facetten-IDs, Bilder) wird aus dem HTML von
 *    https://www.anstoss24.de/torberater/ gelesen.
 * 2. Für jede Auswahl-Kombination werden Trefferanzahl, Preisspanne und (bei
 *    Endpunkten) die Top-Produkte über die öffentliche Plenty-IO-API geladen –
 *    dieselbe Abfrage, die der Torberater im Shop selbst macht.
 *
 * Schlägt etwas fehl, bleibt die bestehende torberater.json unverändert.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'src', 'data', 'torberater.json');

const SHOP = 'https://www.anstoss24.de';
const BERATER_URL = `${SHOP}/torberater/`;
const CATEGORY_ID = 33; // wie im Shop-Script (torLoadGoals)
const TOP_PRODUCTS = 6;
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; fussballtore.de torberater sync)' };

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

const attrs = (s) =>
  Object.fromEntries([...s.matchAll(/data-eg-([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));

// "GROßFELDTOR" -> "Großfeldtor", "IN BODENHÜLSEN STEHEND" -> "In Bodenhülsen stehend"
const prettyLabel = (s) => {
  const lower = s.toLocaleLowerCase('de-DE');
  return lower.charAt(0).toLocaleUpperCase('de-DE') + lower.slice(1);
};

/** Liest alle Schritte des Torberaters aus dem Shop-HTML. */
function parseSteps(html) {
  const steps = [];
  const stepRe =
    /<div class="tor-berater-step[^"]*"([^>]*)>([\s\S]*?)(?=<div class="tor-berater-step|<div class="tor-berater-nav)/g;
  for (const m of html.matchAll(stepRe)) {
    const a = attrs(m[1]);
    if (!a['content-step'] || a['step-thema'] === 'end') continue;
    const head = m[2].match(/<span>([^<]*)<\/span>\s*<span>([^<]*)<\/span>/);
    const options = [];
    for (const b of m[2].matchAll(/<button([\s\S]*?)>[\s\S]*?<img src="([^"]*)" alt="([^"]*)"/g)) {
      const ba = attrs(b[1]);
      options.push({
        label: prettyLabel(decode(b[3])),
        facet: ba['step-facetval'],
        nextStep: ba['next-step'],
        themaChange: ba['step-thema-change'] || null,
        pathChange: ba['step-path-change'] || null,
        image: b[2],
      });
    }
    steps.push({
      step: a['content-step'],
      thema: a['step-thema'],
      path: a['step-path'] || null,
      title: head ? decode(head[1]) : '',
      question: head ? decode(head[2]) : '',
      options,
    });
  }
  return steps;
}

/** Findet den Schritt, den der Shop nach einer Auswahl anzeigt (Logik wie torMoveSteps). */
function findStep(steps, step, thema, path) {
  return steps.find(
    (s) => s.step === step && s.thema === thema && (s.path === null || s.path === (path || ''))
  );
}

async function queryShop(facets) {
  const params = new URLSearchParams({
    items: '100',
    page: '1',
    sorting: 'default.recommended_sorting',
    facets: facets.join(','),
    priceMin: '0',
    priceMax: '5000',
    categoryId: String(CATEGORY_ID),
  });
  const res = await fetch(`${SHOP}/rest/io/category/?${params}`, {
    headers: { ...HEADERS, Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
  });
  if (!res.ok) throw new Error(`API HTTP ${res.status}`);
  const json = await res.json();
  const list = json?.data?.itemList;
  if (!list) throw new Error('API: itemList fehlt');
  const products = list.documents.map(({ data: d }) => ({
    id: d.item.id,
    name: decode(d.texts.name1),
    url: `${SHOP}${d.texts.urlPath.startsWith('/') ? '' : '/'}${d.texts.urlPath}/a-${d.item.id}`,
    image: d.images?.all?.[0]?.urlMiddle || null,
    price: d.prices?.default?.price?.value ?? null,
    uvp:
      d.prices?.rrp?.price?.value > d.prices?.default?.price?.value ? d.prices.rrp.price.value : null,
  }));
  const prices = products.map((p) => p.price).filter((p) => typeof p === 'number' && p > 0);
  return {
    total: list.total,
    priceMin: prices.length ? Math.min(...prices) : null,
    priceMax: prices.length ? Math.max(...prices) : null,
    products,
  };
}

/** Deep-Link in den Shop-Torberater: Parameter = next-step, Wert = Facette (wie torLoadGoals). */
const deepLink = (selection) =>
  `${BERATER_URL}?${selection.map((o) => `${o.nextStep}=${o.facet}`).join('&')}`;

async function buildNode(steps, step, selection, thema, path) {
  const options = [];
  for (const opt of step.options) {
    const sel = [...selection, opt];
    const nextThema = opt.themaChange && opt.themaChange !== 'end' ? opt.themaChange : thema;
    const nextPath = opt.pathChange || path;
    const result = await queryShop(sel.map((o) => o.facet));
    process.stdout.write(`  ${sel.map((o) => o.label).join(' › ')}: ${result.total} Treffer\n`);

    const node = {
      label: opt.label,
      image: opt.image,
      total: result.total,
      priceMin: result.priceMin,
      priceMax: result.priceMax,
      shopUrl: deepLink(sel),
    };

    if (opt.themaChange === 'end') {
      node.products = result.products.slice(0, TOP_PRODUCTS);
    } else {
      const next = findStep(steps, opt.nextStep, nextThema, nextPath);
      if (!next) throw new Error(`Folgeschritt fehlt für "${opt.label}" (Schritt ${opt.nextStep}, ${nextThema})`);
      node.next = await buildNode(steps, next, sel, nextThema, nextPath);
    }
    options.push(node);
  }
  return { title: step.title, question: step.question, options };
}

async function main() {
  const res = await fetch(BERATER_URL, { headers: { ...HEADERS, Accept: 'text/html' } });
  if (!res.ok) throw new Error(`Torberater HTTP ${res.status}`);
  const steps = parseSteps(await res.text());
  const start = steps.find((s) => s.thema === 'start');
  if (!start || start.options.length === 0) throw new Error('Startschritt nicht gefunden');
  console.log(`${steps.length} Schritte gefunden.`);

  const tree = await buildNode(steps, start, [], 'start', null);
  const data = {
    lastUpdated: new Date().toISOString().split('T')[0],
    source: BERATER_URL,
    tree,
  };

  // Nur schreiben, wenn sich inhaltlich etwas geändert hat (lastUpdated ignorieren)
  if (existsSync(outPath)) {
    const existing = JSON.parse(readFileSync(outPath, 'utf-8'));
    if (JSON.stringify(existing.tree) === JSON.stringify(tree)) {
      console.log('Keine Änderungen.');
      return;
    }
  }
  writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n');
  console.log('Geschrieben: src/data/torberater.json');
}

main().catch((err) => {
  // Bestehende Daten behalten – Build darf nicht am Shop scheitern
  console.error('Torberater-Sync fehlgeschlagen, bestehende Daten bleiben:', err.message);
  process.exit(existsSync(outPath) ? 0 : 1);
});
