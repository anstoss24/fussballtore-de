---
name: brand-fussballtore
description: >
  Verwende diesen Skill für alles, was mit Markenidentität, Tonalität,
  Farben, Schriften und visueller Gestaltung zu tun hat. Die Microsite hat
  ein komplett eigenständiges Design – NICHT das Design von anstoss24.de.
---

# Markenrichtlinien: fussballtore.de

## WICHTIG: Eigenständiges Design
fussballtore.de sieht NICHT aus wie anstoss24.de. Die Microsite ist ein
unabhängiges Fachportal mit eigener visueller Identität. Modern, editorial,
hochwertig – wie ein Online-Magazin für Fußballtore, das Produkte empfiehlt.

## Design-Vorbilder
Lies vor dem Gestalten immer: `references/design-inspiration.md`
(liegt unter `.claude/skills/frontend-design/references/`)

Primäre Vorbilder: Gear Patrol, Wirecutter, The Quality Edit.
Die Seite soll wie ein **hochwertiges Sport-Fachmagazin** wirken.

## Design-Richtung
**"Editorial Sports Magazine"** – Die Seite wirkt wie ein hochwertiges
Sport-Fachmagazin im Web. Klare Typografie, viel Weißraum, atmosphärische
Bildsprache, dezente Animationen. Denke an die Ästhetik von Magazinen wie
"11 Freunde" oder "The Athletic" – nicht an einen Online-Shop.

## Farbpalette
```css
:root {
  /* Primär – Tiefes Dunkelblau (Vertrauen, Kompetenz) */
  --color-primary: #0f172a;
  --color-primary-light: #1e293b;

  /* Akzent – Lebendiges Grün (Rasen, Frische, CTA) */
  --color-accent: #16a34a;
  --color-accent-light: #22c55e;
  --color-accent-dark: #15803d;

  /* Warm – Für Highlights und Sale-Badges */
  --color-warm: #f59e0b;
  --color-warm-light: #fbbf24;

  /* Neutral – Helle, warme Grautöne */
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;
  --color-bg-warm: #fefce8;
  --color-text: #0f172a;
  --color-text-light: #64748b;
  --color-text-muted: #94a3b8;
  --color-border: #e2e8f0;

  /* Dunkel – Footer und Dark Sections */
  --color-dark: #0f172a;
  --color-dark-surface: #1e293b;
}
```

## Typografie
- **Headlines:** Markant und modern. Empfehlung: **"Plus Jakarta Sans"** (Bold/ExtraBold)
  oder **"Sora"** – keine Serifenschriften, kein Inter/Roboto
- **Body:** Gut lesbar, leicht warm. Empfehlung: **"DM Sans"** (Regular/Medium)
- **Akzente/Labels:** Mono oder Condensed für Preise, Badges, Specs.
  Empfehlung: **"JetBrains Mono"** oder **"DM Mono"** für Preise
- **Schriftgrößen:** Großzügig, gut lesbar
  - H1: 3rem+ (48px+), tight line-height
  - H2: 2rem (32px)
  - Body: 1.125rem (18px), relaxed line-height
- Fonts SELBST HOSTEN, nicht über Google Fonts CDN laden

## Tonalität
- **Fachmagazin-Stimme** – kompetent, sachlich, aber nicht langweilig
- **Du-Form**, direkte Ansprache
- **Kurze Sätze**, aktive Formulierungen
- **Konkrete Zahlen** statt vager Aussagen ("7,32 x 2,44 m" statt "groß")
- Keine Superlative, kein Marketing-Sprech
- Fachbegriffe erklären (nicht jeder kennt "Tortiefe" oder "Ovalprofil")

### Beispiele:
- ✅ "Ein Alu-Großfeldtor hält bei richtiger Pflege 15-20 Jahre."
- ✅ "Für den Garten reicht oft ein 1,80 x 1,20 m Minitor – perfekt ab 4 Jahren."
- ❌ "MEGA Angebote auf die BESTEN Tore! Jetzt zuschlagen!!!"
- ❌ "Exklusiv bei unserem Premium-Partner"

## Produktkarten-Design
Produkte von anstoss24.de werden als elegante Empfehlungskarten dargestellt
(wie bei Gear Patrol oder Wirecutter):

```
┌──────────────────────────────────┐
│  [Produktbild]                   │
│                                  │
│  Kategorie-Badge                 │
│  Produktname (max. 2 Zeilen)     │
│                                  │
│  ● Feature  ● Feature  ● Feature│
│                                  │
│  ab 819,00 €    UVP 1.029,00 €  │
│  [-17% Badge]                    │
│                                  │
│  [ Bei anstoss24.de ansehen → ]  │
└──────────────────────────────────┘
```

- Dezenter Schatten, abgerundete Ecken
- Hover: Leichter Lift-Effekt (transform + shadow)
- Preis prominent, UVP durchgestrichen
- CTA-Button in --color-accent
- Link öffnet in neuem Tab (target="_blank", rel="noopener")

## Vertrauenselemente
An geeigneten Stellen (Footer, Produktkarten) dezent einstreuen:
- "Made in Germany" (bei Alu-Toren)
- "TÜV-geprüft"
- "Kostenloser Versand ab 75€"
- "30 Tage Rückgaberecht"
Diese Infos kommen von anstoss24.de und stärken das Vertrauen.

## Was die Seite NICHT ist
- Kein Online-Shop (kein Warenkorb, keine Preisfilter)
- Keine Kopie von anstoss24.de
- Kein Affiliate-Portal mit Banner-Werbung
- Kein Forum oder Community-Seite
- Die Seite IST: Ein Fachportal mit Kaufberatung, das Produkte empfiehlt
