// Load environment variables dari .env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
const marketRoutes = require("./routes/market");
const exchangeRoutes = require("./routes/exchange");
const portfolioRoutes = require("./routes/portfolio");

app.use("/api/market", marketRoutes);
app.use("/api/exchange", exchangeRoutes);
app.use("/api/portfolio", portfolioRoutes);

// Port dari Railway (harus pakai process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
