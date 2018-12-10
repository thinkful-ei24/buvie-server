"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	genres: [
		{
			type: String
		}
	],
	movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
	popcorned: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	matched: [
		{
			_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			chatroom: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" }
		}
	],
	ignored: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

UserSchema.methods.serialize = function() {
	return {
		id: this._id || "",
		username: this.username || "",
		email: this.email || "",
		genres: this.genres || "",
		movies: this.movies || "",
		popcorned: this.popcorned || [],
		matched: this.matched || []
	};
};

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
