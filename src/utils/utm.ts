export function addUtm(url: string, campaign: string, content: string = 'text-link'): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'fussballtore.de');
  u.searchParams.set('utm_medium', 'referral');
  u.searchParams.set('utm_campaign', campaign);
  u.searchParams.set('utm_content', content);
  return u.toString();
}
