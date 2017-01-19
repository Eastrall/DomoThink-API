/*
 * OpenZWave server
 */

import OpenZWave from 'openzwave-shared';
import os from 'os';
import util from 'util';
import logger from './../modules/logger';


var homeId = null;
var devices = [];

var zWaveDriverPaths = {
    'darwin': '/dev/cu.usbmodem1411',
    'linux': '/dev/ttyACM0',
    'windows': '\\\\.\\COM3'
};

var zwave = new OpenZWave();

class ZWaveServer {

    start() {
	zwave.on('driver ready', function (zwaveHomeId) {
	    homeId = zwaveHomeId;
	    logger.info('Scanning home for zwave devices...');
	});

	zwave.on('driver failed', function () {
	    logger.error('Cannot start driver!');
	    zwave.disconnect();
	    homeId = null;
	});

	zwave.on('node added', function (nodeId) {
	    initializeEmptyDeviceNode(nodeId);
	});

	zwave.on('value added', function(nodeId, comClass, value) {
	    if (!devices[nodeId]['classes'][comClass])
		devices[nodeId]['classes'][comClass] = {};
	    devices[nodeId]['classes'][comClass][value.index] = value;
	});

	zwave.on('value changed', function (nodeId, comClass, value) {
	    if (devices[nodeId]['ready']) {
		// TODO: logs
	    }
	    devices[nodeId]['classes'][comClass][value.index] = value;
	    console.log(devices);
	});

	zwave.on('value removed', function (nodeId, comClass, index) {
	    if (devices[nodeId]['classes'][comClass] &&
		devices[nodeId]['classes'][comClass][index])
		delete devices[nodeId]['classes'][comClass][index];
	});

	zwave.on('node ready', function (nodeId, nodeInfo) {
	    setNodeInformations(nodeId, nodeInfo);
	    printDeviceNode(nodeId, nodeInfo);
	});

	zwave.on('scan complete', function () {
	    logger.info('Home scan complete!');

	    zwave.setValue( {node_id:2, class_id: 132, instance:1, index:0}, 50);
	    if (zwave.hasOwnProperty('beginControllerCommand')) {
		zwave.beginControllerCommand('AddDevice', true);
	    }
	    else {
		zwave.addNode(false);
	    }
	});

	zwave.on('notification', function(nodeid, notif) {
	    switch (notif) {
	    case 0:
		console.log('node%d: message complete', nodeid);
		break;
	    case 1:
		console.log('node%d: timeout', nodeid);
		break;
	    case 2:
		console.log('node%d: nop', nodeid);
		break;
	    case 3:
		console.log('node%d: node awake', nodeid);
		break;
	    case 4:
		console.log('node%d: node sleep', nodeid);
		break;
	    case 5:
		console.log('node%d: node dead', nodeid);
		break;
	    case 6:
		console.log('node%d: node alive', nodeid);
		break;
	    }
	});

	zwave.on('controller command', function (r, s) {
	    logger.info('Controller command feedback: r = ' + r + ';s = ' + s);
	});

	zwave.connect('/dev/ttyACM0');

	process.on('SIGINT', function() {
	    logger.info('Shutting down zwaveserver');
	    zwave.disconnect('/dev/ttyACM0');
	    process.exit();
	});
    }
    
    getDevices() {
	return devices;
    }

    isOnline() {
	return homeId != null;
    }

    getTemperature(product) {
	for (var i = 1; i < devices.length; ++i) {
	    if (devices[i].product == product) {
		for (var comClass in devices[i]['classes']) {
		    var values = devices[i]['classes'][comClass];

		    for (var idx in values) {
			if (values[idx]['label'] == 'Temperature')
			    return values[idx]['value'];
		    }
		}
	    }
	}

	return "0.0";
    }
    
};

function initializeEmptyDeviceNode(nodeId) {
    devices[nodeId] = {
	manufacturer: '',
	manufacturerid: '',
	product: '',
	producttype: '',
	productid: '',
	type: '',
	name: '',
	loc: '',
	classes: {},
	ready: false,
	isController: nodeId == 1 ? true : false
    };
}

function setNodeInformations(nodeId, nodeInfo) {
    devices[nodeId]['manufacturer'] = nodeInfo.manufacturer;
    devices[nodeId]['manufacturerid'] = nodeInfo.manufacturerid;
    devices[nodeId]['product'] = nodeInfo.product;
    devices[nodeId]['producttype'] = nodeInfo.producttype;
    devices[nodeId]['productid'] = nodeInfo.productid;
    devices[nodeId]['type'] = nodeInfo.type;
    devices[nodeId]['name'] = nodeInfo.name;
    devices[nodeId]['loc'] = nodeInfo.loc;
    devices[nodeId]['ready'] = true;
    devices[nodeId]['isController'] = nodeId == 1 ? true : false;
}

function printDeviceNode(nodeId, nodeInfo) {
    console.log('node%d: %s, %s', nodeId,
		nodeInfo.manufacturer ? nodeInfo.manufacturer : 'id=' + nodeInfo.manufacturerid,
		nodeInfo.product ? nodeInfo.product : 'product=' + nodeInfo.productid +
		', type=' + nodeInfo.producttype);
    console.log('node%d: name="%s", type="%s", location="%s"', nodeId,
		nodeInfo.name,
		nodeInfo.type,
		nodeInfo.loc);
    
    for (var comClass in devices[nodeId]['classes']) {
	switch (comClass) {
	case 0x25:
	case 0x26:
	    zwave.enablePoll(nodeId, comClass);
	    break;
	}
	
	var values = devices[nodeId]['classes'][comClass];
	console.log('node%d: class %d', nodeId, comClass);
	
	for (var idx in values) {
	    console.log('node%d: %s', nodeId, util.inspect(values[idx], false, null));
	}
    }

    console.log(devices[nodeId]);
}

const zwaveServer = new ZWaveServer();

export default zwaveServer;
