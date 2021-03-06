/**
 * simulatorServer.js
 * Main class of the virtual devices server simulator.
 *
 */

import network from 'net';
import logger from './../modules/logger';

var status = false;
var devices = []; // array of sockets

class SimulatorServer {

  /**
   * Initialize and start the simulator server.
   *
   */
  start() {
    var simulatorServer = network.createServer(function(socket) {
      var socketRemote = socket.remoteAddress;

      logger.notice('New device connected from : ' + socketRemote);
      sendWelcomeNewObject(socket);

      socket.on('data', function(incomingData) {
        handleIncomingData(incomingData, socket);
      });

      socket.on('close', function() {
        logger.info('Device ' + socket.name + ' disconected.');
        removeDeviceFromArray(socket.name);
      });
    });

    simulatorServer.listen(4444);
    logger.notice('SimulatorServer listening on port 4444');
    status = true;
  }

  /**
   * Initialize and start the simulator server.
   *
   * @return {Array} result List of connected devices.
   */
  getDevices() {
    return devices;
  }

  getStatus() {
    return status;
  }

  sendDataTo(deviceName, data) {
    var device = getDeviceByName(deviceName);

    if (device != null) {
      var buffer = Buffer.from(JSON.stringify(data));

      device.write(buffer);
    }
  }
}

/**
 * Send a welcome message to the new connected device.
 *
 * @param {object} socket The connected device socket.
 */
function sendWelcomeNewObject(socket) {
  var data = {
    header: 0x00,
    message: "welcome!"
  };
  var buffer = Buffer.from(JSON.stringify(data));

  console.log(buffer.toString());
  socket.write(buffer);
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

      if (checkIfAlreadyConnected(packetData.data.name)) {
        logger.error("Device " + packetData.data.name + " already connected.");
        return;
      }

      socket.name = packetData.data.name;
      socket.data = packetData.data;
      devices.push(socket);
      logger.info("Recieved new object data: " + socket.data.name);
      break;
  }
}

/**
 * Search the connected device by his name and return is index in the array.
 *
 * @param {string} name The device name.
 * @return {integer} The index of the device in the array.
 */
function getIndexOfDevice(name) {
  for (var i = 0; i < devices.length; ++i) {
    if (devices[i].name === name)
      return i;
  }
  return -1;
}

/**
 * Search the connected device by his name and return it.
 *
 * @param {string} name The device name.
 * @return {integer} The index of the device in the array.
 */
function getDeviceByName(name) {
  var index = getIndexOfDevice(name);

  return index > -1 ? devices[index] : null;
}

/**
 * Check if the device is already connected
 *
 * @param {object} name The device name.
 * @return {bool} The result if the device exists or not.
 */
function checkIfAlreadyConnected(name) {
  return getIndexOfDevice(name) > 0;
}

/**
 * Remove the connected object from the list if it exists.
 *
 * @param {object} name The device name.
 */
function removeDeviceFromArray(name) {
  var itemIndex = getIndexOfDevice(name);

  if (itemIndex > -1)
    devices.splice(itemIndex, 1);
}

const server = new SimulatorServer();

export default server;
