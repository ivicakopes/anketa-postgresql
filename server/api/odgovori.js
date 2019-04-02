var express = require('express');
var Odgovori = require('../models/odgovori');

var router = express.Router();

router.get('/', (req, res) => {
  Odgovori.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/ankete', (req, res) => {
  Odgovori.retrieveOdgovoriByAnkete((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:anketa', (req, res) => {
  var odgovor = req.params.odgovor;
  Odgovori.retrieveOdgovorById(odgovor, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var anketa = req.body.anketa;
  var korisnik = req.body.korisnik;
  var pitanje = req.body.pitanje;
  var odgovor = req.body.odgovor;

  Odgovori.insert(anketa, korisnik, pitanje, odgovor, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;