/**
 * Zwei Logiken, eine Datenquelle:
 * - Torarten = das Sortiment (definiert über Bauart und Maß)
 * - Einsatzorte = wo ein Tor aufgestellt wird; jedem Ort sind die Torarten zugeordnet,
 *   die die jeweilige Seite selbst empfiehlt (Belegstelle steht am Eintrag).
 * Genutzt von Startseite, Header, Footer, Unterseiten-Banner und TorartenFuerEinsatzort.
 */
import type { FotoKey } from '../utils/shop-image';

export type TorartId = 'grossfeld' | 'jugend' | 'kleinfeld' | 'bolzplatz' | 'minitor';

export interface Torart {
  id: TorartId;
  name: string;
  /** Plural fürs Menü und die Startseite */
  plural: string;
  mass: string;
  subtitle: string;
  href: string;
  foto: FotoKey;
  /** Maße in Metern für die maßstabsgetreue Linienzeichnung */
  breite: number;
  hoehe: number;
  /** Geschlossener Hinterbau (Streben statt Netz) */
  hinterbau?: boolean;
}

export const TORARTEN: Record<TorartId, Torart> = {
  grossfeld: {
    id: 'grossfeld',
    name: 'Großfeldtor',
    plural: 'Großfeldtore',
    mass: '7,32 × 2,44 m',
    subtitle: 'Wettkampfstandard ab C-Jugend',
    href: '/verein/#grossfeldtore',
    foto: 'kat-grossfeld',
    breite: 7.32,
    hoehe: 2.44,
  },
  jugend: {
    id: 'jugend',
    name: 'Jugendtor',
    plural: 'Jugendtore',
    mass: '5,00 × 2,00 m',
    subtitle: 'E- und D-Jugend',
    href: '/verein/#jugendtore',
    foto: 'kat-jugend',
    breite: 5,
    hoehe: 2,
  },
  kleinfeld: {
    id: 'kleinfeld',
    name: 'Kleinfeldtor',
    plural: 'Kleinfeldtore',
    mass: '3,00 × 2,00 m',
    subtitle: 'Training und F-Jugend',
    href: '/verein/#kleinfeldtore',
    foto: 'kat-kleinfeld',
    breite: 3,
    hoehe: 2,
  },
  bolzplatz: {
    id: 'bolzplatz',
    name: 'Bolzplatztor',
    plural: 'Bolzplatztore',
    mass: '3,00 × 2,00 m',
    subtitle: 'Geschlossener Hinterbau statt Netz',
    href: '/bolzplatztor/',
    foto: 'kat-bolzplatz',
    breite: 3,
    hoehe: 2,
    hinterbau: true,
  },
  minitor: {
    id: 'minitor',
    name: 'Minitor',
    plural: 'Minitore & Pop-up-Tore',
    mass: 'ab 1,20 × 0,80 m',
    subtitle: 'Für Training, Funino & Garten',
    href: '/minitore/',
    foto: 'kat-minitore',
    breite: 1.2,
    hoehe: 0.8,
  },
};

/** Reihenfolge überall: groß nach klein */
export const TORART_REIHENFOLGE: TorartId[] = ['grossfeld', 'jugend', 'kleinfeld', 'bolzplatz', 'minitor'];

export interface Zuordnung {
  torart: TorartId;
  /** Wofür an diesem Ort – sinngemäß aus dem Seitentext */
  hinweis: string;
  /** Belegstelle auf der Einsatzort-Seite (nur Doku, wird nicht ausgegeben) */
  beleg: string;
}

export interface Einsatzort {
  id: string;
  name: string;
  subtitle: string;
  href: string;
  tore: Zuordnung[];
}

