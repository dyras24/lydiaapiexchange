// src/js/app.js
import { getMarketPrice } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#converter-form");
  const resultBox = document.querySelector("#result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fromSymbol = document.querySelector("#fromCoin").value.toLowerCase();
    const amount = parseFloat(document.querySelector("#amount").value);

    if (!amount || amount <= 0) {
      resultBox.innerHTML = "⚠️ Masukkan jumlah valid!";
      return;
    }

    // Fetch harga dari CoinGecko
    const price = await getMarketPrice(fromSymbol);

    if (!price) {
      resultBox.innerHTML = `❌ Gagal ambil harga ${fromSymbol}`;
      return;
    }

    const totalUSD = amount * price;
    resultBox.innerHTML = `
      <p>💰 Harga 1 ${fromSymbol.toUpperCase()} = $${price}</p>
      <p>📊 Total = $${totalUSD.toFixed(2)}</p>
    `;
  });
});
