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
    this.defineTest();
    this.defineUser();
  }

  defineTest() {
    this.TestModel = this.db.define('test', {
      idtest: {type: 'serial', key: true},
      name: {type: 'text'}
    });
  }

  getTest() {
    return this.TestModel;
  }

  defineUser() {
    this.UserModel = this.db.define('user', {
      iduser: {type: 'serial', key: true},
      name: {type: 'text'},
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
