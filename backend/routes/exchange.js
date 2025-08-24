const express = require("express");
const router = express.Router();

// Contoh endpoint exchange
router.get("/", (req, res) => {
  res.json({ status: "Exchange API OK ✅" });
});

router.post("/swap", (req, res) => {
  const { from, to, amount } = req.body;
  // logika swap dummy
  res.json({ message: `Swap ${amount} ${from} to ${to} success ✅` });
});

module.exports = router;
