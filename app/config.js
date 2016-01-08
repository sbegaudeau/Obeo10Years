'use strict'

var config = {};

var PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
  port: process.env.PORT || 3000
};

config.mongodb = {
  url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/test'
};

if (PRODUCTION) {
  config.express.ip = '0.0.0.0';
}

module.exports = config;
