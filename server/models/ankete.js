const db = require('../database');

class Ankete {
  

  static retrieveAll (callback) {
    db.query('SELECT * from ankete', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveAnketaById (id,callback) {
    db.query(`SELECT * from ankete where id_ankete = $1`,[id],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveNepopunjeneAnkete (id,callback) {
    db.query(`select * from ankete where id_ankete not in(SELECT distinct anketa_id from odgovori where korisnik_id = $1)`,[id],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (naziv, datum, uloga , callback) {
    db.query('INSERT INTO ankete (naziv_ankete, datum, vrsta_ankete) VALUES ($1,$2,$3)', [naziv, datum, uloga], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Ankete;

/* select * from ankete 
where id_ankete not in(SELECT distinct anketa_id from odgovori 
where korisnik_id =1) */