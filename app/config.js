'use strict'

var config = {};

var PRODUCTION = process.env.NODE_ENV === 'production';

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '127.0.0.1'
};

config.mongodb = {
  port: process.env.MONGODB_PORT || 27017,
  host: process.env.MONGODB_HOST || 'localhost',
  path: process.env.MONGODB_HOST || 'test'
};

if (PRODUCTION) {
  config.express.ip = '0.0.0.0';
}

module.exports = config;
