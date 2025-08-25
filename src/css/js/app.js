const API_URL = "https://api.coingecko.com/api/v3/simple/price";

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
    const res = await fetch(`${API_URL}?ids=${from}&vs_currencies=${to}`);
    const data = await res.json();

    if (data[from] && data[from][to]) {
      const price = data[from][to];
      const converted = amount * price;
      document.getElementById("result").innerText =
        `${amount} ${from.toUpperCase()} = ${converted.toLocaleString()} ${to.toUpperCase()}`;
    } else {
      document.getElementById("result").innerText = "Data harga tidak ditemukan.";
    }
  } catch (err) {
    document.getElementById("result").innerText = "Gagal ambil harga!";
    console.error(err);
  }
});

// Swap tombol ⇄
document.getElementById("swap-btn").addEventListener("click", () => {
  const fromSelect = document.getElementById("from-currency");
  const toSelect = document.getElementById("to-currency");
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
});
