const db = require('../database');

class APV {
  static retrieveAll (callback) {
    db.query('SELECT * from ankete_pitanja_vrste', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveAPVByAnketaAndPitanje (anketa, pitanje, callback) {
    db.query(`SELECT * from ankete_pitanja_vrste  where anketa_id = $1 and pitanje_id = $2`,[anketa, pitanje],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert ( anketa, pitanje,  callback) {
    db.query('INSERT INTO ankete_pitanja_vrste (anketa_id, pitanje_id) VALUES ($1,$2)', [anketa, pitanje], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = APV;