const db = require('../database');

class Pitanja {
  

  static retrieveAll (callback) {
    db.query('SELECT * from pitanja', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrievePitanjeByTekst (pitanje,callback) {
    db.query(`SELECT * from pitanja where pitanje = $1`,[pitanje],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrievePitanjeByVrsta (vrsta,callback) {
    db.query(`SELECT id_pitanja, pitanje from pitanja inner join pitanja_vrste on id_pitanja = pitanje_id where vrsta_id = $1`,[vrsta],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  
  static retrievePitanjeByAnketa (anketa,callback) {
    db.query(`SELECT id_pitanja, pitanje from pitanja inner join ankete_pitanja_vrste on id_pitanja = pitanje_id where anketa_id = $1`,[anketa],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (pitanje, callback) {
    db.query('INSERT INTO pitanja (pitanje) VALUES ($1)', [pitanje], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Pitanja;