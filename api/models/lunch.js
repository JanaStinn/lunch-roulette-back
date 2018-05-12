const mongoose = require('mongoose');

const lunchSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  participants: {
    type: Array
  }
})

module.exports = mongoose.model('Lunch', lunchSchema);