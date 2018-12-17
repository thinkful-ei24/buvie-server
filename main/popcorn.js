const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');
const { Conversation } = require('../conversation/models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.put('/', jsonParser, (req, res, next) => {
  const popcornerId = req.user.id;
  const popcornedId = req.body.userId;
  let _user;

  // look up the user who popcorned and check if the user they popcorned has already popcorned them
  User.findOne({ _id: popcornerId }).then(user => {
    _user = user;
    return User.findOne({ _id: popcornedId })
      .populate({ path: 'matched._id', select: 'username' })
      .then(user => {
        if (user.matched.find(id => id._id._id.toString() === popcornerId)) {
          return;
        } else if (user.popcorned.find(id => id.toString() === popcornerId)) {
          user.notifications = user.notifications.filter(user => user._id.toString() !== popcornerId);
          user.notifications.push({ _id: popcornerId, notificationType: 're-popcorn' });
          return User.findOneAndUpdate({ _id: popcornedId }, { notifications: user.notifications });
        } else if (_user.popcorned.find(id => id.toString() === popcornedId)) {
          Conversation.create({ matched: [popcornedId, popcornerId] }).then(
            conversation => {
              let chatroom = conversation._id;

              _user.popcorned = _user.popcorned.filter(
                userId => userId.toString() !== popcornedId
              );
              _user.matched.push({ _id: popcornedId, chatroom });

              user.whoUserPopcorned = user.whoUserPopcorned.filter(userId => userId.toString() !== popcornerId);
              user.matched.push({ _id: popcornerId, chatroom });

              return Promise.all([
                User.findOneAndUpdate(
                  { _id: popcornerId },
                  {
                    popcorned: _user.popcorned,
                    matched: _user.matched,
                    $push: { notifications: { _id: popcornedId, notificationType: 'matched' } }
                  }
                ),
                User.findOneAndUpdate(
                  { _id: popcornedId },
                  {
                    whoUserPopcorned: user.whoUserPopcorned,
                    matched: user.matched,
                    $push: { notifications: { _id: popcornerId, notificationType: 'matched' } }
                  })
              ]);
            });
        } else {
          return Promise.all([
            User.findOneAndUpdate(
              { _id: popcornedId },
              { $push: { popcorned: popcornerId, notifications: { _id: popcornerId, notificationType: 'popcorn' } } },
              { new: true }),
            User.findOneAndUpdate(
              { _id: popcornerId },
              { $push: { whoUserPopcorned: popcornedId } },
              { new: true }
            )
          ]);
        }
      })
      .then(() => res.sendStatus(204))
      .catch(err => next(err));
  });
});

// Just returns a user's popcorns

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (req.user.id !== id) {
    let err = new Error('Hold up sir that is not your id');
    err.status = 401;
    return next(err);
  }

  User.findOne({ _id: id })
    .populate({
      path: 'popcorned',
      select: 'username'
    })
    .populate({
      path: 'whoUserPopcorned',
      select: 'username'
    })
    .then(user => {
      const { popcorned, whoUserPopcorned } = user;
      res.json({ popcorned, pendingPopcorn: whoUserPopcorned });
    })
    .catch(err => next(err));
});

module.exports = { router };