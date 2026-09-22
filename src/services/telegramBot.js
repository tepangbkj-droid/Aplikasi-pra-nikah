// Frontend TIDAK PERNAH menyimpan Bot Token secara langsung.
// Semua notifikasi dikirim lewat Cloudflare Worker (/api/telegram/notify),
// yang menyimpan TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID sebagai secret di sisi server.

const WORKER_ENDPOINT = `${import.meta.env.VITE_WORKER_BASE_URL}/api/telegram/notify`;

/**
 * Kirim notifikasi teks ke grup Telegram lewat Worker.
 * Dibuat "fire-and-forget" secara aman: kalau gagal, tidak melempar error
 * ke pemanggil supaya submit form (checklist/tabungan/pengeluaran) tetap
 * berhasil walau notifikasi gagal terkirim.
 */
export async function notifyTelegram(message) {
  try {
    const res = await fetch(WORKER_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      console.warn(`Notifikasi Telegram gagal (status ${res.status})`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn("Notifikasi Telegram gagal:", err.message);
    return false;
  }
}

// ---- Template pesan per modul, dibuat konsisten & mudah dibaca di HP ----

export function buildChecklistMessage({ title, actor }) {
  return [
    "✅ *Checklist diperbarui*",
    `Tugas: ${title}`,
    actor ? `Oleh: ${actor}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildItemMessage({ name, purchased }) {
  return [
    purchased ? "🛍️ *Barang sudah dibeli*" : "📦 *Barang baru ditambahkan*",
    `Nama: ${name}`,
  ].join("\n");
}

export function buildSavingsMessage({ actor, amount, note }) {
  return [
    "💰 *Tabungan baru masuk*",
    `Dari: ${actor}`,
    `Jumlah: Rp${Number(amount).toLocaleString("id-ID")}`,
    note ? `Catatan: ${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildExpenseMessage({ item, amount, note }) {
  return [
    "🧾 *Pengeluaran baru dicatat*",
    `Item: ${item}`,
    `Jumlah: Rp${Number(amount).toLocaleString("id-ID")}`,
    note ? `Catatan: ${note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
