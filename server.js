// server.js

// Initialize the app
import bodyParser from 'body-parser';
import express from 'express';
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
