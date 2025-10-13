const mongoose = require('mongoose')
const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter a name"]
    },
    describtion: {
      type: String,
      required: false,

    },

    thumbnail: {
      type: String,
      required: false
    },
    type: {
      type: String,
      enum: ['movie', 'tvSeries'],
      required: true

    },

    genre: {
      type: String,
      required: false,
    },
    year: {
      type: Number,

    },
    url: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10
    },
    source: {
      type: String,
      enum: ['in-app', 'youtube'],
      required: true
    }

  },
  {
    timestamps: true
  },

)
const Movie = mongoose.model("Movie", movieSchema)
module.exports = Movie;