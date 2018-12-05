"use strict";
const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
	title: String,
	genre: String,
	poster: String,
	users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

MovieSchema.methods.serialize = function() {
	return {
		id: this._id || "",
		title: this.title || "",
		genre: this.genre || "",
		poster: this.poster || "",
	};
};

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = { Movie };
