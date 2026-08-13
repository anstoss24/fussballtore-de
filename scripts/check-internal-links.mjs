#!/usr/bin/env node
// Prüft den Build-Output auf interne Links ohne Trailing Slash.
//
// Hintergrund: Astro baut mit format 'directory', also /kinder/index.html.
// Ein Link auf /kinder liefert dann einen 301 auf /kinder/. Google meldet
// solche URLs in der Search Console als "Seite mit Weiterleitung" und
// verbrennt Crawl-Budget auf Redirect-Varianten statt auf die echte Seite.
import { readdirSync, readFileSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, relative } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const SITE = 'https://fussballtore.de';

// Pfade mit Datei-Endung sind echte Dateien (/robots.txt, /og-default.jpg)
// und bekommen korrekterweise keinen Trailing Slash.
const FILE_EXTENSION = /\.[a-z0-9]{2,5}$/i;

function collectHtmlFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...collectHtmlFiles(full));
    else if (entry.endsWith('.html')) files.push(full);
  }
  return files;
}

// href="/garten" im Markup sowie "url"/"@id"/"item" aus dem JSON-LD —
// Schema.org-URLs landen ebenfalls im Google-Index.
function extractInternalUrls(html) {
  const urls = [];
  const patterns = [
    /href\s*=\s*"([^"]+)"/gi,
    /"(?:url|@id|item)"\s*:\s*"([^"]+)"/gi,
  ];

  for (const pattern of patterns) {
    for (const [, raw] of html.matchAll(pattern)) {
      if (raw.startsWith(`${SITE}/`)) urls.push(raw.slice(SITE.length));
      else if (raw.startsWith('/') && !raw.startsWith('//')) urls.push(raw);
    }
  }
  return urls;
}

function isMissingTrailingSlash(url) {
  const path = url.split(/[?#]/)[0];
  if (path === '' || path === '/') return false;
  if (FILE_EXTENSION.test(path)) return false;
  return !path.endsWith('/');
}

const htmlFiles = collectHtmlFiles(distDir);
const findings = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const bad = [...new Set(extractInternalUrls(html).filter(isMissingTrailingSlash))];
  if (bad.length) findings.push({ file: relative(distDir, file), urls: bad });
}

if (findings.length === 0) {
  console.log(`✓ Interne Links: ${htmlFiles.length} Seiten geprüft, alle mit Trailing Slash.`);
  process.exit(0);
}

const total = findings.reduce((sum, f) => sum + f.urls.length, 0);
console.error(`\n✗ ${total} interne(r) Link(s) ohne Trailing Slash in ${findings.length} Seite(n):\n`);
for (const { file, urls } of findings) {
  console.error(`  ${file}`);
  for (const url of urls) console.error(`    ${url}  →  ${url}/`);
}
console.error(`
Diese Links erzeugen 301-Weiterleitungen und tauchen in der Search Console
als "Seite mit Weiterleitung" auf. Bitte den Trailing Slash im Quellcode
unter src/ ergänzen.
`);
process.exit(1);
