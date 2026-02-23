# Projekt: fussballtore.de – Keyword-Domain / SEO-Microsite

## Zweck
SEO-optimierte Microsite auf der Keyword-Domain fussballtore.de.
Ziel: Für relevante Fußballtor-Keywords organisch ranken und qualifizierten Traffic
auf den Hauptshop **anstoss24.de** (Vereinsbedarf) leiten.

## WICHTIG: Eigenständiges Design
Die Microsite hat ein **komplett eigenständiges, modernes Design** – sie soll
NICHT wie anstoss24.de aussehen. Eigene Farben, eigene Typografie, eigenes Layout.
Die Seite wirkt wie ein unabhängiges Fachportal, das Produkte von anstoss24.de
empfiehlt und präsentiert.

## Design-Vorbilder
Vor dem Erstellen von Seiten IMMER die Design-Inspirationen lesen:
→ `.claude/skills/frontend-design/references/design-inspiration.md`

Primäre Vorbilder sind:
- **Gear Patrol** (gearpatrol.com) – Gesamtlayout, Produktkarten, Artikelstruktur
- **NYT Wirecutter** (nytimes.com/wirecutter) – Content-Strategie, Vertrauensaufbau
- **Blister Review** (blisterreview.com) – Nischen-Fokus, Tiefe der Inhalte
- **The Quality Edit** (thequalityedit.com) – Visueller Stil, cleanes Design

## Zielgruppe
- Vereinsverantwortliche, die Fußballtore für ihren Verein suchen
- Eltern, die ein Fußballtor für den Garten / ihre Kinder kaufen wollen
- Trainer und Sportlehrer
- Kommunen und Schulen (Bolzplatztore)

## Tech-Stack
- **Framework:** Astro 5 (statische Seite, maximale Performance)
- **Styling:** Tailwind CSS
- **Hosting:** Noch offen (Hetzner VPS oder Cloudflare Pages)
- **Sprache:** Deutsch

## Seitenstruktur
| Seite | URL | Haupt-Keyword |
|-------|-----|---------------|
| Startseite | `/` | fußballtore |
| Kaufberatung | `/kaufberatung` | fußballtor kaufen |
| Größen-Übersicht | `/groessen` | fußballtor größen maße |
| Material-Vergleich | `/material-vergleich` | fußballtor alu stahl |
| Garten-Tore | `/garten` | fußballtor garten |
| Kinder-Tore | `/kinder` | fußballtor kinder |
| Vereins-/Wettkampf-Tore | `/verein` | fußballtor verein wettkampf |
| Impressum | `/impressum` | – |
| Datenschutz | `/datenschutz` | – |

## Produkte von anstoss24.de (je Kategorie ein Highlight-Produkt)
Die Microsite präsentiert echte Produkte von anstoss24.de als Empfehlungen.
Produktdaten siehe: `src/data/products.json`

## Verlinkung zu anstoss24.de
- Jede Content-Seite zeigt 1-2 passende Produkte als Empfehlungskarten
- Links führen direkt zur Produktseite auf anstoss24.de
- Zusätzlich kontextuelle Textlinks im Fließtext
- CTAs sollen hilfreich wirken, nicht werblich
- Keine aggressive Werbung, kein Affiliate-Spam

## Wichtige Regeln
- Mobile-first responsive Design
- Core Web Vitals müssen grün sein (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- Bilder immer als WebP mit Lazy Loading und Alt-Texten
- Jede Seite braucht: Meta-Title, Meta-Description, Open Graph Tags
- Schema.org Markup (Article, FAQ, BreadcrumbList, Product)
- Interne Verlinkung zwischen allen Content-Seiten
- DSGVO-konform: Impressum, Datenschutz, Cookie-Hinweis
- Kein JavaScript-Framework nötig – so wenig JS wie möglich
- Semantisches HTML5 (header, nav, main, article, section, footer)
