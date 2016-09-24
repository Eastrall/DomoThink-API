/**
 * login.js
 * Handles the login connections.
 *
 */

 import logger from './../modules/logger';
 import httpCode from './../modules/httpCode';
 import dbModels from './../models/DBModels';

 class Login {

   login(req, res) {
     var username = req.body.login || '';
     var password = req.body.password || '';

     if (username === '' || password === '')
       return httpCode.error404(res, "Invalid credentials");

     dbModels.UserModel.one(
       {username: username, password: password}, function(err, result) {
         if (err)
           return httpCode.error404(res, 'Error');

         if (!result || Object.keys(result).length === 0) {
           logger.warning('Cannot find user "' + username + '" in database.');
           return httpCode.error404(res, 'User not found.');
         }

         logger.notice('User "' + username + '" found.');
         return httpCode.success(res);
       });
   }

   validate(username, password) {
     return true;
   }
}

 function generateToken(expirationTime) {
   // Set the expiration time
   var date = new Date();
   date.setDate(date.getDate() + expirationTime);

   // Create the token
 }

 const login = new Login();

 export default login;
