/**
 * Redaktionelle Texte für den Torberater.
 *
 * Fragen, Antworten und Produkte kommen automatisch aus dem Shop
 * (src/data/torberater.json). Hier stehen nur unsere eigenen Ergänzungen.
 * Schlüssel = Frage-Titel bzw. "Frage-Titel|Antwort" so, wie er im Shop heißt.
 * Neue Fragen im Shop funktionieren auch ohne Eintrag hier – nur eben ohne Erklärung.
 */

/** Shop-Labels sind GROSS geschrieben – hier die lesbare Form, wo die automatische nicht passt */
export const LABELS: Record<string, string> = {
  'Alu-rundrohr': 'Alu-Rundrohr',
  'In bodenhülsen stehend': 'In Bodenhülsen',
  'Freie netzaufhängung': 'Freie Netzaufhängung',
};

/** Kurze Einordnung unter der Antwort */
export const HINTS: Record<string, string> = {
  'Torgröße|Großfeldtor': '7,32 × 2,44 m',
  'Torgröße|Jugendtor': '5,00 × 2,00 m',
  'Torgröße|Bolzplatztor': '3,00 × 2,00 m',
  'Torgröße|Minitor': 'Training, Funino & Garten',
  'Einsatzzweck|In bodenhülsen stehend': 'Fest im Boden verankert',
  'Einsatzzweck|Mobil': 'Frei versetzbar auf dem Platz',
  'Hinterbau|Alu-rundrohr': 'Metallstäbe statt Netz',
  'Hinterbau|Tornetz': 'Klassisch mit Netz',
};

/** „Was bedeutet das?“ – Erklärung je Frage, mit Link in den passenden Ratgeber */
export const HELP: Record<string, { text: string; href?: string; linkText?: string }> = {
  Torgröße: {
    text: 'Großfeldtore (7,32 × 2,44 m) sind das Regelmaß für Erwachsene, Jugendtore (5,00 × 2,00 m) für den Nachwuchs. Bolzplatztore (3,00 × 2,00 m) sind für öffentliche Plätze gebaut, Minitore für Training, Funino und den Garten.',
    href: '/groessen/',
    linkText: 'Welche Torgröße für welches Alter?',
  },
  Einsatzzweck: {
    text: 'In Bodenhülsen: Das Tor steckt in Hülsen, die fest im Boden sitzen – maximal standfest, die erste Wahl für Wettkampfplätze. Mobil: Das Tor steht frei, wird mit Gegengewichten oder Erdankern gesichert und lässt sich versetzen – ideal für Trainings- und Mehrzweckplätze.',
    href: '/verein/#fest-oder-mobil',
    linkText: 'Fest montiert oder transportabel im Vergleich',
  },
  Netzaufhängung: {
    text: 'Netzbügel: Das Netz wird über Bügel aus Alu-Rohr gespannt, die hinten am Tor sitzen. Freie Netzaufhängung: Das Netz hängt an eigenen Pfosten mit Spannseilen hinter dem Tor – das Tor selbst hat keine Bügel.',
    href: '/tornetz/',
    linkText: 'Welches Tornetz für welches Tor?',
  },
  Kippsicherung: {
    text: 'Für Großfeld- und Jugendtore fordert die DIN EN 748 eine Sicherung gegen Umkippen. „Mit“ heißt: Stahlgewichte sind fest ins Tor integriert. „Ohne“ heißt: Du sicherst das Tor zusätzlich, z. B. mit Gegengewichten oder Erdankern.',
    href: '/aufbau-anleitung/#kippsicherung',
    linkText: 'So sicherst du ein Tor richtig',
  },
  Hinterbau: {
    text: 'Alu-Rundrohr: Hinten und an den Seiten sitzen Metallstäbe statt eines Netzes – nichts kann abgerissen werden, darum Standard auf öffentlichen Plätzen. Tornetz: der klassische Aufbau mit Netz.',
    href: '/bolzplatztor/',
    linkText: 'Was ein Bolzplatztor leisten muss',
  },
  Geräuschdämmung: {
    text: 'Bei der Geräuschdämmung ist die Alu-Konstruktion mit Sand gefüllt. Das dämpft das Aufprallgeräusch von Schüssen deutlich – sinnvoll, wenn Anwohner in der Nähe sind.',
  },
  Pfostenprofil: {
    text: 'Ovalprofile (meist 120/100 mm) sind der Standard bei Vereinstoren. Rechteckprofile sind kantig und häufig bei kompakten Minitoren zu finden.',
    href: '/material-vergleich/',
    linkText: 'Mehr zu Profilen und Material',
  },
};
