/**
 * config.js
 * Handles the configuration file of the API.
 *
 * If the configuration file doesn't exists, we'll create it with a default
 * configuration.
 *
 */

 import fs from 'fs';
 import ini from 'ini';
 import logger from './logger';

 class Config {

   /**
    * Initialize the configuration module.
    * If the configuration file doesn't exists, we create a default one.
    *
    * @param {string} configFile The configuration file path.
    */
   initialize(configFile) {
     this.file = configFile;

     if (!fileExists(configFile))
       this.create();

     this.read();
   }

   /**
    * Reads the configuration file.
    */
   read() {
     logger.info('Reading configuration file');

     this.Config = ini.parse(fs.readFileSync(this.file, 'utf-8'));
   }

   /**
    * Save the configuration file.
    */
   save() {
     fs.writeFileSync(this.file, ini.stringify(this.Config));
   }

   /**
    * Create a new default configuration file.
    */
   create() {
     logger.info('Creating configuration file');
     fs.openSync(this.file, 'w');
     var conf = ini.parse(fs.readFileSync(this.file, 'utf-8'));

     // default configuration
     conf.global = {
       port: 8081
     };

     conf.auth = {
       secret: generateRandomString()
     };

     conf.database = {
       host: 'localhost',
       username: 'domo',
       password: 'default_password',
       database: 'domothink'
     };

     fs.writeFileSync(this.file, ini.stringify(conf));
   }

   getConfig() {
     return this.Config;
   }
}

/**
 * Check if the file exists.
 * @param {string} filePath The file path.
 * @return {boolean} Result The result of the operation. If file exists or not.
 */
 function fileExists(filePath) {
   try {
     fs.accessSync(filePath, fs.F_OK);
   } catch (e) {
     return false;
   }

   return true;
 }

/**
 * Generates a random string.
 * @return {string} The generated string.
 */
 function generateRandomString() {
   var values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
   var text = '';

   for (var i = 0; i < 32; ++i)
     text += values.charAt(Math.floor(Math.random() * values.length));

   return text;
 }

 const config = new Config();
 export default config;
