const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');

// updates the time user last checked notification so client side knows which
// notifications are new
router.put('/time/:id', (req, res, next) => {
  let { id } = req.params;

  if (req.user.id !== id) {
    let err = new Error('Hold up sir that is not your id');
    err.status = 401;
    next(err);
  }

  User.findOneAndUpdate({ _id: id }, { notificationCheck: Date.now() }, { new: true })
    .then((user) => {
      const { notificationCheck } = user;
      res.json(notificationCheck);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  let { id } = req.params;


  User.findOne({ _id: id }, { notifications: 1, notificationCheck: 1 })
    .populate({ path: 'notifications._id', select: 'username' })
    .then(response => {
      const notifications = response.notifications.map(note => {
        let message;
        if (note.notificationType === 'popcorn') {
          message = `${note._id.username} has popcorned you!`;
        } else if (note.notificationType === 're-popcorn') {
          message = `${note._id.username} had popcorned you again! Please respond!`;
        } else if (note.notificationType === 'matched') {
          message = `You've matched with ${note._id.username}! Start a conversation!`;
        }
        return ({
          _id: note._id._id,
          message,
          date: note.date,
          type: note.notificationType
        });
      });
      res.json({ notifications, notificationCheck: response.notificationCheck });
    })
    .catch(err => next(err));
});

module.exports = { router };