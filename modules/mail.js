'use strict';

var logger = require('./logger');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

var mailOptionsDef = {
    from: 'secret@santa.com',
    to: '',
    subject: 'Secret Santa',
    html: ''
};

var sendTheMail = function(opts, transporter) {
    var saveOpts = Object.assign(mailOptionsDef, opts);
    transporter.sendMail(saveOpts, function(error, info) {
      if (error) {
          logger.error(error);
          setTimeout(function() {
              sendTheMail(saveOpts, transporter);
          }, 3000);
      } else {
          logger.info('Message sent: ');
          logger.info(info);
      }
  });
};

var mail = function(options) {
    return function(santasArray) {
        return new Promise(function(resolve) {
            if (!options) {
                options = { auth: {} };
            }
            var auth = options;
            var transporter = nodemailer.createTransport(mg(auth));
            var sendingAddresses = santasArray.map(function(letter) {
                var objectToProcess = { to: letter.giver, html: letter.string };
                sendTheMail(objectToProcess, transporter);
                return objectToProcess;
            });
            resolve(sendingAddresses);
        });
    };
};

module.exports = mail;
