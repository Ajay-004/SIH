require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Connect to MongoDB using URI from .env
// Making sure to use MONGODB_URI as per your file
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('MongoDB connection error:', err));

// --- MIDDLEWARE ---

// *** THIS IS THE LINE YOU ARE ADDING/CHANGING ***
// It tells your server to ONLY accept requests from your frontend URL.
app.use(cors({ origin: "https://end-5hf1.onrender.com" })); 

app.use(express.json()); // Parse JSON request bodies

// --- API ROUTES HANDLER ---
// This comes AFTER the cors middleware.
app.use('/api', require('./routes/api'));

// Start server on PORT from .env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
