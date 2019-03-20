var express = require('express');
var Korisnik = require('../models/korisnik');

var router = express.Router();

router.get('/', (req, res) => {
  Korisnik.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:log_name', (req, res) => {
  var log_name = req.params.log_name;
  Korisnik.retrieveKorisnikByLogIme(log_name, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/:log_name/:password', (req, res) => {
  var log_name = req.params.log_name;
  var password = req.params.password;
  Korisnik.retrieveKorisnikByLogImeAndPassword(log_name,  password, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var log_ime = req.body.log_ime;
  var ime = req.body.ime;
  var prezime = req.body.prezime;
  var vrsta_id = req.body.vrsta_id;
  var password = req.body.password;
  
  Korisnik.insert(log_ime, ime, prezime, vrsta_id, password, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;