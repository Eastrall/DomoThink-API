/**
 * users.js
 * Define the methods to manage the users.
 *
 */

import logger from './../modules/logger';
import dbModels from './../models/DBModels';
import httpCode from './../modules/httpCode';
var assign = require('object.assign/polyfill')();

class Users {

  /**
   * Change password route. Allows the user to change it's password.
   *
   * @param {object} req The request data.
   * @param {object} res The request result.
   * @return {httpCode} code The http code.
   */
  changePassword(req, res) {
    if (req.body.newPassword !== req.body.confirmPassword) {
      return httpCode.error400(res, "Passwords do not match");
    }
    dbModels.UserModel.one({userId: req.body.userId, password: req.body.oldPassword}, (err, user) => {
      if (err) {
        return httpCode.error500(res, "Impossible to get user");
      } else if (!user) {
        return httpCode.error404(res, 'User not found');
      }
      user.save({password: req.body.newPassword}, err => {
        return (err ?
          httpCode.error500(res, 'Error: Could not update password') :
          httpCode.success(res, "Password updated !")
        );
      });
    });
  }

  /**
   * Change password route. Allows the user to change it's password.
   *
   * @param {object} req The request data.
   * @param {object} res The request result.
   */
  createAccount(req, res) {
    dbModels.UserModel.one({username: req.body.login}, (err, user) => {
      if (err)
        return httpCode.error500(res, 'Unable to create account');
      else if (user)
        return httpCode.error403(res, 'This e-mail adress is already beeing used');
      else if (req.body.password !== req.body.confirmPassword)
        return httpCode.error400(res, 'Passwords do not match');
      dbModels.UserModel.create(assign({}, req.body, {username: req.body.login}), (err2, result) => {
        return (err2 ?
          httpCode.error404(res, 'Error: Unable to create account now. Try again later.') :
          httpCode.success(res, req.body.login + " account created !")
        );
      });
    });
  }

  getAllUsers(req, res) {
    logger.notice('getAllUsers');
    dbModels.UserModel.all((err, results) => {
      if (err)
        logger.error('An error occured while getting the data.');
      res.send(results);
    });
  }

  getUser(req, res) {
    logger.notice('getUser');
    var id = req.params.id;

    dbModels.UserModel.get(id, function(err, result) {
      if (err)
        logger.error('An error occured while getting the user data.');
      res.send(result);
    });
  }

  createUser(req, res) {
    logger.notice('createUser');
  }

  updateUser(req, res) {
    logger.notice('updateUser');
  }

  deleteUser(req, res) {
    logger.notice('deleteUser');
  }
}

const users = new Users();

export default users;
