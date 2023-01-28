/*const bcrypt = require('bcrypt');

exports.login = (req, res) => {
    const { korisnicko_ime, sifra } = req.body;

    connection.query(
        'SELECT * FROM Korisnici WHERE korisnicko_ime = ?',
        [korisnicko_ime],
        (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: 'An error occurred while trying to login'
                });
            }
            if (results.length < 1) {
                return res.status(401).json({
                    error: 'Invalid credentials'
                });
            }
            const korisnici = results[0];
            connection.query(
                'SELECT * FROM Zaposlenici WHERE id = ?',
                [korisnici.zaposlenici_id],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            error: 'An error occurred while trying to login'
                        });
                    }
                    if (results.length < 1) {
                        return res.status(401).json({
                            error: 'Invalid credentials'
                        });
                    }
                    const zaposlenici = results[0];
                    if (zaposlenici.datum_otkaza !== null) {
                        return res.status(401).json({
                            error: 'You are no longer an active employee'
                        });
                    }
                    bcrypt.compare(sifra, korisnici.sifra, (err, result) => {
                        if (err) {
                            return res.status(500).json({
                                bcrypt.compare(sifra, korisnici.sifra, (err, result) => {
                                    if (err) {
                                        return res.status(500).json({
                                            error: 'An error occurred while trying to login'
                                        });
                                    }
                                    if (!result) {
                                        return res.status(401).json({
                                            error: 'Invalid credentials'
                                        });
                                    }
                                    // If we reach this point, the password is correct
                                    req.session.korisnici = korisnici;
                                    res.json({
                                        message: 'You have successfully logged in',
                                        korisnici: {
                                            id: korisnici.zaposlenici_id,
                                            korisnicko_ime: korisnici.korisnicko_ime,
                                            uloga: korisnici.uloga
                                        }
                                    });
                                })
                            })
                        }
                    })
                })
        }
    )
}                        */          