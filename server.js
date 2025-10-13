const Movie = require('./movies');
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');
const app = express();
app.use(express.json());


connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.send('Hello! Your server is working.');
});


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

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