export const EINSATZORTE: Einsatzort[] = [
  {
    id: 'verein',
    name: 'Sportverein',
    subtitle: 'Spiel- und Trainingsbetrieb',
    href: '/verein/',
    tore: [
      { torart: 'grossfeld', hinweis: 'Herren, Frauen und ab C-Jugend', beleg: 'verein.astro: TL;DR „Regelmaße“, H2 „Großfeldtore – 7,32 x 2,44 m Regelmaß“' },
      { torart: 'jugend', hinweis: 'E- und D-Jugend', beleg: 'verein.astro: H2 #jugendtore „Jugendtore für E- und D-Jugend“' },
      { torart: 'kleinfeld', hinweis: 'F-Jugend und Training', beleg: 'verein.astro: H2 „Kleinfeldtore – 3,00 x 2,00 m für Training und F-Jugend“' },
    ],
  },
  {
    id: 'schule',
    name: 'Schule & Kita',
    subtitle: 'Schulhof, Schulsport, Kita',
    href: '/schule/',
    tore: [
      { torart: 'grossfeld', hinweis: 'Schulsportplatz', beleg: 'schule.astro: Tabelle „Welche Norm gilt für welches Schultor?“, Zeile DIN EN 748 „Jugend- und Großfeldtore auf dem Schulsportplatz“' },
      { torart: 'jugend', hinweis: 'Schulsportplatz', beleg: 'schule.astro: Tabelle unter „Welches Fußballtor passt zur Schule?“, Zeile Schulsportplatz' },
      { torart: 'kleinfeld', hinweis: 'Schulsportplatz', beleg: 'schule.astro: Tabelle unter „Welches Fußballtor passt zur Schule?“, Zeile Schulsportplatz' },
      { torart: 'bolzplatz', hinweis: 'Schulhof, ohne Aufsicht', beleg: 'schule.astro: Tabelle unter „Welches Fußballtor passt zur Schule?“, Zeile Schulhof' },
      { torart: 'minitor', hinweis: 'Grundschulhof, Ganztag und Kita', beleg: 'schule.astro: Tabelle unter „Welches Fußballtor passt zur Schule?“, Zeilen Schulhof, Grundschulhof/Ganztag, Kita' },
    ],
  },
  {
    id: 'spielplatz',
    name: 'Spielplatz',
    subtitle: 'Frei zugängliche Spielflächen',
    href: '/spielplatz/',
    tore: [
      { torart: 'bolzplatz', hinweis: 'Eigene Ballspielfläche', beleg: 'spielplatz.astro: H2 „Welche Torgröße für welchen Spielplatz?“ + „Unsere Empfehlungen für Spielplätze“' },
      { torart: 'minitor', hinweis: 'Jüngere Kinder, nur Alu mit Hinterbau', beleg: 'spielplatz.astro: H2 „Welche Torgröße für welchen Spielplatz?“, Empfehlung Alu-Minitor mit geschlossenem Hinterbau; Pop-up/Steck „nicht dafür gemacht“ (H2 „Welches Fußballtor gehört auf einen Spielplatz?“)' },
    ],
  },
  {
    id: 'garten',
    name: 'Garten',
    subtitle: 'Für zu Hause',
    href: '/garten/',
    tore: [
      { torart: 'kleinfeld', hinweis: 'Sehr großer Garten, fest installiert', beleg: 'garten.astro: „Empfehlung nach Alter und Gartengröße“, Stufe 18+ „3,00 x 2,00 m – Fest installiertes Kleinfeld-Tor“' },
      { torart: 'minitor', hinweis: 'Pop-up-, Steck- und Alu-Minitore', beleg: 'garten.astro: H2 „Welches Fußballtor für den Garten?“ (Tabelle Pop-up/Stecktore/Minitore)' },
    ],
  },
];

export const einsatzort = (id: string) => EINSATZORTE.find((e) => e.id === id);

/**
 * Linienzeichnung im Unterseiten-Banner, je Pfad die passenden Torarten (maßstabsgetreu).
 * Einsatzort-Seiten zeigen ihre zugeordneten Torarten, Ratgeber das Thema der Seite.
 */
const ALLE = TORART_REIHENFOLGE;
export const BANNER_TORE: Record<string, TorartId[]> = {
  '/kaufberatung/': ALLE,
  '/groessen/': ['grossfeld', 'jugend', 'kleinfeld', 'minitor'],
  '/material-vergleich/': ['grossfeld', 'minitor'],
  '/tornetz/': ['grossfeld', 'jugend', 'kleinfeld'],
  '/aufbau-anleitung/': ['jugend', 'minitor'],
  '/kinder/': ['kleinfeld', 'minitor'],
  '/funino/': ['minitor', 'minitor'],
  '/minitore/': ['minitor'],
  '/bolzplatztor/': ['bolzplatz'],
  '/ueber-uns/': ['grossfeld'],
  ...Object.fromEntries(EINSATZORTE.map((e) => [e.href, e.tore.map((t) => t.torart)])),
};
