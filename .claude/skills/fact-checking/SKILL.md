# Fact-Checking Skill für fussballtore.de

## Zweck
Verifiziert alle faktischen Angaben auf der Microsite gegen geprüfte
Referenzdaten. Stellt Konsistenz zwischen allen Seiten sicher und verhindert
Widersprüche bei Maßen, Gewichten, Altersklassen und Normen.

## Referenzdaten
Die folgenden Dateien enthalten verifizierte Fakten (Stand: Februar 2026):

- `references/dfb-regulations.md` – DFB-Torgrößen, Spielformate, Altersklassen, Kinderfußball-Reform
- `references/din-en-748.md` – DIN EN 748 Sicherheitsnorm, Prüfung, Haftung
- `references/product-specs.md` – Technische Spezifikationen (Gewichte, Profile, Materialien, Preise)

## Prüf-Checkliste

### 1. Torgrößen & Altersklassen
Prüfe auf JEDER Seite, ob die Zuordnung Altersklasse → Torgröße korrekt ist:
- G-Jugend: Minitore (Funino), NICHT reguläre Tore
- F-Jugend: Minitore oder 3x2m
- E-Jugend: 5x2m
- D-Jugend: 5x2m (9v9-Spielformat)
- **C-Jugend: 7,32 x 2,44m Großfeld** (häufigster Fehler!)
- B/A-Jugend & Herren/Frauen: 7,32 x 2,44m

### 2. Gewichtsangaben
- Prüfe, ob Gewichtsangaben für Alu-Großfeldtore konsistent sind
- Erlaubte Angabe: "40–100 kg je nach Ausführung" ODER spezifisch nach Typ
- NICHT erlaubt: Unterschiedliche Einzelwerte auf verschiedenen Seiten

### 3. Materialaussagen
- "Stahl-Großfeldtore" gibt es am Markt praktisch NICHT mehr
- Stahl nur noch für: Bolzplatz, Freizeit, Minitore
- Alu braucht KEINEN Korrosionsschutz (bildet Oxidschicht)
- DIN EN 748 schreibt KEIN Material vor

### 4. DIN EN 748 / Sicherheit
- Prüfkraft: 1.100 N (nicht andere Werte)
- Gilt für öffentliche Tore, NICHT für reine Garten-/Spieltore
- Betreiber haftet (Verkehrssicherungspflicht)

### 5. Tornetz-Spezifikationen
- 120 mm Maschenweite, 4 mm Materialstärke (Standard)
- Netztiefe: 80/150 cm (Standard) oder 80/200 cm (Profi)
- Material: Polypropylen oder Polyethylen

### 6. Konsistenz zwischen Seiten
- Gleiche Fakten müssen auf allen Seiten identisch sein
- Vergleiche: kaufberatung ↔ groessen ↔ material-vergleich ↔ verein ↔ kinder ↔ garten
- Besonders prüfen: Tabellen mit Torgrößen, Gewichtsangaben, Preise, Altersempfehlungen

### 7. Schema.org / SEO-Daten
- `datePublished` muss realistisch sein (nicht in der Zukunft, nicht bevor Content existierte)
- Empfehlung: `2025-06-01` oder später als datePublished verwenden
- `dateModified` sollte aktueller sein als `datePublished`

## Vorgehensweise bei Korrekturen
1. Lies ALLE Content-Seiten (kaufberatung, groessen, material-vergleich, garten, kinder, verein)
2. Vergleiche jede faktische Angabe mit den Referenzdaten
3. Liste alle Abweichungen auf
4. Korrigiere mit den verifizierten Werten
5. Stelle sicher, dass korrigierte Werte auf ALLEN Seiten konsistent sind
6. Behalte SEO-Optimierung bei (Keywords, Textfluss, Lesbarkeit)
