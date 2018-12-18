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

// This lets us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe.only('Movie Endpoint', function () {

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
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  describe('/api/movies', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .get('/api/movies')
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
        .get('/api/movies')
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
        .get('/api/movies')
        .set('authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });
    it('should return an array of movies', function() {
      return chai
        .request(app)
        .get('/api/movies')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(user.genres.length*5);
          res.body.forEach(function(movie) {
            expect(movie).to.include.all.keys(
              'title',
              'poster',
              'imdbID',
              'genre'
            );
            expect(user.genres).to.include(movie.genre);
          });
        });
    });
  });
});
