/**
 * httpCode.js
 * Contains methods with all kind of http errors such as:
 * 400, 401, 403, 404, etc...
 *
 */

class HttpCode {

  /**
   * Send the specified http code with a message.
   * @param {Object} res The result object.
   * @param {integer} httpCode The http code.
   * @param {string} message The error message.
   */
  send(res, httpCode, message) {
    res.status(httpCode);
    res.json({
      status: httpCode,
      message: message
    });
  }

  /**
   * Send the http code 200 (OK) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  success(res, message) {
    if (!message || message === '')
      message = 'success';
    this.send(res, 200, message);
  }

  /**
   * Send the http error 400 (Bad request) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  error400(res, message) {
    this.send(res, 400, message);
  }

  /**
   * Send the http error 401 (Unauthorized) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  error401(res, message) {
    this.send(res, 401, message);
  }

  /**
   * Send the http error 403 (Forbiden) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  error403(res, message) {
    this.send(res, 403, message);
  }

  /**
   * Send the http error 404 (Not found) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  error404(res, message) {
    this.send(res, 404, message);
  }

  /**
   * Send the http error 500 (Internal Server Error) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  error500(res, message) {
    this.send(res, 500, message);
  }

  /**
   * Send the http error 501 (Not implemented) with a specific message.
   * @param {Object} res The result object.
   * @param {string} message The error message.
   */
  error501(res, message) {
    this.send(res, 501, message);
  }

}

const httpCode = new HttpCode();

export default httpCode;
