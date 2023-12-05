'use strict';

const mongoose = require('mongoose');

const UserProfile = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15
  },
  firstname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  lastname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  history: {
    type: [{
      time: {
        type: Date
      },
      status: {
        type: String,
        trim: true
      },
      event: String,
      description: String
    }],
    default: []
  }
}, {
  timestamps: true
});

UserProfile.set('toObject', { virtuals: true });
UserProfile.set('toJSON', { virtuals: true });

module.exports = mongoose.model('UserProfile', UserProfile);
