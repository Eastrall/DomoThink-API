/**
 * devices.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import simulatorServer from './../simulator/simulatorServer';
import zwaveServer from './../zwave/zwaveServer';

class Box {

  /**
   * /get route for devices
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing result.
   * @returns {Array} result The devices in the database
   */
  checkUpdate(req, res) {

  }

  /**
   * /post route for devices
   *
   * @param {object} req The incoming request. The new device is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  installUpdate(req, res) {

  }

  serviceStatus(req, res) {
    return res.json({
      simulator: simulatorServer.getStatus(),
	zwave: zwaveServer.isOnline(),
    });
  }

}

const box = new Box();

export default box;
