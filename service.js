'use strict';

var R = require('ramda');
var randomizeArray = require('secret-santa-shuffler');
var fs = require('fs');
var path = require('path');

var mail = require('./modules/mail');
var logger = require('./modules/logger');
var templater = require('./modules/templater');

var convertCsvToObj = R.compose(R.fromPairs, R.tail, R.map(R.compose(R.reverse, R.map(R.trim))), R.map(R.split(',')),R.split('\n'));
var getMails = R.compose(R.map(R.prop(0)),R.toPairs);
var prepeareForTemplater = function(originalList){
  return R.compose(R.map(function(item){
    item[1] = originalList[item[1]] + ' ' + '(' + item[1] + ')';
    return item;
  }));
}

module.exports = function(fileName, options){
  
  var list = fs.readFileSync(path.resolve(fileName)).toString();
  
  var mailingObject = convertCsvToObj(list);
  var mailList = getMails(mailingObject);
  var prepearedtForTemplater = prepeareForTemplater(mailingObject)(randomizeArray(mailList));
  var compiledMail = mail(options);
  
  return templater(prepearedtForTemplater).then(compiledMail).catch(logger.error);
}

