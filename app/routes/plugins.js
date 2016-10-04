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
import dbModels from './../models/DBModels';
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
    // const pluginConfigs = dirs('./plugins').map(dir => `${process.cwd()}/plugins/${dir}/.domothinkrc.json`);
    // let plugins = [];
    // pluginConfigs.forEach(configUrl => {
    //   plugins.push(require(configUrl));
    // });
    // return (plugins.length === 0 ? httpCode.error404(res, "No plugins found") :
    //   res.send(plugins)
    // );
    dbModels.PluginModel.all((err, result) => res.json(result));
    logger.notice("Getting plugins");
  }

  install(req, res) {
    try {
//      mkdirSync(`${process.cwd()}/plugins/${req.body.name}`);
      Git.Clone(req.body.repository, `${process.cwd()}/plugins/${req.body.name}`).then(repository => { // eslint-disable-line new-cap
        logger.info("Plugin downloaded");
        dbModels.PluginModel.create(req.body, (err, result) => {
          if (err) {
            rmdirSync(`${process.cwd()}/plugins/${req.body.name}/`);
            return httpCode.error404(res, 'Error: Bad parameters');
          }
          return httpCode.success(res, `Plugin ${req.body.name} installed !`);
        });
      }).catch(e => {
        logger.error("Unable to clone plugin");
        return httpCode.error500(res, "Unable to clone plugin");
      });
    } catch (e) {
      return httpCode.error400(res, 'Plugin folder already exists');
    }
  }

  uninstall(req, res) {
    dbModels.PluginModel.one({idPlugin: req.params.id}, (err, plugin) => {
      if (!plugin || err) {
        return httpCode.error404(res, "Plugin not found");
      }
      plugin.remove(err => {
        if (err)
          return httpCode.error500(res, 'Error: Could not remove device');
        try {
          rmdirSync(`${process.cwd()}/plugins/${plugin.name}/`);
          return httpCode.success(res, `Plugin ${plugin.name} removed`);
        } catch (e) {
          return httpCode.error404(res, 'Plugin not found');
        }
      });
    });
  }
}

const plugins = new Plugins();

export default plugins;
