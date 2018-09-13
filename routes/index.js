const express = require('express');

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
];

router.post('/report', (req, res) => {
  const report = {
    ...req.body,
  };
  reports.push(report);
  res.send(reports);
});

router.get('/report/:lat/:long', (req, res) => {
  console.log(req.params);
  res.send(reports);
});

module.exports = router;
