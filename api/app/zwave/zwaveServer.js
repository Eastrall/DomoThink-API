/*
 * OpenZWave server
 */

import logger from './../modules/logger';

var objects = [];

class ZwaveServer {

	start() {

		var zwavedriverpaths = {
			"darwin": '/dev/cu.usbmodem1411',
			"linux": '/dev/ttyACM0',
			"windows": '\\\\.\\COM3'
		}
		logger.info("connecting to " + zwavedriverpaths[os.platform()]);
		zwave.connect(zwavedriverpaths[os.platform()]);


		process.on('SIGINT', function() {
				logger.info('\n\n== Driver Statistics: %j',
						zwave.getDriverStatistics());
				Object.keys(nodes).forEach(function(nodeid) {
						logger.info('== Node %d neighbors: %j',
								nodeid, zwave.getNodeNeighbors(nodeid));
						logger.info('== Node %d Statistics: %j',
								nodeid, zwave.getNodeStatistics(nodeid));
						});
				logger.info('disconnecting...');
				logger.info(objects);
				zwave.disconnect();
				process.exit();
				});
	}

	getDevices() {
		return objects;
	}
};

var OpenZWave = require('openzwave-shared');
var os = require('os');

var zwave = new OpenZWave({
ConsoleOutput: false,
Logging: false,
SaveConfiguration: false,
DriverMaxAttempts: 3,
PollInterval: 500,
SuppressValueRefresh: true,
});
var nodes = [];
var isController = true;

zwave.on('connected', function(homeid) {
		logger.info('=================== CONNECTED! ==================== ->', homeid);
		});

zwave.on('driver ready', function(homeid) {
		logger.info('=================== DRIVER READY! ====================');
		logger.info('scanning homeid=0x%s...', homeid.toString(16));
		});

zwave.on('driver failed', function() {
		logger.info('failed to start driver');
		zwave.disconnect();
		process.exit();
		});

zwave.on('node added', function(nodeid) {
		logger.info('=================== NODE ADDED! ====================');
		nodes[nodeid] = {
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
};
var object = {id: nodeid, protocol: 'zwave', name: '', type: '', state: '', isController: isController};
isController = false;
objects.push(object);
});

zwave.on('value added', function(nodeid, comclass, value) {
		if (!nodes[nodeid]['classes'][comclass])
		nodes[nodeid]['classes'][comclass] = {};
		nodes[nodeid]['classes'][comclass][value.index] = value;
		});

zwave.on('value changed', function(nodeid, comclass, value) {
		if (nodes[nodeid]['ready']) {
		logger.info('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
				value['label'],
				nodes[nodeid]['classes'][comclass][value.index]['value'],
				value['value']);
		}
		nodes[nodeid]['classes'][comclass][value.index] = value;
		});

zwave.on('value removed', function(nodeid, comclass, index) {
		if (nodes[nodeid]['classes'][comclass] &&
				nodes[nodeid]['classes'][comclass][index])
		delete nodes[nodeid]['classes'][comclass][index];
		});

zwave.on('node ready', function(nodeid, nodeinfo) {
		nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
		nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
		nodes[nodeid]['product'] = nodeinfo.product;
		nodes[nodeid]['producttype'] = nodeinfo.producttype;
		nodes[nodeid]['productid'] = nodeinfo.productid;
		nodes[nodeid]['type'] = nodeinfo.type;
		nodes[nodeid]['name'] = nodeinfo.name;
		nodes[nodeid]['loc'] = nodeinfo.loc;
		nodes[nodeid]['ready'] = true;
		logger.info('node%d: %s, %s', nodeid,
				nodeinfo.manufacturer ? nodeinfo.manufacturer : 'id=' + nodeinfo.manufacturerid,
				nodeinfo.product ? nodeinfo.product : 'product=' + nodeinfo.productid +
				', type=' + nodeinfo.producttype);
		logger.info('node%d: name="%s", type="%s", location="%s"', nodeid,
				nodeinfo.name,
				nodeinfo.type,
				nodeinfo.loc);
		for (var comclass in nodes[nodeid]['classes']) {
		switch (comclass) {
		case 0x25: // COMMAND_CLASS_SWITCH_BINARY
		case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
			zwave.enablePoll(nodeid, comclass);
			break;
		}
		var values = nodes[nodeid]['classes'][comclass];
		logger.info('node%d: class %d', nodeid, comclass);
		for (var idx in values)
			logger.info('node%d:   %s=%s', nodeid, values[idx]['label'], values[idx][
					'value'
			]);
		}
		zwave.setNodeOn(nodeid);
		var object = objects.find(function(e) {
				return e.id === nodeid;
				});
		if (object !== undefined) {
			object.name = nodeinfo.manufacturer + ' ' + nodeinfo.product;
			object.type = nodeinfo.type;
			object.state = 'on';
		}
});

zwave.on('notification', function(nodeid, notif, help) {
		logger.info('node%d: notification(%d): %s', nodeid, notif, help);
		if (nodeid == 2) {
		logger.info('test');
		zwave.setNodeOn(nodeid);
		}
		});

zwave.on('scan complete', function() {
		logger.info('scan complete, hit ^C to finish.');
});

