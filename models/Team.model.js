const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const teamSchema = new mongoose.Schema({
    color: {
      type: String
    },
    champions : [{
      type: Schema.Types.ObjectId,
      ref: "Champion",
    }],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
});


const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
