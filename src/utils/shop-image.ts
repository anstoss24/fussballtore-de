import { getImage } from 'astro:assets';

/**
 * Produkt- und Torberater-Bilder aus dem anstoss24-Shop beim Build als WebP ablegen.
 * Die Shop-Originale sind teils 1–2 MB große PNGs; hier kommen sie auf die
 * tatsächlich gerenderte Größe (2x für Retina). Der alte CDN-Host leitet nur
 * weiter, deshalb direkt den Zielhost ansprechen.
 */
const cache = new Map<string, Promise<string | undefined>>();

export function shopImage(src: string | undefined, width: number): Promise<string | undefined> {
  if (!src) return Promise.resolve(undefined);
  const url = src.replace('cdn02.plentymarkets.com', 'cdn02.plentyone.com');
  const key = `${url}@${width}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      getImage({ src: url, inferSize: true, width, format: 'webp' })
        .then((img) => img.src)
        .catch(() => {
          console.warn(`Shop-Bild nicht verfügbar, Original wird verwendet: ${src}`);
          return undefined;
        })
    );
  }
  return cache.get(key)!;
}
