const express = require('express');
const Joi = require('joi');
const { MongoClient } = require('mongodb');
const Calcul = require('../helpers/Calcul');

const router = express.Router();

const maxDistance = 10;

const rootUrl = 'mongodb://localhost:27017';

router.get('/report/:lat/:long', (req, res) => {
  const { lat, long } = req.params;
  const currentPosition = {
    latitude: lat,
    longitude: long,
  };
  MongoClient.connect(rootUrl, (err, db) => {
    const dbo = db.db('cpark');
    dbo.collection('reports').find({}).toArray((error, result) => {
      const reportsToSend = result.filter((item) => {
        const report = item;
        const distance = Calcul.distanceBeetweenPoint(currentPosition, report.coordinate);
        report.distance = distance;
        return distance <= maxDistance;
      });

      res.send(reportsToSend);
      db.close();
    });
  });
});

router.post('/report', (req, res) => {
  const schema = {
    title: Joi.string().min(3).required(),
    time: Joi.string().required(),
    coordinate: {
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    },
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const report = {
    ...req.body,
  };
  report.time = new Date(report.time);

  MongoClient.connect(rootUrl, (err, db) => {
    const dbo = db.db('cpark');
    dbo.collection('reports').insertOne(report, () => {
      db.close();
    });
    res.send({ success: true });
  });
});

module.exports = router;
