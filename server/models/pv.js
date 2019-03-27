const db = require('../database');

class PV {
  static retrieveAll (callback) {
    db.query('SELECT * from pitanja_vrste', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrievePVByPitanjeAndVrsta (pitanje, vrsta, callback) {
    db.query(`SELECT * from pitanja_vrste  where pitanje_id = $1 and vrsta_id = $2`,[pitanje, vrsta],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (pitanje, vrsta, callback) {
    db.query('INSERT INTO pitanja_vrste (pitanje_id, vrsta_id) VALUES ($1,$2)', [pitanje, vrsta], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = PV;