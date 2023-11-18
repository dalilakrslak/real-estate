let SpisakNekretnina = function () {
    let listaNekretnina = [];
    let listaKorisnika = [];


    let init = function (nekretnine, korisnici) {
        listaNekretnina = nekretnine;
        listaKorisnika = korisnici;  
    }

    let filtrirajNekretnine = function (kriterij) {
        if(Object.keys(kriterij).length === 0) {
            return listaNekretnina;
        }

        let filtriraneNekretnine = listaNekretnina;

        if(kriterij.tip_nekretnine) {
            filtriraneNekretnine = filtriraneNekretnine.filter((nekretnina) => {
                return nekretnina.tip_nekretnine === kriterij.tip_nekretnine;
            });
        }

        if(kriterij.min_kvadratura) {
            filtriraneNekretnine = filtriraneNekretnine.filter((nekretnina) => {
                return nekretnina.kvadratura >= kriterij.min_kvadratura;
            });
        }

        if(kriterij.max_kvadratura) {
            filtriraneNekretnine = filtriraneNekretnine.filter((nekretnina) => {
                return nekretnina.kvadratura <= kriterij.max_kvadratura;
            });
        }

        if(kriterij.min_cijena) {
            filtriraneNekretnine = filtriraneNekretnine.filter((nekretnina) => {
                return nekretnina.cijena >= kriterij.min_cijena;
            });
        }

        if(kriterij.max_cijena) {
            filtriraneNekretnine = filtriraneNekretnine.filter((nekretnina) => {
                return nekretnina.cijena <= kriterij.max_cijena;
            });
        }
        
        return filtriraneNekretnine;
    }

    let ucitajDetaljeNekretnine = function (id) {
        let n = listaNekretnina.find((nekretnina) => {
            return nekretnina.id === id;
        });

        if(n === undefined) {
            return null;
        }
        else {
            return n;
        }
    }

    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};


