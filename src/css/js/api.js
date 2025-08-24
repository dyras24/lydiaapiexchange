// Fetch harga dari backend (market.js)
async function getPrice(from, to, amount) {
  try {
    const res = await fetch(`http://localhost:5000/api/market?from=${from}&to=${to}&amount=${amount}`);
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return { error: "Failed to fetch price" };
  }
}
