'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Movie} = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// POST genres to get back movie list
router.post('/', jsonParser, (req, res) => {
  const {genres} = req.body;
  return Movie.find({})
  .then(movies => res.json(movies))
  .catch(err => res.status(500).json({message: 'Internal server error'}))
})


module.exports = {router};