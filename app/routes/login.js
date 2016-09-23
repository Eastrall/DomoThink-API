/**
 * login.js
 * Handles the login connections.
 *
 */

 import logger from './../modules/logger';
 import httpError from './../modules/httpError';
 import dbModels from './../models/DBModels';

 class Login {

   login(req, res) {
     var username = req.body.login || '';
     var password = req.body.password || '';

     if (username === '' || password === '')
       return httpError.error401(res, "Invalid credentials");

     dbModels.UserModel.one(
       {username: username, password: password}, function(err, result) {
         if (err)
           return httpError.error401(res, 'Error');

         if (!result || Object.keys(result).length === 0) {
           logger.warning('Cannot find user "' + username + '" in database.');
           return httpError.error401(res, 'not found');
         }

         logger.notice('User "' + username + '" found.');
         return httpError.error401(res, 'found');
       });
   }

   validate(username, password) {
     return true;
   }
}

 const login = new Login();

 export default login;
