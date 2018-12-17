const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');

// GET endpoint to return people user has matched with (mutual popcorns)
router.get('/:id', (req, res, next) => {
  let { id } = req.params;

  if (req.user.id !== id) {
    let err = new Error('Hold up sir that is not your id');
    err.status = 401;
    return next(err);
  }

  User.findOne({ _id: id }, { matches: 1 })
    .populate({ path: 'matched._id', select: 'username' })
    .populate({ path: 'matched.chatroom', select: '_id' })

    .then(matches => {
      res.status(200).json(matches);
    })
    .catch(err => next(err));
});

module.exports = { router };