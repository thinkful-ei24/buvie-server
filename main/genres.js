const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../users");
const { Movie } = require("../movies");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.put("/:id", jsonParser, (req, res, next) => {
	let { id } = req.params;
	let updatedUser;

	if (req.user.id !== id) {
		let err = new Error("Hold up sir that is not your id");
		err.status = 401;
		next(err);
	}

	let { genres, movies } = req.body;

	if (genres) {
		User.findOneAndUpdate({ _id: id }, { genres: genres }, { new: true })
			.then(user => res.json(user))
			.catch(err => {
				return next(err);
			});
	} else if (movies) {

		User.findByIdAndUpdate({ _id: id }, { movies: movies }, { new: true })
			.then((user) => {
				updatedUser = user;
				return Movie.updateMany(
					{ _id: { $in: movies } },
					{ $push: { users: id } },
					{ new: true }
				)}
			)
			.then(() => res.json(updatedUser))
			.catch(err => {
				return next(err);
			});
	} else {
		return next();
	}
});

router.get("/", (req, res, next) => {
	//Movie 1 Horror 5c08072ccdaa386f7851cbeb, Movie 2 Comedy 5c08072ccdaa386f7851cbf6
	//Movie 3 International 5c08072ccdaa386f7851cc14
	//Query Movie database for all the matching movies
	//Create dictionary of user id's
	//if userId appears more than 55% of the time capture User
	//(userIdDictionary[movies[i].users[j]] < proportion)

	let userIdDictionary = {};
	let ourMatches = [];

	let movies;
	let proportion;

	const { id } = req.user;
	User.findById(id)
		.then(user => {
			movies = user.movies;
			proportion = Math.ceil(movies.length * 0.55);
			return Movie.find({ _id: { $in: movies } }, { _id: 0, users: 1 });
		})
		.then(movies => {
			for (let i = 0; i < movies.length; i++) {
				for (let j = 0; j < movies[i].users.length; j++) {
					console.log(movies[i].users[j]);
					if (!userIdDictionary[movies[i].users[j]]) {
						userIdDictionary[movies[i].users[j]] = 1;
					} else {
						userIdDictionary[movies[i].users[j]]++;
					}
				}
			}
			console.log(userIdDictionary, "line 84");
			console.log(proportion, "line 85");
			for (let id in userIdDictionary) {
				if (userIdDictionary[id] >= proportion && id !== req.user.id) {
					ourMatches.push(id);
				}
			}
			return User.find({ _id: { $in: ourMatches } }).populate({
				path: "movies",
				select: "title poster"
			});
			// res.status(200).json({ matches: ourMatches });
		})
		.then(users => {
			console.log(users);
			let serializedUser = users.map(user => user.serialize());
			res.json(serializedUser);
		})
		.catch(err => {
			next(err);
		});
});

module.exports = { router };
