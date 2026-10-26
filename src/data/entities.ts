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
