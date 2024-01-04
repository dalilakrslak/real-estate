function spojiNekretnine(divReferenca, instancaModula, tip_nekretnine) {
    let nekretnine = instancaModula.filtrirajNekretnine({ tip_nekretnine: tip_nekretnine });

    let dinamicniHTML = "";
    if(tip_nekretnine === "Stan") {
        dinamicniHTML += "<h3>STAN</h3>";
        dinamicniHTML += "<div id='stanID' class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div id='kartica-" + nekretnina.id +"' tag='kartica'> <div  class='stan'> <img src='../img/stan1.jpg' alt='Stan 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + " KM</p>";
            dinamicniHTML += "<div id='pretrage-"+ nekretnina.id +"'><p class='div2'><strong>Pretrage: </strong><span id='brojPretraga' class='label' style='display: none;'>"+
            "</span></p></div><div id='klikovi-"+nekretnina.id+"'>"+
            "<p class='div2'><strong>Klikovi: </strong><span id='brojKlikova' class='label' ></span></p>" + 
            "<p class='div4'><button id='detalji-"+nekretnina.id+"'onclick='povecajKarticu(" + nekretnina.id + ")' class='btn'>DETALJI</button></p>  </div></div></div>"
        }
        dinamicniHTML += "</div>";
        
        divReferenca.innerHTML = dinamicniHTML;
    }
    else if(tip_nekretnine === "Kuća"){
        dinamicniHTML += "<h3>KUĆA</h3>";
        dinamicniHTML += "<div id='kucaID' class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div id='kartica-" + nekretnina.id +"' tag='kartica'> <div  class='kuca'> <img src='../img/kuca1.jpg' alt='Kuca 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + " KM</p>";
            dinamicniHTML += "<div id='pretrage-"+ nekretnina.id +"'><p class='div2'><strong>Pretrage: </strong><span id='brojPretraga' class='label' style='display: none;'>"+
            "</span></p></div><div id='klikovi-"+nekretnina.id+"'>"+
            "<p class='div2'><strong>Klikovi: </strong><span id='brojKlikova' class='label' ></span></p>" +
            "<p class='div4'><button id='detalji-"+nekretnina.id+"'onclick='povecajKarticu(" + nekretnina.id + ")' class='btn'>DETALJI</button></p>  </div></div></div>"

        }
        dinamicniHTML += "</div>";

        divReferenca.innerHTML = dinamicniHTML;
    }
    else if(tip_nekretnine === "Poslovni prostor"){
        dinamicniHTML += "<h3>POSLOVNI PROSTOR</h3>";
        dinamicniHTML += "<div id='ppID' class='grid-list'>";
        for(nekretnina of nekretnine) {
            dinamicniHTML += "<div id='kartica-" + nekretnina.id +"' tag='kartica'> <div  class='pp'> <img src='../img/pp1.jpg' alt='Poslovni prostor 1'><p class='div1'><strong>Naziv: </strong>" + nekretnina.naziv + "</p>";
            dinamicniHTML += "<p class='div2'><strong>Kvadratura: </strong>" + nekretnina.kvadratura + "</p>";
            dinamicniHTML += "<p class='div3'><strong>Cijena: </strong>" + nekretnina.cijena + " KM</p>";
            dinamicniHTML += "<div id='pretrage-"+ nekretnina.id +"'><p class='div2'><strong>Pretrage: </strong><span id='brojPretraga' class='label' style='display: none;'>"+
            "</span></p></div><div id='klikovi-"+nekretnina.id+"'>"+
            "<p class='div2'><strong>Klikovi: </strong><span id='brojKlikova' class='label'></span></p>" +
            "<p class='div4'><button id='detalji-"+nekretnina.id+"'onclick='povecajKarticu(" + nekretnina.id + ")' class='btn'>DETALJI</button></p>  </div></div></div>"
        }
        dinamicniHTML += "</div>";

        divReferenca.innerHTML = dinamicniHTML;
    }
}
const divStan = document.getElementById("stan");
const divKuca = document.getElementById("kuca");
const divPp = document.getElementById("pp");
const divNekretnine = document.getElementById("nekretnine");
const min_cijena = document.getElementById("minCijena");
const max_cijena = document.getElementById("maxCijena");
const min_kvadratura = document.getElementById("minKvadratura");
const max_kvadratura = document.getElementById("maxKvadratura");
const button = document.getElementById("pretraga")
let filter = false;

PoziviAjax.getNekretnine(popuniNekretnine);

setInterval(osvjeziNekretnine, 500);

function osvjeziNekretnine(){
  MarketingAjax.osvjeziKlikove(divNekretnine)
}

function popuniNekretnine(error, data) {
    if (error) {
        throw error;
    }

    let nekretnine = SpisakNekretnina();
    
    nekretnine.init(data, null);

    const kriterij = {
        min_cijena: min_cijena.value,
        max_cijena: max_cijena.value,
        min_kvadratura: min_kvadratura.value,
        max_kvadratura: max_kvadratura.value,
    };
    
    var filtrirane = 0
    if (filter) {
        filtrirane = nekretnine.filtrirajNekretnine(kriterij);
        MarketingAjax.novoFiltriranje(filtrirane)
        nekretnine.init(filtrirane,null)
    }
    else {
        nekretnine.init(data, null);
        MarketingAjax.novoFiltriranje(data)
    }

    spojiNekretnine(divStan, nekretnine, "Stan");
    spojiNekretnine(divKuca, nekretnine, "Kuća");
    spojiNekretnine(divPp, nekretnine, "Poslovni prostor");

    filter = false
}

button.addEventListener("click", function (event) {
    event.preventDefault();
    filter = true
    PoziviAjax.getNekretnine(popuniNekretnine);
});

let trenutnoProsirenaKarticaId = null;
function povecajKarticu(id) {
    const kartica = document.getElementById("kartica-" + id);

    if (kartica.classList.contains("prosirena")) {
        kartica.classList.remove("prosirena");
        console.log("Uklonjena klasa");
        trenutnoProsirenaKarticaId = null;
    } 
    else {
        if (trenutnoProsirenaKarticaId !== null) {
            const prethodnaKartica = document.getElementById("kartica-" + trenutnoProsirenaKarticaId);
            prethodnaKartica.classList.remove("prosirena");
            console.log("Smanjena prethodna kartica");
        }

        kartica.classList.add("prosirena");
        console.log("Dodana klasa");
        trenutnoProsirenaKarticaId = id;
    }

    MarketingAjax.klikNekretnina(id);
}