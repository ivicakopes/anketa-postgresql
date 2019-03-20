var express = require('express');
var Vrste = require('../models/vrste');

var router = express.Router();

router.get('/', (req, res) => {
  Vrste.retrieveAll((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.get('/bezAdmina', (req, res) => {
  Vrste.retrieveAllBezAdmina((err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

router.post('/', (req, res) => {
  var vrste = req.body.vrste;

  Vrste.insert(vrste, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;