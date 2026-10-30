/**
 * Startseiten-Vorschläge (/vorschlag-1/ bis /vorschlag-3/): Kartendaten für „Nach Torart“ und „Nach Einsatzort“.
 * Alles aus bestehenden Quellen: einsatzorte.ts (Zuordnung), fotos.json (Bilder), torberater.json (Anzahl, Ab-Preis).
 */
import { TORARTEN, TORART_REIHENFOLGE, EINSATZORTE, geeignetLabel, type TorartId } from '../../data/einsatzorte';
import { tbTree, tbMeta } from '../../utils/torberater';
import type { FotoKey } from '../../utils/shop-image';

/** Torberater-Antwort (Frage „Torgröße“) je Torart; Kleinfeld hat dort keine eigene Antwort */
const TORBERATER_ANTWORT: Partial<Record<TorartId, string>> = {
  grossfeld: 'Großfeldtor',
  jugend: 'Jugendtor',
  bolzplatz: 'Bolzplatztor',
  minitor: 'Minitor',
};

export interface Karte {
  name: string;
  href: string;
  meta?: string;
  subtitle: string;
  /** Torberater-Kennzahl „x Tore · ab y €“ */
  info?: string;
  /** „Geeignet: …“ bei Einsatzorten */
  geeignet?: string[];
  /** Einsatzort-Schlüssel für die Ortsillustration */
  ort?: string;
  fotos: FotoKey[];
  tore: TorartId[];
}

export const torartKarten: Karte[] = TORART_REIHENFOLGE.map((id) => {
  const t = TORARTEN[id];
  const antwort = tbTree.options.find((o) => o.label === TORBERATER_ANTWORT[id]);
  return {
    name: t.plural.replaceAll('-', '‑'), // geschützte Bindestriche: kein Umbruch in „Pop-up“
    href: t.href,
    meta: t.mass,
    subtitle: t.subtitle,
    info: antwort ? tbMeta(antwort) : undefined,
    fotos: [t.foto],
    tore: [id],
  };
});

// Collage höchstens 2×2: bei fünf Torarten fällt das Jugendtor weg (sieht im Foto aus wie das Großfeldtor)
const collage = (tore: TorartId[]) => (tore.length > 4 ? tore.filter((id) => id !== 'jugend') : tore);

export const einsatzortKarten: Karte[] = EINSATZORTE.map((e) => {
  const tore = e.tore.map((z) => z.torart);
  return {
    name: e.name,
    href: e.href,
    subtitle: e.subtitle,
    geeignet: e.tore.map(geeignetLabel),
    ort: e.id,
    fotos: collage(tore).map((id) => TORARTEN[id].foto),
    tore,
  };
});

/**
 * Linienzeichnungen: ein Maßstab je Kartensatz (Torart bzw. Einsatzort). Lange Torreihen (Verein, Kommune, Schule)
 * werden zweizeilig gesetzt, damit die Tore nicht winzig werden.
 */
const ABSTAND_M = 0.9;
const RAND_M = 0.3;
export const reiheBreiteM = (tore: TorartId[]) =>
  tore.reduce((s, id) => s + TORARTEN[id].breite, 0) + ABSTAND_M * (tore.length - 1) + RAND_M;

export function torReihen(tore: TorartId[]): TorartId[][] {
  const gesamt = reiheBreiteM(tore);
  if (gesamt <= 10) return [tore];
  let k = 1;
  while (k < tore.length - 1 && reiheBreiteM(tore.slice(0, k)) < gesamt / 2) k++;
  return [tore.slice(0, k), tore.slice(k)];
}

/** Maßstab eines Kartensatzes: die breiteste Torreihe füllt die Kartenbreite */
export const massstabM = (karten: Karte[]) => Math.max(...karten.flatMap((k) => torReihen(k.tore).map(reiheBreiteM)));
