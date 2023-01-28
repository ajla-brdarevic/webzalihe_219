const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

//const korisniciRoute = require('./routes/korisniciRoute')

const app = express()

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "dbzalihe_219"
})

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("MySql database...")
    }
})

app.get("/", (req, res) => {
    res.json("Radiiiiii!!!!")
})


//LOGIN
app.post('/login', (req, res) => {
    const korisnicko_ime = req.body.korisnicko_ime;
    const sifra = req.body.sifra;

    db.query(
        "SELECT * FROM Korisnici JOIN Zaposlenici ON Korisnici.zaposlenik_id = Zaposlenici.id WHERE korisnicko_ime = ? AND sifra = ? AND (datum_otkaza IS NULL OR datum_otkaza > CURRENT_DATE)",
        [korisnicko_ime, sifra],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result)
            } else {
                res.send({ message: "Pogrešna kombinacija korisničko ime/šifra ili niste više zaposlenik i nemate pristup sistemu!" })
            }
        }
    );
});

//PROMJENA ŠIFRE KORISNIKA
app.post('/change-password', (req, res) => {
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const username = req.body.username;

    db.query("SELECT 1 FROM Korisnici WHERE korisnicko_ime = ?", [username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error checking if user exists' });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "Incorrect username." });
        }
        db.query("SELECT 1 FROM Korisnici WHERE korisnicko_ime = ? AND sifra = ?", [username, currentPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error checking current password' });
            }
            if (result.length === 0) {
                return res.status(400).json({ message: "Incorrect current password." });
            }
            db.query("UPDATE Korisnici SET sifra = ? WHERE korisnicko_ime = ?", [newPassword, username], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error updating password' });
                }
                res.json({ message: "Successfully changed password." });
            });
        });
    });
});


//PREGLED DOBAVLJAČA
app.get('/dobavljaci', (req, res) => {
    db.query("SELECT * FROM Dobavljaci", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});

//IZMJENA DOBAVLJAČA
app.put('/dobavljaci/:id', (req, res) => {
    const id = req.params.id;
    const naziv = req.body.naziv;
    const jib = req.body.jib;
    const pdv = req.body.pdv;
    const broj_telefona = req.body.broj_telefona;
    const kontakt_osoba = req.body.kontakt_osoba;
    const email_adresa = req.body.email_adresa;
    const datum_pocetka = req.body.datum_pocetka;
    const datum_zavrsetka = req.body.datum_zavrsetka;

    db.query(
        "UPDATE Dobavljaci SET naziv = ?, jib = ?, pdv = ?, broj_telefona = ?, kontakt_osoba = ?, email_adresa = ?, datum_pocetka = ?, datum_zavrsetka = ? WHERE id = ?",
        [naziv, jib, pdv, broj_telefona, kontakt_osoba, email_adresa, datum_pocetka, datum_zavrsetka, id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            } else {
                res.send({ message: "Podaci o dobavljaču uspješno izmijenjeni!" });
            }
        }
    );
});

//PREGLED SIROVINA
app.get('/sirovine', (req, res) => {
    db.query("SELECT * FROM Sirovine", (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});


//DODAVANJE SIROVINA
app.post('/dodavanje-sirovina', (req, res) => {
    const { naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id } = req.body;

    db.query("INSERT INTO Sirovine (naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id) VALUES (?,?,?,?,?,?,?)", [naziv, kolicina, min_kolicina, cijena, jedinica_mjere, da_li_se_koristi, dobavljac_id], (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.redirect('/sirovine');
        }
    });
});


//IZMJENA SIROVINA
app.put('/sirovine/:id', (req, res) => {
    const { id } = req.params;
    const { naziv, kolicina, min_kolicina, cijena, jedinica_mjere, dobavljac_id } = req.body;
    const query = `UPDATE Sirovine SET naziv = '${naziv}', kolicina = ${kolicina}, min_kolicina = ${min_kolicina}, 
    cijena = ${cijena}, jedinica_mjere = '${jedinica_mjere}', dobavljac_id = ${dobavljac_id} WHERE id = ${id}`;
    db.query(query, (err, result) => {
        if (err) {
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});





app.listen(8800, () => {
    console.log("Connected to backend!")
})