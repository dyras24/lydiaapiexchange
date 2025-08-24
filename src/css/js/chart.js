const ctx = document.getElementById('price-chart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: 'BTC Price (USD)',
      data: [40000, 41000, 42000, 41500, 43000],
      borderColor: '#4CAF50',
      borderWidth: 2,
      fill: false,
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: false } }
  }
});
