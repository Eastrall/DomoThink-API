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
  }

  defineUser() {
    this.UserModel = this.db.define('users', {
      userId: {type: 'serial', key: true},
      username: {type: 'text'},
      password: {type: 'text'},
      boxKey: {type: 'text'}
    });
  }

  getUser() {
    return this.UserModel;
  }

  setDb(db) {
    this.db = db;
  }
}

const DBModels = new Models();

export default DBModels;
