const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/market?from=BTC&to=USD&amount=1
router.get('/', async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${mapId(from)}&vs_currencies=${to.toLowerCase()}`;
    const response = await axios.get(url);

    const rate = response.data[mapId(from)][to.toLowerCase()];
    const result = rate * parseFloat(amount);

    res.json({ from, to, amount, rate, result });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

function mapId(symbol) {
  switch (symbol.toUpperCase()) {
    case "BTC": return "bitcoin";
    case "ETH": return "ethereum";
    case "USDT": return "tether";
    default: return symbol.toLowerCase();
  }
}

module.exports = router;
