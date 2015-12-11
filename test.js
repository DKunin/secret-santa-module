'use strict';

var santaModule = require('./index');

var auth = {
  api_key: null,
  domain: null
};

santaModule('./list.csv', {auth:auth});
  