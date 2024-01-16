const noviUpit = document.getElementById("noviUpit");
const upit = document.getElementById("upit");
const upiti = document.getElementById("upiti")

noviUpit.style.display = 'none'

PoziviAjax.getKorisnik(daLiJePrijavljen);

function popuniUpite(error,data){
    const nekretnina = data.nekretnina
    let dinamicniHTML = "<ul>";
    for (upit of nekretnina.upiti) {
        dinamicniHTML += "<li><strong>" + upit.username + "</strong><p>" + upit.tekst_upita +"</p>";
    }
    dinamicniHTML += "</ul>";
    upiti.innerHTML = dinamicniHTML;
}

function daLiJePrijavljen(error,data){
    if (data) {
        noviUpit.style.display = ''
    }
}

const button = document.getElementById("sendUpit");

button.addEventListener('click', function (event) {
    event.preventDefault()
    PoziviAjax.postUpit(nekretninaID, upit.value, upitResult)
});

function upitResult(error,data){
    if(error){
        console.log(error)
    }
    else {
        const urlParams = new URLSearchParams(window.location.search);
        const nekretninaID = urlParams.get('id');
        PoziviAjax.getNekretninaById(nekretninaID, popuniDetalje)
    }
}





