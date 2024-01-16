const naziv = document.getElementById("naziv");
const kvadratura = document.getElementById("kvadratura");
const cijena = document.getElementById("cijena");
const grijanje = document.getElementById("grijanje");
const godinaIzgradnje = document.getElementById("godinaIzgradnje");
const lokacija = document.getElementById("lokacija");
const datumObjave = document.getElementById("datumObjave");
const opis = document.getElementById("opis");
const username = document.getElementById("username");
const tekstUpita = document.getElementById("tekstUpita");
const upiti = document.getElementById("upiti")

const urlParams = new URLSearchParams(window.location.search);
const nekretninaID = urlParams.get('id');

PoziviAjax.getNekretninaById(nekretninaID, popuniDetalje)

function popuniDetalje(error, data) {
    let nekretnina = data.nekretnina
    naziv.innerHTML += nekretnina.naziv
    kvadratura.innerHTML += nekretnina.kvadratura + " km2"
    cijena.innerHTML += nekretnina.cijena + " KM"
    grijanje.innerHTML += nekretnina.tip_grijanja
    godinaIzgradnje.innerHTML += nekretnina.godina_izgradnje
    lokacija.innerHTML += nekretnina.lokacija
    datumObjave.innerHTML += nekretnina.datum_objave
    opis.innerHTML += nekretnina.opis
    
    let dinamicniHTML = "<ul>";
    for (let upit of nekretnina.upiti) {
        dinamicniHTML += "<li><strong>" + upit.username + "</strong><p>" + upit.tekst_upita +"</p></li>";
    }
    dinamicniHTML += "</ul>";
    upiti.innerHTML = dinamicniHTML;
}