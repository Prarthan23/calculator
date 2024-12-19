const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  calcTitle: { type: String, required: true },
  results: [{}],
  inputs:[{}],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Result = mongoose.model('Result', resultSchema);
module.exports = Result;
