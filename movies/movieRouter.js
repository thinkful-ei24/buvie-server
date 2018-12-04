"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const { Movie } = require("./models");

const router = express.Router();

const jsonParser = bodyParser.json();

// POST genres to get back movie list
router.post("/", jsonParser, (req, res, next) => {
	const { genres } = req.body;
	return Movie.find({ genre: { $in: genres } })
		.then(movies => res.json(movies))
		.catch(err => next(err));
});

module.exports = { router };
