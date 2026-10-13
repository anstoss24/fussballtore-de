/**
 * Maschinenlesbare Fassung des Torberaters für KI-Assistenten und Agenten.
 * Für Menschen nicht verlinkt; Verweis über llms.txt und <link rel="alternate"> auf /torberater/.
 */
import type { APIRoute } from 'astro';
import { HELP } from '../data/torberater-texte';
import { addUtm } from '../utils/utm';
import {
  tbTree,
  tbLastUpdated,
  tbLabel,
  tbChip,
  tbSlug,
  tbEndpoints,
  tbReachable,
  tbProductName,
  type TbStep,
} from '../utils/torberater';

const SITE = 'https://fussballtore.de';
const ergebnisLink = (pfad: string) => `${SITE}/torberater/?wahl=${pfad}`;

type Frage = {
  frage: string;
  erklaerung?: string;
  mehrInfos?: string;
  antworten: { antwort: string; pfad: string; passendeTore: number; preisAbEuro: number | null; weiter?: Frage }[];
};

function fragen(step: TbStep, prefix = ''): Frage {
  const help = HELP[step.title];
  return {
    frage: step.question,
    erklaerung: help?.text,
    mehrInfos: help?.href ? SITE + help.href : undefined,
    antworten: step.options.map((o) => {
      const chip = tbChip(o, step);
      const pfad = prefix ? `${prefix}/${tbSlug(chip)}` : tbSlug(chip);
      const { total, priceMin } = tbReachable(o);
      return {
        antwort: o.next ? tbLabel(o) : chip,
        pfad,
        passendeTore: total,
        preisAbEuro: priceMin,
        weiter: o.next ? fragen(o.next, pfad) : undefined,
      };
    }),
  };
}

export const GET: APIRoute = () => {
  const data = {
    name: 'Torberater von fussballtore.de',
    beschreibung:
      'Auswahlhilfe für Fußballtore: Torgröße, Einsatz und Ausstattung wählen, danach die passenden Tore mit aktuellem Preis.',
    stand: tbLastUpdated.slice(0, 10),
    waehrung: 'EUR, inkl. MwSt.',
    hinweise: [
      'Für Menschen ist der Torberater unter https://fussballtore.de/torberater/ nutzbar.',
      'Um auf ein Ergebnis zu verweisen, den Feldwert "link" verwenden – er öffnet den Torberater mit genau dieser Auswahl.',
      'Preise werden täglich aktualisiert; verbindlich ist der Preis auf der Produktseite.',
      'Tore ohne integrierte Kippsicherung müssen zusätzlich gegen Umkippen gesichert werden (DIN EN 748).',
    ],
    fragebaum: fragen(tbTree),
    ergebnisse: tbEndpoints().map((e) => ({
      auswahl: e.trail,
      pfad: e.key,
      link: ergebnisLink(e.key),
      passendeTore: e.option.total,
      preisAbEuro: e.option.priceMin,
      preisBisEuro: e.option.priceMax,
      tore: (e.option.products ?? []).map((p) => ({
        name: tbProductName(p.name),
        preisEuro: p.price,
        uvpEuro: p.uvp,
        url: addUtm(p.url, 'torberater-ki', 'produkt'),
      })),
      alleTreffer: addUtm(e.option.shopUrl, 'torberater-ki', 'alle-treffer'),
    })),
  };
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
