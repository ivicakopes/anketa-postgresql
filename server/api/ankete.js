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

router.get('/nepopunjene/:korisnik', (req, res) => {
  var korisnik = req.params.korisnik;
  Ankete.retrieveNepopunjeneAnkete(korisnik, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var naziv_ankete = req.body.naziv_ankete;
  var datum = req.body.datum;
  var vrsta_ankete = req.body.vrsta_ankete;

  Ankete.insert(naziv_ankete, datum, vrsta_ankete, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;