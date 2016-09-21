import express from 'express';
import DBModels from '../models/DBModels';

const UserRoutes = express.Router(); // eslint-disable-line new-cap
UserRoutes.get('/', function(req, res) {
  res.send("User working");
});

export default UserRoutes;
