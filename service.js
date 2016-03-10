'use strict';

var neatCsv = require('neat-csv');
var mail = require('./modules/mail');
var logger = require('./modules/logger');
var templater = require('./modules/templater');
var randomizeArray = require('secret-santa-shuffler');

var prepeareForTemplater = function(originalList, newList) {
    return newList.map(function(item) {
        var santeeMail = item[1];
        var santee = originalList.find(function(singleSantee) {
            return singleSantee.email === santeeMail;
        });
        return [item[0], santee.name + ' ' + '(' + santeeMail + ')'];
    });
};

module.exports = function(list, options) {
    return new Promise(function(resolve, reject) {
        neatCsv(list, function(error, mailingObject) {
            if (error) {
                reject(error);
                return;
            }
            var mailList = mailingObject.map(function(singleObject) {
                return singleObject.email;
            });

            var prepearedtForTemplater = prepeareForTemplater(mailingObject, randomizeArray(mailList));
            var compiledMail = options.debug ? resolve : mail(options);
            templater(options, prepearedtForTemplater).then(compiledMail).then(resolve).catch(logger.error);
        });
    });
};
