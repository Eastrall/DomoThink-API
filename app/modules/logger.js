/**
 * logger.js
 * Custom logger using winstonjs library.
 *
 */

import winston from 'winston';

const loggerLevels = {
  error: 0,
  warning: 1,
  info: 2,
  notice: 3,
  request: 4,
  debug: 5
};

const loggerColors = {
  error: 'red',
  warning: 'yellow',
  info: 'green',
  notice: 'cyan',
  request: 'gray',
  debug: 'blue'
};

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
      colorize: true
    }),
    new (winston.transports.File)({
      filename: 'domothink-api.log'
    })
  ],
  levels: loggerLevels,
  colors: loggerColors
});

export default logger;
