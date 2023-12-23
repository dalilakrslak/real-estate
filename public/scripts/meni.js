const prijava = document.getElementById("prijava");
const profil = document.getElementById("profil");
profil.style.display = 'none'
prijava.addEventListener('click',callLogout)
PoziviAjax.getKorisnik(check);


function callLogout(){
    if(prijava.innerHTML=="Odjava")
    PoziviAjax.postLogout(logout)
}

function logout(error,data){
    if(error) throw  error
}

function check(error,data){
    if(data){
        prijava.innerHTML="Odjava"
        profil.style.display = ''
    }
    else
        prijava.innerHTML="Prijava"
}