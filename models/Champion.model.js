const mongoose = require('mongoose');

const championSchema = new mongoose.Schema({
  championName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  item1: {
    type: String,
    required: true,
  },
  item2: {
    type: String,
    required: true,
  },
  item3: {
    type: String,
    required: true,
  },
  item4: {
    type: String,
    required: true,
  },
  item5: {
    type: String,
    required: true,
  }
});


const Champion = mongoose.model('Champion', championSchema);

module.exports = Champion;
