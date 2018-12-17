const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');
const { Movie } = require('../movies');
const { Conversation } = require('../conversation/models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const socket = require('socket.io');
const fetch = require('node-fetch');
const { CLOUDINARY_BASE_URL, CLOUDINARY_UPLOAD_PRESET } = require('../config');

// endpoint if user changes their mind about someone they popcorned
router.put('/nevermind/:id', jsonParser, (req, res, next) => {
  const id = req.user.id;
  const ignored = req.body.userId;
  User.findOne({ _id: ignored })
    .then((user) => {
      // get rid of all evidence of notifications and popcorned
      user.popcorned = user.popcorned.filter(userId => userId.toString() !== id);
      user.notifications = user.notifications.filter(user => user._id.toString() !== id);
      return User.findOneAndUpdate({ _id: ignored }, {
        popcorned: user.popcorned,
        notifications: user.notifications
      }, { new: true });
    })
    .then(() => {
      return User.findOne({ _id: id });
    })
    .then((user) => {
      // delete user from pending popcorns
      user.whoUserPopcorned = user.whoUserPopcorned.filter(userId => userId.toString() !== ignored);
      return User.findOneAndUpdate({ _id: id }, { whoUserPopcorned: user.whoUserPopcorned });
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

// adds selected user to ignored list; they will then show up only at the very end of the matches array
router.put('/:id', jsonParser, (req, res, next) => {
  const id = req.user.id;
  const ignored = req.body.userId;
  User.findOne({ _id: id })
    .then((user) => {
      user.ignored = user.ignored.filter(userId => userId.toString() !== ignored);
      user.ignored.push(ignored);
      user.popcorned = user.popcorned.filter(userId => userId.toString() !== ignored);
      user.notifications = user.notifications.filter(user => user._id.toString() !== ignored);
      return User.findOneAndUpdate({ _id: id }, {
        popcorned: user.popcorned,
        ignored: user.ignored,
        notifications: user.notifications
      }, { new: true });
    })
    .then(() => {
      return User.findOne({ _id: ignored });
    })
    .then((user) => {
      user.whoUserPopcorned = user.whoUserPopcorned.filter(userId => userId.toString() !== id);
      return User.findOneAndUpdate({ _id: ignored }, { whoUserPopcorned: user.whoUserPopcorned });
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = { router };