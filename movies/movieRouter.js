"use strict";
const express = require("express");
const bodyParser = require("body-parser");

const { Movie } = require("./models");
const { User } = require('../users');

const router = express.Router();

const jsonParser = bodyParser.json();

// POST genres to get back movie list
router.get("/", jsonParser, (req, res, next) => {
	const { id } = req.user;
	User.findOne({ _id: id })
		.then(user => {
			const { genres } = user;
			return Movie.find({ genre: { $in: genres } })
		})
		.then(movies => res.json(movies))
		.catch(err => next(err));
});

module.exports = { router };
