'use strict';

import logger from './logger.es6';
import nodemailer from 'nodemailer';
import nconf from 'nconf';
import R from 'ramda';

nconf.argv()
     .file({ file: 'config/default.json' })
     .env();

let transporter = nodemailer.createTransport('SMTP',  {
   service: 'Mailgun',
   auth: nconf.get('mailgun')
});

let mailOptionsDef = {
  from: 'secret@santa.com', 
  to: '', 
  subject: 'Secret Santa',
  html: ''
};

let sendTheMail = function(opts = mailOptionsDef){
  let saveOpts = R.merge(mailOptionsDef, opts);
  transporter.sendMail(saveOpts, function(error, info){
      if(error){
        logger.error(error);
        setTimeout(function(){
          sendTheMail(saveOpts);
        },3000);
      } else {
        logger.info('Message sent: ');
        logger.info(info);
      }
  });
};

let mail = function(santasArray){
  R.forEach(function(letter){
    sendTheMail({to: letter.giver.email, html: letter.string});
  })(santasArray);
};

export default mail;