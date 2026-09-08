/**
 * Consent-Konfiguration für fussballtore.de
 *
 * Alle Dienste, die Cookies setzen oder Daten an Dritte senden, laufen über
 * den Consent-Banner (src/components/CookieConsent.astro). Ein Dienst wird
 * nur geladen, wenn er `enabled` ist UND eine `pixelId` gesetzt ist UND der
 * Besucher zugestimmt hat.
 *
 * - `enabled: true` ohne pixelId → Banner + Datenschutz-Abschnitt sind live,
 *   aber es wird noch kein Script geladen (Vorbereitung vor Kampagnenstart).
 * - Sobald die Pixel-ID vorliegt, hier eintragen und deployen.
 *
 * Der Datenschutz-Abschnitt eines Dienstes wird nur gerendert, wenn er
 * `enabled` ist – damit steht in der Datenschutzerklärung nie etwas, das
 * nicht tatsächlich läuft.
 */

export type ConsentServiceId = 'openai' | 'meta';

export interface ConsentService {
  id: ConsentServiceId;
  /** Anzeigename im Banner */
  name: string;
  /** Dienst aktiv (Banner + Datenschutztext) */
  enabled: boolean;
  /** Pixel-ID des Anbieters – leer lassen, bis sie vorliegt */
  pixelId: string;
  /** Cookies, die der Dienst setzt (werden beim Widerruf gelöscht) */
  cookies: string[];
}

export const consentConfig = {
  /** localStorage-Schlüssel für die gespeicherte Entscheidung */
  storageKey: 'ft_consent',
  /** Bei Änderung der Dienste hochzählen → Banner erscheint erneut */
  version: 1,
  /** Gültigkeit der gespeicherten Entscheidung in Tagen */
  maxAgeDays: 365,
  services: [
    {
      id: 'openai',
      name: 'OpenAI Conversion Tracking (ChatGPT Ads)',
      enabled: true,
      pixelId: '',
      cookies: ['__oppref'],
    },
    {
      id: 'meta',
      name: 'Meta-Pixel (Facebook / Instagram Ads)',
      enabled: false,
      pixelId: '',
      cookies: ['_fbp', '_fbc'],
    },
  ] satisfies ConsentService[],
};

export const activeServices: ConsentService[] = consentConfig.services.filter((s) => s.enabled);
export const consentEnabled = activeServices.length > 0;
export const isServiceEnabled = (id: ConsentServiceId) => activeServices.some((s) => s.id === id);
