'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app } = require('../server');
const { User } = require('../users');
const { Movie } = require('../movies/models');
const { Conversation } = require('../conversation/models');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { movies, conversations } = require('./testSeedData');
const expect = chai.expect;

// This lets us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

const users = [
  {
    _id: '000000000000000000000001',
    username: 'username',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'example@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333301', '333333333333333333333305', '333333333333333333333311'],
    whoUserPopcorned: ['000000000000000000000002'],
    matched: [{
      _id: '000000000000000000000002',
      chatroom: '222222222222222222222201'
    }]
  },
  {
    _id: '000000000000000000000002',
    username: 'usernameB',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'exampleB@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333302', '333333333333333333333305', '333333333333333333333310'],
    popcorned: ['000000000000000000000001'],
    matched: [{
      _id: '000000000000000000000001',
      chatroom: '222222222222222222222201'
    }]
  }
];

describe('Matches Endpoint', function () {

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
        user = users.find(user => user.username === 'usernameB');
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  describe('/api/main/matches', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .get(`/api/main/matches/${user._id}`)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });

    it('Should reject requests with an invalid token', function () {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          id: user._id
        },
        'wrongSecret',
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );

      return chai
        .request(app)
        .get(`/api/main/matches/${user._id}`)
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
            email: user.email,
            id: user._id
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
        .get(`/api/main/matches/${user._id}`)
        .set('authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with wrong id', function () {
      const token = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: '000000000000000000000111'
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: user.username
        }
      );

      return chai
        .request(app)
        .get(`/api/main/matches/${user._id}`)
        .set('authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(401);
          expect(res.body.message).to.equal('Hold up sir that is not your id');
        });
    });
    it('should return matches', function() {
      return chai
        .request(app)
        .get(`/api/main/matches/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.all.keys(
            '_id',
            'matched'
          );
          expect(res.body.matched).to.be.an('array');
          res.body.matched.forEach(function(match) {
            expect(match).to.include.all.keys(
              '_id',
              'chatroom'
            );
            expect(match._id).to.be.an('object');
            expect(match._id).to.include.all.keys(
              '_id',
              'username'
            );
          });
        });
    });
  });
});
