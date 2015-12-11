'use strict';

import R from 'ramda';
import logger from './logger.es6';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
var mailOptionsDef = {
  from: 'secret@santa.com', 
  to: '', 
  subject: 'Secret Santa',
  html: ''
};

var sendTheMail = function(opts = mailOptionsDef, transporter){
  let saveOpts = R.merge(mailOptionsDef, opts);
  transporter.sendMail(saveOpts, function(error, info){
      if(error){
        logger.error(error);
        setTimeout(function(){
          sendTheMail(saveOpts, transporter);
        },3000);
      } else {
        logger.info('Message sent: ');
        logger.info(info);
      }
  });
};

var mail = function(options={auth: {}}){
  return function(santasArray) {
    var auth = options.auth
    var transporter = nodemailer.createTransport(mg(auth));
    R.forEach(function(letter){
      logger.info({to: letter.giver, html: letter.string});
      sendTheMail({to: 'whitemarten@gmail.com', html: letter.string}, transporter);
    })(santasArray);
  }
};

export default mail;