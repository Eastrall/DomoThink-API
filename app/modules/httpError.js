/**
 * httpError.js
 * Contains methods with all kind of http errors such as:
 * 400, 401, 403, 404, etc...
 *
 */

class HttpError {
  error401(res, message) {
    res.status(401);
    res.json({
      status: 401,
      message: message
    });
    return false;
  }
}

const httpError = new HttpError();

export default httpError;
