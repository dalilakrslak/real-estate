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

app.post('/login', async function(req, res){
    let loginPodaci = req.body;
    try {
        let daLiPostoji = await db.korisnik.findOne({ where: { username: loginPodaci.username } });
        var ispravanPassword = false
        if (daLiPostoji) {
            ispravanPassword = await bcrypt.compare(loginPodaci.password, daLiPostoji.password); 
            if (ispravanPassword){
                req.session.user = daLiPostoji;
                res.status(200).json({ poruka: 'Uspješna prijava' });
            } 
        }
        if (!ispravanPassword)
                res.status(401).json({ greska: 'Neuspješna prijava' });
    } 
    catch (error) {
        console.error('Greska: ', error);
    }
});

app.post('/logout', function(req, res){
    if (req.session.user) {
        req.session.destroy(err => {
            if (!err) {
                res.status(200).json({ poruka: 'Uspješno ste se odjavili' });
            }
        });
    } else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
});

app.get('/korisnik', async function (req, res) {
    if (!req.session.user) {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
    else {
        try {
            res.status(200).json(req.session.user)
        }
        catch (error) {
            console.error('Greska: ', error);
        }

    }
});

app.post('/upit', async function (req, res) {
    const { nekretnina_id, tekst_upita } = req.body;
    if (req.session.user) {
        try {
            let nekretnina = await db.nekretnina.findOne({ where: { id: nekretnina_id } });
            
            if (!nekretnina) {
                res.status(400).json({ greska: `Nekretnina sa id-em ${nekretnina_id} ne postoji` });
            }
            else {
                await db.upit.create({
                    tekst_upita: tekst_upita,
                    KorisnikId: req.session.user.id,
                    NekretninaId: nekretnina_id
                });
                res.status(200).json({ poruka: 'Upit je uspješno dodan' });
            }
        }
        catch (error) {
            console.error('Greska: ', error);
        }  
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
})

app.put('/korisnik', async function(req, res) {
    const { ime, prezime, username, password } = req.body;
    if (req.session.user) {
        try {
            let korisnik = await db.korisnik.findOne({ where: { username: req.session.user.username } });
            if(ime) korisnik.ime = ime;
            if (prezime) korisnik.prezime = prezime;
            if (username) {
                korisnik.username = username;
            }
            if (password) {
                bcrypt.hash(password, 10, function(err, hash) {
                    korisnik.password = hash
                });          
            }
            await korisnik.save();
            req.session.user = korisnik
            res.status(200).json({ poruka: 'Podaci su uspješno ažurirani' });
        }
        catch (error) {
            console.error('Greska: ', error);
        }  
    }
    else {
        res.status(401).json({ greska: 'Neautorizovan pristup' });
    }
})

app.get('/nekretnine', async function(req, res) {
    try {
        let nekretnine = await db.nekretnina.findAll()
        res.status(200).json(nekretnine);
    }
    catch (error) {
        console.error('Greska: ', error);
    }
})

app.post('/marketing/nekretnine', async function(req, res) {
    const { nizNekretnina } = req.body;
    req.session.nekretnine = []

    try {
        marketing = await db.nekretnina.findAll({ where: { id: nizNekretnina } });
        const nekretnine = nizNekretnina || [];
        for (const id of nekretnine) {
            let nekretnina = await db.nekretnina.findOne({ where: { id: id } })
            nekretnina.broj_pretraga = nekretnina.broj_pretraga + 1;
            nekretnina.save();
        }
        
        const atributi = ['id', 'broj_pretraga','broj_klikova'];

        req.session.nekretnine = marketing.map((x) => {
            const nekr = {};
            for (let i = 0; i < atributi.length; i++) {
                const atribut = atributi[i];
                nekr[atribut] = x[atribut];
            }
            return nekr;
        });
        res.status(200).json();
    }
    catch (error) {
        console.error('Greska: ', error);
    }
});

app.post('/marketing/nekretnine', async function(req, res) {
    const { nizNekretnina } = req.body;
    req.session.nekretnine = []

    try {
        const nekretnine = nizNekretnina.map(async id => {
            let nekretnina = await db.nekretnina.findOne({ where: { id: id } });
            if (nekretnina) {
                nekretnina.broj_pretraga = (nekretnina.broj_pretraga || 0) + 1;
                await nekretnina.save();
            }
        });

        await Promise.all(nekretnine);

        const marketing = await db.nekretnina.findAll({ where: { id: nizNekretnina } });  
        const atributi = ['id', 'broj_pretraga','broj_klikova'];

        req.session.nekretnine = marketing.map((x) => {
            const nekr = {};
            for (let i = 0; i < atributi.length; i++) {
                const atribut = atributi[i];
                nekr[atribut] = x[atribut];
            }
            return nekr;
        });

        res.status(200).json();
    } 
    catch (error) {
        console.error('Greška: ', error);
    }
});


app.post('/marketing/nekretnina/:id', async function(req, res) {
    const nekretninaId = req.params.id;
    req.session.nekretnine = []

    try {
        let nekretnina = await db.nekretnina.findOne({ where: { id: nekretninaId } })
        nekretnina.broj_klikova = nekretnina.broj_klikova + 1;
        await nekretnina.save();
        req.session.nekretnine.push({
            id: nekretnina.id, 
            broj_pretraga: nekretnina.broj_pretraga,
            broj_klikova: nekretnina.broj_klikova
        })
        res.status(200).json();
    }
    catch (error) {
        console.error('Greska: ', error);
    }
});

app.post('/marketing/osvjezi', async function(req, res) {
    if (!req.session) {
        console.log('nema sesije')
    }
    else {
        let { nizNekretnina } = req.body;
        try {
            if (Object.keys(req.body).length === 0) {
                nizNekretnina = req.session.nekretnine
            }
            let marketing = await db.nekretnina.findAll({where : {id : nizNekretnina}});  
            const atributi = ['id','broj_klikova','broj_pretraga'];
            const nizOsvjezavanja = {
                nizNekretnina : marketing.map((x) => {
                    const nekr = {};
                    for (let i = 0; i < atributi.length; i++) {
                        const atribut = atributi[i];
                        
                        if (atribut === 'broj_pretraga') {
                            nekr['pretrage'] = x[atribut];
                        } 
                        else if (atribut === 'broj_klikova') {
                            nekr['klikovi'] = x[atribut];
                        } 
                        else {
                            nekr[atribut] = x[atribut];
                        }
                    }
                    return nekr;
                })
            }

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
            console.log('Greska:', error);
        } 
    }
});
    
app.get('/nekretnina/:id', async function (req, res) {
    try {
        let nekretnina = await db.nekretnina.findOne({ where: { id: req.params.id } });

        if (!nekretnina) {
            return res.status(400).json({ greska: `Nekretnina sa id-em ${req.params.id} ne postoji` });
        } 
        else {
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