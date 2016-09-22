/**
 * logger.js
 * Custom logger using winstonjs library.
 *
 */

import winston from 'winston';

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true
    }),
    new (winston.transports.File)({
      filename: 'domothink-api.log'
    })
  ],
  levels: winston.config.syslog.levels,
  colors: {
    info: 'green',
    warning: 'yellow',
    error: 'red',
    debug: 'blue',
    notice: 'cyan',
    request: 'gray'
  }
});

export default logger;
