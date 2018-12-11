const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../users");
const { Movie } = require("../movies");
const { Conversation } = require("../conversation/models");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get('/:id', jsonParser, (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  Conversation.findOne({ _id: id })
    .populate({ path: 'matched', select: 'username' })
    .then((conversation) => {
      let otherUser = conversation.matched.filter(user => user._id.toString() !== userId);
      if (otherUser.length < conversation.matched.length) {
        for (let i=0; i< conversation.messages.length; i++) {
          conversation.messages[i].room = id;
          console.log(conversation.messages[i]);
        }
        let response = {
          chatroom: { _id: id },
          _id: otherUser[0],
          messages: conversation.messages
        };
        res.json(response);
      } else {
        let err = new Error("You do not have access to this conversation");
        err.status = 401;
        next(err);
      }
    })
    .catch(err => next(err));
});

router.put('/:id', jsonParser, (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { messages } = req.body;
  Conversation.findOne({ _id: id })
    .then((conversation) => {
      if (conversation.matched.find(user => user.toString() === userId)) {
        return Conversation.findOneAndUpdate({ _id: id }, { messages }, { new: true });
      } else {
        let err = new Error("You do not have access to this conversation");
        err.status = 401;
        next(err);
      }
    })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = { router };
