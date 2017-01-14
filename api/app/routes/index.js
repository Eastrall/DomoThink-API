/**
 * index.js
 * Defines all the API routes.
 *
 */

import express from 'express';
import login from './login';
import users from './users';
import devices from './devices';
import directives from './directives';
import plugins from './plugins';
import update from './update';

const routes = express.Router(); // eslint-disable-line new-cap

// Login routes. Everyone can access this route
routes.post('/login', login.login);
routes.post('/create_account', users.createAccount);
routes.post('/logout', login.logout);
routes.post('/forgotten_password', users.forgottenPassword);

// Devices routes.
routes.get('/devices', devices.get);
routes.get('/devices/scan', devices.scan);
routes.post('/devices', devices.post);
routes.put('/devices', devices.put);
routes.put('/devices/changeStatus/', devices.changeStatus);
routes.delete('/devices/:id', devices.delete);

// Directives routes.
routes.get('/directives', directives.get);
routes.post('/directives', directives.post);
routes.put('/directives', directives.put);
routes.delete('/directives/:id', directives.delete);

// Plugins routes.
routes.get('/plugins', plugins.get);
routes.post('/plugins/install', plugins.install);
routes.delete('/plugins/uninstall/:id', plugins.uninstall);

// Box routes.
routes.get('/update', update.get);
routes.post('/update', update.update);

// User management routes
routes.get('/user', users.getAllUsers);
routes.get('/user/:id', users.getUser);
routes.post('/user', users.createUser);
routes.put('/user', users.updateUser);
routes.post('/user/change_password', users.changePassword);
routes.post('/user/delete', users.deleteAccount);

export default routes;
