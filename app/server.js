// server.js
"use strict";

// Import the modules
import bodyParser from 'body-parser';
import express from 'express';
import orm from 'orm';
import logger from './modules/logger';
import DBModels from './models';
import Routes from './routes';

var app = express(); // create the app using express

// Configure the app
var port = 8081;
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

logger.info('DomoThink API is starting...');

// Connection
const db = orm.connect(`mysql://${username}:${password}@${host}/${dbName}`);
db.on('connect', function(err) {
  if (err)
    return console.error('Connection error: ' + err);

  DBModels.setDb(db);
  DBModels.defineModels();
});

const router = express.Router(); // eslint-disable-line new-cap
router.get('/', function(req, res) {
  res.send('Home page');
});

app.use(router);
router.use('/', Routes);

// Start the API
app.listen(port);
logger.info('DomoThink API listening on port %s', port);
