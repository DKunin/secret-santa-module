'use strict';

var R = require('ramda');
var jade = require('jade');
var prepeareArray = R.map(function(item){return { giver:item[0], to:item[1] };});

var fn = jade.compile('div You should prepare a present for: \n div= to', {});

var processJadeWithOriginal = function(ob){return { giver: ob.giver, string: fn(ob)};};
var processArrayToTemplates = R.compose(R.map(processJadeWithOriginal), prepeareArray);
function templater(array){
  return new Promise(function(resolve, reject){
    Promise.all(processArrayToTemplates(array)).then(resolve).catch(reject);
  });
}

module.exports = templater;