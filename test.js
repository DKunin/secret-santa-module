'use strict';

var santaModule = require('./index');
var fs = require('fs');
var path = require('path');

var list = fs.readFileSync(path.resolve('./test-list.csv')).toString();

var auth = {
    api_key: null,
    domain: null
};

santaModule(list, { auth: auth, debug: true, template: 'div Give your best to: \n div= to' });
  