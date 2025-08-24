document.getElementById('convert-btn').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const from = document.getElementById('from-currency').value;
  const to = document.getElementById('to-currency').value;

  const data = await getPrice(from, to, amount);

  if (data.error) {
    document.getElementById('result').innerText = "Error fetching price";
  } else {
    document.getElementById('result').innerText =
      `${amount} ${from} = ${data.result.toFixed(2)} ${to} (Rate: ${data.rate})`;
  }
});
