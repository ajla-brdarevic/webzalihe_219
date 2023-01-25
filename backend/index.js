const express = require("express")
const mysql = require("mysql2")

const korisniciRoute = require('./routes/korisniciRoute')

const app = express()

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

app.use('/login', korisniciRoute);

app.listen(8800, () => {
    console.log("Connected to backend!")
})