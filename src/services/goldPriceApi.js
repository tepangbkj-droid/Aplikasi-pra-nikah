// Service untuk mengambil harga emas terkini.
// Idealnya endpoint ini adalah Cloudflare Worker yang mem-proxy API harga emas
// pihak ketiga (mis. logam mulia / harga emas Antam), supaya API key/scraping
// logic tidak terekspos di client.

const WORKER_ENDPOINT =
  import.meta.env.VITE_WORKER_BASE_URL + "/api/gold-price";

// Set true untuk pakai data mock saat backend belum siap.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_GOLD_PRICE === "true";

function mockGoldPrice() {
  // Simulasi delay network + data acak kecil supaya kelihatan "hidup".
  const base = 1_950_000;
  const wiggle = Math.round((Math.random() - 0.5) * 20_000);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        pricePerGram: base + wiggle,
        changePercent: (wiggle / base) * 100,
        updatedAt: new Date().toISOString(),
        source: "mock",
      });
    }, 700);
  });
}

export async function getCurrentGoldPrice() {
  if (USE_MOCK) return mockGoldPrice();

  const res = await fetch(WORKER_ENDPOINT);
  if (!res.ok) {
    throw new Error(`Gagal mengambil harga emas (status ${res.status})`);
  }
  const json = await res.json();

  // Bentuk respons yang diharapkan dari Worker:
  // { pricePerGram: number, changePercent: number, updatedAt: string }
  return json;
}
