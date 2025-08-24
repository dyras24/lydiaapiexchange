const express = require("express");
const router = express.Router();

// simulasi transaksi tukar coin
router.post("/", (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || !amount) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Dummy response
  res.json({
    message: `Exchanged ${amount} ${from} to ${to}`,
    success: true,
  });
});

module.exports = router;
