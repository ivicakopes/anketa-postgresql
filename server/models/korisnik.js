const db = require('../database');

class Korisnik {
  

  static retrieveAll (callback) {
    db.query('SELECT id_korisnik, log_ime, ime, prezime, vrsta_id from korisnik', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveKorisnikByLogIme (log_ime,callback) {
    db.query(`SELECT distinct  log_ime from korisnik where log_ime = $1`,[log_ime],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static retrieveKorisnikByLogImeAndPassword (log_ime, password, callback) {
    db.query(`SELECT id_korisnik, log_ime, ime, prezime, vrsta_id from korisnik where log_ime = $1 and password = $2`,[log_ime, password],(err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (log_ime, ime, prezime, vrsta_id, password, callback) {
    db.query('INSERT INTO korisnik (log_ime, ime, prezime, vrsta_id, password) VALUES ($1,$2,$3,$4,$5)', [log_ime, ime, prezime, vrsta_id, password], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Korisnik;