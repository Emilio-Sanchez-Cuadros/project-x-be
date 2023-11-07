'use strict';

const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    uniqueCaseInsensitive: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    match: [/^([a-z0-9_.-]){3,64}$/, 'Username is not valid. Please use only small letters']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [
      'admin',
      'student',
      'professor',
    ],
    required: true
  },
  email: {
    type: String,
    uniqueCaseInsensitive: true,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
    required: true
  },
  additionalInfo: {
    type: String,
    description: 'Additional info about the user, edited by operator, shown to user'
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
  },
  userAttachments: {
    type: [{
      fileId: {
        type: String
      },
      description: {
        type: String
      },
      uploadDate: {
        type: Date
      }
    }],
    default: []
  },
  // Model references below
  createdByUser: {
    // Users created by other user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
  }
}, {
  timestamps: true
});

User.set('toObject', { virtuals: true });
User.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', User);
