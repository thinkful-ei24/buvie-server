"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ConversationSchema = mongoose.Schema({
	matched: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	messages: [
		{
			_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			message: { type: String }
		}
	]
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = { Conversation };
