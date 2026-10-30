import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import fotos from '../data/fotos.json';

/**
 * Produkt- und Torberater-Bilder aus dem anstoss24-Shop: scripts/fetch-shop-images.mjs
 * (läuft vor Build und Dev-Server) legt sie als WebP in public/shop-bilder/ ab und
 * schreibt das Manifest src/data/shop-bilder.json. Fehlt ein Bild dort, wird das
 * Original vom CDN verwendet – die Seite bleibt immer vollständig.
 */
// Über das Projektverzeichnis auflösen – beim Build liegt dieser Code in einem temporären Bundle,
// relativ zu import.meta.url wäre der Pfad dort falsch.
const MANIFEST = resolve(process.cwd(), 'src/data/shop-bilder.json');
type Eintrag = Record<string, string | number> & { bildart?: Bildart; w?: number; h?: number };
export type Bildart = 'freisteller' | 'szene';
const manifest: Record<string, Eintrag> = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, 'utf8'))
  : {};

export function shopImage(src: string | undefined, width: number | `c${number}`): string | undefined {
  if (!src) return undefined;
  const p = manifest[src]?.[String(width)];
  return typeof p === 'string' ? p : undefined;
}

/** Freisteller (weißer Rand) oder Szenenfoto – erkennt das Fetch-Skript am Bildrand */
export function shopImageArt(src: string | undefined): Bildart | undefined {
  return src ? manifest[src]?.bildart : undefined;
}

/** Redaktionelle Fotos aus dem Shop (src/data/fotos.json), lokal als WebP in 640 und 1280 px */
export type FotoKey = keyof typeof fotos;
export function foto(key: FotoKey) {
  const f = fotos[key];
  const s = shopImage(f.url, 640);
  const l = shopImage(f.url, 1280);
  return {
    src: l ?? s ?? f.url,
    srcset: s && l ? `${s} 640w, ${l} 1280w` : undefined,
    alt: f.alt,
  };
}
