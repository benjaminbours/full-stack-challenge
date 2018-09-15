const express = require('express');
const Joi = require('joi');
const mongo = require('mongodb');

const router = express.Router();

const reports = [
  {
    title: 'fake',
    time: '2h30',
    coordinate: {
      latitude: 30,
      longitude: 30,
    },
  },
  {
    title: 'fake2',
    time: '2h30',
    coordinate: {
      latitude: 30,
      longitude: 30,
    },
  },
];

router.get('/report/:lat/:long', (req, res) => {
  res.send(reports);
});

router.post('/report', (req, res) => {
  const schema = {
    title: Joi.string().min(3).required(),
    time: Joi.string().min(5).required(),
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
  reports.push(report);
  res.send({ success: true });
});

router.get('/report/:lat/:long', (req, res) => {
  console.log(req.params);
  res.send(reports);
});

module.exports = router;
