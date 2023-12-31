function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

    let dinamicniHTML = "";
    if(tip_nekretnine === "Stan") {
        dinamicniHTML += "<h3>STAN</h3>";
        dinamicniHTML += "<div class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div  class='stan'> <img src='../img/stan1.jpg' alt='Stan 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + " KM</p>";
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
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + " KM</p>";
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
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + " KM</p>";
            dinamicniHTML += "<p class='div4'><button class='btn'>DETALJI</button></p></div>";
        }
        dinamicniHTML += "</div>";

        divReferenca.innerHTML = dinamicniHTML;
    }
}


const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
const min_cijena = document.getElementById("minCijena");
const max_cijena = document.getElementById("maxCijena");
const min_kvadratura = document.getElementById("minKvadratura");
const max_kvadratura = document.getElementById("maxKvadratura");
const button = document.getElementById("pretraga")
let filter = false;



function popuniNekretnine(error, data) {
    if (error) {
        throw error;
    }

    let nekretnine = SpisakNekretnina();
    console.log(nekretnine)
    const kriterij = {
        min_cijena: min_cijena.value,
        max_cijena: max_cijena.value,
        min_kvadratura: min_kvadratura.value,
        max_kvadratura: max_kvadratura.value,
    };

    if (filter) {
        nekretnine = nekretnine.filtrirajNekretnine(kriterij);
    }
    console.log(nekretnine);

    nekretnine.init(data, null);

    spojiNekretnine(divStan, nekretnine, "Stan");
    spojiNekretnine(divKuca, nekretnine, "Kuća");
    spojiNekretnine(divPp, nekretnine, "Poslovni prostor");
}

function izvrsiPretragu() {
    const kriterijumi = {
        min_cijena: min_cijena.value,
        max_cijena: max_cijena.value,
        min_kvadratura: min_kvadratura.value,
        max_kvadratura: max_kvadratura.value,
    };

    filter = true;
    popuniNekretnine(null, null);
}

button.addEventListener("click", function (event) {
    event.preventDefault();
    izvrsiPretragu();
});

PoziviAjax.getNekretnine(popuniNekretnine);