// server.js
"use strict";

// Initialize the app
import bodyParser from 'body-parser';
import express from 'express';
import logger from './modules/logger';
// import bodyParser from 'body-parser';
// import express from 'express';
var app = express(); // create the app using express

// Configure the app
var port = 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Initialize the routes
// TODO: test

logger.info('Hello world!');
logger.warning('This is a warning!');
logger.notice('This is a notice');
logger.error('This is an error');

// Start the API
app.listen(port);
logger.info('DomoThink API listening on port %s', port);
