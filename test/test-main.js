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
        token = jwt.sign({ user: { username: user.username, id: user._id, email: user.email } }, JWT_SECRET, { subject: user.username });
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  describe('/api/main', function () {
    describe('GET /api/main', function() {

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
    describe('PUT api/main', function () {
      it('should throw error if more than 3 genres', function () {
        return chai
          .request(app)
          .put(`/api/main/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ genres: ['Horror', 'Comedy', 'Action & Adventure', 'International'] })
          .then(function (res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Please only select 3 genres');
          });
      });
      it('should throw error if no genre is selected', function () {
        return chai
          .request(app)
          .put(`/api/main/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ genres: [] })
          .then(function (res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Please select at least 1 genre');
          });
      });
      it('should return user with updated genres', function () {
        const genres = ['Horror', 'Comedy', 'Action & Adventure'];
        return chai
          .request(app)
          .put(`/api/main/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ genres })
          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.genres).to.deep.equal(genres);
            expect(res.body).to.include.all.keys(
              'username',
              'genres',
              'movies'
            );
          });
      });
      it('should give an error if no movies selected', function () {
        const movies = [];
        return chai
          .request(app)
          .put(`/api/main/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ movies })
          .then(function (res) {
            expect(res).to.have.status(400);
            expect(res.body.message).to.equal('Please select at least 1 movie');
          });
      });
      it('should return user with updated movies', function () {
        const movies = ['333333333333333333333304'];
        return chai
          .request(app)
          .put(`/api/main/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ movies })
          .then(function (res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.movies).to.deep.equal(movies);
            expect(res.body).to.include.all.keys(
              'username',
              'genres',
              'movies'
            );
            return Movie.findOne({ _id: movies[0] })
          })
          .then((movie) => {
            expect(movie.title).to.equal('Pan\'s Labyrinth (2006)');
            expect(movie.poster).to.equal('https://m.media-amazon.com/images/M/MV5BMTU3ODg2NjQ5NF5BMl5BanBnXkFtZTcwMDEwODgzMQ@@._V1_SX300.jpg');
            expect(movie.genre).to.equal('Horror');
            expect(movie.users).to.deep.equal([user._id]);
          });
      });
      it('should give an error if genre and movies are not sent', function () {
        return chai
          .request(app)
          .put(`/api/main/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({})
          .then(function (res) {
            expect(res).to.have.status(404);
          });
      });
    });
  });
});
