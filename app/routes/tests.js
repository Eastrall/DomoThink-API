import express from 'express';
import ModelManager from '../models/ModelManager';

const TestRoutes = express.Router();
ModelManager.getTest(); // eslint-disable-line new-cap
TestRoutes.get('/', function(req, res) {
  ModelManager.TestModel.all((err, results) => {
    res.send(results);
  });
});

export default TestRoutes;
