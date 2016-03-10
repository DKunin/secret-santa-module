'use strict';

var R = require('ramda');
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
    var saveOpts = R.merge(mailOptionsDef, opts);
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
        if (!options) {
            options = { auth: {} };
        }
        var auth = options;
        var transporter = nodemailer.createTransport(mg(auth));
        R.forEach(function(letter) {
            logger.info({ to: letter.giver, html: letter.string });
            sendTheMail({ to: letter.giver, html: letter.string }, transporter);
        })(santasArray);
    };
};

module.exports = mail;
