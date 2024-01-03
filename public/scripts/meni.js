const prijava = document.getElementById("prijava");
const profil = document.getElementById("profil");

profil.style.display = 'none'

document.addEventListener('click', function(event) {
    if (event.target === prijava) {
        if (prijava.innerHTML === "Odjava") {
            PoziviAjax.postLogout(function (error, data) {
                if (error) 
                    throw error;
            });
        }
    }
});

PoziviAjax.getKorisnik(daLiJePrijavljen);

function daLiJePrijavljen(error,data){
    if(data){
        prijava.innerHTML="Odjava"
        profil.style.display = ''
    }
    else
        prijava.innerHTML="Prijava"
}