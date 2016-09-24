/**
 * object.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import dbModels from './../models/DBModels';

class Devices {
  get(req, res) {
    dbModels.DeviceModel.all((err, result) => res.json(result));
    logger.notice("Getting devices");
  }

  post(req, res) {
    dbModels.DeviceModel.create(req.body, (err, result) => {
      return (err ?
        httpCode.error404(res, 'Error: Bad parameters') :
        httpCode.success(res, req.body.name + " added !")
      );
    });
    logger.notice("Adding " + req.body.name + " to devices");
  }

  update(req, res) {

  }

  delete(req, res) {
    dbModels.DeviceModel.one({idDevice: req.params.id}, (error, device) => {
      console.log(device);
      if (!device) {
        return httpCode.error400(res, "Device not found");
      }
      device.remove(err => {
        return (err ?
          httpCode.error500(res, 'Error: Could not remove device') :
          httpCode.success(res, "Device removed !")
        );
      });
      logger.notice(`Removing device {${req.params.id}}`);
    });
  }

}

const devices = new Devices();

export default devices;
