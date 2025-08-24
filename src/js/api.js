// API fetch ke backend
async function convertCurrency(from, to, amount) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/market?from=${from}&to=${to}&amount=${amount}`
    );
    return await response.json();
  } catch (err) {
    console.error("Error fetching API:", err);
  }
}
