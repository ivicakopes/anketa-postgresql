var express = require('express');
var PV = require('../models/pv');

var router = express.Router();

router.get('/', (req, res) => {
  PV.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var pitanje = req.body.pitanje;
  var vrsta = req.body.vrsta;
  
  PV.insert(pitanje, vrsta, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;