// src/js/api.js
const COINGECKO_API = "https://api.coingecko.com/api/v3";

// Ambil harga coin dalam USD dari CoinGecko
export async function getMarketPrice(symbol) {
  try {
    const res = await fetch(`${COINGECKO_API}/simple/price?ids=${symbol}&vs_currencies=usd`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();

    // contoh data: { bitcoin: { usd: 64500 } }
    if (data[symbol] && data[symbol].usd) {
      return data[symbol].usd;
    } else {
      console.error("Coin tidak ditemukan:", symbol);
      return null;
    }
  } catch (err) {
    console.error("Gagal fetch dari CoinGecko:", err);
    return null;
  }
}
