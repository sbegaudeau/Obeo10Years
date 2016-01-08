'use strict'

var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.mongodb.url);

var express = require('express');
var app = express();

var compression = require('compression');
var bodyParser = require('body-parser');

app.use(compression());
app.use(bodyParser.json());

app.use('/api/v1.0', require('./results/router'));
app.use('/api/v1.0', require('./activities/router'))

let oneDay = 86400000;
app.use('/', express.static(__dirname + '/public', { maxAge: oneDay }));

app.use(require('./errors/not-found'));

app.listen(config.express.port, (error) => {
  if (error) {
    console.log(error);
    process.exit(10);
  }
  console.log('express is listening on the port ' + config.express.port);
});
