/**
 * devices.js
 * Managing objects
 *
 */

import fs from 'fs';
import path from 'path';
import httpCode from './../modules/httpCode';
import logger from './../modules/logger';
import Git from 'nodegit';
import {dirs} from '../common';

const mkdirSync = path => {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    throw e;
  }
};

const rmdirSync = dir => {
  var list = fs.readdirSync(dir);
  for (var i = 0; i < list.length; i++) {
    var filename = path.join(dir, list[i]);
    var stat = fs.statSync(filename);
    if (filename === "." || filename === "..") {
    } else if (stat.isDirectory()) {
      rmdirSync(filename);
    } else {
      fs.unlinkSync(filename);
    }
  }
  fs.rmdirSync(dir);
};

class Plugins {
  get(req, res) {
    const pluginConfigs = dirs('./plugins').map(dir => `${process.cwd()}/plugins/${dir}/.domothinkrc.json`);
    let plugins = [];
    pluginConfigs.forEach(configUrl => {
      plugins.push(require(configUrl));
    });
    return (plugins.length === 0 ? httpCode.error404(res, "No plugins found") :
      res.send(plugins)
    );
  }

  install(req, res) {
    try {
      mkdirSync(`${process.cwd()}/plugins/${req.body.name}`);
    } catch (e) {
      return httpCode.error400(res, 'Plugin folder already exists');
    }
    Git.Clone(req.body.repository, `${process.cwd()}/plugins/${req.body.name}`).then(function(repository) { // eslint-disable-line new-cap
      logger.info("Plugin installed");
      return httpCode.success(res, "Plugin installed");
    }).catch(e => {
      logger.error("Unable to clone plugin");
      return httpCode.error500(res, "Unable to clone plugin");
    });
  }

  uninstall(req, res) {
    try {
      rmdirSync(`${process.cwd()}/plugins/${req.body.name}/`);
    } catch (e) {
      return httpCode.error404(res, 'Plugin not found');
    }
    return httpCode.success(res, "Plugin removed");
  }
}

const plugins = new Plugins();

export default plugins;
