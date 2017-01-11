/**
 * login.js
 * Handles the login connections.
 *
 */

import childprocess from 'child_process';
import logger from './../modules/logger';
import httpCode from './../modules/httpCode';

class Update {

  /**
   * Logout route. Process the user logout.
   *
   * @param {object} req The request data.
   * @param {object} res The request result.
   * @return {httpCode} code The http code.
   */
  update(req, res) {
    childprocess.exec('sudo bash /var/domothink/api/app/scripts/update.sh', err => {
      if (err) {
        childprocess.exec('sudo service domothink restart', error => {
          if (error) {
            httpCode.console.error500(res, 'Unable to restart api. Contact DomoThink.');
          }
        });
        return httpCode.console.error500(res, 'Restarting app');
      }
    });
    return httpCode.success(res, 'Restarting app. Please log again needed.');
  }
}

const update = new Update();
export default update;
