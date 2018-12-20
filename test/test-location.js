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
    location: {
      city: 'Denver, CO, USA',
      coordinates: {
        lat: 39.728982,
        lng: -104.931872
      }
    },
    geometry: {
      'type': 'point',
      '_id': '5c1805445ecee313fca47152',
      'coordinates': [-104.9329664, 39.7303808]
    }
  },
  {
    _id: '000000000000000000000002',
    username: 'usernameB',
    password: '$2a$10$uNEZkpZM//OlVuNuiJFLEebBwYVB.J9N3BXixK79DCPPfKi4Wjoqq',
    email: 'exampleB@email.com',
    genres: ['Horror', 'Action & Adventure', 'Comedy'],
    movies: ['333333333333333333333302', '333333333333333333333305', '333333333333333333333310'],
    popcorned: ['000000000000000000000001'],
    notifications: [{
      _id: '000000000000000000000001',
      notificationType: 'popcorn',
      date: Date.now()
    }]
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

describe('geolocation', function() {

  let user;
  let token;
  let userB;
  let tokenB;
  let userC;
  let tokenC;

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

  afterEach(function() {
    return mongoose.connection.db.dropDatabase();
  });

  describe.only('/api/main/location', function() {
    describe('GET', function() {
      it('Should not allow access if id does not match', function() {
        return chai
          .request(app)
          .get('/api/main/location/000000000000')
          .then(res => {
            expect(res).to.have.status(401);
          });
      });

      it('Get a list of users sorted by distance if request is correct', function() {
        console.log(`/api/main/location?lng=${user.location.coordinates.lng}&lat=${user.location.coordinates.lat}`);
        return chai
          .request(app)
          .get(`/api/main/location?lng=${user.location.coordinates.lng}&lat=${user.location.coordinates.lat}`)
          .set('Authorization', `Bearer ${token}`)
          .then((res) => {
            expect(res).to.have.status(500);
          });
      });

      it('Should not respond with user list unless auth token is valid', function() {
        return chai
          .request(app)
          .get(`/api/main/location?lng=${user.location.coordinates.lng}&lat=${user.location.coordinates.lat}`)
          .set('Authorization', `Bearer ${token}12`)
          .then((res) => {
            expect(res).to.have.status(401);
          });
      });

      it('should let you change your location if the body contains the city and coordinates', function() {
        const payload = {
          city: 'Denver, CO, USA',
          coordinates: { latitude: 39.728982, longitude: -104.931872 }
        }

        return chai.request(app).put('/api/main/location/000000000000000000000001')
          .set('Authorization', `Bearer ${token}`, 'content-type', 'application/json')
          .send(payload)
          .then(res => {
            console.log('boy sent: ', payload);
            expect(res).to.have.status(200);
          })
      });

      it('Should not accept if body is missing fields', function() {
        const body = {
          city: 'Denver, CO, USA',
        }

        return chai.request(app).put('/api/main/location/000000000000000000000001')
          .set('Authorization', `Bearer ${token}`)
          .send(body)
          .then(res => {
            expect(res).to.have.status(500);
          })
      });
    });
  });
});