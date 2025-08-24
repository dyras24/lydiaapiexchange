const express = require("express");
const router = express.Router();

// contoh dummy portfolio
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    portfolio: [
      { coin: "bitcoin", balance: 0.5 },
      { coin: "ethereum", balance: 2 },
    ],
  });
});

module.exports = router;
