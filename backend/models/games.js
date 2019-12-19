const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Game", GameSchema);