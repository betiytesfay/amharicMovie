const mongoose = require('mongoose');
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
  { timestamp: true })
module.exports = mongoose.model('trending', trendignSchemea)