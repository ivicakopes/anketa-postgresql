var express = require('express');
var APV = require('../models/apv');

var router = express.Router();

router.get('/', (req, res) => {
  APV.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:anketa/:pitanje', (req, res) => {
  var anketa = req.params.anketa;
  var pitanje = req.params.pitanje;
  APV.retrieveAPVByAnketaAndPitanje( anketa, pitanje, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var pitanje = req.body.pitanje;
  var anketa = req.body.anketa;
  APV.insert( anketa, pitanje, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;