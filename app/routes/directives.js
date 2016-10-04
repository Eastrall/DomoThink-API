/**
 * directives.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import dbModels from './../models/DBModels';

class Directives {

  /**
   * /get route for Directives
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing result.
   * @returns {Array} result The Directives in the database
   */
  get(req, res) {
    dbModels.DirectiveModel.all((err, result) => res.json(result));
    logger.notice("Getting directives");
  }

  /**
   * /post route for directives
   *
   * @param {object} req The incoming request. The new directive is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  post(req, res) {
    dbModels.DirectiveModel.create(req.body, (err, result) => {
      return (err ?
        httpCode.error404(res, 'Error: Bad parameters') :
        httpCode.success(res, req.body.name + " added !")
      );
    });
    logger.notice("Adding " + req.body.name + " to directives");
  }

  /**
   * /put route for directives
   *
   * @param {object} req The incoming request. The updated directive is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  put(req, res) {
    dbModels.DirectiveModel.one({idDirective: req.body.idDirective},
      (error, directive) => {
        if (!directive) {
          return httpCode.error404(res, "Directive not found");
        }
        directive.save(req.body, err => {
          return (err ?
          httpCode.error500(res, 'Error: Could not update directive') :
          httpCode.success(res, "Directive updated !")
        );
        });
        logger.notice(`Updating directive {${req.body.idDirective}}`);
      });
  }

  /**
     * /delete route for directives
     *
     * @param {object} req The incoming request. The id of the removed directive is in req.params.di
     * @param {object} res The outgoing result.
     * @returns {object} codeode The success/error code
     */
  delete(req, res) {
    dbModels.DirectiveModel.one({idDirective: req.params.id}, (error, directive) => {
      if (!directive) {
        return httpCode.error404(res, "Directive not found");
      }
      directive.remove(err => {
        return (err ?
          httpCode.error500(res, 'Error: Could not remove directive') :
          httpCode.success(res, "Directive removed !")
        );
      });
      logger.notice(`Removing directive {${req.params.id}}`);
    });
  }

}

const directives = new Directives();

export default directives;
