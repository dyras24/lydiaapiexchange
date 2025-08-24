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
app.use("/api/market", require("./routes/market"));
app.use("/api/exchange", require("./routes/exchange"));
app.use("/api/portfolio", require("./routes/portfolio"));

// Port dari Railway (harus pakai process.env.PORT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
