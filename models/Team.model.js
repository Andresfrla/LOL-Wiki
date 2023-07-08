const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  championName: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  item1: {
    type: String,
    required: true,
    unique: true
  },
  item2: {
    type: String,
    required: true,
    unique: true
  },
  item3: {
    type: String,
    required: true,
    unique: true
  },
  item4: {
    type: String,
    required: true,
    unique: true
  },
  item5: {
    type: String,
    required: true,
    unique: true
  }
});


const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
