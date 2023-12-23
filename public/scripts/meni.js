const prijava = document.getElementById("prijava");
const profil = document.getElementById("profil");

profil.style.display = 'none'

prijava.addEventListener('click',odjaviSe)

PoziviAjax.getKorisnik(daLiJePrijavljen);

function odjaviSe(){
    if (prijava.innerHTML=="Odjava") {
        PoziviAjax.postLogout(odjava)
    }
}

function odjava(error,data){
    if(error) throw  error
}

function daLiJePrijavljen(error,data){
    if(data){
        prijava.innerHTML="Odjava"
        profil.style.display = ''
    }
    else
        prijava.innerHTML="Prijava"
}