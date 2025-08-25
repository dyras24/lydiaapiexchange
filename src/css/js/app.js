// src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("converter-form");
  const resultBox = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fromCoin = document.getElementById("fromCoin").value; // ex: bitcoin
    const amount = parseFloat(document.getElementById("amount").value);

    if (!amount || amount <= 0) {
      resultBox.textContent = "⚠️ Masukkan jumlah yang valid.";
      return;
    }

    try {
      // Fetch harga dari CoinGecko
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin}&vs_currencies=usd`
      );
      const data = await res.json();

      if (!data[fromCoin]) {
        resultBox.textContent = "⚠️ Gagal ambil harga coin.";
        return;
      }

      const price = data[fromCoin].usd;
      const total = price * amount;

      resultBox.innerHTML = `
        <p>💰 1 ${fromCoin.toUpperCase()} = $${price.toLocaleString()}</p>
        <p>📊 ${amount} ${fromCoin.toUpperCase()} = <strong>$${total.toLocaleString()}</strong></p>
      `;
    } catch (err) {
      console.error(err);
      resultBox.textContent = "❌ Error ambil data harga.";
    }
  });
});
