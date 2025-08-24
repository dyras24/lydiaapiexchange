import express from "express";
import cors from "cors";

import marketRoutes from "./routes/market.js";

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/market", marketRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

// Railway PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
