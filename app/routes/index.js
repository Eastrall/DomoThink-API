/**
 * index.js
 * Defines all the API routes.
 *
 */

import express from 'express';
import login from './login';
import users from './users';
import devices from './devices';
// import devices from './devices';
// import directives from './directives';
// import box from './box';
// import plugins from './plugins'
// import store from './store';

const routes = express.Router(); // eslint-disable-line new-cap

// Login route. Everyone can access this route
routes.post('/login', login.login);
routes.post('/logout', login.logout);

// Devices route.
routes.get('/devices', devices.get);
routes.post('/devices', devices.post);
routes.delete('/devices/:id', devices.delete);

// User management routes
routes.get('/user', users.getAllUsers);
routes.get('/user/:id', users.getUser);
routes.post('/user', users.createUser);
routes.put('/user', users.updateUser);
routes.delete('/user', users.deleteUser);

// Devices management routes
// Directive management routes
// Plugins management routes
// Box management routes
// Store management routes

export default routes;
