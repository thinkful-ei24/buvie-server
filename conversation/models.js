"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ConversationSchema = mongoose.Schema({
	matched: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	messages: [
		{
			message: { type: String },
			handle: String,
			room: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation"}
		}
	]
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
