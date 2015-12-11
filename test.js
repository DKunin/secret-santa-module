'use strict';

var santaModule = require('./index');

var auth = {
  api_key: null,
  domain: null
};

santaModule('./test-list.csv', {auth:auth, debug:true});
  