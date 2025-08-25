import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("Backend Lydia Exchange jalan 🚀");
});

// proxy harga dari coingecko
app.get("/api/price/:coin/:currency", async (req, res) => {
  const { coin, currency } = req.params;
  try {
    const resp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`);
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Gagal ambil harga" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
