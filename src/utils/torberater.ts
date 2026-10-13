import { shopImage } from './shop-image';
import torberaterData from '../data/torberater.json';
import { LABELS } from '../data/torberater-texte';

export type TbProduct = {
  id: number;
  name: string;
  url: string;
  image: string | null;
  price: number | null;
  uvp: number | null;
};
export type TbOption = {
  label: string;
  image?: string;
  total: number;
  priceMin: number | null;
  priceMax: number | null;
  shopUrl: string;
  next?: TbStep;
  products?: TbProduct[];
};
export type TbStep = { title: string; question: string; options: TbOption[] };

export const tbTree = torberaterData.tree as TbStep;
export const tbLastUpdated = torberaterData.lastUpdated;

export const tbLabel = (o: TbOption) => LABELS[o.label] ?? o.label;

/** "Mit" / "Ohne" allein sagt in der Auswahl-Zeile nichts – Thema anhängen */
export const tbChip = (o: TbOption, step: TbStep) =>
  o.label === 'Mit' || o.label === 'Ohne' ? `${o.label} ${step.title}` : tbLabel(o);

/** URL-taugliche Kurzform: "Ohne Kippsicherung" -> "ohne-kippsicherung" */
export const tbSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Trefferzahl und Mindestpreis aus den erreichbaren Endpunkten.
 * Der Shop zählt auf Ebene 1 auch Tore, die in keiner Folgefrage auftauchen
 * (z. B. Pop-up-Tore bei „Minitor“) – die Zahl soll halten, was der Klick verspricht.
 */
export function tbReachable(o: TbOption): { total: number; priceMin: number | null } {
  if (!o.next) return { total: o.total, priceMin: o.priceMin };
  const parts = o.next.options.map(tbReachable);
  const mins = parts.map((p) => p.priceMin).filter((p): p is number => p != null);
  return {
    total: parts.reduce((n, p) => n + p.total, 0),
    priceMin: mins.length ? Math.min(...mins) : null,
  };
}

export const tbEuro = (n: number) =>
  new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n) + ' €';

export function tbMeta(o: TbOption) {
  const { total, priceMin } = tbReachable(o);
  return [`${total} ${total === 1 ? 'Tor' : 'Tore'}`, priceMin != null ? `ab ${tbEuro(priceMin)}` : null]
    .filter(Boolean)
    .join(' · ');
}

/** Shop-Namen beginnen oft mit "Fußballtor - " – das ist hier redundant */
export function tbProductName(name: string) {
  const n = name.replace(/^Fu(ß|ss)balltor\s*-\s*/i, '');
  return n.charAt(0).toLocaleUpperCase('de-DE') + n.slice(1);
}

/** Antwort-Bilder aus dem Shop beim Build als kleines WebP (2x für Retina) */
export const tbImage = (src?: string) => shopImage(src, 192);


/** Alle Endpunkte des Baums als flache Liste (Pfad-Schlüssel wie im Torberater-Component) */
export type TbEndpoint = { trail: string[]; key: string; option: TbOption };
export function tbEndpoints(step: TbStep = tbTree, trail: string[] = [], prefix = ''): TbEndpoint[] {
  return step.options.flatMap((o) => {
    const chip = tbChip(o, step);
    const key = prefix ? `${prefix}/${tbSlug(chip)}` : tbSlug(chip);
    const t = [...trail, chip];
    return o.next ? tbEndpoints(o.next, t, key) : [{ trail: t, key, option: o }];
  });
}
