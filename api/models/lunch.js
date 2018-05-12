const mongoose = require('mongoose');

const lunchSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  participants: [{
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
})

module.exports = mongoose.model('Lunch', lunchSchema);