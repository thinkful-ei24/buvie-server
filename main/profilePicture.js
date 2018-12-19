const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//NICK PROFILE PICTURE STUFF

router.get('/:id', (req, res, next) => {
  let { id } = req.params;

  if (req.user.id !== id) {
    let err = new Error('Hold up sir that is not your id');
    err.status = 401;
    return next(err);
  }

  User.findOne({ _id: id }, { profilePicture: 1 })
    .then(user => {
      res.json(user);
    })
    .catch(err => next(err));
});

router.post('/:id', jsonParser, (req, res, next) => {
  let { id } = req.params;
  let form = req.body;

   if (req.user.id !== id) {
    let err = new Error('Hold up sir that is not your id');
    err.status = 401;
    return next(err);
  }
  
  let { profilePic } = req.body;

  User.findOneAndUpdate(
    { _id: id },
    { profilePicture: profilePic },
    { new: true }
  )
    .then(user => {
      const { _id, username, profilePicture } = user;
      res.status(201).json({ _id, username, profilePicture });
    })
    .catch(err => console.log(err));
});

module.exports = { router };