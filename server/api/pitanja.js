var express = require('express');
var Pitanja = require('../models/pitanja');

var router = express.Router();

router.get('/', (req, res) => {
  Pitanja.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:pitanje', (req, res) => {
  var pitanje = req.params.pitanje;
  Pitanja.retrievePitanjeByTekst(pitanje, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/vrsta/:vrsta', (req, res) => {
  var vrsta = req.params.vrsta;
  Pitanja.retrievePitanjeByVrsta(vrsta, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/anketa/:anketa', (req, res) => {
  var anketa = req.params.anketa;
  Pitanja.retrievePitanjeByAnketa(anketa, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var pitanje = req.body.pitanje;

  Pitanja.insert(pitanje, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;