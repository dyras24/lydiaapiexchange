// Converter
const convertBtn = document.getElementById("convert-btn");
const swapBtn = document.getElementById("swap-btn");

convertBtn.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from-currency").value.toLowerCase();
  const to = document.getElementById("to-currency").value.toLowerCase();

  if (!amount) {
    document.getElementById("result").textContent = "⚠️ Masukkan jumlah!";
    return;
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
    );
    const data = await res.json();

    if (!data[from]) {
      document.getElementById("result").textContent = "⚠️ Harga tidak tersedia!";
      return;
    }

    const rate = data[from][to];
    const total = amount * rate;

    document.getElementById("result").textContent =
      `${amount} ${from.toUpperCase()} = ${total.toLocaleString()} ${to.toUpperCase()}`;

    // Update chart juga
    if (window.loadChart) {
      window.loadChart(from, to);
    }
  } catch (err) {
    document.getElementById("result").textContent = "❌ Error ambil data!";
  }
});

// Tombol Swap ⇄
swapBtn.addEventListener("click", () => {
  const fromSelect = document.getElementById("from-currency");
  const toSelect = document.getElementById("to-currency");

  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
});
