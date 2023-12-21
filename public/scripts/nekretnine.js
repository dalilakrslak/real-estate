function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

    let dinamicniHTML = "";
    if(tip_nekretnine === "Stan") {
        dinamicniHTML += "<h3>STAN</h3>";
        dinamicniHTML += "<div class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div  class='stan'> <img src='../img/stan1.jpg' alt='Stan 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + "</p>";
            dinamicniHTML += "<p class='div4'><button class='btn'>DETALJI</button></p></div>";
        }
        dinamicniHTML += "</div>";
        
        divReferenca.innerHTML = dinamicniHTML;
    }
    else if(tip_nekretnine === "Kuća"){
        dinamicniHTML += "<h3>KUĆA</h3>";
        dinamicniHTML += "<div class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div  class='kuca'> <img src='../img/kuca1.jpg' alt='Stan 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + "</p>";
            dinamicniHTML += "<p class='div4'><button class='btn'>DETALJI</button></p></div>";
        }
        dinamicniHTML += "</div>";

        divReferenca.innerHTML = dinamicniHTML;
    }
    else if(tip_nekretnine === "Poslovni prostor"){
        dinamicniHTML += "<h3>Poslovni prostor</h3>";
        dinamicniHTML += "<div class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div  class='pp'> <img src='../img/pp1.jpg' alt='Stan 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + "</p>";
            dinamicniHTML += "<p class='div4'><button class='btn'>DETALJI</button></p></div>";
        }
        dinamicniHTML += "</div>";

        divReferenca.innerHTML = dinamicniHTML;
    }
}

const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");

const listaNekretnina = [{
    id: 1,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 2,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 3,
    tip_nekretnine: "Stan",
    naziv: "Useljiv stan Sarajevo",
    kvadratura: 58,
    cijena: 232000,
    tip_grijanja: "plin",
    lokacija: "Novo Sarajevo",
    godina_izgradnje: 2019,
    datum_objave: "01.10.2023.",
    opis: "Sociis natoque penatibus.",
    upiti: [{
        korisnik_id: 1,
        tekst_upita: "Nullam eu pede mollis pretium."
    },
    {
        korisnik_id: 2,
        tekst_upita: "Phasellus viverra nulla."
    }]
},
{
    id: 4,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 5,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 6,
    tip_nekretnine: "Poslovni prostor",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 7,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 8,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
},
{
    id: 9,
    tip_nekretnine: "Kuća",
    naziv: "Mali poslovni prostor",
    kvadratura: 20,
    cijena: 70000,
    tip_grijanja: "struja",
    lokacija: "Centar",
    godina_izgradnje: 2005,
    datum_objave: "20.08.2023.",
    opis: "Magnis dis parturient montes.",
    upiti: [{
        korisnik_id: 2,
        tekst_upita: "Integer tincidunt."
    }
    ]
}]

const listaKorisnika = [{
    id: 1,
    ime: "Neko",
    prezime: "Nekic",
    username: "username1",
},
{
    id: 2,
    ime: "Neko2",
    prezime: "Nekic2",
    username: "username2",
}]

let nekretnine = SpisakNekretnina();
nekretnine.init(listaNekretnina, listaKorisnika);

spojiNekretnine(divStan, nekretnine, "Stan");
spojiNekretnine(divKuca, nekretnine, "Kuća");
spojiNekretnine(divPp, nekretnine, "Poslovni prostor");