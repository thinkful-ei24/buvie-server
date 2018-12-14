'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const GeoSchema = mongoose.Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    default: ''
  },
  genres: [
    {
      type: String
    }
  ],
  location: {
    type: Object,
    default: {}
  },
  geometry: GeoSchema,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  popcorned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matched: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      chatroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
    }
  ],
  ignored: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  whoUserPopcorned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  profilePicture: { type: String },
  notifications: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notificationType: String,
      date: { type: Date, default: Date.now }
    }
  ],
  notificationCheck: {
    type: Date,
    default: Date.now
  }
});

UserSchema.index({ googleId: 1, username: 1 }, { unique: true });

UserSchema.methods.serialize = function() {
  return {
    id: this._id || '',
    username: this.username || '',
    email: this.email || '',
    genres: this.genres || '',
    movies: this.movies || '',
    popcorned: this.popcorned || [],
    matched: this.matched || [],
    profilePicture: this.profilePicture || '',
    location: this.location || {}
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
