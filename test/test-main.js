'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app } = require('../server');
const { User } = require('../users');
const { Movie } = require('../movies/models');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { users, movies } = require('./testSeedData');
const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Main Endpoint', function () {

  let user;
  let token;

  before(function () {
    return mongoose.connect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  after(function () {
    return mongoose.disconnect();
  });

  beforeEach(function () {
    return Promise.all([
      User.insertMany(users),
      Movie.insertMany(movies)
    ])
      .then(([users]) => {
        user = users[0];
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, {subject: user.username});
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  describe.only('/api/main', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .get('/api/main')
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });

    it('Should reject requests with an invalid token', function () {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email
        },
        'wrongSecret',
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );

      return chai
        .request(app)
        .get('/api/main')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an expired token', function () {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email
          },
          exp: -10 // Expired ten seconds ago
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: user.username
        }
      );

      return chai
        .request(app)
        .get('/api/main')
        .set('authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });
    it('Should send matched users', function () {
      return chai
        .request(app)
        .get('/api/main')
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          res.body.forEach(function (user) {
            expect(user).to.be.an('object');
            expect(user).to.include.all.keys(
              'username',
              'movies',
              'genres'
            );
            expect(user.movies).to.be.an('array');
            expect(user.movies).to.have.lengthOf(3);
            user.movies.forEach(function (movie) {
              expect(movie).to.include.all.keys(
                'title',
                'poster',
                'imdbID'
              );
            });
          });
        });
    });
  });
});
