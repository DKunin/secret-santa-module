'use strict';

var fs = require('fs');
try {fs.mkdirSync('logs');} catch(err) {}

var development = process.env.NODE_ENV !== 'production';
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'logs/app.log' })
  ]
});

logger.add(winston.transports.Console, {
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false,
  level: (development?'verbose':'error')
});

module.exports = logger;