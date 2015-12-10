'use strict';
let fs = require('fs');
try {fs.mkdirSync('logs');} catch(err) {}

const development = process.env.NODE_ENV !== 'production';
let winston = require('winston');

let logger = new (winston.Logger)({
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

export default logger;