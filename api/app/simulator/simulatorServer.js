/**
 * simulatorServer.js
 * Main class of the virtual devices server simulator.
 *
 */

import network from 'net';
import logger from './../modules/logger';

var devices = [];

class SimulatorServer {

  /**
   * Initialize and start the simulator server.
   *
   */
  start() {
    var simulatorServer = network.createServer(function(socket) {
      var socketRemote = socket.remoteAddress;

      logger.notice('New device connected from : ' + socketRemote);
      devices.push(socket);
      sendWelcomeNewObject(socket);

      socket.on('data', function(incomingData) {
        handleIncomingData(incomingData, socket);
      });

      socket.on('close', function(socket) {
        logger.info('Device disconnected.');
      });

      socket.on('end', function (socket) {
        logger.info('Device disconnected');
      });
    });

    simulatorServer.listen(4444, "127.0.0.1");
    logger.notice('SimulatorServer listening on port 4444');
  }
}

function sendWelcomeNewObject(socket){

  var data = {
    header: 0x00,
    message: "welcome!"
  };

  var buffer = JSON.stringify(data);
  var b2 = Buffer.from(buffer.toString());

  console.log(buffer.toString());
  socket.write(b2);
}

/**
 * Handles the incoming data from a virtual device.
 *
 * @param {object} buffer The incoming buffer containing the data.
 * @param {object} socket The socket where the incoming data come from.
 */
function handleIncomingData(buffer, socket) {

  var packetData = JSON.parse(buffer.toString());

  switch (packetData.header) {
    case 0x01:
      logger.info("Recieved new object data");
      console.log(packetData.data);
      break;
  }
}

const server = new SimulatorServer();

export default server;
