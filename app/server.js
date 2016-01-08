'use strict'

var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.mongodb.url);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/api/v1.0', require('./results/router'));
app.use('/api/v1.0', require('./activities/router'))

app.use('/', express.static(__dirname + '/public'));

app.use(require('./errors/not-found'));

app.listen(config.express.port, (error) => {
  if (error) {
    console.log(error);
    process.exit(10);
  }
  console.log('express is listening on the port ' + config.express.port);
});
