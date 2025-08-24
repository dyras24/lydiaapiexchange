const API_BASE = "https://lydia-backend.up.railway.app";

export async function getMarketPrice(symbol) {
  const res = await fetch(`${API_BASE}/market/${symbol}`);
  return res.json();
}
