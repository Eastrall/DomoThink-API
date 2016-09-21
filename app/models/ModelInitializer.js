
class ModelInitializer {
  constructor(db) {
    this.db = db;
  }

  defineTest() { // Example of model definition. The ModelInitializer is gonna define every model we have
    return this.db.define('test', {
      idtest: {type: 'serial', key: true},
      name: {type: 'text'}
    });
  }
}

export default ModelInitializer;
