/**
 * httpCode.js
 * Contains methods with all kind of http errors such as:
 * 400, 401, 403, 404, etc...
 *
 */

 import logger from 'logger';

 class HttpCode {

  /**
   * Send the specified http code with a message.
   * @param {Object} res The result object.
   * @param {integer} httpCode The http code.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   send(res, httpCode, message, err) {
     var _message = message;

     if (err) {
       _message += ' Error: ' + err;
       logger.error(_message);
     } else {
       logger.warning(_message);
     }

     res.status(httpCode);
     res.json({
       status: httpCode,
       message: message,
       error: err
     });
   }

  /**
   * Send the http code 200 (OK) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   success(res, message, err) {
     if (!message || message === '')
       message = 'success';
     this.send(res, 200, message);
   }

  /**
   * Send the http error 400 (Bad request) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   error400(res, message, err) {
     this.send(res, 400, message, err);
   }

  /**
   * Send the http error 401 (Unauthorized) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   error401(res, message, err) {
     this.send(res, 401, message, err);
   }

  /**
   * Send the http error 403 (Forbiden) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   error403(res, message, err) {
     this.send(res, 403, message, err);
   }

  /**
   * Send the http error 404 (Not found) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   error404(res, message, err) {
     this.send(res, 404, message);
   }

  /**
   * Send the http error 500 (Internal Server Error) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   error500(res, message, err) {
     this.send(res, 500, message, err);
   }

  /**
   * Send the http error 501 (Not implemented) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   * @param {string} err The error message.
   */
   error501(res, message, err) {
     this.send(res, 501, message, err);
   }

}

 const httpCode = new HttpCode();

 export default httpCode;
