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
    secret: 'code',
    resave: true,
    saveUninitialized: true
 }));

app.post('/login', function(req, res) {
    const { username, password } = req.body;
    fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
        try {
            const korisnici = JSON.parse(data)
            let daLiPostoji = korisnici.find(korisnik => korisnik.username === username && bcrypt.compare(password,korisnik.password))
            if(daLiPostoji) {
                req.session.username = username;
                res.status(200).json({ poruka: 'Uspješna prijava' });
            } 
            else {
                res.status(401).json({ greska: 'Neuspješna prijava' });
            }
        }
        catch (error) {
            console.error('Greska prilikom parsiranja JSON podataka: ', error);
        }
    })
})

app.post('/logout', function(req, res){
    if (req.session.username) {
        req.session.destroy(err => {
            if (!err) {
                res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
            }
        });
    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.get('/korisnik', function(req, res) {
    if (req.session.username) {
        fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
            try {
                const korisnici = JSON.parse(data)
                const logovaniKorisnik = korisnici.find(korisnik => korisnik.username === req.session.username)
                    
                if(logovaniKorisnik) {
                    const { id, ime, prezime, username, password } = logovaniKorisnik;
                    res.status(200).json({ id, ime, prezime, username, password });
                }
            }
            catch (error) {
                console.error('Greska prilikom parsiranja JSON podataka: ', error);
            }
        })
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.post('/upit', function(req, res) {
    const { nekretnina_id, tekst_upita } = req.body;
    if (req.session.username) {
        fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
            try {
                const korisnici = JSON.parse(data)
                const logovaniKorisnik = korisnici.find(korisnik => korisnik.username === req.session.username)
                    
                if(logovaniKorisnik) {
                    const id = logovaniKorisnik.id;
                    fs.readFile('data/nekretnine.json', 'utf8', (err, data) => {
                        try {
                            const nekretnine = JSON.parse(data)
                            const nekretnina = nekretnine.find(property => property.id === nekretnina_id);
                                
                            if(!nekretnina) {
                                res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
                            }
                            else {
                                nekretnina.upiti.push({
                                    korisnik_id: id,
                                    tekst_upita: tekst_upita
                                })
                                fs.writeFile('data/nekretnine.json', JSON.stringify(nekretnine, null, 2), (err) => {
                                    if (err) {
                                        console.error('Greska prilikom pisanja u datoteku: ', err);
                                    } else {
                                        res.status(200).json({ poruka: 'Upit je uspješno dodan' });
                                    }
                                });
                            }
                        }
                        catch (error) {
                            console.error('Greska prilikom parsiranja JSON podataka: ', error);
                        }
                    })
                }
            }
            catch (error) {
                console.error('Greska prilikom parsiranja JSON podataka: ', error);
            }
        })
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
})

app.put('/korisnik', function(req, res) {
    const { ime, prezime, username, password } = req.body;
    if (req.session.username) {
        fs.readFile('data/korisnici.json', 'utf8', (err, data) => {
            try {
                const korisnici = JSON.parse(data)
                const logovaniKorisnik = korisnici.find(korisnik => korisnik.username === req.session.username)
                    
                if (ime) logovaniKorisnik.ime = ime;
                if (prezime) logovaniKorisnik.prezime = prezime;
                if (username) {
                    logovaniKorisnik.username = username;
                    req.session.username = username
                }
                if (password) {
                    bcrypt.hash(password, 10, function(err, hash) {
                        logovaniKorisnik.password = hash
                    });          
                }

                fs.writeFile('data/korisnici.json', JSON.stringify(korisnici, null, 2), (err) => {
                    if (err) {
                        console.error('Greska prilikom pisanja u datoteku: ', err);
                    } 
                    else {
                        res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                    }
                });
            }
            catch (error) {
                console.error('Greska prilikom parsiranja JSON podataka: ', error);
            }
        })
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
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