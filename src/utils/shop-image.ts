import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Produkt- und Torberater-Bilder aus dem anstoss24-Shop: scripts/fetch-shop-images.mjs
 * (läuft vor Build und Dev-Server) legt sie als WebP in public/shop-bilder/ ab und
 * schreibt das Manifest src/data/shop-bilder.json. Fehlt ein Bild dort, wird das
 * Original vom CDN verwendet – die Seite bleibt immer vollständig.
 */
// Über das Projektverzeichnis auflösen – beim Build liegt dieser Code in einem temporären Bundle,
// relativ zu import.meta.url wäre der Pfad dort falsch.
const MANIFEST = resolve(process.cwd(), 'src/data/shop-bilder.json');
const manifest: Record<string, Record<string, string>> = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
  : {};

export function shopImage(src: string | undefined, width: number): string | undefined {
  if (!src) return undefined;
  return manifest[src]?.[String(width)];
}
