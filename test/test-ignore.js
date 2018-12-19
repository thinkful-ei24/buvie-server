'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { app } = require('../server');
const { User } = require('../users');
const { Movie } = require('../movies/models');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');
const { movies } = require('./testSeedData');
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
    whoUserPopcorned: ['000000000000000000000002']
  },
  {
    _id: '000000000000000000000002',
    username: 'usernameB',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'exampleB@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333302', '333333333333333333333305', '333333333333333333333310'],
    popcorned: ['000000000000000000000001']
  }
];

describe('Ignore Endpoint', function() {

  let user;
  let token;

  before(function() {
    return mongoose.connect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  after(function() {
    return mongoose.disconnect();
  });

  beforeEach(function() {
    return Promise.all([
      User.insertMany(users),
      Movie.insertMany(movies)
    ])
      .then(([users]) => {
        user = users.find(user => user.username === 'usernameB');
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function() {
    return mongoose.connection.db.dropDatabase();
  });

  describe('/api/main/ignore', function() {
    describe('PUT /api/ignore', function() {
      const reqBody = { userId: '000000000000000000000001' };
      it('Should reject requests with no credentials', function() {
        return chai
          .request(app)
          .put(`/api/main/ignore/${user._id}`)
          .send(reqBody)
          .then((res) => {
            expect(res).to.have.status(401);
          });
      });

      it('Should reject requests with an invalid token', function() {
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
          .put(`/api/main/ignore/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(reqBody)
          .then((res) => {
            expect(res).to.have.status(401);
          });
      });
      it('Should reject requests with an expired token', function() {
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
          .put(`/api/main/ignore/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(reqBody)
          .then((res) => {
            expect(res).to.have.status(401);
          });
      });
      it('Should send ignore user', function() {
        return chai
          .request(app)
          .put(`/api/main/ignore/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send(reqBody)
          .then(res => {
            expect(res).to.have.status(204);
            return User.findOne({ _id: user._id });
          })
          .then(_user => {
            expect(_user.ignored).to.include('000000000000000000000001');
            expect(_user.popcorned).to.not.include('000000000000000000000001');
            return User.findOne({ _id: '000000000000000000000001' });
          })
          .then(_user => {
            expect(_user.whoUserPopcorned).to.not.include(user._id);
          });
      });
    });
    describe('PUT api/main/ignored/nevermind', function() {
      const reqBody = { userId: '000000000000000000000002' };
      it('Should send never mind user', function() {
        token = jwt.sign({
          user: {
            username: 'username', id: '000000000000000000000001', email: 'example@email.com'
          }
        }, JWT_SECRET, { subject: 'username' });
        return chai
          .request(app)
          .put('/api/main/ignore/nevermind/000000000000000000000001')
          .set('Authorization', `Bearer ${token}`)
          .send(reqBody)
          .then(res => {
            expect(res).to.have.status(204);
            return User.findOne({ _id: user._id });
          })
          .then(_user => {
            expect(_user.popcorned).to.not.include('000000000000000000000001');
            return User.findOne({ _id: '000000000000000000000001' });
          })
          .then(_user => {
            expect(_user.whoUserPopcorned).to.not.include(user._id);
          });
      });
    });
  });
});
