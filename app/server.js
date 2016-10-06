/**
 * server.js
 * Entry point of the DomoThink API.
 *
 */
"use strict";

// Import the modules
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import logger from './modules/logger';
import database from './modules/database';
import config from './modules/config';
import routes from './routes';
import authRequest from './middlewares/authRequest';

logger.info('DomoThink API is starting...');

// Initialize API configuration
config.initialize('config.ini');

// Database connection
database.setType('mysql');
database.connect(config.Config.database.username,
                 config.Config.database.password,
                 config.Config.database.host,
                 config.Config.database.database);

// Initialize the router
const router = express.Router(); // eslint-disable-line new-cap
router.get('/', function(req, res) {
  res.send('Home page');
});

// Configure application
let app = express();
app.use(session({secret: 'test'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// find a better implementation like: app.use('/api/*', authRequest);
/* app.all('/user');
app.all('/user/*');
app.all('/devices');
app.all('/devices/*');
app.all('/directives');
app.all('/directives/*');
app.all('/plugins/');
app.all('/plugins/*');*/

app.all('/user', authRequest);
app.all('/user/*', authRequest);
app.all('/devices', authRequest);
app.all('/devices/*', authRequest);
app.all('/directives', authRequest);
app.all('/directives/*', authRequest);
app.all('/plugins/', authRequest);
app.all('/plugins/*', authRequest);

app.use(router);
router.use('/', routes);

// Start the API
app.listen(config.Config.global.port); // If crashing on this line, the API is probably already running somewhere else
logger.info('DomoThink API listening on port %s', config.Config.global.port);
