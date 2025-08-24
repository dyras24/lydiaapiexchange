const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  from: String,
  to: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
