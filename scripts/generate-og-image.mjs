// Generiert OG-Image (1200x630) aus SVG via Sharp.
// Aufruf: node scripts/generate-og-image.mjs
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public');
mkdirSync(outDir, { recursive: true });

// Brand colors
const primary = '#0f172a';
const primaryLight = '#1e293b';
const accent = '#16a34a';
const accentLight = '#22c55e';
const white = '#ffffff';
const muted = '#94a3b8';

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function buildSvg({ title: rawTitle, subtitle: rawSubtitle, accentLabel: rawAccent }) {
  const title = escape(rawTitle);
  const subtitle = escape(rawSubtitle);
  const accentLabel = escape(rawAccent);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${primary}"/>
      <stop offset="100%" stop-color="${primaryLight}"/>
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="80%" cy="50%" r="40%">
      <stop offset="0%" stop-color="${accentLight}" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="${accentLight}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Subtle field lines (Fußballfeld-Andeutung) -->
  <g stroke="${white}" stroke-opacity="0.04" stroke-width="2" fill="none">
    <circle cx="600" cy="315" r="120"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
  </g>

  <!-- Fußballtor-Silhouette (rechts, dezent) -->
  <g stroke="${accent}" stroke-opacity="0.25" stroke-width="4" fill="none">
    <path d="M 950 420 L 950 280 L 1130 280 L 1130 420" stroke-linecap="square"/>
    <g stroke-opacity="0.12" stroke-width="1.5">
      <line x1="960" y1="290" x2="960" y2="420"/>
      <line x1="980" y1="290" x2="980" y2="420"/>
      <line x1="1000" y1="290" x2="1000" y2="420"/>
      <line x1="1020" y1="290" x2="1020" y2="420"/>
      <line x1="1040" y1="290" x2="1040" y2="420"/>
      <line x1="1060" y1="290" x2="1060" y2="420"/>
      <line x1="1080" y1="290" x2="1080" y2="420"/>
      <line x1="1100" y1="290" x2="1100" y2="420"/>
      <line x1="1120" y1="290" x2="1120" y2="420"/>
      <line x1="950" y1="310" x2="1130" y2="310"/>
      <line x1="950" y1="340" x2="1130" y2="340"/>
      <line x1="950" y1="370" x2="1130" y2="370"/>
      <line x1="950" y1="400" x2="1130" y2="400"/>
    </g>
  </g>

  <!-- Label / Logo-Schriftzug oben -->
  <text x="80" y="110" font-family="-apple-system, 'Plus Jakarta Sans', sans-serif"
        font-size="22" font-weight="700" fill="${accent}" letter-spacing="2">
    FUSSBALLTORE.DE
  </text>

  <!-- Accent-Label -->
  ${accentLabel ? `
  <g transform="translate(80, 145)">
    <rect width="${rawAccent.length * 12 + 32}" height="34" rx="6"
          fill="${accent}" fill-opacity="0.12" stroke="${accent}" stroke-opacity="0.4"/>
    <text x="16" y="22" font-family="-apple-system, 'Plus Jakarta Sans', sans-serif"
          font-size="13" font-weight="600" fill="${accentLight}" letter-spacing="1">
      ${escape(rawAccent.toUpperCase())}
    </text>
  </g>` : ''}

  <!-- Haupt-Headline -->
  <text x="80" y="${accentLabel ? 270 : 240}" font-family="-apple-system, 'Plus Jakarta Sans', sans-serif"
        font-size="64" font-weight="800" fill="${white}" letter-spacing="-1.5">
    ${title}
  </text>

  <!-- Subtitle -->
  ${subtitle ? `
  <text x="80" y="${accentLabel ? 340 : 310}" font-family="-apple-system, 'DM Sans', sans-serif"
        font-size="26" font-weight="400" fill="${muted}" letter-spacing="-0.2">
    ${subtitle}
  </text>` : ''}

  <!-- Footer -->
  <g transform="translate(80, 560)">
    <circle cx="6" cy="0" r="4" fill="${accent}"/>
    <text x="20" y="5" font-family="-apple-system, 'DM Sans', sans-serif"
          font-size="16" font-weight="500" fill="${muted}">
      Der professionelle Ratgeber für Fußballtore
    </text>
  </g>
</svg>`;
}

const pages = [
  {
    file: 'og-default.jpg',
    title: 'Fußballtore',
    subtitle: 'Kaufberatung, Größen, Material — fundiert erklärt',
    accentLabel: 'Ratgeber',
  },
  {
    file: 'og-kaufberatung.jpg',
    title: 'Fußballtor kaufen',
    subtitle: 'Die Kaufberatung 2026 — Größe, Material, Sicherheit, Preis',
    accentLabel: 'Kaufberatung',
  },
  {
    file: 'og-groessen.jpg',
    title: 'Fußballtor-Maße',
    subtitle: 'Alle Größen von Großfeld bis Mini — DFB & FIFA',
    accentLabel: 'Größen & Maße',
  },
  {
    file: 'og-material.jpg',
    title: 'Alu vs. Kunststoff',
    subtitle: 'Materialvergleich für Fußballtore — fundiert erklärt',
    accentLabel: 'Material',
  },
  {
    file: 'og-garten.jpg',
    title: 'Fußballtor im Garten',
    subtitle: 'Pop-up, Steck, Mini — für Familien und Kinder',
    accentLabel: 'Garten',
  },
  {
    file: 'og-kinder.jpg',
    title: 'Fußballtor für Kinder',
    subtitle: 'Altersgerechte Tore von 3 bis 14 Jahren',
    accentLabel: 'Kinder',
  },
  {
    file: 'og-verein.jpg',
    title: 'Fußballtor für Vereine',
    subtitle: 'DIN EN 748, TÜV-geprüft, vollverschweißt',
    accentLabel: 'Verein & Wettkampf',
  },
  {
    file: 'og-funino.jpg',
    title: 'Funino-Tore',
    subtitle: '3-gegen-3-Spielformat — Maße und Empfehlungen',
    accentLabel: 'Funino',
  },
  {
    file: 'og-bolzplatztor.jpg',
    title: 'Bolzplatztore',
    subtitle: 'Vandalismussicher für Kommunen, Schulen, Kitas',
    accentLabel: 'Bolzplatztor',
  },
  {
    file: 'og-tornetz.jpg',
    title: 'Tornetz',
    subtitle: 'Material, Stärke, Maschenweite — richtig wählen',
    accentLabel: 'Tornetz',
  },
  {
    file: 'og-aufbau.jpg',
    title: 'Fußballtor aufbauen',
    subtitle: 'Anleitungen für Pop-up, Stecktor, vollverschweißt',
    accentLabel: 'Aufbau-Anleitung',
  },
  {
    file: 'og-ueber-uns.jpg',
    title: 'Über fussballtore.de',
    subtitle: '14 Jahre Praxis im Vereinsbedarf-Fachhandel',
    accentLabel: 'Über uns',
  },
];

for (const page of pages) {
  const svg = buildSvg(page);
  const out = resolve(outDir, page.file);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 88, progressive: true })
    .toFile(out);
  console.log(`✓ Generated ${page.file}`);
}
