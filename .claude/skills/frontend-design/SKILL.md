---
name: frontend-fussballtore
description: >
  Verwende diesen Skill beim Erstellen von Seiten, Layouts, Komponenten
  und UI-Elementen für fussballtore.de. Definiert die visuelle Gestaltung,
  Komponentenstruktur und Layout-Patterns. EIGENSTÄNDIGES Design,
  NICHT das Design von anstoss24.de.
---

# Frontend Design: fussballtore.de

## Design-Philosophie
**"Editorial Sports Magazine"** – Hochwertig, modern, viel Luft.
Wie ein Fachmagazin, nicht wie ein Shop. Kein generisches AI-Design.
Kein anstoss24.de-Design. Komplett eigenständig.

## Design-Vorbilder (IMMER zuerst lesen!)
→ `references/design-inspiration.md`

Orientiere dich primär an:
- **Gear Patrol** (gearpatrol.com) → Layout, Produktkarten, Buying-Guide-Struktur
- **Wirecutter** (nytimes.com/wirecutter) → Content-Layout, "Unser Pick"-Badges
- **The Quality Edit** (thequalityedit.com) → Cleanes Design, Typografie
- **Outside Online** (outsideonline.com/outdoor-gear/) → Atmosphärische Heroes

## Astro-Komponentenstruktur

```
src/
├── layouts/
│   └── BaseLayout.astro         # HTML-Grundgerüst, Head, Fonts
├── components/
│   ├── Header.astro              # Sticky Nav + Logo
│   ├── Footer.astro              # Footer mit Links + anstoss24-Hinweis
│   ├── Breadcrumb.astro          # Breadcrumb-Navigation + Schema
│   ├── ProductCard.astro         # Produktempfehlung von anstoss24.de
│   ├── ProductGrid.astro         # Grid aus ProductCards
│   ├── CategoryCard.astro        # Kategorie-Teaser (Startseite)
│   ├── HeroSection.astro         # Hero pro Seite
│   ├── ComparisonTable.astro     # Vergleichstabellen
│   ├── FAQSection.astro          # FAQ mit Schema.org
│   ├── CTABanner.astro           # Dezenter CTA zu anstoss24.de
│   ├── TrustBadges.astro         # TÜV, Made in Germany, Versand
│   ├── RelatedPages.astro        # "Weiterlesen" Karten
│   └── SEOHead.astro             # Meta, OG, Schema.org
├── pages/
│   ├── index.astro
│   ├── kaufberatung.astro
│   ├── groessen.astro
│   ├── material-vergleich.astro
│   ├── garten.astro
│   ├── kinder.astro
│   ├── verein.astro
│   ├── impressum.astro
│   └── datenschutz.astro
├── data/
│   └── products.json             # Echte Produktdaten von anstoss24.de
└── styles/
    └── global.css
```

## Layout-Patterns

### Startseite
```
┌───────────────────────────────────────────┐
│  Header (sticky, minimalistisch)          │
├───────────────────────────────────────────┤
│                                           │
│  HERO – Vollbreite                        │
│  "Fußballtore – Der komplette Ratgeber"   │
│  Subtitel + CTA → Kaufberatung            │
│  Hintergrund: Atmosphärisches Stadion/    │
│  Rasen-Bild mit dunklem Overlay           │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  Kategorien-Grid (3 Spalten)              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │Großfeld │ │ Jugend  │ │ Bolz-   │    │
│  │ tore    │ │  tore   │ │ platz   │    │
│  └─────────┘ └─────────┘ └─────────┘    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│  │ Mini-   │ │ Garten  │ │ Kinder  │    │
│  │  tore   │ │         │ │         │    │
│  └─────────┘ └─────────┘ └─────────┘    │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  "Beliebte Fußballtore" – ProductGrid     │
│  3 ausgewählte Produkte als Karten        │
│                                           │
├───────────────────────────────────────────┤
│                                           │
│  Trust-Sektion (horizontal)               │
│  [Made in DE] [TÜV] [Versand] [Retoure]  │
│                                           │
├───────────────────────────────────────────┤
│  Footer                                   │
└───────────────────────────────────────────┘
```

