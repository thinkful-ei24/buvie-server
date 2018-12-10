'use strict';
const { router } = require('./router');
const { localStrategy, jwtStrategy, googleStrategy } = require('./strategies');

module.exports = { router, localStrategy, jwtStrategy, googleStrategy };
