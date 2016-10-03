/**
 * devices.js
 * Managing objects
 *
 */

import logger from './../modules/logger';
import httpCode from './../modules/httpCode';
import {dirs} from '../common';

class Plugins {
  get(req, res) {
    const pluginConfigs = dirs('./plugins').map(dir => `../../plugins/${dir}/.domothinkrc.json`);
    let plugins = [];
    pluginConfigs.forEach(configUrl => {
      plugins.push(require(configUrl));
    });
    return (plugins.length === 0 ? httpCode.error404(res, "No plugins found") :
      res.send(plugins)
    );
  }
}

const plugins = new Plugins();

export default plugins;
