/**
 * users.js
 * Define the methods to manage the users.
 *
 */

import dbModels from './../models/DBModels';
import logger from './../modules/logger';

class Users {

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
