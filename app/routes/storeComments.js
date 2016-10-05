/**
 * devices.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import dbModels from './../models/DBModels';

class StoreComments {

  /**
   * /get route for devices
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing result.
   * @returns {Array} result The devices in the database
   */
  get(req, res) {
    dbModels.StorePluginCommentsModel.find({storeplugins_idPlugin: req.params.id}, (err, result) => { // eslint-disable-line camelcase
      if (err)
        return httpCode.error500(res, "Impossible to get comments");
      res.json(result);
    });
    logger.notice("Getting comments");
  }

  getComment(req, res) {
    dbModels.StorePluginCommentsModel.one({idComment: req.params.id},
          (err, comment) => {
            if (err) {
              return httpCode.error500(res, "Impossible to get comment");
            } else if (!comment) { // eslint-disable-line no-negated-condition
              return httpCode.error404(res, "Comment not found");
            }
            logger.notice(`Getting comment {${req.params.id}}`);
            return res.json(comment);
          });
  }

  /**
   * /post route for devices
   *
   * @param {object} req The incoming request. The new device is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  post(req, res) {
    const newComment = Object.assign({}, req.body, {storeplugins_idPlugin: req.params.id});
    dbModels.StorePluginCommentsModel.create(newComment, (err, result) => {
      return (err ?
        httpCode.error404(res, 'Error: Bad parameters') :
        httpCode.success(res, "Comment added !")
      );
    });
  }

  /**
   * /put route for devices
   *
   * @param {object} req The incoming request. The updated device is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  put(req, res) {
    dbModels.StorePluginCommentsModel.one({idComment: req.body.idComment},
      (error, comment) => {
        if (!comment) {
          return httpCode.error404(res, "Comment not found");
        }
        comment.save(req.body, err => {
          return (err ?
            httpCode.error500(res, 'Error: Could not update comment') :
            httpCode.success(res, "Comment updated !")
          );
        });
        logger.notice(`Updating comment {${req.body.idComment}}`);
      });
  }

  /**
     * /delete route for devices. Still need to remove the directives linked to this device when it's removed
     *
     * @param {object} req The incoming request. The id of the removed device is in req.params.di
     * @param {object} res The outgoing result.
     * @returns {object} codeode The success/error code
     */
  delete(req, res) {
    dbModels.StorePluginCommentsModel.one({idComment: req.params.id}, (error, comment) => {
      if (!comment) {
        return httpCode.error404(res, "Comment not found");
      }
      comment.remove(err => {
        return (err ?
          httpCode.error500(res, 'Error: Could not remove comment') :
          httpCode.success(res, "Comment removed !")
        );
      });
      logger.notice(`Removing comment {${req.params.id}}`);
    });
  }

}

const storeComments = new StoreComments();

export default storeComments;
