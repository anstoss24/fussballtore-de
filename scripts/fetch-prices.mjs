#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = join(__dirname, '..', 'src', 'data', 'products.json');
const pricesPath = join(__dirname, '..', 'src', 'data', 'prices.json');

const productsData = JSON.parse(readFileSync(productsPath, 'utf-8'));

function getPriceValidUntil() {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
}

async function fetchProductPrice(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; fussballtore.de price checker)',
      'Accept': 'text/html',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();

  // 1. Extract price from JSON-LD (most reliable)
  let price = null;
  let currency = 'EUR';

  const jsonLdRegex = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(jsonLdRegex)) {
    try {
      const data = JSON.parse(match[1]);
      if (data['@type'] === 'Product' && data.offers) {
        price = parseFloat(data.offers.price);
        currency = data.offers.priceCurrency || 'EUR';
        break;
      }
    } catch {}
  }

  if (!price) throw new Error('No price found in JSON-LD');

  // 2. Extract UVP/RRP from HTML (strikethrough price)
  let uvp = null;

  const uvpPatterns = [
    // <del> or <s> tags with price
    /<(?:del|s)\b[^>]*>\s*(?:<[^>]*>\s*)*([\d.,]+)\s*(?:€|EUR)/gi,
    // UVP label near price
    /UVP[:\s]*(?:<[^>]+>\s*)*([\d.,]+)\s*(?:€|EUR)/gi,
    // Classes like crossprice, rrp, price-old
    /class="[^"]*(?:cross-?price|rrp|price-?old|instead)[^"]*"[^>]*>\s*(?:<[^>]+>\s*)*([\d.,]+)\s*(?:€|EUR)/gi,
    // Price followed by UVP text
    /([\d.,]+)\s*(?:€|EUR)\s*UVP/gi,
  ];

  for (const pattern of uvpPatterns) {
    for (const m of html.matchAll(pattern)) {
      const parsed = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
      if (!isNaN(parsed) && parsed > price) {
        uvp = parsed;
        break;
      }
    }
    if (uvp) break;
  }

  // Sanity check: discard UVP if discount seems unrealistic (> 50%)
  if (uvp && price / uvp < 0.5) {
    console.warn(`  UVP ${uvp} discarded (${Math.round((1 - price / uvp) * 100)}% discount too high)`);
    uvp = null;
  }

  return { price, uvp, currency };
}

async function main() {
  let existingPrices = {};
  try {
    existingPrices = JSON.parse(readFileSync(pricesPath, 'utf-8'));
  } catch {}

  const prices = {};
  const priceValidUntil = getPriceValidUntil();

  for (const product of productsData.products) {
    process.stdout.write(`${product.id}... `);
    try {
      const data = await fetchProductPrice(product.url);
      prices[product.url] = {
        price: data.price,
        uvp: data.uvp,
        currency: data.currency,
        priceValidUntil,
        lastUpdated: new Date().toISOString().split('T')[0],
      };

      const existing = existingPrices[product.url];
      const changed = !existing || existing.price !== data.price || existing.uvp !== data.uvp;
      console.log(
        `${data.price} EUR${data.uvp ? ` (UVP: ${data.uvp} EUR)` : ''}${changed ? (existing ? ' CHANGED' : ' NEW') : ''}`
      );
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      if (existingPrices[product.url]) {
        prices[product.url] = existingPrices[product.url];
        console.log(`  -> keeping existing price: ${existingPrices[product.url].price} EUR`);
      }
    }
  }

  writeFileSync(pricesPath, JSON.stringify(prices, null, 2) + '\n');
  console.log(`\nDone. Prices written to src/data/prices.json`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
