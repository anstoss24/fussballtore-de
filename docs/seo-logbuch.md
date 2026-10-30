# SEO-Logbuch fussballtore.de

Was wurde wann warum geändert, und was ist noch offen. Neueste Einträge oben.
Der Ordner `docs/` wird nicht mit ausgeliefert (nur `src/` und `public/` landen auf der Website).

## 30.10.2026 – Normen-Aussagen korrigiert, Förderung entfernt (Branch `feature/feinschliff`, nicht live)

**Entscheidung (Matze 30.10.):** Förderung komplett raus (anstoss24 fördert nichts, aktuelle Lage nicht belegbar). DIN-Aussagen auf belegten Stand: DIN EN 748:2018-04 nur für 7,32 × 2,44 m und 5 × 2 m (Training/Wettkampf), DIN EN 16579:2020-01 für andere Spielfeldtore über 10 kg, DIN EN 15312:2026-06 für frei zugängliche, fest installierte Tore ohne Aufsicht. Normen sind keine Gesetze; Pflicht = Verkehrssicherungspflicht des Betreibers, Norm = Maßstab.

### Geändert
- /bolzplatztor/: TL;DR „Norm“ und FAQ „TÜV-Prüfung?“ von „DIN EN 748 verpflichtend“ auf DIN EN 15312 / 16579 + Verkehrssicherungspflicht; Kippsicherheit-Punkt ohne 748; Abschnitt „Fördermöglichkeiten“ und Förder-Satz in FAQ „Was kostet …“ gelöscht; Description „… Einbau und Förderung.“ → „… Normen, Größen und Einbau.“ (Title/H1 unverändert); Quellenblock ergänzt.
- /verein/: FAQ „TÜV-geprüft?“, TL;DR „Norm“ und Normen-Abschnitt auf 748 = Großfeld/Jugend, 16579 = übrige Spielfeldtore (kein „Schulbereich“ mehr); Förder-Satz im Spar-Tipp gestrichen (Mengenrabatt-Teil bleibt); Quelle DIN EN 16579 ergänzt.
- /kinder/: „TÜV-geprüfte Tore nach DIN EN 748 vorgeschrieben“ → Normen als Maßstab, 748/16579 nach Torart; Quellenblock.
- Startseite: FAQ „Müssen Fußballtore TÜV-geprüft sein?“ nennt 748/16579/15312 je nach Tor.
- /kaufberatung/: FAQ, TL;DR, Normen-Abschnitt, TÜV-Kasten und Checkliste auf „passende Norm“ (748 nur Großfeld/Jugend); Quellenblock.
- /aufbau-anleitung/, /material-vergleich/, /groessen/ (Kauf-Tipp „Normen“), /torberater/ (FAQ Kippsicherung): 748-Aussagen auf Großfeld/Jugend eingegrenzt bzw. 16579/15312 ergänzt; Quellen ergänzt.
- llms.txt / llms-full.txt: Förderhinweise entfernt, Normen-Zuordnung korrigiert, „Beuth-Verlag“ → „DIN Media“.
- Skill-Referenz `.claude/skills/fact-checking/references/din-en-748.md`: Ausgabe 2018-04, Geltungsbereich, Abgrenzung 16579/15312 mit Quellen.
- page-dates.json: index, kaufberatung, groessen, material-vergleich, kinder, aufbau-anleitung, torberater, verein, bolzplatztor → 2026-10-30.

### Bewusst gelassen
- Aussagen, die sich nur auf Großfeld-/Jugendtore beziehen (/groessen/ Großfeldtor-Abschnitt, /verein/ Großfeldtor-Checkliste, Torberater-Frage „Kippsicherung gemäß DIN EN 748“ – erscheint nur bei Großfeld mobil und Jugendtor), Produkt-Features „DIN EN 748“ aus dem Shop, Meta-Descriptions von /verein/, /kaufberatung/, /groessen/, /aufbau-anleitung/.

### Offen
- Skill-Referenz enthält weiter unbelegte Detailwerte (Prüfkraft 1.100 N, Gegengewichte 40–50 kg, OLG Saarbrücken) – vor Verwendung prüfen.

## 30.10.2026 – Struktur Torart / Einsatzort, Hero zurück, Banner (Branch `feature/feinschliff`, nicht live)

