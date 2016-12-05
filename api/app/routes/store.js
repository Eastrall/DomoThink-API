/**
 * devices.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import dbModels from './../models/DBModels';

const deleteLinkedComments = storeplugins_idPlugin => { // eslint-disable-line camelcase
  dbModels.StorePluginCommentsModel.find({storeplugins_idPlugin}, // eslint-disable-line camelcase
    (error, comments) => {
      if (!comments || comments.length === 0) {
        return 'No linked comments';
      }
      comments.forEach(comment => {
        comment.remove(err => {
          return (err ?
          `Could not remove comment ${comment.idComment}` :
          `Removed ${comment.idComment}`);
        });
      });
      logger.notice(`Removing linked comments`);
    }
  );
};

class Store {

  /**
   * /get route for devices
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing result.
   * @returns {Array} result The devices in the database
   */
  get(req, res) {
    let counter = 0;
    dbModels.StorePluginsModel.all((err, result) => {
      if (err || result.length === 0)
        return httpCode.error404(res, 'No plugin found.');
      result.forEach(plugin => {
        plugin.keyLoginHash = "";
        plugin.getStoreplugincomments((error, data) => {
          if (error)
            return httpCode.error500(res, "Could not get plugins");
          counter += 1;
          if (data.length > 0) {
            let rate = 0;
            plugin.storeplugincomments.forEach((comment, index, arr) => {
              rate += comment.rate;
            });
            rate /= plugin.storeplugincomments.length;
            plugin.rate = rate;
          } else {
            plugin.rate = -1;
          }
          delete plugin.storeplugincomments;
          plugin.keyLoginHash = null; // Impossible to remove it. Idk why.
          if (counter === result.length) {
            return res.json(result);
          }
        });
      });
    });
    logger.notice("Getting Store plugins");
  }

  getPlugin(req, res) {
    dbModels.StorePluginsModel.one({idPlugin: req.params.id},
      (error, plugin) => {
        if (!plugin) {
          return httpCode.error404(res, "Plugin not found");
        }
        plugin.getStoreplugincomments((err, data) => {
          if (data.length > 0) {
            let rate = 0;
            plugin.storeplugincomments.forEach((comment, index, arr) => {
              rate += comment.rate;
            });
            rate /= plugin.storeplugincomments.length;
            plugin.rate = rate;
          } else {
            plugin.rate = -1;
          }
          return (err ? httpCode.error500(res, "Could not find plugin details") :
          res.json(plugin));
        });
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
    // Boxkey verification ?
    dbModels.StorePluginsModel.create(req.body, (err, result) => {
      return (err ?
        httpCode.error404(res, 'Error: Bad parameters') :
        httpCode.success(res, req.body.name + " added !")
      );
    });
    logger.notice("Adding " + req.body.name + " to the store");
  }

  /**
   * /put route for devices
   *
   * @param {object} req The incoming request. The updated device is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  put(req, res) {
    // Boxkey verification ?
    dbModels.StorePluginsModel.one({idPlugin: req.body.idPlugin, keyLoginHash: req.body.keyLoginHash},
      (error, plugin) => {
        if (!plugin) {
          return httpCode.error404(res, "Plugin not found");
        }
        plugin.save(req.body, err => {
          return (err ?
            httpCode.error500(res, 'Error: Could not update Store plugin') :
            httpCode.success(res, "Plugin updated !")
          );
        });
        logger.notice(`Updating plugin {${req.body.idPlugin}}`);
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
    // Boxkey verification ?
    dbModels.StorePluginsModel.one({idPlugin: req.body.idPlugin, keyLoginHash: req.body.keyLoginHash}, (error, plugin) => {
      if (!plugin) {
        return httpCode.error404(res, "Plugin not found");
      }
      plugin.remove(err => {
        if (!err)
          deleteLinkedComments(plugin.idPlugin); // eslint-disable-line camelcase
        return (err ?
          httpCode.error500(res, 'Error: Could not remove plugin') :
          httpCode.success(res, "Plugin removed !")
        );
      });
      logger.notice(`Removing plugin {${req.body.idPlugin}}`);
    });
  }

}

const store = new Store();

export default store;
