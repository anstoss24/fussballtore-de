/**
 * Consent-Konfiguration für fussballtore.de
 *
 * Alle Dienste, die Cookies setzen oder Daten an Dritte senden, laufen über
 * den Consent-Banner (src/components/CookieConsent.astro). Es wird nichts
 * geladen, bevor der Besucher zugestimmt hat.
 *
 * Zwei Betriebsarten – gesteuert über `gtm.containerId`:
 *
 * 1. GTM-Modus (containerId gesetzt, z. B. 'GTM-XXXXXXX'):
 *    Nach Zustimmung wird NUR der Google Tag Manager geladen. Meta-Pixel,
 *    OpenAI-Pixel usw. werden im GTM-Container gepflegt (Tags + Trigger),
 *    nicht hier im Code. Die Seite liefert dafür:
 *      - Google Consent Mode v2 (ad_storage etc. = granted nach Zustimmung)
 *      - dataLayer-Event `consent_marketing_granted` beim Laden
 *      - dataLayer-Event `Redirect_anstoss24` (conversionEvent) bei jedem
 *        Klick auf einen Link zu anstoss24.de, mit `link_url`
 *    → Im GTM: Trigger „Benutzerdefiniertes Ereignis" = Redirect_anstoss24,
 *      daran die Conversion-Tags hängen.
 *
 * 2. Direkt-Modus (containerId leer):
 *    Die Pixel-SDKs der aktiven Dienste werden direkt geladen, sobald
 *    `enabled` UND `pixelId` gesetzt sind und der Besucher zugestimmt hat.
 *    Der anstoss24-Klick wird als Custom Event `conversionEvent` gemeldet.
 *
 * Die Dienste-Liste (`services`) gilt in beiden Modi: Sie bestimmt, welche
 * Anbieter im Banner genannt werden, welche Abschnitte in der
 * Datenschutzerklärung erscheinen und welche Cookies beim Widerruf gelöscht
 * werden. Läuft ein Dienst über GTM, trotzdem hier `enabled: true` lassen –
 * die pixelId darf dann leer bleiben.
 *
 * Bei Änderung der Dienste `version` hochzählen → Banner erscheint erneut.
 */

export type ConsentServiceId = 'openai' | 'meta';

export interface ConsentService {
  id: ConsentServiceId;
  /** Anzeigename im Banner */
  name: string;
  /** Dienst aktiv (Banner + Datenschutztext) */
  enabled: boolean;
  /** Pixel-ID des Anbieters – nur im Direkt-Modus nötig */
  pixelId: string;
  /** Cookies, die der Dienst setzt (werden beim Widerruf gelöscht) */
  cookies: string[];
}

export const consentConfig = {
  /** localStorage-Schlüssel für die gespeicherte Entscheidung */
  storageKey: 'ft_consent',
  /** Bei Änderung der Dienste hochzählen → Banner erscheint erneut */
  version: 2,
  /** Gültigkeit der gespeicherten Entscheidung in Tagen */
  maxAgeDays: 365,
  /**
   * Name der Conversion „Weiterleitung zu anstoss24.de".
   * GTM-Modus: dataLayer-Event-Name. Direkt-Modus: Custom-Event-Name bei
   * OpenAI (custom_event_name) und Meta (trackCustom).
   */
  conversionEvent: 'Redirect_anstoss24',
  /** Google Tag Manager – Container-ID eintragen, um in den GTM-Modus zu wechseln */
  gtm: {
    containerId: '',
  },
  services: [
    {
      id: 'openai',
      name: 'OpenAI Conversion Tracking (ChatGPT Ads)',
      enabled: true,
      pixelId: 'XRaucMXJ1kkUvhesNAkVia',
      cookies: ['__oppref'],
    },
    {
      id: 'meta',
      name: 'Meta-Pixel (Facebook / Instagram Ads)',
      enabled: true,
      pixelId: '274300503755084',
      cookies: ['_fbp', '_fbc'],
    },
  ] satisfies ConsentService[],
};

export const activeServices: ConsentService[] = consentConfig.services.filter((s) => s.enabled);
export const consentEnabled = activeServices.length > 0;
export const isServiceEnabled = (id: ConsentServiceId) => activeServices.some((s) => s.id === id);
/** true, wenn die Pixel über den Google Tag Manager statt direkt geladen werden */
export const gtmEnabled = consentEnabled && consentConfig.gtm.containerId.trim().length > 0;
