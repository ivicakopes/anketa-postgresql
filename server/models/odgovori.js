const db = require('../database');

class Odgovori {
  

  static retrieveAll (callback) {
    db.query('SELECT * from odgovori', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveOdgovorById (id,callback) {
    db.query(`SELECT * from odgovori where id_odgovora = $1`,[id],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (anketa, korisnik, pitanje, odgovor, callback) {
    db.query('INSERT INTO odgovori (anketa_id, korisnik_id, pitanje_id, odgovor ) VALUES ($1,$2,$3,$4)', [anketa, korisnik, pitanje, odgovor], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Odgovori;