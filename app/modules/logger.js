// logger.js

var winston = require('winston');

// Create the logger instance
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true
    }),
    new (winston.transports.File)({
      filename: 'somefile.log'
    })
  ],
  levels: winston.config.syslog.levels,
  colors: {
    info: 'green',
    warning: 'yellow',
    error: 'red',
    debug: 'blue',
    notice: 'cyan'
  }
});

module.exports = logger;
