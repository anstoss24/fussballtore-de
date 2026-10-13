import { getImage } from 'astro:assets';

/**
 * Produkt- und Torberater-Bilder aus dem anstoss24-Shop beim Build als WebP ablegen.
 * Die Shop-Originale sind teils 1–2 MB große PNGs; hier kommen sie auf die
 * tatsächlich gerenderte Größe (2x für Retina). Der alte CDN-Host leitet nur
 * weiter, deshalb direkt den Zielhost ansprechen.
 */
const cache = new Map<string, Promise<string | undefined>>();

/** Das CDN antwortet beim Build gelegentlich nicht – bis zu drei Versuche mit Pause */
async function optimize(url: string, width: number): Promise<string> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return (await getImage({ src: url, inferSize: true, width, format: 'webp' })).src;
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, attempt * 1500));
    }
  }
  throw lastError;
}

export function shopImage(src: string | undefined, width: number): Promise<string | undefined> {
  if (!src) return Promise.resolve(undefined);
  const url = src.replace('cdn02.plentymarkets.com', 'cdn02.plentyone.com');
  const key = `${url}@${width}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      optimize(url, width).catch((err) => {
          console.warn(`Shop-Bild nicht verfügbar, Original wird verwendet: ${src} (${err instanceof Error ? err.message : err})`);
          return undefined;
        })
    );
  }
  return cache.get(key)!;
}
