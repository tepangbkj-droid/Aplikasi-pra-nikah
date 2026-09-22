// Helper CORS sederhana. Untuk pemakaian pribadi, batasi ALLOWED_ORIGIN
// di wrangler.toml ke domain frontend kamu saja (bukan "*") supaya API
// tidak bisa dipanggil sembarang orang dari domain lain.

export function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export function jsonResponse(data, env, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env),
    },
  });
}

export function handleOptions(env) {
  return new Response(null, { status: 204, headers: corsHeaders(env) });
}
