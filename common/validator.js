const mongoose = require("mongoose");

const validateMongooseId = (req, res, next) => {
	let userId;
	let itemId;

	if (req.user.id) {
		console.log(req.user);
		userId = req.user.id;
		console.log(
			`Here in validator userId: ${userId}`,
			mongoose.Types.ObjectId.isValid(userId)
		);
		if (!mongoose.Types.ObjectId.isValid(userId)) {
			console.log("hello");
			const err = new Error("Invalid user id!");
			err.status = 400;
			return next(err);
		}
	}

	if (req.params.id) {
		itemId = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(itemId)) {
			`Here in validator itemId: ${itemId}`;
			console.log("hello");
			const err = new Error("Invalid item id!");
			err.status = 400;
			return next(err);
		}
	}

	return next();
};

const requiredFieldsInReqBody = arguments => (req, res, next) => {
	const required = [...arguments];

	const fieldCheck = () => {
		required.forEach(field => {
			if (!(field in req.body)) {
				const error = new Error(`You're missing a(n) ${field}!`);
				error.status = 400;
				next(error);
			}
		});
	};

	fieldCheck();

	return next();
};

module.exports = { validateMongooseId, requiredFieldsInReqBody };
