const express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const fs = require('fs');

const korisnik1 = {ime: "Neko", prezime: "Nekic", username: "username1", password: "$2b$10$M6SHS5Ky7JcZo.yNz3Ew9.3tajVIfJ/utuvgAlmvKj1QOsjNJjSDW"};
const korisnik2 = {ime: "Neko2", prezime: "Nekic2", username: "username2", password: "$2b$10$9x091ujeXDtUVukU8zY7Nepn.30ys4olE0eqp6lLYPcWYREiVs5Su"};

const nekretnina1 = {tip_nekretnine: "Stan", naziv: "Useljiv stan Sarajevo", kvadratura: 58, cijena: 232000, tip_grijanja: "plin", lokacija: "Novo Sarajevo", godina_izgradnje: 2019, datum_objave: "01.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina2 = {tip_nekretnine: "Poslovni prostor", naziv: "Mali poslovni prostor", kvadratura: 20, cijena: 70000, tip_grijanja: "struja", lokacija: "Centar", godina_izgradnje: 2005, datum_objave: "20.08.2023.", opis: "Magnis dis parturient montes.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina3 = {tip_nekretnine: "Stan", naziv: "Prostran stan na Dobrinji", kvadratura: 90, cijena: 350000, tip_grijanja: "centralno", lokacija: "Dobrinja", godina_izgradnje: 2018, datum_objave: "05.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina4 = {tip_nekretnine: "Poslovni prostor", naziv: "Moderni uredi u Sarajevu", kvadratura: 150, cijena: 400000, tip_grijanja: "klima", lokacija: "Marijin Dvor", godina_izgradnje: 2021, datum_objave: "07.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina5 = {tip_nekretnine: "Poslovni prostor", naziv: "Prostor za kafić", kvadratura: 80, cijena: 280000, tip_grijanja: "klima", lokacija: "Ilidža", godina_izgradnje: 2020, datum_objave: "10.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina6 = {tip_nekretnine: "Stan", naziv: "Mali stan Sarajevo", kvadratura: 40, cijena: 200000, tip_grijanja: "plin", lokacija: "Vogošća", godina_izgradnje: 2019, datum_objave: "01.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina7 = {tip_nekretnine: "Kuća", naziv: "Luksuzna vila", kvadratura: 350, cijena: 850000, tip_grijanja: "centralno", lokacija: "Bjelašnica", godina_izgradnje: 2022, datum_objave: "01.11.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina8 = {tip_nekretnine: "Kuća", naziv: "Porodična kuća sa bazenom", kvadratura: 280, cijena: 500000, tip_grijanja: "toplana", lokacija: "Ilidža", godina_izgradnje: 2019, datum_objave: "01.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};
const nekretnina9 = {tip_nekretnine: "Kuća", naziv: "Vikendica na planini", kvadratura: 180, cijena: 280000, tip_grijanja: "kamin", lokacija: "Trebević", godina_izgradnje: 2019, datum_objave: "01.10.2023.", opis: "Sociis natoque penatibus.", broj_klikova: 1, broj_pretraga: 1};

const upit11 = {tekst_upita: "Nullam eu pede mollis pretium.", NekretninaId: 1, KorisnikId  : 1};
const upit12 = {tekst_upita: "Phasellus viverra nulla.", NekretninaId: 1, KorisnikId  : 2};
const upit21 = {tekst_upita: "Vestibulum ante ipsum primis.", NekretninaId: 2, KorisnikId  : 1};
const upit22 = {tekst_upita: "Aenean massa.", NekretninaId: 2, KorisnikId  : 2};
const upit23 = {tekst_upita: "Nunc tincidunt ante vitae massa.", NekretninaId: 2, KorisnikId  : 2};
const upit31 = {tekst_upita: "Etiam ultricies nisi vel augue.", NekretninaId: 3, KorisnikId  : 2};
const upit32 = {tekst_upita: "Duis aute irure dolor.", NekretninaId: 3, KorisnikId  : 1};
const upit41 = {tekst_upita: "Quisque rutrum.", NekretninaId: 4, KorisnikId  : 1};
const upit42 = {tekst_upita: "Curabitur arcu erat.", NekretninaId: 4, KorisnikId  : 1};
const upit51 = {tekst_upita: "Vivamus suscipit tortor.", NekretninaId: 5, KorisnikId  : 2};
const upit52 = {tekst_upita: "Mauris blandit aliquet elit.", NekretninaId: 5, KorisnikId  : 2};
const upit61 = {tekst_upita: "Pellentesque in ipsum id.", NekretninaId: 6, KorisnikId  : 1};
const upit62 = {tekst_upita: "Nulla porttitor accumsan tincidunt.", NekretninaId: 6, KorisnikId  : 2};
const upit71 = {tekst_upita: "Proin eget tortor risus.", NekretninaId: 7, KorisnikId  : 1};
const upit72 = {tekst_upita: "Vestibulum ac diam sit amet.", NekretninaId: 7, KorisnikId  : 2};
const upit81 = {tekst_upita: "Nulla quis lorem ut libero malesuada.", NekretninaId: 8, KorisnikId  : 1};
const upit82 = {tekst_upita: "Sed porttitor lectus nibh.", NekretninaId: 8, KorisnikId  : 1};
const upit91 = {tekst_upita: "Aenean sollicitudin.", NekretninaId: 9, KorisnikId  : 2};
const upit92 = {tekst_upita: "Curabitur non nulla.", NekretninaId: 9, KorisnikId  : 2};

const db = require('./db.js');

db.sequelize.sync({force: true}).then(async function () {
    await db.korisnik.bulkCreate([korisnik1,korisnik2]);
    await db.nekretnina.bulkCreate([nekretnina1,nekretnina2,nekretnina3,nekretnina4,nekretnina5,nekretnina6,nekretnina7,nekretnina8,nekretnina9]);
    await db.upit.bulkCreate([upit11,upit12,upit21,upit22,upit23,upit31,upit32,upit41,upit42,upit51,upit52,upit61,upit62,upit71,upit72,upit81,upit82,upit91,upit92]);
})

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
                if (ispravanPassword){
                    req.session.username = username;
                    res.status(200).json({ poruka: 'Uspješna prijava' });
                } 
            }
            if(!ispravanPassword)
                res.status(401).json({ greska: 'Neuspješna prijava' });
            
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
    if (!req.session.username) {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
    else {
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
                                    if (!err) {
                                        res.status(200).json({ poruka: 'Upit je uspješno dodan' });
                                    }
                                    else {
                                        console.error('Greska prilikom pisanja u datoteku: ', err);
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
                    
                if (logovaniKorisnik) {
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
                        if (!err) {
                            res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
                        }
                        else {
                            console.error('Greska prilikom pisanja u datoteku: ', err);
                        }
                    });
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
        try {
           const mark = await JSON.parse(data);
            fs.readFile('data/pomocni.json', 'utf8', async (err, data) => {
                try{
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
                        nekretnina.pretrage = nekretnina.pretrage + 1;
                    }
    
                    req.session.nekretnine = marketing
    
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
        try {
            const marketing = JSON.parse(data);

            const nekretnina = marketing.find(k => k.id == nekretninaId);

            if (!nekretnina) {
                const novaNekretnina = {
                    id: parseInt(nekretninaId, 10),
                    klikovi: 0,
                    pretrage: 0
                }
                marketing.push(novaNekretnina)
                nekretnina = marketing.find(k => k.id == nekretninaId);
            }

            nekretnina.klikovi = nekretnina.klikovi + 1;

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
    if (!req.session) {
        console.log('nema sesije')
    }
    else {
        let { nizNekretnina } = req.body;
        fs.readFile('data/pomocni.json', 'utf8',  async (err, data) => {
            try {
                if (Object.keys(req.body).length === 0) {
                    nizNekretnina = req.session.nekretnine
                }
                const marketing = await JSON.parse(data);
                            
                const nizOsvjezavanja = {
                    nizNekretnina: marketing
                        .filter(item => nizNekretnina.includes(item.id))
                        .map(({ id, klikovi, pretrage }) => ({ id, klikovi, pretrage }))
                };
            
                
                if(req.session.osvjezi != undefined && Object.keys(req.body).length == 0 && req.session.osvjezi.length != 0 ){
                    res.status(200).json()
                }
                else {
                    req.session.nekretnine = []
                    req.session.osvjezi = nizOsvjezavanja
                    res.status(200).json(nizOsvjezavanja)
                }

            }
            catch (error) {
                console.error('Greska prilikom parsiranja JSON podataka: ', error);
            }
        } )    
    }
});
    
/*app.get('/nekretnina/:id', async function (req, res) {
    try {
        let nekretnina = await db.nekretnina.findOne({ where: { id: req.params.id } });
        
        if (!nekretnina) {
            return res.status(400).json({ greska: `Nekretnina sa id-em ${req.params.id} ne postoji` });
        }
        else {
            let upiti = await db.upit.findAll({ where : { NekretninaId: req.params.id }})
            nekretnina = {...nekretnina.dataValues, "upiti": upiti}
            res.status(200).json({nekretnina});
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ poruka: "Greška"});
    }
});*/
app.get('/nekretnina/:id', async function (req, res) {
    try {
        let nekretnina = await db.nekretnina.findOne({ where: { id: req.params.id } });

        if (!nekretnina) {
            return res.status(400).json({ greska: `Nekretnina sa id-em ${req.params.id} ne postoji` });
        } else {
            let upiti = await db.upit.findAll({ where: { NekretninaId: req.params.id } });

            for (let i = 0; i < upiti.length; i++) {
                let korisnik = await db.korisnik.findOne({ where: { id: upiti[i].KorisnikId } });
                upiti[i] = {
                    "username": korisnik ? korisnik.username : null,
                    "tekst_upita": upiti[i].tekst_upita
                };
            }

            nekretnina = { ...nekretnina.dataValues, "upiti": upiti };
            res.status(200).json({ nekretnina });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ poruka: "Greška" });
    }
});


app.listen(3000);