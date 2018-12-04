'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const MovieSchema = mongoose.Schema({
  title: String,
  genre: String,
  poster: String
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = { Movie };