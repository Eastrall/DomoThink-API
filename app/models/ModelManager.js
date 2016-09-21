let instance = null;

class Manager {
  constructor() {
    if (!instance)
      instance = this;
    return instance;
  }

  defineModels() {
    this.defineTest();
    console.log(this.getTest());
  }

  defineTest() {
    this.TestModel = this.db.define('test', {
      idtest: {type: 'serial', key: true},
      name: {type: 'text'}
    });
  }

  setDb(db) {
    this.db = db;
  }
}

const ModelManager = new Manager();

export default ModelManager;
