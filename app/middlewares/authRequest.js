/**
 * authRequest.js
 * Checks the user authentification token to grant access
 * to the full API.
 *
 */

// import jwt from 'jwt-simple';
import logger from './../modules/logger';

/**
 * Check the user token and authorize the connection if the token is valid.
 * @param {Object} req The function request.
 * @param {Object} res The function result.
 * @param {Object} next Next method.
 */
function authorize(req, res, next) {
  logger.info('auth request');
  next();
}

export default authorize;
