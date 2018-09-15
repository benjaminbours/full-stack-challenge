const express = require('express');
const Joi = require('joi');
const { MongoClient } = require('mongodb');
const Calcul = require('../helpers/Calcul');

const router = express.Router();

const reports = [
  {
    title: 'fake',
    time: '02:30',
    coordinate: {
      latitude: 50.67544,
      longitude: 4.2,
    },
  },
];

const maxDistance = 10;

router.get('/report/:lat/:long', (req, res) => {
  const { lat, long } = req.params;
  const currentPosition = {
    latitude: lat,
    longitude: long,
  };
  const url = 'mongodb://localhost:27017/';
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db('cpark');
    dbo.collection('reports').find({}).toArray((error, result) => {
      console.log(result);

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

  const url = 'mongodb://localhost:27017/cpark';
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db('cpark');
    dbo.collection('reports').insertOne(report, (err, res) => {
      console.log('1 report inserted');
      db.close();
    });
    res.send({ success: true });
  });
});

module.exports = router;
