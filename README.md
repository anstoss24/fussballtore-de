# fussballtore.de – Keyword-Domain Projekt

SEO-Microsite mit **eigenständigem Design** für die Domain fussballtore.de.
Präsentiert echte Produkte von [anstoss24.de](https://anstoss24.de) und
leitet qualifizierten Traffic dorthin.

## Design-Vorbilder

Die Seite orientiert sich an diesen unabhängigen Editorial-Portalen:

| Vorbild | URL | Was wir übernehmen |
|---------|-----|--------------------|
| **Gear Patrol** | gearpatrol.com | Layout, Produktkarten, Buying Guides |
| **NYT Wirecutter** | nytimes.com/wirecutter | Content-Strategie, Vertrauensaufbau |
| **Blister Review** | blisterreview.com | Nischen-Fokus, tiefe Reviews |
| **Outside Online** | outsideonline.com/outdoor-gear | Atmosphärische Heroes |
| **The Quality Edit** | thequalityedit.com | Cleanes Design, Typografie |
| **The Strategist** | nymag.com/strategist | Produktkarten-Design |
| **CHIP/Bestcheck** | chip.de | Deutsche Vergleichstabellen |
| **Bergfreunde Ratgeber** | bergfreunde.de/ratgeber | Deutsche Content+Produkt-Integration |
| **Connox Magazin** | connox.de/magazin | Editorial+Produkt-Balance |

→ Details: `.claude/skills/frontend-design/references/design-inspiration.md`

## Schnellstart

```bash
# 1. Projekt aufsetzen
cd fussballtore-projekt
npm create astro@latest . -- --template minimal
npx astro add tailwind
npm install

# 2. Claude Code starten
claude

# 3. Erste Seite bauen
> Erstelle die Startseite mit Hero, Kategoriekarten und Produktempfehlungen

# 4. Content schreiben
> /content-writer Schreibe den Artikel für die Kaufberatung-Seite

# 5. Qualität prüfen
> /reviewer Prüfe die Kaufberatung-Seite

# 6. Lokal testen
npm run dev

# 7. Deployen
npm run build
```

## Projektstruktur
```
├── .claude/
│   ├── skills/
│   │   ├── seo/               # SEO-Regeln + Keyword-Map
│   │   ├── brand/             # Eigenständiges Design, Farben, Tonalität
│   │   ├── content-writing/   # Textstruktur + Produktintegration
│   │   └── frontend-design/   # Layout, Komponenten, Produktkarten
│   │       └── references/
│   │           └── design-inspiration.md  # ⭐ Alle Referenz-Microsites
│   └── agents/
│       ├── content-writer.md  # Schreibt SEO-Content mit Produkten
│       └── reviewer.md        # Prüft Qualität
├── CLAUDE.md                  # Projektbriefing
├── src/
│   ├── data/
│   │   └── products.json      # ⭐ Echte Produktdaten von anstoss24.de
│   ├── pages/                 # Astro-Seiten
│   ├── components/            # Wiederverwendbare Komponenten
│   ├── layouts/               # Base-Layout
│   └── styles/                # Global CSS
├── public/                    # Statische Assets
└── README.md
```

## Enthaltene Produkte (aus anstoss24.de)
| Kategorie | Produkt | Preis ab |
|-----------|---------|----------|
| Großfeldtore | Bundesliga-Tor 7,32x2,44m | 819€ |
| Großfeldtore | Transportables Tor vollverschweißt | 1.519€ |
| Jugendtore | Mobiles Jugendtor 5x2m | 1.049€ |
| Bolzplatztore | Bolzplatztor UNKAPUTTBAR 3x2m | 2.189€ |
| Minitore | QuickPlay Kickster Elite 1,80x1,20m | 74,99€ |
| Minitore | ELF Sports Pop-up Goal 2er Set | 19,90€ |
| Tornetze | Tornetz Großfeld 4mm | 70,90€ |
| Zubehör | Gummigewichte Kippsicherung | 24,90€ |

## Vor dem Launch
- [ ] Impressum mit korrekten Firmendaten füllen
- [ ] Datenschutzerklärung erstellen
- [ ] Produktpreise auf Aktualität prüfen
- [ ] Eigene Bilder für Hero-Sections beschaffen (oder Stock)
- [ ] Google Search Console einrichten
- [ ] XML-Sitemap einreichen
