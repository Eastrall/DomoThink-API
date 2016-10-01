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

  defineModels() {
    this.defineUser();
    this.defineDevices();
    this.defineDirectives();
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

  setDb(db) {
    this.db = db;
  }
}

const DBModels = new Models();

export default DBModels;
