require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- DATABASE CONNECTION ---
// Connect to the MongoDB Atlas cluster.
// In a serverless environment, this connection might be initiated on each request.
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// --- MIDDLEWARE ---
// The order is important!

// 1. Enable CORS.
// NOTE: After you deploy, you should change this to be more secure:
// app.use(cors({ origin: "https://your-project-name.vercel.app" }));
app.use(cors());

// 2. Parse JSON request bodies.
app.use(express.json());

// --- ROUTES ---
// Any request starting with '/api' will be handled by the 'api.js' file.
app.use('/api', require('./routes/api'));


// --- VERCEL EXPORT ---
// This line allows Vercel to use your Express app as a serverless function.
// We have removed the app.listen() block.
module.exports = app;