### Geändert
- Matzes Feedback: „Schultore“/„Spielplatztore“ sind keine Torarten. Torarten (Sortiment) und Einsatzorte jetzt getrennt, eine Datenquelle `src/data/einsatzorte.ts` für Startseite, Header, Footer, Banner und Mapping-Baustein.
- Torarten: Großfeldtore → /verein/#grossfeldtore, Jugendtore → /verein/#jugendtore, Kleinfeldtore → /verein/#kleinfeldtore, Bolzplatztore → /bolzplatztor/, Minitore & Pop-up-Tore → /minitore/. Einsatzorte: Sportverein, Kommune & öffentliche Plätze, Schule & Kita, Spielplatz, Garten.
- Startseite: „Fußballtore nach Kategorie“ ersetzt durch „Fußballtore nach Torart“ (Fotokarten) und „Fußballtore nach Einsatzort“ (Liste mit maßstabsgetreuen Tor-Linien und „Geeignet: …“). H1, Title, Description unverändert.
- Header: Kaufberatung, Größen, Material direkt; Dropdowns „Tore“ (Torarten + Kinder/Funino) und „Einsatzorte“ als `<details>`, Links bleiben im HTML. Mobilmenü gruppiert (Ratgeber/Torarten/Einsatzorte). Footer: Ratgeber/Torarten/Einsatzorte/Über.
- Startseiten-Hero zurück auf Navy-Verlauf mit Spielfeldlinien (Stand main), Torberater-Kacheln bleiben. Unterseiten-Banner: Spielfeldlinien + kleine maßstabsgetreue Tor-Linienzeichnung zum Seitenthema (ab 768 px).
- Neuer Abschnitt „Welche Torarten passen hier?“ auf /verein/, /kommune/, /schule/, /spielplatz/, /garten/, früh auf der Seite (Vorgabe team-lead: Kunde sieht die Zuordnung sofort): auf /verein/ und /spielplatz/ direkt nach TL;DR und Einleitung; auf /schule/, /kommune/ und /garten/ direkt hinter der ersten Tabelle „Welches Tor passt …“ samt Folgeabsatz, weil der Baustein davor dieselbe Zuordnung doppelt gezeigt hätte. Zeichnung überall im gleichen Maßstab. Zuordnung nur aus dem, was die Seite selbst sagt; Belegstelle steht je Eintrag in `einsatzorte.ts`. /kommune/-Zuordnung vom kommune-Agenten, Minitor dort ausdrücklich nur robuste Alu-Minitore, keine Pop-up-/Klapptore. page-dates dieser Seiten (außer kommune) auf 30.10.
- /bolzplatztor/: im Weiche-Absatz vom 29.10. ein Satz mit Link auf /kommune/, /kommune/ in „Weiterführende Ratgeber“. Description, H1, FAQ, übriger Fließtext unverändert; page-dates auf 30.10.
- /verein/: Sprungmarken `id="grossfeldtore"` und `id="kleinfeldtore"` an bestehenden H2 (Text unverändert).

### Entscheidungen
- Keine URL, H1, Title, Description, kein Fließtext bestehender Seiten geändert. Linktexte „Vereinstore“, „Gartentore“, „Kindertore“ in RelatedContent/Breadcrumbs bleiben (Keyword-Ankertexte); „Schultore“/„Spielplatztore“ gab es nur auf Startseite und Footer.
- Funino bleibt Ratgeber, keine eigene Torart (Funino-Empfehlungen sind Minitore).

### Offen
- [ ] Freigabe Matze für Merge nach main.

## 30.10.2026 – Neue Seite /kommune/ (Branch `feature/feinschliff`, nicht live)

### Neu
- `/kommune/`: Fußballtore für Kommunen und öffentliche Plätze. Einsatzort-Seite (keine Torart-Seite): ordnet kommunale Flächen den Torarten zu – öffentlicher Bolzplatz ohne Aufsicht → Bolzplatztor (DIN EN 15312), kommunaler Sportplatz mit Vereinsbetrieb → Großfeld-/Jugend-/Kleinfeldtor (DIN EN 748 bzw. 16579), Freizeitanlage/kleine Flächen → Alu-Minitor mit Hinterbau (DIN EN 16579), Schulhof → /schule/, Spielplatz → /spielplatz/. Dazu Normen-Tabelle, Planung/Einbau/Betrieb, FAQ.
- Empfehlungen: Bolzplatztor UNKAPUTTBAR (Bolzplatz), Jugendtor 5 × 2 m ohne Griffe (Sportplatz); Textlinks SILENCE, Kleinfeldtor mit Herkulesnetz, Alu-Minitor mit Hinterbau, Erdanker.
- Produktfakten am 30.10. live im Shop geprüft (Shop-Wortlaut). Normen nur mit den bereits belegten Anwendungsbereichen aus `SOURCES_OEFFENTLICH`.
- OG-Bild `og-kommune.jpg`, page-dates, llms.txt, llms-full.txt, Seitenstruktur in CLAUDE.md.
- Platzhalter `<!-- EINSATZORT-MAPPING -->` nach der Einleitung für den Mapping-Baustein aus `src/data/einsatzorte.ts`.

### Entscheidungen
- Entscheidung vom 29.10. („keine eigene Kommunen-Seite“) aufgehoben: Matze trennt jetzt Torarten (Sortiment) von Einsatzorten. /bolzplatztor/ = Produkt, /kommune/ = Ort, Weiche in beide Richtungen.
- Kein Produkt als „Kommunentor“ bezeichnet. Keine Förderung, kein Kauf auf Rechnung/Angebot/Datenblatt, keine Prüfintervalle, kein Lärmrecht. Torgewichte weggelassen (Shop widersprüchlich).

### Offen
- [ ] /bolzplatztor/ verlinkt noch nicht auf /kommune/ und spricht in Description/Hero/FAQ selbst Kommunen an (plus DIN-EN-748-Pflicht und Förderung, siehe 29.10.). Für saubere Abgrenzung Intro-Weiche auf /kommune/ ergänzen und Kommunen-Wording zurücknehmen – Freigabe Matze.
- [ ] Nach Merge: /kommune/ in der Search Console per URL-Prüfung einreichen.

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
