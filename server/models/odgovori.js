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

  static retrieveOdgovoriByAnkete (callback) {
    db.query(`select p.anketa_id, p.pitanje_id, p.id_ocene , coalesce(brojac.ukupno,0) suma
    from (select anketa_id, pitanje_id, id_ocene from ankete_pitanja_vrste apv, ocene) p 
    left join (select anketa_id , pitanje_id , odgovor, count(odgovor) ukupno
            from odgovori				
            group by anketa_id , pitanje_id , odgovor
            order by anketa_id , pitanje_id , odgovor) brojac
    
    on brojac.anketa_id= p.anketa_id
    and (brojac.pitanje_id=p.pitanje_id 
    and brojac.odgovor=p.id_ocene)
    
    order by p.anketa_id, p.pitanje_id, id_ocene`,(err, res) => {
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