import express from 'express';
import TestRoutes from './TestRoutes';
import UserRoutes from './UserRoutes';

const Routes = express.Router(); // eslint-disable-line new-cap
Routes.use('/test', TestRoutes);
Routes.use('/user', UserRoutes);

export default Routes;
