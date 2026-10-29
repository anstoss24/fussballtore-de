/**
 * Lädt alle Produkt- und Torberater-Bilder aus dem anstoss24-Shop vor dem Build
 * herunter und legt sie als WebP in public/shop-bilder/ ab (Manifest: src/data/shop-bilder.json).
 *
 * Warum nicht Astros getImage()? Das CDN antwortet aus GitHub Actions heraus gelegentlich
 * nicht sauber ("Failed to get the dimensions"); hier können wir mit eigenem Timeout und
 * Wiederholungen laden. Schlägt ein Bild trotzdem fehl, bleibt es im Manifest weg und die
 * Seite zeigt das Original vom CDN. Exit-Code ist immer 0.
 */
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const OUT_DIR = 'public/shop-bilder';
const MANIFEST = 'src/data/shop-bilder.json';
const CDN_OLD = 'cdn02.plentymarkets.com';
const CDN = 'cdn02.plentyone.com';

const readJson = (p) => JSON.parse(readFileSync(p, 'utf8'));
const jobs = new Map(); // url -> Set<width>
const add = (url, width) => {
  if (!url) return;
  if (!jobs.has(url)) jobs.set(url, new Set());
  jobs.get(url).add(width);
};

// Produktkarten (products.json + in Seiten hart eingetragene imageUrl="…")
for (const p of readJson('src/data/products.json').products) add(p.imageUrl, 800);
for (const f of readdirSync('src/pages').filter((f) => f.endsWith('.astro'))) {
  const src = readFileSync(`src/pages/${f}`, 'utf8');
  for (const m of src.matchAll(/imageUrl="(https:\/\/[^"]+)"/g)) add(m[1], 800);
}
// Redaktionelle Fotos (Hero, Kategorien): src/data/fotos.json, groß für randlose Flächen
if (existsSync('src/data/fotos.json')) {
  for (const f of Object.values(readJson('src/data/fotos.json'))) {
    add(f.url, 640);
    add(f.url, 1280);
  }
}
// Torberater: Antwort-Bilder klein (Liste) und mittel (Startseiten-Kacheln), Produktbilder mittel
if (existsSync('src/data/torberater.json')) {
  const walk = (step) => {
    for (const o of step.options ?? []) {
      add(o.image, 192);
      add(o.image, 480);
      for (const prod of o.products ?? []) add(prod.image, 480);
      if (o.next) walk(o.next);
    }
  };
  walk(readJson('src/data/torberater.json').tree);
}

// Der Shop liefert dieselben Bilder in mehreren Größen (/secondPreview/, /middle/, /full/).
// Wir laden zuerst /full/ (bis ~1280 px) und fallen sonst auf die eingetragene Variante zurück.
const fullVariant = (url) => url.replace(/\/item\/images\/(\d+)\/(secondPreview|middle|preview)\//, '/item/images/$1/full/');

async function downloadBest(url) {
  const full = fullVariant(url);
  if (full !== url) {
    try {
      return await download(full);
    } catch {
      /* Fallback auf die eingetragene Variante */
    }
  }
  return download(url);
}

async function download(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url.replace(CDN_OLD, CDN), {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; fussballtore.de build)' },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, attempt * 2000));
    }
  }
  throw lastError;
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = existsSync(MANIFEST) ? readJson(MANIFEST) : {};
let ok = 0,
  failed = 0,
  cached = 0;

for (const [url, widths] of jobs) {
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 12);
  const missing = [...widths].filter((w) => !existsSync(`${OUT_DIR}/${hash}-${w}.webp`));
  if (missing.length === 0) {
    cached++;
    manifest[url] = Object.fromEntries([...widths].map((w) => [w, `/shop-bilder/${hash}-${w}.webp`]));
    continue;
  }
  try {
    const buf = await downloadBest(url);
    for (const w of missing) {
      await sharp(buf).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT_DIR}/${hash}-${w}.webp`);
    }
    manifest[url] = Object.fromEntries([...widths].map((w) => [w, `/shop-bilder/${hash}-${w}.webp`]));
    ok++;
  } catch (err) {
    failed++;
    delete manifest[url];
    console.warn(`⚠ Shop-Bild nicht ladbar (Original wird verwendet): ${url} – ${err.message}`);
  }
}

// Nur noch Einträge behalten, deren Dateien existieren
for (const [url, sizes] of Object.entries(manifest)) {
  if (!Object.values(sizes).every((p) => existsSync(`public${p}`))) delete manifest[url];
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Shop-Bilder: ${ok} neu, ${cached} vorhanden, ${failed} fehlgeschlagen → ${Object.keys(manifest).length} im Manifest`);
