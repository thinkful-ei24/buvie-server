const mongoose = require("mongoose");
const { Movie } = require("../movies/models");
const { User } = require("../users/models");
const { users, movies } = require("./data");
const { DATABASE_URL } = require("../config");
const bcrypt = require("bcryptjs");

const seed = () => {
	console.log("line 16");

	async function hash() {
		let hashedPW = await bcrypt.hash("password123", 10);
		console.log(hashedPW);
	}

	hash();
	mongoose
		.connect(
			DATABASE_URL,
			{ useNewUrlParser: true }
		)
		.then(() => mongoose.connection.db.dropDatabase())
		.then(() => {
			return Promise.all([User.insertMany(users), Movie.insertMany(movies)]);
		})
		.then(results => {
			console.info(`Inserted stuff`);
		})
		.then(() => mongoose.disconnect())
		.catch(err => {
			console.error(err);
		});
};

seed();
