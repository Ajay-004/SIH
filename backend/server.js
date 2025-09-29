
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
// This section sets up middleware, which are functions that run for every request.
// The order is important!

// 1. Enable CORS for all routes and origins.
// This allows your frontend (e.g., at 127.0.0.1:5500) to make requests to this backend.
app.use(cors());

// 2. Enable the express.json() middleware to parse JSON request bodies.
// This is needed to read data from login/signup forms.
app.use(express.json());

// --- ROUTES ---
// After the middleware, we define our API routes.
// Any request starting with '/api' will be handled by the 'api.js' file.
app.use('/api', require('./routes/api'));

// --- DATABASE CONNECTION ---
// Connect to the MongoDB Atlas cluster using the URI from your .env file.
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully.');
    // Once the database is connected, start the server.
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit the process with an error code if the DB connection fails.
  });
