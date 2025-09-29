// Load environment variables from a .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Import the serverless-http package to wrap the Express app
const serverless = require('serverless-http');

const app = express();

// --- DATABASE CONNECTION ---
// Connect to the MongoDB Atlas cluster using the URI from your .env file.
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully.');
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// --- MIDDLEWARE ---
// The order of middleware is important.

// 1. Enable CORS (Cross-Origin Resource Sharing).
// IMPORTANT: After you deploy, you must update this to your Netlify site URL for security.
// Example: app.use(cors({ origin: "https://your-site-name.netlify.app" }));
app.use(cors());

// 2. Enable middleware to parse incoming JSON request bodies.
app.use(express.json());

// --- ROUTES ---
// Any request that starts with '/api' will be handled by your routes defined in './routes/api'.
app.use('/api', require('./routes/api'));


// --- NETLIFY HANDLER EXPORT ---
// This is the crucial part for Netlify.
// We wrap the Express app with the serverless() function and export it as a handler.
// Netlify will use this handler to run your server code as a function.
// The original app.listen() block has been removed.
module.exports.handler = serverless(app);

