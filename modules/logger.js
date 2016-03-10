'use strict';

var winston = require('winston');
var fs = require('fs');

var LOG_DIR = './logs';

if ( !fs.existsSync( LOG_DIR ) ) {
    fs.mkdirSync( LOG_DIR );
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: LOG_DIR + '/app.log' })
    ]
});

logger.add(winston.transports.Console, {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: false,
    level: (process.env.NODE_ENV !== 'production' ? 'verbose' : 'error')
});

module.exports = logger;
