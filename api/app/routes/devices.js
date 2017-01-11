/**
 * devices.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import dbModels from './../models/DBModels';
import config from './../modules/config';
import simulatorServer from './../simulator/simulatorServer';

const deleteLinkedDirectives = deviceId => {
  dbModels.DirectiveModel.find({deviceId},
    (error, directives) => {
      if (!directives || directives.length === 0) {
        return 'No linked directives';
      }
      directives.forEach(directive => {
        directive.remove(err => {
          return (err ?
          `Could not remove directive ${directive.idDirective}` :
          `Removed ${directive.idDirective}`);
        });
      });
      logger.notice(`Removing linked directives`);
    }
  );
};

class Devices {

  /**
   * /get route for devices
   *
   * @param {object} req The incoming request.
   * @param {object} res The outgoing result.
   * @returns {Array} result The devices in the database
   */
  get(req, res) {
    dbModels.DeviceModel.all((err, result) => {
      if (err)
        return httpCode.error500(res, "Unable to get devices");
      return res.json(result);
    });
    logger.notice("Getting devices");
  }

  /**
   * /post route for devices
   *
   * @param {object} req The incoming request. The new device is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  post(req, res) {
    dbModels.DeviceModel.create(req.body, (err, result) => {
      return (err ?
        httpCode.error404(res, 'Error: Bad parameters') :
        httpCode.success(res, req.body.name + " added !")
      );
    });
    logger.notice("Adding " + req.body.name + " to devices");
  }

  /**
   * /put route for devices
   *
   * @param {object} req The incoming request. The updated device is in the req.body
   * @param {object} res The outgoing result.
   * @returns {object} codeode The success/error code
   */
  put(req, res) {
    dbModels.DeviceModel.one({idDevice: req.body.idDevice},
      (error, device) => {
        if (!device) {
          return httpCode.error404(res, "Device not found");
        }
        device.save(req.body, err => {
          return (err ?
            httpCode.error500(res, 'Error: Could not update device') :
            httpCode.success(res, "Device updated !")
          );
        });
        logger.notice(`Updating device {${req.body.idDevice}}`);
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
    dbModels.DeviceModel.one({idDevice: req.params.id}, (error, device) => {
      if (!device) {
        return httpCode.error404(res, "Device not found");
      }
      device.remove(err => {
        if (!err) {
          deleteLinkedDirectives(req.params.id);
        }
        return (err ?
          httpCode.error500(res, 'Error: Could not remove device') :
          httpCode.success(res, "Device removed !")
        );
      });
      logger.notice(`Removing device {${req.params.id}}`);
    });
  }

  /**
     * /scan route for the devices. Scan the devices around the box.
     *
     * @param {object} req The incoming request. The id of the removed device is in req.params.di
     * @param {object} res The outgoing result.
     * @returns {Array} result The devices available around the box.
     */
  scan(req, res) {
    var availableObjects = [];

    availableObjects = availableObjects.concat(getAvailableZWaveObjects());
    // TODO: add more protocoles here

    if (config.Config.global.useSimulator == true) {
      availableObjects = availableObjects.concat(getAvailableSimulatorObjects());
    }

    logger.notice("scanning devices")
    return httpCode.success(res, availableObjects);
  }
}

/**
   * Gets all available objects using the ZWave procotole.
   *
   * @returns {Array} result Devices available.
   */
function getAvailableZWaveObjects() {
  // TODO
  return [];
}

/**
   * Gets all available objects using the Simulator protocole.
   *
   * @returns {Array} result Devices available.
   */
function getAvailableSimulatorObjects() {
  var simulatorDevices = simulatorServer.getDevices();
  var devicesAvailable = [];

  for (var i = 0; i < simulatorDevices.length; ++i) {
    if (isSimulatorDeviceAvailable(simulatorDevices[i]))
      devicesAvailable.push(simulatorDevices[i].data);
  }

  return devicesAvailable;
}

/**
   * Check if the simlated device is available in the database.
   *
   * @param {object} device The simulated device.
   * @returns {bool} result Result if the simulated device is available.
   */
function isSimulatorDeviceAvailable(device) {
  // check in database if the device has been added.
  dbModels.devices.one({name: device.name}, (err, result) => {
    return !result;
  });
}

const devices = new Devices();

export default devices;
