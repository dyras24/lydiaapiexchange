const btn = document.getElementById("convert-btn");
const swap = document.getElementById("swap-btn");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const resultBox = document.getElementById("result");
let chart;

// Converter button
btn.addEventListener("click", async () => {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!amount) {
    resultBox.textContent = "⚠️ Masukkan jumlah!";
    return;
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
    );
    const data = await res.json();

    if (!data[from] || !data[from][to]) {
      resultBox.textContent = "⚠️ Harga tidak tersedia!";
      return;
    }

    const rate = data[from][to];
    const total = amount * rate;

    resultBox.textContent = `${amount} ${from.toUpperCase()} = ${total.toLocaleString()} ${to.toUpperCase()}`;

    // Update chart juga
    loadChart(from, to);
  } catch (err) {
    resultBox.textContent = "❌ Error ambil data!";
  }
});

// Tombol swap
swap.addEventListener("click", () => {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
});

// Load chart harga 7 hari
async function loadChart(coin, currency) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=7`
    );
    const data = await res.json();

    const labels = data.prices.map(p => new Date(p[0]).toLocaleDateString());
    const prices = data.prices.map(p => p[1]);

    const ctx = document.getElementById("price-chart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `${coin.toUpperCase()} → ${currency.toUpperCase()} (7D)`,
          data: prices,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          tension: 0.2,
        }]
      }
    });
  } catch (err) {
    console.error("Chart error:", err);
  }
}
