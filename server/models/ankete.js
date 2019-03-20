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

  static insert (anketa, callback) {
    db.query('INSERT INTO ankete (anketa) VALUES ($1)', [anketa], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Ankete;