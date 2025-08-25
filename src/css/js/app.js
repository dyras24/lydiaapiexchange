const API_BASE = "https://api.coingecko.com/api/v3";

// === KONVERTER ===
document.getElementById("convert-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from-currency").value.toLowerCase();
  const to = document.getElementById("to-currency").value.toLowerCase();

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "Masukkan jumlah valid!";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/simple/price?ids=${from}&vs_currencies=${to}`);
    const data = await res.json();

    if (data[from] && data[from][to]) {
      const price = data[from][to];
      const converted = amount * price;
      document.getElementById("result").innerText =
        `${amount} ${from.toUpperCase()} = ${converted.toLocaleString()} ${to.toUpperCase()}`;
    } else {
      document.getElementById("result").innerText = "⚠️ Data harga tidak ditemukan.";
    }
  } catch (err) {
    document.getElementById("result").innerText = "⚠️ Gagal ambil harga!";
    console.error(err);
  }
});

// Tombol ⇄ swap
document.getElementById("swap-btn").addEventListener("click", () => {
  const fromSelect = document.getElementById("from-currency");
  const toSelect = document.getElementById("to-currency");
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
});

// === GRAFIK MARKET ===
async function loadChart(coin = "bitcoin", currency = "usd") {
  try {
    const res = await fetch(`${API_BASE}/coins/${coin}/market_chart?vs_currency=${currency}&days=7&interval=daily`);
    const data = await res.json();

    const prices = data.prices.map(p => p[1]); // ambil harga
    const labels = data.prices.map(p => {
      const date = new Date(p[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    });

    const ctx = document.getElementById("price-chart").getContext("2d");

    // destroy chart lama biar ga double
    if (window.priceChart) window.priceChart.destroy();

    window.priceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `${coin.toUpperCase()} Price (last 7 days)`,
          data: prices,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
        scales: {
          x: { display: true },
          y: { display: true }
        }
      }
    });

  } catch (err) {
    console.error("Gagal load chart:", err);
  }
}

// load chart default bitcoin
loadChart("bitcoin", "usd");
