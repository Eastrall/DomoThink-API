import express from 'express';
import DBModels from '../models/DBModels';

const TestRoutes = express.Router(); // eslint-disable-line new-cap
TestRoutes.get('/', function(req, res) {
  DBModels.TestModel.all((err, results) => {
    res.send(results);
  });
});

export default TestRoutes;