### Content-Seiten (Kaufberatung, Größen, etc.)
```
┌───────────────────────────────────────────┐
│  Header                                   │
├───────────────────────────────────────────┤
│  Hero (schmaler, 30-40vh)                 │
│  H1 + Kurzbeschreibung                    │
├───────────────────────────────────────────┤
│  Breadcrumb                               │
├───────────────────────────────────────────┤
│                                           │
│  ┌─── Content (max-w-3xl) ──────────────┐│
│  │                                       ││
│  │  Fließtext mit Zwischenüberschriften  ││
│  │  Tabellen, Vergleiche                 ││
│  │                                       ││
│  │  ┌─ Produkt-Empfehlung ─────────────┐││
│  │  │  ProductCard(s) passend zum       │││
│  │  │  Thema der Seite                  │││
│  │  └──────────────────────────────────┘││
│  │                                       ││
│  │  Weitere Fließtext-Abschnitte        ││
│  │                                       ││
│  │  FAQ-Accordion                        ││
│  │                                       ││
│  └───────────────────────────────────────┘│
│                                           │
├───────────────────────────────────────────┤
│  CTA-Banner (dezent, volle Breite)        │
│  "Alle Fußballtore bei anstoss24.de →"    │
├───────────────────────────────────────────┤
│  Verwandte Seiten (3er Grid)              │
├───────────────────────────────────────────┤
│  Footer                                   │
└───────────────────────────────────────────┘
```

## Komponenten-Details

### Header
- Links: "fussballtore.de" als Textlogo (Plus Jakarta Sans, Bold)
- Rechts: Navigation als horizontale Links
- Mobile: Hamburger-Menü (minimales JS, <details>/<summary> oder checkbox-hack)
- Sticky, backdrop-blur Effekt beim Scrollen
- Hintergrund: transparent auf Hero → weiß mit Schatten beim Scrollen

### ProductCard (zentrale Komponente!)
```astro
---
interface Props {
  name: string;
  url: string;
  imageUrl: string;
  priceFrom: number;
  priceUvp?: number;
  discount?: number;
  features: string[];
}
---
```
- Bild oben (object-fit: cover, aspect-ratio: 4/3)
- Dezenter Schatten, border-radius: 12px
- Hover: translateY(-4px) + shadow vergrößern
- Discount-Badge oben rechts (--color-warm)
- Preis: groß, bold. UVP durchgestrichen, kleiner
- Features als kleine Pills/Tags
- CTA-Button: "Bei anstoss24.de ansehen →"
- ALLE Produkt-Links: target="_blank" rel="noopener"

### CTABanner
- Volle Breite, --color-primary Hintergrund
- Weißer Text, ein Satz + Button
- Dezent, nicht schreierisch
- Beispiel: "Fußballtore in allen Größen – jetzt bei anstoss24.de entdecken"

### TrustBadges
- Horizontale Reihe mit Icons
- 4 Elemente: Made in Germany 🇩🇪 | TÜV-geprüft ✓ | Kostenloser Versand | 30 Tage Rückgabe
- Dezent, kleine Schrift, Icons in --color-accent

### FAQSection
- Accordion per <details>/<summary> (kein JS nötig)
- Schema.org FAQPage Markup inline
- Sanfte open/close Animation per CSS

## Performance-Regeln
- Fonts selbst hosten (kein Google Fonts CDN)
- Produktbilder von anstoss24.de CDN laden (sind bereits optimiert)
- CSS: Tailwind purged
- JS: Nur für Hamburger-Menü (und das minimal, bevorzugt CSS-only)
- Above-the-fold Content ohne Lazy Loading
- font-display: swap auf allen Fonts
