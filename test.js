'use strict';

var santaModule = require('./index');
var path = require('path');
var fs = require('fs');
var list = fs.readFileSync(path.resolve('./test-list.csv')).toString();

var auth = {
    api_key: null,
    domain: null
};

santaModule(list, {
    auth: auth,
    debug: false,
    template: '<div><h2>Custom template!</h2><div>You should prepeare for <h3>{%=o.to%}</h3></div></div>'
}).then(console.log);
