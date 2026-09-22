import { jsonResponse } from "../utils/cors";

/**
 * POST /api/telegram/notify
 * Body: { message: string }
 *
 * Token bot & chat ID grup disimpan sebagai secret di Worker
 * (lihat wrangler.toml + perintah `wrangler secret put`), tidak pernah
 * dikirim ke browser. Ini dipanggil dari frontend setiap kali form
 * checklist / tabungan / pengeluaran / barang disubmit.
 */
export async function handleTelegramNotify(request, env) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    return jsonResponse(
      { error: "TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID belum diset di Worker" },
      env,
      500
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Body harus JSON" }, env, 400);
  }

  const { message } = body;
  if (!message || typeof message !== "string") {
    return jsonResponse({ error: "Field 'message' wajib diisi (string)" }, env, 400);
  }

  const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  const result = await res.json();

  if (!result.ok) {
    return jsonResponse({ error: result.description || "Gagal mengirim ke Telegram" }, env, 502);
  }

  return jsonResponse({ ok: true }, env);
}
