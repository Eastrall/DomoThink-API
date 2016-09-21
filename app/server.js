// server.js
"use strict";

// Initialize the app
import bodyParser from 'body-parser';
import express from 'express';
import logger from './modules/logger';
import orm from 'orm';
import {ModelInitializer} from './models';

var app = express(); // create the app using express

// Configure the app
var port = 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const args = process.argv.slice(2);

if (args.length !== 4) {
  console.log("Usage: npm start 'username' 'password' 'hostname' 'database name'");
  process.exit(1);
}

const username = args[0];
const password = args[1];
const host = args[2];
const dbName = args[3];
// Connection
const db = orm.connect(`mysql://${username}:${password}@${host}/${dbName}`);
db.on('connect', function(err) {
  if (err) return console.error('Connection error: ' + err);
  const initializer = new ModelInitializer(db);
  const testModel = initializer.defineTest();
  console.log(testModel);
  // connected
});

// Initialize the routes
// TODO: test

logger.info('Hello world!');
logger.warning('This is a warning!');
logger.notice('This is a notice');
logger.error('This is an error');

// Start the API
app.listen(port);
logger.info('DomoThink API listening on port %s', port);
