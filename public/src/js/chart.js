// Chart.js grafik harga 7 hari
const ctx = document.getElementById("price-chart").getContext("2d");

let priceChart;

async function loadChart(coin = "bitcoin", vs = "usd") {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vs}&days=7&interval=daily`
    );
    const data = await res.json();

    const labels = data.prices.map(p => {
      const d = new Date(p[0]);
      return `${d.getDate()}/${d.getMonth() + 1}`;
    });

    const prices = data.prices.map(p => p[1]);

    if (priceChart) priceChart.destroy();

    priceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: `${coin.toUpperCase()} / ${vs.toUpperCase()} (7 Hari)`,
          data: prices,
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 2,
          fill: false,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  } catch (err) {
    console.error("Gagal load chart:", err);
  }
}

// Default Bitcoin vs USD
loadChart("bitcoin", "usd");

// expose biar bisa dipanggil dari app.js
window.loadChart = loadChart;
