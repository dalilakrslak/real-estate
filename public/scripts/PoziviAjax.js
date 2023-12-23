const PoziviAjax = (() => {

    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null

    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            else if (ajax.readyState == 4) {
                fnCallback(ajax.responseText, null);
            }
        }

        ajax.open('GET', '/korisnik')
        ajax.send()
    }

    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            else if (ajax.readyState == 4) {
                fnCallback(ajax.responseText, null);
            }
        }

        ajax.open('PUT', '/korisnik')
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        ajax.send("ime=" + noviPodaci.ime + "&prezime=" + noviPodaci.prezime + "&username=" + noviPodaci.username + "&password=" + noviPodaci.password)
    }

    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            else if (ajax.readyState == 4) {
                fnCallback(ajax.responseText, null);
            }
        }

        ajax.open('POST', '/upit')
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        ajax.send("nekretnina_id=" + nekretnina_id + "&tekst_upita=" + tekst_upita)
    }

    function impl_getNekretnine(fnCallback) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            else if (ajax.readyState == 4) {
                fnCallback(ajax.responseText, null);
            }
        }

        ajax.open('GET', '/nekretnine')
        ajax.send()
    }

    function impl_postLogin(username, password, fnCallback) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            else if (ajax.readyState == 4) {
                fnCallback(ajax.responseText, null);
            }
        }

        ajax.open('POST', '/login')
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        ajax.send("username=" + username + "&password=" + password)
    }

    function impl_postLogout(fnCallback) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.responseText));
            }
            else if (ajax.readyState == 4) {
                fnCallback(ajax.responseText, null);
            }
        }

        ajax.open('POST', '/logout')+
        ajax.send()
    }

    return {
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getKorisnik: impl_getKorisnik,
        putKorisnik: impl_putKorisnik,
        postUpit: impl_postUpit,
        getNekretnine: impl_getNekretnine
    };
})();