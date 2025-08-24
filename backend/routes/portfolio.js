const express = require("express");
const router = express.Router();

// Contoh endpoint portfolio
router.get("/", (req, res) => {
  res.json({
    status: "Portfolio API OK ✅",
    portfolio: [
      { asset: "BTC", balance: 0.5 },
      { asset: "ETH", balance: 2 },
      { asset: "BNB", balance: 10 }
    ]
  });
});

module.exports = router;
