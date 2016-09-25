/**
 * authRequest.js
 * Checks the user authentification token to grant access
 * to the full API.
 *
 */

import jwt from 'jwt-simple';
import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import config from './../modules/config';
import dbModels from './../models/DBModels';

/**
 * Check the user token and authorize the connection if the token is valid.
 * @param {Object} req The function request.
 * @param {Object} res The function result.
 * @param {Object} next Next method.
 * @return {Object} obj Object.
 */
function authorize(req, res, next) {
  var formatedMessage = 'New incoming request: ' + req.method + ': ' + req.url;
  logger.request(formatedMessage);

  var token = (req.body && req.body.token) || req.headers['login-token'];
  var username = (req.body && req.body.username) || req.headers['login-name'];

  if (token && username) {
    try {
      var decoded = jwt.decode(token, config.Config.auth.secret);

      if (decoded.exp <= Date.now())
        return httpCode.console.error400('Token expired.');

      // get user
      dbModels.UserModel.one({username: username}, (err, user) => {
        if (err)
          return httpCode.error500('Internal error');

        if (user) {
          logger.info('user found');
          next();
        } else {
          logger.info('user not found');
          return httpCode.error401('Invalid credentials');
        }
      });
    } catch (error) {
      return httpCode.error500(res, "Oops, something went wrong");
    }
  } else {
    return httpCode.error401(res, "Invalid token or key.");
  }
}

export default authorize;
