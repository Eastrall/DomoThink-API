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
    logger.notice("Getting devices");
    dbModels.DeviceModel.all((err, result) => res.json(result));
  }

  post(req, res) {
    console.log(req.body);
    logger.notice("Adding " + req.body.name + " to devices");
    dbModels.DeviceModel.create(req.body, function(err, result) {
      return (err ?
        httpCode.error404(res, 'Error: Bad parameters') :
        httpCode.success(res, req.body.name + " added !")
      );
    });
    // {
    //   if ()
    //   return res.json("OK");
    // });
  }

}

const devices = new Devices();

export default devices;
