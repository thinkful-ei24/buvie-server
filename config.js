'use strict';

require('dotenv').config();

exports.DATABASE_URL =
	process.env.DATABASE_URL || 'mongodb://localhost:27017/buvie';
exports.TEST_DATABASE_URL =
	process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/buvie-test';
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
exports.CLOUDINARY_BASE_URL = process.env.CLOUDINARY_BASE_URL;
exports.CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
