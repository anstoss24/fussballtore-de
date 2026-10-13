import { existsSync, readFileSync } from 'node:fs';

/**
 * Produkt- und Torberater-Bilder aus dem anstoss24-Shop: scripts/fetch-shop-images.mjs
 * (läuft vor Build und Dev-Server) legt sie als WebP in public/shop-bilder/ ab und
 * schreibt das Manifest src/data/shop-bilder.json. Fehlt ein Bild dort, wird das
 * Original vom CDN verwendet – die Seite bleibt immer vollständig.
 */
const MANIFEST = new URL('../data/shop-bilder.json', import.meta.url);
const manifest: Record<string, Record<string, string>> = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
  : {};

export function shopImage(src: string | undefined, width: number): string | undefined {
  if (!src) return undefined;
  return manifest[src]?.[String(width)];
}
