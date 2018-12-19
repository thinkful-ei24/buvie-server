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
const { users, movies, conversations } = require('./testSeedData');
const expect = chai.expect;

// This lets us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Conversation Endpoint', function () {

  let user;
  let token;
  let conversation;

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
      Conversation.insertMany(conversations)
    ])
      .then(([users, conversations]) => {
        user = users[0];
        conversation = conversations[0];
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  describe('/api/messages', function () {
    describe('GET /api/messages', function () {
      it('Should reject requests with no credentials', function () {
        return chai
          .request(app)
          .get(`/api/messages/${conversation._id}`)
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
          .get(`/api/messages/${conversation._id}`)
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
          .get(`/api/messages/${conversation._id}`)
          .set('authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(401);
          });
      });
      it('should give an error if user is not a part of the conversation', function () {
        const token = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: '000000000000000000000111'
            },
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: user.username,
            expiresIn: '7d'
          }
        );
        return chai
          .request(app)
          .get(`/api/messages/${conversation._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal('You do not have access to this conversation');
          });
      });
      it('should return a conversation object', function () {
        return chai
          .request(app)
          .get(`/api/messages/${conversation._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.all.keys(
              'chatroom',
              '_id',
              'messages'
            );
            res.body.messages.forEach(function (message) {
              expect(message).to.be.an('object');
              expect(message).to.include.all.keys(
                '_id',
                'message',
                'handle',
                'room'
              );
            });
          });
      });
    });
    describe('PUT /api/messages', function () {
      it('should return a conversation object', function () {
        const messages = [
          {
            message: 'hello',
            handle: 'username',
            room: `${conversation._id}`
          },
          {
            message: 'hey',
            handle: 'usernameB',
            room: `${conversation._id}`
          },
          {
            message: 'want to watch a movie?',
            handle: 'username',
            room: `${conversation._id}`
          }
        ];
        return chai
          .request(app)
          .put(`/api/messages/${conversation._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ messages })
          .then((res) => {
            expect(res).to.have.status(204);
            return Conversation.findOne({ _id: conversation._id });
          })
          .then(res => {
            expect(res).to.be.an('object');
            expect(res.messages).to.have.lengthOf(messages.length);
          });
      });
      it('should give an error if user is not a part of the conversation', function () {
        const messages = [
          {
            message: 'hello',
            handle: 'username',
            room: `${conversation._id}`
          },
          {
            message: 'hey',
            handle: 'usernameB',
            room: `${conversation._id}`
          },
          {
            message: 'want to watch a movie?',
            handle: 'username',
            room: `${conversation._id}`
          }
        ];
        const token = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: '000000000000000000000111'
            },
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: user.username,
            expiresIn: '7d'
          }
        );
        return chai
          .request(app)
          .put(`/api/messages/${conversation._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ messages })
          .then((res) => {
            expect(res).to.have.status(401);
            expect(res.body.message).to.equal('You do not have access to this conversation');
          });
      });
    });
  });
});
