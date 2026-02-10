const Movie = require('./movies');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const cors = require('cors');
const app = express();
const trending = require('./trendingMovie')

// Configure CORS to allow requests from your dev tools / device
const whitelist = [
  'http://localhost:19006', // Expo web/devtool
  'http://localhost:8081',  // local frontend (if used)
  'http://127.0.0.1:19006',
  'http://localhost:8082'   // expo/web default for some setups
  // Add your machine IP / Expo tunnel URL here, e.g. 'exp://192.168.1.5:19000'
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Preflight requests are handled by the CORS middleware; explicit app.options('*') can cause path parsing issues with certain versions of path-to-regexp
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Failed to connect to DB, server not started', err);
  });

app.get('/', (req, res) => {
  res.send('Hello! Your server is working.');
});

app.post('/trending', async (req, res) => {
  try {
    let movies = req.body;
    if (!Array.isArray(movies)) {
      movies = [movies]
    }
    const inserted = await trending.insertMany(movies)
    res.status(201).json(inserted);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
app.get('/trending', async (req, res) => {
  try {

    const trendingMovies = await trending.find({}).populate('movie')
    res.json(trendingMovies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }

})
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete all movies
app.delete('/movies', async (req, res) => {
  try {
    await Movie.deleteMany({});
    res.status(200).send('All movies deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add movies
app.post('/movies', async (req, res) => {
  try {
    let movies = req.body;

    // If it's a single movie object, wrap it in an array
    if (!Array.isArray(movies)) {
      movies = [movies];
    }

    // Save all movies using insertMany
    const insertedMovies = await Movie.insertMany(movies);
    res.status(201).json(insertedMovies);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
