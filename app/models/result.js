'use strict'

var mongoose = require('mongoose');

var resultSchema = mongoose.Schema({
    activity: {
      type: String,
      enum: ['mario', 'cocktail', 'lego', 'robots', 'babyfoot']
    },
    team: {
      type: String,
      enum: ['starwars', 'matrix', 'bttf', 'himym', 'got'],
    },
    score: {
      type: Number,
      min: 0,
      max: 20
    }
}, {timestamps: true});

var Result = mongoose.model('Result', resultSchema);

module.exports = Result;
