const express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.static('public/html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'code',
    resave: true,
    saveUninitialized: true
 }));

app.post('/login', function(req, res) {
    const { username, password } = req.body;
    fs.readFile('data/korisnici.json', 'utf8', async (err, data) => {
        try {
            const korisnici = JSON.parse(data)
            let daLiPostoji = korisnici.find(korisnik => korisnik.username === username)
            let ispravanPassword = false 
            if(daLiPostoji) {
                ispravanPassword = await bcrypt.compare(password, daLiPostoji.password); 
            }
            if (ispravanPassword){
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
                    res.status(200).json(logovaniKorisnik);
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

app.post('/marketing/nekretnine', function(req, res) {
    const { nizNekretnina } = req.body;
    req.session.nekretnine = []

    fs.readFile('data/pomocni.json', 'utf8', async (err, data) => {
        if (err) {
            console.error('Greska prilikom citanja datoteke: ', err);
        }      
        try {
            const mark = await JSON.parse(data);
            fs.readFile('data/pomocni.json', 'utf8', async (err, data) => {
            const marketing = await JSON.parse(data);
            const nekretnine = nizNekretnina || [];

            for (const id of nekretnine) {
                var nekretnina = marketing.find(k => k.id === id);

                if (!nekretnina) {
                    marketing.push({
                        id: parseInt(id, 10),
                        klikovi: 0,
                        pretrage: 0
                    });
                    nekretnina = marketing.find(k => k.id === id);
                }
                nekretnina.pretrage += 1;
            }

            req.session.nekretnine = marketing

            fs.writeFile('data/pomocni.json', JSON.stringify(marketing, null, 2), (err) => {
                if (err) {
                    console.error('Greska prilikom pisanja u datoteku: ', err);
                }

                res.status(200).json();
            });
        })
        } 
        catch (error) {
            console.error('Greska prilikom parsiranja JSON podataka: ', error);
        }
    });
});

app.post('/marketing/nekretnina/:id', function(req, res) {
    const nekretninaId = req.params.id;
    req.session.nekretnine = []

    fs.readFile('data/pomocni.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Greska prilikom citanja datoteke: ', err);
        }

        try {
            const marketing = JSON.parse(data);

            const nekretnina = marketing.find(k => k.id == nekretninaId);

            if(!nekretnina) {
                const novaNekretnina = {
                    id: parseInt(nekretninaId, 10),
                    klikovi: 0,
                    pretrage:0
                }
                marketing.push(novaNekretnina)
                nekretnina = marketing.find(k => k.id == nekretninaId);
            }

            nekretnina.klikovi += 1;

            fs.writeFile('data/pomocni.json', JSON.stringify(marketing, null, 2), (err) => {
                if (err) {
                    console.error('Greska prilikom pisanja u datoteku: ', err);
                }

                res.status(200).json();
            });
            
        } 
        catch (error) {
            console.error('Greska prilikom parsiranja JSON podataka: ', error);
        }
    });
});
app.post('/marketing/osvjezi', function(req, res) {
    if (req.session){
        let { nizNekretnina } = req.body;

        fs.readFile('data/pomocni.json', 'utf8', async (err, data) => {
            try {
                
                fs.readFile('data/pomocni.json', 'utf8',  async (err, data) => {
                    if (Object.keys(req.body).length === 0) {
                        nizNekretnina = req.session.nekretnine
                    }
                    const marketing = await JSON.parse(data);
                                
                    const nizOsvjezavanja = {
                        nizNekretnina: marketing
                            .filter(item => nizNekretnina.includes(item.id))
                            .map(({ id, klikovi, pretrage }) => ({ id, klikovi, pretrage }))
                    };
                
                    let nizPosalji = {
                        nizNekretnina : []
                    }
                            
                    if (Object.keys(req.body).length === 0 && req.session.osvjezi != undefined) {
                        marketing.forEach(x => {
                            const nekretnina = req.session.osvjezi.nizNekretnina.find(nek => nek.id == x.id)
                            if (nekretnina) {
                                if (nekretnina.pretrage != x.pretrage) {
                                    nizPosalji.nizNekretnina.push(x)
                                }
                                if (nekretnina.klikovi != x.klikovi) {
                                    nizPosalji.nizNekretnina.push(x)
                                }
                            }
                        })
                    }
                    
                    if (nizPosalji.nizNekretnina.length) {
                        req.session.osvjezi = nizPosalji
                        res.status(200).json(nizPosalji)
                    }
                    else if (Object.keys(req.body).length === 0 && req.session.osvjezi != undefined && req.session.osvjezi.length) {
                        res.status(200).json()
                    }
                    else {
                        req.session.nekretnine = []
                        req.session.osvjezi = nizOsvjezavanja
                        res.status(200).json(nizOsvjezavanja)
                    }
                } )
            }
            catch (error) {
                console.error('Greska prilikom parsiranja JSON podataka: ', error);
            }
        });
    }
});
    
app.listen(3000);