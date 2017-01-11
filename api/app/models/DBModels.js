/**
 * DBModels.js
 * Defines the database models.
 *
 */

let instance = null;

class Models {
  constructor() {
    if (!instance)
      instance = this;
    return instance;
  }

  setDb(db) { // Need to be called at the beginning
    this.db = db;
  }

  defineModels() {
    this.defineUser();
    this.defineDevices();
    this.defineDirectives();
    this.defineStorePlugins();
    this.defineStorePluginComments();
    this.defineLocalPlugins();
  }

  defineUser() {
    this.UserModel = this.db.define('users', {
      userId: {type: 'serial', key: true},
      username: {type: 'text'},
      password: {type: 'text'},
      boxKey: {type: 'text'}
    });
  }

  defineDevices() {
    this.DeviceModel = this.db.define('devices', {
      idDevice: {type: 'serial', key: true},
      name: {type: 'text'},
      description: {type: 'text'},
      protocole: {type: 'text'},
      status: Boolean
    });
  }

  defineDirectives() {
    this.DirectiveModel = this.db.define('directives', {
      idDirective: {type: 'serial', key: true},
      name: {type: 'text'},
      creatorId: {type: 'number'},
      deviceId: {type: 'number'},
      actionId: {type: 'number'},
      periodicityType: {type: 'number'},
      periodicityData: {type: 'text'}
      // Reste
    });
  }

  defineLocalPlugins() {
    this.PluginModel = this.db.define('plugins', {
      idPlugin: {type: 'serial', key: true},
      name: {type: 'text'},
      status: Boolean
      // Reste
    });
  }

  defineStorePlugins() {
    this.StorePluginsModel = this.db.define('storeplugins', {
      idPlugin: {type: 'serial', key: true},
      name: {type: 'text'},
      repository: {type: 'text'},
      language: {type: 'text'},
      date: {type: "date", time: false},
      keyLoginHash: {type: 'text'}
    });
  }

  defineStorePluginComments() {
    this.StorePluginCommentsModel = this.db.define('storeplugincomments', {
      idComment: {type: 'serial', key: true},
      author: {type: 'text'},
      rate: {type: 'number'},
      comment: {type: 'text'},
      date: {type: "date", time: false},
      storeplugins_idPlugin: {type: 'number'}, // eslint-disable-line camelcase
      keyLoginHash: {type: 'text'}
    });
    this.StorePluginCommentsModel.hasOne('storeplugins', this.StorePluginsModel, {reverse: "storeplugincomments"});
  }
}

const DBModels = new Models();

export default DBModels;
