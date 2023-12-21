const express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(bodyParser.json());
app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));

app.post('/login', function(req, res) {
    const { username, password } = req.body;
    fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
        try {
            bcrypt.hash(password, 10, function(err, hash){
                const korisnici = JSON.parse(data)
                let daLiPostoji = korisnici.find(korisnik => korisnik.username === username && korisnik.password === hash)
                
                if(daLiPostoji) {
                    res.status(200).json({ poruka: 'Uspješna prijava' });
                } 
                else {
                    res.status(401).json({ greska: 'Neuspješna prijava' });
                }
            });
        }
        catch (error) {
            console.error('Greska prilikom parsiranja JSON podataka: ', error);
        }
    })
})

app.get('/nekretnine', function(req, res) {
    fs.readFile('data/nekretnine.json', 'utf8', (err, data) => {
        try {
            const nekretnine = JSON.parse(data)
            res.status(200).json(nekretnine);
        }
        catch (error) {
            console.error('Greska prilikom parsiranja JSON podataka: ', error);
        }
    })
})

app.listen(3000);