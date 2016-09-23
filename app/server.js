/**
 * server.js
 * Entry point of the DomoThink API.
 *
 */
"use strict";

// Import the modules
import bodyParser from 'body-parser';
import express from 'express';
import logger from './modules/logger';
import routes from './routes';
import database from './modules/database';
import authRequest from './middlewares/authRequest';

const port = 8081;
const args = process.argv.slice(2);

if (args.length !== 4) {
  logger.notice("Usage: npm start 'username' 'password' 'host' 'db name'");
  process.exit(1);
}

const username = args[0];
const password = args[1];
const host = args[2];
const dbName = args[3];

logger.info('DomoThink API is starting...');

// Database connection
database.setType('mysql');
database.connect(username, password, host, dbName);

// Initialize the router
const router = express.Router(); // eslint-disable-line new-cap
router.get('/', function(req, res) {
  res.send('Home page');
});

// Configure application
let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// find a better implementation like: app.use('/api/*', authRequest);s
app.all('/user', authRequest);
app.all('/user/*', authRequest);
// app.all('/devices/*', authRequest);
// app.all('/directives/*', authRequest);
app.use(router);
router.use('/', routes);

// Start the API
app.listen(port);
logger.info('DomoThink API listening on port %s', port);
