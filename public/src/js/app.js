document.getElementById("convert-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from-currency").value; // langsung id coingecko
  const to = document.getElementById("to-currency").value.toLowerCase();

  if (!amount || amount <= 0) {
    document.getElementById("result").innerText = "⚠️ Masukkan jumlah valid!";
    return;
  }

  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
    );
    const data = await res.json();

    if (data[from] && data[from][to]) {
      const price = data[from][to];
      const converted = amount * price;
      document.getElementById("result").innerText =
        `${amount} ${from.toUpperCase()} = ${converted.toLocaleString()} ${to.toUpperCase()}`;
    } else {
      document.getElementById("result").innerText = "⚠️ Harga tidak ditemukan.";
    }
  } catch (err) {
    document.getElementById("result").innerText = "⚠️ Error ambil data!";
    console.error(err);
  }
});
