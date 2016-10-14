/**
 * login.js
 * Handles the login connections.
 *
 */

import jwt from 'jwt-simple';
import logger from './../modules/logger';
import config from './../modules/config';
import httpCode from './../modules/httpCode';
import dbModels from './../models/DBModels';

class Login {

  /**
   * Login route. Process the user login.
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing result.
   * @return {object} errorCode The error code.
   */
  login(req, res) {
    var session = req.session;
    var username = req.body.login || '';
    var password = req.body.password || '';

    if (username === '' || password === '')
      return httpCode.error404(res, "Invalid credentials");

    dbModels.UserModel.one(
      {
        username: username,
        password: password
      },
        (err, result) => {
          if (err)
            return httpCode.error404(res, 'Database error.');

          if (!result || Object.keys(result).length === 0) {
            logger.warning('Cannot find user "' + username + '" in database.');
            return httpCode.error404(res, 'User not found.');
          }

          logger.notice('User "' + username + '" found.');
          session.username = username;
          return res.json({
            status: 200,
            token: generateToken(2, username),
            username: username,
            userId: result.userId
          });
        });
  }

  /**
   * Logout route. Process the user logout.
   *
   * @param {object} req The request data.
   * @param {object} res The request result.
   * @return {httpCode} code The http code.
   */
  logout(req, res) {
    req.session.username = "";
    req.session.destroy();
    return httpCode.success(res, 'logout success');
  }
}

/**
 * Generates an authentification token with the secret key and the
 * expiration time.
 *
 * @param {integer} expirationTime The token expiration time (in days).
 * @param {string} username The client username.
 * @return {object} token The generated token.
 */
function generateToken(expirationTime, username) {
   // Set the expiration time
  var date = new Date();
  date.setDate(date.getDate() + expirationTime);

   // Create the token
  var token = jwt.encode({
    exp: date,
    username: username
  }, config.Config.auth.secret);

  return token;
}

const login = new Login();
export default login;
