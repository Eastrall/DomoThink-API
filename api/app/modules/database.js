/**
 * database.js
 * Handles the database management. Connect / disctionnect to
 * MySQL or PostgreSQL.
 *
 */

 import orm from 'orm';
 import logger from './logger';
 import dbModels from './../models/DBModels';

 class Database {

   setType(type) {
     this.type = type;
   }

   connect(username, password, databaseHost, databaseName, onSuccess) {
     switch (this.type) {
       case 'mysql':
         connectMySql(username, password, databaseHost, databaseName);
         break;
       case 'postgresql':
         connectPostgreSql();
         logger.notice('PostgreSQL is not implemented yet.');
         break;
       default:
         logger.error('The selected ORM "' + this.type + '" is not availiable');
         process.exit(1);
         break;
     }
   }

   disctionnect() {
     orm.disctionnect();
   }
}

/**
 * Connects to a MySQL database.
 * @param {string} username The database connection username.
 * @param {string} password The database connection password.
 * @param {string} databaseHost The database host address.
 * @param {string} databaseName The database name.
 */
 function connectMySql(username, password, databaseHost, databaseName) {
   var c = `mysql://${username}:${password}@${databaseHost}/${databaseName}`;
   const db = orm.connect(c);

   db.on('connect', function(err) {
     if (err)
       logger.error('Connection error: ' + err);

     dbModels.setDb(db);
     dbModels.defineModels();
     logger.notice('Connected to database.');
   });
 }

 /**
  * Connectes to a PostgreSQL database.
  * @param {string} username The database connection username.
  * @param {string} password The database connection password.
  * @param {string} databaseHost The database host address.
  * @param {string} databaseName The database name.
  */
 function connectPostgreSql(username, password, databaseHost, databaseName) {
 }

 const database = new Database();

 export default database;
