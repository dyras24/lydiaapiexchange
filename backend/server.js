const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB
const connectDB = require('./config/db');
connectDB();

// Routes
app.use('/api/market', require('./routes/market'));
app.use('/api/exchange', require('./routes/exchange'));
app.use('/api/portfolio', require('./routes/portfolio'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
