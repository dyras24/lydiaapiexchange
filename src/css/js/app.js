// app.js
document.getElementById("converter-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const fromCoin = document.getElementById("fromCoin").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultBox = document.getElementById("result");

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${fromCoin}&vs_currencies=${toCurrency}`
    );
    const data = await res.json();

    if (data[fromCoin] && data[fromCoin][toCurrency]) {
      const price = data[fromCoin][toCurrency];
      const converted = amount * price;
      resultBox.innerHTML = `<strong>${amount} ${fromCoin.toUpperCase()}</strong> = ${converted.toLocaleString()} ${toCurrency.toUpperCase()}`;
    } else {
      resultBox.innerHTML = "⚠️ Gagal ambil harga.";
    }
  } catch (err) {
    console.error(err);
    resultBox.innerHTML = "❌ Error fetch harga dari CoinGecko";
  }
});
