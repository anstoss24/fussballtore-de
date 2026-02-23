---
name: seo-keyword-domain
description: >
  Verwende diesen Skill bei allem, was mit SEO zu tun hat:
  Seitenstruktur, Meta-Tags, Content-Optimierung, Schema.org Markup,
  interne Verlinkung und technisches SEO. Aktiviere diesen Skill
  beim Erstellen oder Bearbeiten jeder Content-Seite.
---

# SEO für Keyword-Domain (fussballtore.de)

## Grundprinzip
Diese Seite lebt von SEO. Jede Entscheidung – vom HTML-Tag bis zum
letzten Absatz – muss suchmaschinenoptimiert sein, ohne dabei spammig
oder unnatürlich zu wirken.

## On-Page SEO Checkliste (für jede Seite)

### Meta-Tags
```html
<title>{Haupt-Keyword} – {Ergänzung} | fussballtore.de</title>
<meta name="description" content="{150-160 Zeichen, Keyword enthalten, zum Klicken animierend}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://fussballtore.de/{slug}">
```

### Open Graph
```html
<meta property="og:title" content="{Title}">
<meta property="og:description" content="{Description}">
<meta property="og:image" content="{Bild-URL}">
<meta property="og:url" content="https://fussballtore.de/{slug}">
<meta property="og:type" content="website">
<meta property="og:locale" content="de_DE">
```

### Überschriften-Hierarchie
- Genau EIN `<h1>` pro Seite mit Haupt-Keyword
- `<h2>` für Hauptabschnitte (Keywords natürlich einbauen)
- `<h3>` für Unterabschnitte
- Keine Ebenen überspringen

### Content-Regeln
- Mindestens 800-1200 Wörter pro Content-Seite
- Haupt-Keyword in: H1, erster Absatz, mindestens einer H2, Meta-Title, URL
- Verwandte Keywords (LSI) natürlich im Text verteilen
- Kurze Absätze (3-4 Sätze max.)
- Fragen als Zwischenüberschriften (gut für Featured Snippets)
- Aufzählungen und Tabellen wo sinnvoll (Rankings, Vergleiche)

### Bilder
- Beschreibende Dateinamen: `fussballtor-alu-wettkampf.webp` (nicht `IMG_2847.webp`)
- Alt-Texte mit Keywords: `alt="Aluminium Fußballtor 7,32 x 2,44m für Wettkampf"`
- Alle Bilder als WebP, komprimiert
- Width und Height Attribute setzen (CLS vermeiden)

### Schema.org Markup
Jede Content-Seite bekommt mindestens:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Organization", "name": "anstoss24.de" },
  "publisher": { "@type": "Organization", "name": "anstoss24.de" }
}
```

Zusätzlich wo passend:
- **FAQPage** – bei Seiten mit Fragen-Abschnitten
- **BreadcrumbList** – auf jeder Seite
- **Product** – wenn konkrete Produkte erwähnt werden

### Interne Verlinkung
- Jede Content-Seite verlinkt auf mindestens 2-3 andere Content-Seiten
- Ankertext = relevantes Keyword der Zielseite
- Beispiel: Auf `/kaufberatung` steht "Welche Größe du brauchst, erfährst du in unserer [Größen-Übersicht](/groessen)"
- Breadcrumb-Navigation auf jeder Seite

### Verlinkung zu anstoss24.de
- 2-3 Links pro Seite, kontextuell eingebettet
- Ankertext variieren (nicht immer "anstoss24.de")
- Beispiele für natürliche CTAs:
  - "Alle Fußballtore im Überblick findest du bei anstoss24.de"
  - "Im Shop von anstoss24 gibt es Modelle ab XX€"
  - "Passende Tornetze und Zubehör gibt es hier"
- Links mit `rel="noopener"` und `target="_blank"`

## Technisches SEO

### Performance
- Keine Render-blockierenden Ressourcen
- CSS inline oder preloaded
- Bilder lazy-loaded (außer Above-the-fold)
- Fonts mit `font-display: swap`

### Sitemap & Robots
- XML-Sitemap unter `/sitemap.xml` (Astro generiert automatisch)
- robots.txt:
```
User-agent: *
Allow: /
Sitemap: https://fussballtore.de/sitemap.xml
```

### URL-Struktur
- Kurz, beschreibend, kleingeschrieben
- Keine Umlaute in URLs (ue, oe, ae)
- Kein trailing slash Mischmasch (einheitlich)
