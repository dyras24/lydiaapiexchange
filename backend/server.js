const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const marketRoutes = require("./routes/market");
const exchangeRoutes = require("./routes/exchange");
const portfolioRoutes = require("./routes/portfolio");

const app = express();
app.use(cors());
app.use(express.json());

// koneksi database
const connectDB = require("./config/db");
connectDB();

// routes
app.use("/api/market", marketRoutes);
app.use("/api/exchange", exchangeRoutes);
app.use("/api/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
