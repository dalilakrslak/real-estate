const noviUpit = document.getElementById("noviUpit");
const upit = document.getElementById("upit");

noviUpit.style.display = 'none'

PoziviAjax.getKorisnik(daLiJePrijavljen);

function popuniUpite(error,data){
    let nekretnina = data.nekretnina
    let dinamicniHTML = "<ul>";
    for (let u of nekretnina.upiti) {
        dinamicniHTML += "<li><strong>" + u.username + "</strong><p>" + u.tekst_upita +"</p></li>";
    }
    dinamicniHTML += "</ul>";
    upiti.innerHTML = dinamicniHTML;
}

function daLiJePrijavljen(error, data) {
    if (data) {
        noviUpit.style.display = ''; 
    } else {
        noviUpit.style.display = 'none'; 
    }
}

function posaljiUpit() {
    PoziviAjax.getKorisnik(function(error, data) {
        if (data) {
            const urlParams = new URLSearchParams(window.location.search);
            const nekretninaID = urlParams.get('id');
            PoziviAjax.postUpit(nekretninaID, upit.value, function(error, data) {
                upitResult(error, data, nekretninaID);
            });
            upit.value = '';
        } 
        else {
            console.log("Morate biti prijavljeni da biste poslali upit.");
        }
    });
}

function upitResult(error, data, nekretninaID) {
    if (error) {
    } else {
        PoziviAjax.getNekretninaById(nekretninaID, popuniUpite);
    }
}


