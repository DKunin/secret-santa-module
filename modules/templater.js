'use strict';

var DEFAULT_TEMPLATE = 'div You should prepare a present for: \n div= to';
var jade = require('jade');
var R = require('ramda');

var prepeareArray = R.map(function(item) {
    return { giver: item[0], to: item[1] };
});

module.exports = function templater(options, array) {
    var jadeCompileFunction = jade.compile(options.template ? options.template : DEFAULT_TEMPLATE, {});
    var processJadeWithOriginal = function(ob) {
        return { giver: ob.giver, string: jadeCompileFunction(ob) };
    };

    var processArrayToTemplates = R.compose(R.map(processJadeWithOriginal), prepeareArray);

    return new Promise(function(resolve, reject) {
        Promise.all(processArrayToTemplates(array)).then(resolve).catch(reject);
    });
};
