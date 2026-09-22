import { jsonResponse } from "../utils/cors";

/**
 * GET /api/gold-price
 *
 * Worker ini yang menyembunyikan detail sumber harga emas dari client,
 * supaya kalau nanti ganti provider (scrape web logam mulia, pakai API
 * berbayar, dsb) frontend tidak perlu diubah sama sekali.
 *
 * Ganti fetchFromRealSource() di bawah dengan pemanggilan API/scraper
 * pilihanmu. Selama itu belum ada, endpoint ini mengembalikan data mock
 * yang konsisten (berbasis hari) supaya UI tetap bisa diuji.
 */
export async function handleGoldPrice(request, env) {
  try {
    const price = env.GOLD_PRICE_API_URL
      ? await fetchFromRealSource(env)
      : mockPrice();

    return jsonResponse(price, env);
  } catch (err) {
    return jsonResponse({ error: err.message }, env, 502);
  }
}

async function fetchFromRealSource(env) {
  // Contoh generik: sesuaikan bentuk request & response dengan provider
  // harga emas yang kamu pakai (mis. endpoint logam mulia / Antam / API pihak ketiga).
  const res = await fetch(env.GOLD_PRICE_API_URL, {
    headers: env.GOLD_PRICE_API_KEY
      ? { Authorization: `Bearer ${env.GOLD_PRICE_API_KEY}` }
      : {},
  });

  if (!res.ok) {
    throw new Error(`Sumber harga emas mengembalikan status ${res.status}`);
  }

  const data = await res.json();

  // TODO: sesuaikan mapping field ini dengan struktur respons provider asli.
  return {
    pricePerGram: data.pricePerGram ?? data.price_per_gram,
    changePercent: data.changePercent ?? data.change_percent ?? 0,
    updatedAt: new Date().toISOString(),
    source: "live",
  };
}

function mockPrice() {
  const base = 1_950_000;
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const wiggle = ((dayIndex * 9301 + 49297) % 40000) - 20000;

  return {
    pricePerGram: base + wiggle,
    changePercent: (wiggle / base) * 100,
    updatedAt: new Date().toISOString(),
    source: "mock",
  };
}
