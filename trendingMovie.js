const mongoose = require('mongoose');
const Movie = require('./movies');
const trendignSchemea = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true
  },
  expiredAt: {
    type: Date,

  },

},
  { timestamps: true })
module.exports = mongoose.model('trending', trendignSchemea)