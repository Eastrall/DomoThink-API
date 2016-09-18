// server.js

// Initialize the app
var bodyParser = require('body-parser');
var express = require('express');
var app = express(); // create the app using express

// Configure the app
var port = 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Initialize the routes
// TODO

// Start the API
app.listen(port);
console.log('DomoThink API listening on port ' + port);
