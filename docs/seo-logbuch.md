# SEO-Logbuch fussballtore.de

Was wurde wann warum geändert, und was ist noch offen. Neueste Einträge oben.
Der Ordner `docs/` wird nicht mit ausgeliefert (nur `src/` und `public/` landen auf der Website).

## 26.10.2026

### Search Console: Indexierung (kein Defekt)
- Stand: 14 indexiert = alle 14 Sitemap-Seiten. 10 nicht indexiert, alle gewollt oder veraltet:
  - 4× Seite mit Weiterleitung: alte Adressen ohne Schrägstrich am Ende, 301 auf die richtige Seite.
  - 1× Umleitungsfehler: `/minitore`, gecrawlt am Deploy-Tag 21.07.; verschwindet beim nächsten Crawl.
  - 1× Alternative Seite mit richtigem kanonischen Tag: Parameter-Variante (Ads/ChatGPT) oder `index.html`; Canonical live korrekt.
  - 1× Nicht gefunden (404): `/cdn-cgi/l/email-protection` aus Cloudflare „Email Address Obfuscation". Funktion am 26.10. abgeschaltet, Validierung gestartet.
  - 3× noindex: Impressum, Datenschutz, 404-Seite. Validierung bestanden 20.10.
- Ursache der Meldungen vom 25.10.: sechs Deploys am 13.10. innerhalb von 2 Stunden. Lehre: Commits bündeln.
- Strukturierte Daten aller Seiten geprüft: gültig. Möglich sind gelbe Warnungen bei Produkt-Snippets (fehlende Versand-/Rückgabeangaben), kein Fehler.

### GSC-Leistungsanalyse (12 Monate, Daten seit 28.02.2026)
- 2.043 Klicks, 194.248 Impressionen, CTR 1,05 %, Position 5,5 (März 10,5 → Okt. 4,9).
- /groessen/ bringt 83 % der Impressionen, überwiegend Zero-Click-Größenfragen.
- Chancen: Jugend-Suchen (D/E/F-Jugend-Tor), Kindertor, Funino-Feld, stabiles Gartentor, Stecktor, Tornetz-Maschen.
- Kaufen-/Preis-Keywords und „fußballtor garten" (Shop-Listings) sind nicht gewinnbar.

### Live gegangen
- Merge `00ce3ff`: Quick Wins auf /kinder/ (Kindertor-Wording), /groessen/ (Bundesliga-Tor, E-/D-/F-Jugend als eigene Abschnitte, FAQ E-Tor und Gewicht), /verein/ (Jugendtore 5 × 2 m, beide Varianten), /funino/ (Funino-Feld mit Maßen, DFB-Quelle), /garten/ (stabiles Gartentor).
- Merge `3afff13`: Stecktor-Abschnitt und FAQ auf /minitore/, FAQ „Wie viele Löcher hat ein Tornetz?" und Abschnitt knotenlos/geknotet auf /tornetz/.
- Fix im selben Merge: Großfeld-Tornetz im Shop von Artikel 25 (404) auf Artikel 617025 umgestellt (products.json, /tornetz/, /verein/). Der Preis-Feed stand dadurch seit Juli auf dem alten Wert.

### Entscheidungen
- Keine eigene /jugendtor/-Seite. Jugend-Wording auf /groessen/ und /verein/, Kinder und Jugend bleiben getrennt.
- Produkt- und Tornetzfakten nur aus der anstoss24-Produktbeschreibung, Shop-Wortlaut bevorzugen, keine eigenen Rechenbeispiele.

### Offen
- [ ] Ab ca. 07.12.2026: GSC-Export pro Seite vergleichen. Liegt die CTR der D-/E-/F-Jugend-Suchen weiter unter 1 %, /jugendtor/ bauen.
- [ ] 404-Validierung in der Search Console abwarten (Mail kommt).
- [x] `scripts/fetch-prices.mjs`: Preis-Job wird bei nicht erreichbarer Shop-Seite rot, GitHub schickt eine Mail (erledigt 26.10.).
- [ ] /tornetz/: Abschnitt Polypropylen vs. Polyethylen und „5–6 mm für Bolzplatz" auf Shop-Stand bringen (Shop führt nur PP, 4 mm).
- [ ] Optional: Versand- und Rückgabeangaben ins Produkt-Markup, nur mit Shop-Daten.
