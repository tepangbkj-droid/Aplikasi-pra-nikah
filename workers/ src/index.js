import { handleGoldPrice } from "./routes/goldPrice";
import { handleTelegramNotify } from "./routes/telegram";
import { handleOptions, jsonResponse } from "./utils/cors";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (request.method === "OPTIONS") {
      return handleOptions(env);
    }

    if (pathname === "/api/gold-price" && request.method === "GET") {
      return handleGoldPrice(request, env);
    }

    if (pathname === "/api/telegram/notify" && request.method === "POST") {
      return handleTelegramNotify(request, env);
    }

    return jsonResponse({ error: "Not found" }, env, 404);
  },
};
