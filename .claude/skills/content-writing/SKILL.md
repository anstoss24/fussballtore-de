---
name: content-writing-seo
description: >
  Verwende diesen Skill beim Schreiben oder Überarbeiten von Content.
  Deckt Textstruktur, SEO-Texte, Kaufberatung und Produktintegration ab.
  Immer zusammen mit dem SEO-Skill aktivieren.
---

# Content-Erstellung für fussballtore.de

## Content-Philosophie
Jeder Artikel muss die Frage des Nutzers besser beantworten als die
Top-10 bei Google. Echte Fakten, echte Maße, echte Preise.
Die Seite empfiehlt Produkte von anstoss24.de als natürlichen Teil
des redaktionellen Inhalts – nicht als Werbung.

## Artikel-Struktur

```markdown
# {H1 mit Haupt-Keyword}

{Einleitung: 2-3 Sätze. Haupt-Keyword im ersten Satz. Du-Form.}

## {Hauptabschnitt}
{Fakten, Erklärungen, Tipps. Konkrete Zahlen und Maße.}

## {Vergleich / Übersicht}
{Tabelle oder Auflistung}

---
[ProductCard(s): 1-2 passende Produkte von anstoss24.de]
---

## {Weitere Abschnitte}

## Häufige Fragen
{3-5 echte Fragen als FAQ-Accordion}

## Fazit
{2-3 Sätze + natürlicher CTA}
```

## Produktintegration
- Lies die Produktdaten aus `src/data/products.json`
- Wähle 1-2 Produkte, die thematisch zur Seite passen
- Platziere Produktkarten ZWISCHEN Content-Abschnitten (nicht am Ende)
- Schreibe einen 1-2 Satz Übergang: "Für den Vereinsbetrieb empfehlen wir
  ein vollverschweißtes Großfeldtor. Dieses Modell von anstoss24.de erfüllt
  alle DFB-Anforderungen:"
- Verlinke zusätzlich die Kategorie-Seite im Fließtext

## Zuordnung: Welches Produkt auf welcher Seite?
| Seite | Produkte (IDs aus products.json) |
|-------|----------------------------------|
| Startseite (3) | bundesliga-premium, minitor-lightweight, bolzplatz-unkaputtbar |
| Kaufberatung (2) | grossfeld-transportabel, jugendtor-ohne-griffe |
| Größen (3) | bundesliga-premium, jugendtor-mit-griffen, kleinfeldtor-mobil |
| Material (2) | grossfeld-transportabel, minitor-hinterbau |
| Garten (3) | popup-set, quickplay-150, minitor-lightweight |
| Kinder (3) | popup-set (3–5 J.), quickplay-150 (6–8 J.), quickplay-180 (9–12 J.) |
| Verein (4+1) | bundesliga-premium, jugendtor-ohne-griffe (+Textlink mit-griffen), kleinfeldtor-mobil, tornetz-grossfeld, gummigewichte (Textlink) |

## Schreibregeln
- Du-Form, aktive Formulierungen
- Max 3-4 Sätze pro Absatz
- Zwischenüberschrift alle 200-300 Wörter
- Fachbegriffe erklären (Tortiefe, Ovalprofil, Netzbügel)
- Konkrete Maße nach DFB/FIFA (7,32 x 2,44m, 5 x 2m, 3 x 2m)
- Keine konkreten Preise auf der Seite – CTA ist "Preis jetzt prüfen" (Link zu anstoss24.de)
- KEIN Keyword-Stuffing, Lesbarkeit geht vor

## Fakten-Referenz (für alle Seiten nutzbar)

### Offizielle Tor-Maße
| Spielklasse | Breite | Höhe | Tortiefe |
|-------------|--------|------|----------|
| Herren/Frauen (Großfeld) | 7,32 m | 2,44 m | 1,50-2,00 m |
| Jugend (D-A) | 5,00 m | 2,00 m | 1,00-1,50 m |
| Bambini/F/E (Kleinfeld) | 3,00 m | 2,00 m | 1,00 m |
| Mini/Funino | variabel | variabel | variabel |

### Materialien
- **Aluminium:** Leicht, rostfrei, langlebig (15-20 Jahre), teurer
- **Stahl:** Schwerer, günstiger, muss beschichtet sein (Rost)
- **Kunststoff:** Nur für Minitore/Garten, nicht wettkampftauglich
