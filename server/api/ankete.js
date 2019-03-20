var express = require('express');
var Ankete = require('../models/ankete');

var router = express.Router();

router.get('/', (req, res) => {
  Ankete.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:anketa', (req, res) => {
  var anketa = req.params.anketa;
  Ankete.retrieveAnketaById(anketa, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var anketa = req.body.anketa;

  Ankete.insert(anketa, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;