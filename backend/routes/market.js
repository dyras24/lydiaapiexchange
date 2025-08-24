const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/market?from=bitcoin&to=usd&amount=1
router.get("/", async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`;
    const response = await axios.get(url);

    const rate = response.data[from][to];
    const result = rate * parseFloat(amount);

    res.json({ rate, result, from, to, amount });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

module.exports = router;
