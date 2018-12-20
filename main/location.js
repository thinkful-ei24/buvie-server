const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//LOCATION OF USERS

//GET USERS NEAR THE USER MAKING THE REQUEST
router.get('/', (req, res, next) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);

  User.aggregate().near({
    near: {type: 'Point', coordinates: [lng, lat]},
    maxDistance: 1609340,
    spherical: true,
    distanceField: "dis"
  }).then(users => res.json(users)
  ).catch(err => next(err));
});

//UPDATE THE USER'S LOCATION
router.put('/:id', jsonParser, (req, res, next) => {
  const { id } = req.params;
  const { city, coordinates } = req.body;
  console.log('usered', req.body);
  if (req.user.id !== id) {
    let err = new Error('Provided id does not match current user\'s id');
    err.status = 401;
    next(err);
  }
  User.findOneAndUpdate({ _id: id }, { location: { city, coordinates }, geometry: { type: 'point', coordinates: [coordinates.longitude, coordinates.latitude] } })
    .then((user) => res.json(user))
    .catch(err => next(err));
});

module.exports = { router };