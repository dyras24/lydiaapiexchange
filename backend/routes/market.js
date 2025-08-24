const express = require("express");
const router = express.Router();
const axios = require("axios");

// Contoh route GET Market data
router.get("/", async (req, res) => {
  try {
    // Contoh ambil data dari CoinGecko
    const response = await axios.get("https://api.coingecko.com/api/v3/ping");
    res.json({ status: "Market API OK ✅", data: response.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
