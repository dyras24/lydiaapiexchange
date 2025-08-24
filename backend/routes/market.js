import express from "express";
import axios from "axios";

const router = express.Router();

// GET /market/:symbol
// contoh: /market/bitcoin → { "bitcoin": { "usd": 68000 } }
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: symbol,          // coin id dari coingecko
        vs_currencies: "usd"  // default USD
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching price:", error.message);
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

export default router;
