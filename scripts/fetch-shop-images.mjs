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
const jobs = new Map(); // url -> Set<Breite>; „c480“ = Produktkarte (Freisteller auf das Produkt zugeschnitten)
const add = (url, width) => {
  if (!url) return;
  if (!jobs.has(url)) jobs.set(url, new Set());
  jobs.get(url).add(width);
};

// Produktkarten (products.json + in Seiten hart eingetragene imageUrl="…"), zwei Breiten für srcset
const CARD_WIDTHS = ['c480', 'c960'];
const addCard = (url) => CARD_WIDTHS.forEach((w) => add(url, w));
for (const p of readJson('src/data/products.json').products) addCard(p.imageUrl);
for (const f of readdirSync('src/pages').filter((f) => f.endsWith('.astro'))) {
  const src = readFileSync(`src/pages/${f}`, 'utf8');
  for (const m of src.matchAll(/imageUrl="(https:\/\/[^"]+)"/g)) addCard(m[1]);
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

/**
 * Freisteller oder Szenenfoto? Ist der Bildrand fast durchgehend weiß, steht das Produkt frei
 * (→ object-contain mit Innenabstand), sonst ist es ein Foto, das die Fläche füllen darf.
 */
async function analyse(buf) {
  const { width, height } = await sharp(buf).metadata();
  const S = 64;
  const { data } = await sharp(buf).flatten({ background: '#fff' }).resize(S, S, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let edge = 0,
    white = 0;
  for (let y = 0; y < S; y++) {
    for (let x = 0; x < S; x++) {
      if (x > 1 && x < S - 2 && y > 1 && y < S - 2) continue;
      const i = (y * S + x) * 3;
      edge++;
      if (Math.min(data[i], data[i + 1], data[i + 2]) >= 250) white++;
    }
  }
  return { w: width, h: height, bildart: white / edge >= 0.85 ? 'freisteller' : 'szene' };
}

const file = (hash, w) => `/shop-bilder/${hash}-${w}.webp`;
const entry = (hash, widths, meta) => ({ ...Object.fromEntries([...widths].map((w) => [w, file(hash, w)])), ...meta });

/** Freisteller für Karten auf das Produkt zuschneiden, damit alle Tore die Fläche ähnlich ausfüllen */
async function render(buf, w, meta, out) {
  let img = sharp(buf).flatten({ background: '#fff' });
  if (String(w).startsWith('c') && meta.bildart === 'freisteller') {
    try {
      img = sharp(await img.trim({ background: '#fff', threshold: 12 }).toBuffer());
    } catch {
      img = sharp(buf).flatten({ background: '#fff' });
    }
  }
  await img.resize({ width: parseInt(String(w).replace(/\D/g, ''), 10), withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
}

await mkdir(OUT_DIR, { recursive: true });
const manifest = existsSync(MANIFEST) ? readJson(MANIFEST) : {};
let ok = 0,
  failed = 0,
  cached = 0;

for (const [url, widths] of jobs) {
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 12);
  const old = manifest[url];
  // Ohne gespeicherte Bildart wird neu geladen – aus zugeschnittenen Dateien lässt sie sich nicht mehr ablesen
  const missing = [...widths].filter((w) => !old?.bildart || !existsSync(`public${file(hash, w)}`));
  if (missing.length === 0) {
    cached++;
    manifest[url] = entry(hash, widths, { w: old.w, h: old.h, bildart: old.bildart });
    continue;
  }
  try {
    const buf = await downloadBest(url);
    const meta = await analyse(buf);
    for (const w of missing) await render(buf, w, meta, `public${file(hash, w)}`);
    manifest[url] = entry(hash, widths, meta);
    ok++;
  } catch (err) {
    failed++;
    delete manifest[url];
    console.warn(`⚠ Shop-Bild nicht ladbar (Original wird verwendet): ${url} – ${err.message}`);
  }
}

// Nur noch Einträge behalten, deren Dateien existieren
for (const [url, e] of Object.entries(manifest)) {
  const paths = Object.entries(e).filter(([k]) => /^c?\d+$/.test(k)).map(([, p]) => p);
  if (!paths.every((p) => existsSync(`public${p}`))) delete manifest[url];
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Shop-Bilder: ${ok} neu, ${cached} vorhanden, ${failed} fehlgeschlagen → ${Object.keys(manifest).length} im Manifest`);
