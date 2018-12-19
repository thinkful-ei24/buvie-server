const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { User } = require('../users');
const { Movie } = require('../movies');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


router.put('/:id', jsonParser, (req, res, next) => {
  let { id } = req.params;
  let updatedUser;

  if (req.user.id !== id) {
    let err = new Error('Hold up sir that is not your id');
    err.status = 401;
    next(err);
  }

  let { genres, movies } = req.body;

  if (genres) {
    if (genres.length > 3) {
      let err = new Error('Please only select 3 genres');
      err.status = 400;
      next(err);
    }
    if (!genres.length) {
      let err = new Error('Please select at least 1 genre');
      err.status = 400;
      next(err);
    }
    User.findOneAndUpdate({ _id: id }, { genres: genres }, { new: true })
      .then(user => res.json(user.serialize()))
      .catch(err => {
        return next(err);
      });
  } else if (movies) {
    if (!movies.length) {
      let err = new Error('Please select at least 1 movie');
      err.status = 400;
      next(err);
    }
    User.findByIdAndUpdate({ _id: id }, { movies: movies }, { new: true })
      .then(user => {
        updatedUser = user.serialize();
        return Movie.updateMany(
          { _id: { $in: movies } },
          { $push: { users: id } },
          { new: true }
        );
      })
      .then(() => res.json(updatedUser))
      .catch(err => {
        return next(err);
      });
  } else {
    return next();
  }
});

router.get('/', (req, res, next) => {
  //Query Movie database for all the matching movies
  //Create dictionary of user id's
  //if userId appears more than 55% of the time capture User
  //(userIdDictionary[movies[i].users[j]] < proportion)

  let userIdDictionary = {};
  let ourMatches = [];

  let movies;
  let _user;
  let sortedIds;
  const { id } = req.user;
  User.findById(id)
    .populate({ path: 'matched._id', select: 'username' })
    .then(user => {
      _user = user;
      movies = user.movies;
      return Movie.find({ _id: { $in: movies } }, { _id: 0, users: 1 });
    })
    .then(movies => {
      for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].users.length; j++) {
          if (!userIdDictionary[movies[i].users[j]]) {
            userIdDictionary[movies[i].users[j]] = 1;
          } else {
            userIdDictionary[movies[i].users[j]]++;
          }
        }
      }

      for (let id in userIdDictionary) {
        if (
          id !== req.user.id &&
					!_user.matched.find(userId => userId._id._id.toString() === id) &&
					!_user.ignored.find(userId => userId.toString() === id) &&
					!_user.whoUserPopcorned.find(userId => userId.toString() === id)
        ) {
          ourMatches.push({ id, count: userIdDictionary[id] });
        }
      }

      let sortedObj = ourMatches.sort((user1, user2) => {
        if (user1.count > user2.count) {
          return -1;
        } else if (user1.count < user2.count) {
          return 1;
        }
        if (user1.id < user2.id) {
          return -1;
        } else if (user1.id > user2.id) {
          return 1;
        }
        return 0;
      });

      sortedIds = sortedObj.map(obj => obj.id);
      for (let i = 0; i < _user.ignored.length; i++) {
        sortedIds.push(_user.ignored[i].toString());
      }

      return User.find({ _id: { $in: sortedIds } }).populate({
        path: 'movies',
        select: 'title poster imdbID'
      });
    })
    .then(users => {
      let serializedUser = users.map(user => user.serialize());
      let response = [];
      for (let i = 0; i < sortedIds.length; i++) {
        let currentUser = serializedUser.find(
          user => user.id.toString() === sortedIds[i]
        );
        if (currentUser) {
          response.push(currentUser);
        }
      }
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = { router };
