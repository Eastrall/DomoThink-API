/**
 * index.js
 * Defines all the API routes.
 *
 */

import express from 'express';
import users from './users';
// import objects from './objects';
// import directives from './directives';

const routes = express.Router(); // eslint-disable-line new-cap

// User management routes
routes.get('/user', users.getAllUsers);
routes.get('/user/:id', users.getUser);
routes.post('/user', users.createUser);
routes.put('/user', users.updateUser);
routes.delete('/user', users.deleteUser);

// Object management routes
// Directive management routes

export default routes;
