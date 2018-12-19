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
    popcorned: ['000000000000000000000002']
  },
  {
    _id: '000000000000000000000002',
    username: 'usernameB',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'exampleB@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333302', '333333333333333333333305', '333333333333333333333310'],
    whoUserPopcorned: ['000000000000000000000001']
  },
  {
    _id: '000000000000000000000003',
    username: 'usernameC',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'exampleC@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333302', '333333333333333333333305', '333333333333333333333312']
  }
];

describe('Popcorn Endpoint', function () {

  let user;
  let token;
  let userB;
  let tokenB;
  let userC;
  let tokenC;

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
      Movie.insertMany(movies),
      Conversation.insertMany(conversations)
    ])
      .then(([users]) => {
        user = users.find(user => user.username === 'username');
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, { subject: user.username });
        userB = users.find(user => user.username === 'usernameB');
        tokenB = jwt.sign({ user: { username: userB.username, id: userB._id, email: userB.email } }, JWT_SECRET, { subject: userB.username });
        userC = users.find(user => user.username === 'usernameC');
        tokenC = jwt.sign({ user: { username: userC.username, id: userC._id, email: userC.email } }, JWT_SECRET, { subject: userC.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  describe.only('/api/main/popcorn', function () {
    describe('GET api/main/popcorn', function () {

      it('Should reject requests with no credentials', function () {
        return chai
          .request(app)
          .get(`/api/main/popcorn/${user._id}`)
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
          .get(`/api/main/popcorn/${user._id}`)
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
          .get(`/api/main/popcorn/${user._id}`)
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
          .get(`/api/main/popcorn/${user._id}`)
          .set('authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal('Hold up sir that is not your id');
          });
      });
      it('should return popcorns', function () {
        return chai
          .request(app)
          .get(`/api/main/popcorn/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.popcorned).to.have.lengthOf(1);
            res.body.popcorned.forEach(function (poppedUser) {
              expect(poppedUser).to.have.all.keys(
                '_id',
                'username'
              );
            });
            expect(res.body.popcorned[0]._id).to.equal('000000000000000000000002');
            expect(res.body.popcorned[0].username).to.equal('usernameB');
            expect(res.body.pendingPopcorn).to.deep.equal([]);
          });
      });
    });
    describe('PUT /api/popcorn', function () {
      it('should add popcorn if new popcorn', function () {
        const body = {
          userId: '000000000000000000000002'
        };
        return chai
          .request(app)
          .put('/api/main/popcorn')
          .set('Authorization', `Bearer ${tokenC}`)
          .send(body)
          .then((res) => {
            expect(res).to.have.status(204);
            return User.findOne({ _id: userC._id });
          })
          .then((_user) => {
            expect(_user.whoUserPopcorned).to.include(userB._id);
            return User.findOne({ _id: userB._id });
          })
          .then((_user) => {
            expect(_user.popcorned).to.include(userC._id);
            expect(_user.notifications.find(note => note._id.toString() === userC._id.toString() && note.notificationType === 'popcorn')).to.exist;
          });
      });
      // it('should match if mutual popcorn', function () {
      //   const body = {
      //     userId: userC._id
      //   };
      //   const bodyA = {
      //     userId: user._id
      //   };
      //   let matchedId;
      //   return chai
      //     .request(app)
      //     .put('/api/main/popcorn')
      //     .set('Authorization', `Bearer ${token}`)
      //     .send(body)
      //     .then(function(res) {
      //       expect(res).to.have.status(204);
      //       return chai
      //         .request(app)
      //         .put('/api/main/popcorn')
      //         .set('Authorization', `Bearer ${tokenC}`)
      //         .send(bodyA);
      //     })
      //     .then(function(res) {
      //       expect(res).to.have.status(204);
      //       return User.findOne({ _id: userC._id});
      //     })
      //     .then(function(_user) {
      //       console.log(_user);
      //       expect(_user.popcorned).to.not.include(user._id);
      //       expect(_user.matched.find(matchedUser => matchedUser._id.toString() === user._id.toString())).to.exist;
      //       expect(_user.notifications.find(note => note._id.toString() === user._id.toString() && note.notificationType === 'matched')).to.exist;
      //       return User.findOne({ _id: user._id });
      //     })
      //     .then((_user) => {
      //       console.log(_user);
      //       matchedId = _user.matched.find(matchedUser => matchedUser._id.toString() === userC._id.toString()).chatroom;
      //       expect(_user.whoUserPopcorned).to.not.include(userC._id.toString());
      //       expect(_user.matched.find(matchedUser => matchedUser._id.toString() === userC._id.toString())).to.exist;
      //       expect(_user.notifications.find(note => note._id.toString() === userC._id.toString() && note.notificationType === 'matched')).to.exist;
      //     });
      // });
      it('should re-popcorn on re-popcorn', function () {
        const body = {
          userId: '000000000000000000000001'
        };
        return chai
          .request(app)
          .put('/api/main/popcorn')
          .set('Authorization', `Bearer ${tokenB}`)
          .send(body)
          .then((res) => {
            expect(res).to.have.status(204);
            return User.findOne({ _id: user._id });
          })
          .then((_user) => {
            expect(_user.notifications.find(note => note._id.toString() === userB._id.toString() && note.notificationType === 're-popcorn')).to.exist;
          });
      });
    });
  });
});
