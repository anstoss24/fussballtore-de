/**
 * Zentrale Entitäten für das Schema.org-Markup. Jede Seite referenziert dieselben
 * Objekte per @id, damit Suchmaschinen und KI-Systeme Autor, Portal und Betreiber
 * eindeutig zuordnen können. Betreiber-Fakten entsprechen dem Impressum.
 */
export const SITE = 'https://fussballtore.de';

export const SHOP = {
  '@type': 'Organization',
  '@id': 'https://www.anstoss24.de/#organization',
  name: 'anstoss24',
  url: 'https://www.anstoss24.de/',
  description: 'Vereinsbedarf-Fachhandel für Fußballtore, Tornetze und Sportplatzzubehör',
  founder: { '@type': 'Person', name: 'Maximilian Ebell' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Langweid 6',
    postalCode: '84094',
    addressLocality: 'Elsendorf',
    addressCountry: 'DE',
  },
  sameAs: ['https://www.facebook.com/anstoss24.de', 'https://www.instagram.com/anstoss24.de/'],
};

export const PUBLISHER = {
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'fussballtore.de',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 512, height: 512 },
  description: 'Unabhängiger Ratgeber für Fußballtore aus der Praxis im Vereinsbedarf-Fachhandel',
  parentOrganization: SHOP,
  sameAs: ['https://www.anstoss24.de/ueber-uns/'],
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  name: 'fussballtore.de',
  url: SITE,
  inLanguage: 'de-DE',
  publisher: { '@id': PUBLISHER['@id'] },
};

export const AUTHOR = {
  '@type': 'Person',
  '@id': `${SITE}/ueber-uns/#matthias-frank`,
  name: 'Matthias Frank',
  description: 'Tätig im Vereinsbedarf-Fachhandel mit Schwerpunkt Fußballtore',
  url: `${SITE}/ueber-uns/`,
  worksFor: { '@id': SHOP['@id'] },
  knowsAbout: ['Fußballtore', 'Tornetze', 'DIN EN 748', 'Kippsicherung', 'Funino', 'Bolzplatztore'],
};

/** Verlinkte Primärquellen (für Quellen-Blöcke und llms.txt) */
export const SOURCES = [
  {
    name: 'DFB: Kinderfußball – Spielformen in G-, F- und E-Jugend',
    href: 'https://www.dfb.de/mehr-fussball/kinderfussball',
    note: 'Spielformen und Altersklassen des DFB',
  },
  {
    name: 'DFB: Spielformen im Kinderfußball (Booklet, 2019)',
    href: 'https://assets.dfb.de/uploads/000/236/239/original_Booklet_-_Spielformen_im_Kinderfu%C3%9Fball.pdf',
    note: 'Feldgrößen, Minitor-Maximalmaß 2,00 × 1,20 m und 6-m-Schusszone im 3-gegen-3',
  },
  {
    name: 'IFAB: Spielregel 1 – Das Spielfeld',
    href: 'https://www.theifab.com/laws/latest/the-field-of-play/',
    note: 'Offizielles Tormaß 7,32 × 2,44 m',
  },
  {
    name: 'DIN EN 748:2018-04 – Spielfeldgeräte, Fußballtore',
    href: 'https://www.dinmedia.de/de/norm/din-en-748/283544855',
    note: 'Funktionelle und sicherheitstechnische Anforderungen, Prüfverfahren',
  },
  {
    name: 'DGUV Information 202-044 – Sportstätten und Sportgeräte',
    href: 'https://publikationen.dguv.de/regelwerk/dguv-informationen/1406/sportstaetten-und-sportgeraete-hinweise-zur-sicherheit-und-pru-fung',
    note: 'Hinweise zur Sicherheit und Prüfung',
  },
];

/** Zusätzliche Quellen für Schule, Kita und Spielplatz (Normen-Anwendungsbereiche, DGUV, Ganztag) */
export const SOURCES_OEFFENTLICH = {
  din748: SOURCES[3],
  dguv202044: SOURCES[4],
  din16579: {
    name: 'DIN EN 16579:2020-01 – Spielfeldgeräte, ortsveränderliche und standortgebundene Tore',
    href: 'https://www.dinmedia.de/de/norm/din-en-16579/312597479',
    note: 'Anwendungsbereich: Tore über 10 kg, auch in Bildungseinrichtungen und öffentlichen Freizeitbereichen',
  },
  din15312: {
    name: 'DIN EN 15312:2026-06 – Frei zugängliche Multisportgeräte',
    href: 'https://www.dinmedia.de/de/norm/din-en-15312/400002966',
    note: 'Anforderungen einschließlich Sicherheit und Prüfverfahren',
  },
  en15312Scope: {
    name: 'EN 15312:2026 – Anwendungsbereich (englisch, Estonian Centre for Standardisation)',
    href: 'https://www.evs.ee/en/evs-en-15312-2026',
    note: 'Frei zugänglich, ohne Aufsicht, fest installiert; Abgrenzung zu EN 1176, EN 748, EN 16579',
  },
  din18034: {
    name: 'DIN 18034-1:2020-10 – Spielplätze und Freiräume zum Spielen',
    href: 'https://www.dinmedia.de/de/norm/din-18034-1/326134676',
    note: 'Anforderungen für Planung, Bau und Betrieb, inkl. Flächen vorrangig für Ballspiele',
  },
  dguv202022: {
    name: 'DGUV Information 202-022 – Außenspielflächen und Spielplatzgeräte',
    href: 'https://publikationen.dguv.de/regelwerk/dguv-informationen/1383/aussenspielflaechen-und-spielplatzgeraete',
    note: 'Außenspielflächen von Kitas, Horten und Schulen, Abschnitt Ballspielanlagen',
  },
  sgb8: {
    name: '§ 24 SGB VIII – Anspruch auf Förderung in Tageseinrichtungen',
    href: 'https://www.gesetze-im-internet.de/sgb_8/__24.html',
    note: 'Absatz 4: Ganztagsanspruch für Grundschulkinder',
  },
  bmbfsfjGanztag: {
    name: 'BMBFSFJ: Rechtsanspruch auf Ganztag startet zum 1. August 2026',
    href: 'https://www.bmbfsfj.bund.de/bmbfsfj/aktuelles/pressemitteilungen/rechtsanspruch-auf-ganztag-startet-zum-1-august-2026-292232',
    note: 'Stufenplan bis zum Schuljahr 2029/30',
  },
};
