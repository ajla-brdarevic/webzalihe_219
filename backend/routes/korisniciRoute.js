const korisniciController = require('./korisniciController')
//const { login, promjena_sifre } = require("../controllers/korisniciController");
const router = express.Router();
//const Korisnici = require('../models/korisnici');
//const bcrypt = require('bcrypt');
const express = require("express");

app.post('/login', (req, res) => {
    const { korisnicko_ime, sifra } = req.body;
    connection.query(
        'SELECT * FROM Korisnici WHERE korisnicko_ime = ? AND sifra = ?',
        [korisnicko_ime, sifra],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: 'Greška tokom log in-a!'
                });
            }
            if (results.length === 0) {
                return res.status(401).json({
                    error: 'Netačni podaci!'
                });
            }
            // If we reach this point, the login credentials are valid
            const korisnici = results[0];
            connection.query(
                'SELECT * FROM Zaposlenici WHERE id = ?',
                [korisnici.zaposlenici_id],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            error: 'Došlo je do greške prilikom pokušaja dohvaćanja korisničkih podataka'
                        });
                    }
                    if (results.length === 0) {
                        return res.status(401).json({
                            error: 'Netačni podaci!'
                        });
                    }
                    const zaposlenici = results[0];
                    if (zaposlenici.datum_otkaza !== null) {
                        return res.status(401).json({
                            error: 'Niste više aktivni zaposlenici!'
                        });
                    }
                    // If we reach this point, the user is an active employee
                    req.session.korisnici = korisnici;
                    res.json({
                        message: 'Uspješan log in!',
                        korisnik: {
                            id: korisnici.zaposlenici_id,
                            korisnicko_ime: korisnici.korisnicko_ime,
                            uloga: korisnici.uloga
                        }
                    });
                }
            );
        });
})