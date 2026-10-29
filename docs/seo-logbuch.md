# SEO-Logbuch fussballtore.de

Was wurde wann warum geändert, und was ist noch offen. Neueste Einträge oben.
Der Ordner `docs/` wird nicht mit ausgeliefert (nur `src/` und `public/` landen auf der Website).

## 29.10.2026 – Grafischer Feinschliff (Branch `feature/feinschliff`, nicht live)

### Geändert
- Kontrast: Grün und Grautöne eine Stufe dunkler (Buttons, Links, Fließtext WCAG AA), kleinste Schrift 13 px.
- Startseiten-Hero mit echtem Shop-Foto statt Verlauf und Spielfeldlinien, Kategorien mit Fotos im 4er-Raster (8 Kategorien).
- Shop-Bilder in voller Auflösung (`/full/`-Variante, bis ~1280 px), redaktionelle Fotos in `src/data/fotos.json`.
- Komponenten ruhiger: Produktkarte, TL;DR, FAQ, Trust-Leiste ohne Vorlagen-Symbole; einheitliche Radien; sichtbarer Fokus.
- Bugs: Cookie-Banner mobil kompakt, kein Seitwärts-Scrollen bei 768 px (Desktop-Menü ab 1024 px).
- Texte, Überschriften, Schema und Seitenaufbau unverändert.

### Offen
- [ ] Shop: Produktbild von Artikel 14045 (ELF Sports Alu-Minitor light) ist laut Dateiname KI-generiert („Gemini-Generated-Image") und erscheint im Torberater. Im Shop durch ein echtes Foto ersetzen.
- [ ] Freigabe Matze, dann Merge nach `main` (gebündelt, ein Deploy).

## 29.10.2026

### Neue Seiten (Branch `feature/oeffentlich-inhalt`, nicht live)
- `/schule/`: Fußballtor für Schule, Schulhof, Schulsport und Kita-Außengelände. Normen-Abgrenzung DIN EN 748 / 16579 / 15312, DGUV 202-044 und 202-022, Ganztags-Rechtsanspruch ab 01.08.2026 (Quelle BMBFSFJ + § 24 Abs. 4 SGB VIII). Empfehlungen: Bolzplatztor UNKAPUTTBAR (Schulhof), mobiles Kleinfeldtor mit Herkulesnetz (Schulsport), Textlink Alu-Minitor mit Hinterbau (Kita).
- `/spielplatz/`: Fußballtor für öffentliche Spielplätze und Wohnanlagen. DIN EN 15312 vs. DIN EN 1176, Lärm, Verankerung, Betreiberverantwortung. Empfehlungen: SILENCE Bolzplatztor (sandgefüllt, geräuschgedämpft), Alu-Minitor mit Hinterbau; Textlinks Bolzplatztor mit Basketballaufbau und Erdanker.
- products.json: neu `bolzplatz-silence` und `kleinfeldtor-herkulesnetz` (Preis-Feed läuft mit). OG-Bilder `og-schule.jpg`, `og-spielplatz.jpg` neu generiert, alle anderen byte-gleich.
- Interne Links auf die neuen Seiten: Startseiten-Kategorien, Footer, /bolzplatztor/ (Intro + Weiterführend), /minitore/, /verein/, llms.txt, llms-full.txt. Datum in page-dates.json nur für die neuen Seiten gesetzt.

### Entscheidungen
- Keine eigene Kommunen-Seite: /bolzplatztor/ bleibt die Seite für Kommunen und öffentliche Plätze (Intention: das Produkt Bolzplatztor). /schule/ = Einsatzort Schule/Kita, /spielplatz/ = Einsatzort Spielplatz/Wohnanlage.
- Normen nur mit Anwendungsbereich laut DIN Media bzw. EN-Volltext; DGUV-Aussagen wörtlich aus den PDFs.
- Keine Aussagen zu Förderung, Kauf auf Rechnung, Angeboten oder Datenblättern. Nur ein neutraler Satz „Fragen zur Bestellung beantwortet anstoss24 direkt“.

### Offen
- [ ] Fachliche Prüfung durch Matze: Normen-Aussagen auf /bolzplatztor/, /verein/, /kinder/, Startseite stellen DIN EN 748 teils als Pflicht für alle Schul-/Kommunaltore dar. Laut DIN Media gilt sie nur für 5 × 2 m und 7,32 × 2,44 m. Nicht geändert, Entscheidung offen.
- [ ] /bolzplatztor/ und /verein/ enthalten noch Förderungs-Hinweise (Abschnitt, FAQ, Description, llms.txt). Nicht geändert, Entscheidung offen.
- [ ] Shop-Texte: Bolzplatztore nennen DIN EN 15312:2010-12 (zurückgezogen, aktuell 2026-06), Gewichte widersprüchlich (UNKAPUTTBAR 80–90 kg vs. 96 kg; SILENCE 140–150 kg vs. 125 kg), Minitor-Hinterbau 2,40 × 1,20 m im Text vs. Variante 2,4 × 1,6 m.
- [ ] Nach Merge: neue URLs /schule/ und /spielplatz/ in der Search Console per URL-Prüfung einreichen.

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
- [x] /tornetz/ und /verein/: Tornetz-Fakten auf Shop-Stand (nur PP, Shop-Stärken, Maschen, Netztiefen; PE und 5/6 mm raus), erledigt 27.10. Erfahrungswerte (Lebensdauer, Pflege, Ersatznetz) bleiben bewusst drin, Entscheidung Matze.
- [ ] Optional: Versand- und Rückgabeangaben ins Produkt-Markup, nur mit Shop-Daten.
