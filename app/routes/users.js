/**
 * users.js
 * Define the methods to manage the users.
 *
 */

import logger from './../modules/logger';

class Users {
  getAllUsers(req, res) {
    logger.notice('getAllUsers');
    res.send("Asking for all users.");
  }

  getUser(req, res) {
    var id = req.params.id;

    logger.notice('getUser');
    res.send("Asking for user: " + id);
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
