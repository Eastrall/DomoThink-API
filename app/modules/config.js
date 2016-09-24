/**
 * config.js
 * Handles the configuration file of the API.
 *
 * If the configuration file doesn't exists, we'll create it with a default
 * configuration.
 *
 */

 import fs from 'fs';
 // import ini from 'ini';

 class Config {

   initialize(configFile) {
     if (fileExists(configFile))
       this.read();
     else
       this.create();
   }

   read() {
     return true;
   }

   save() {
     return true;
   }

   create() {
     return true;
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

 const config = new Config();
 export default config;
