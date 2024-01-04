const MarketingAjax = (() => {
    var osvjezavanje = 0

    var listaNekretnina = {
        nizNekretnina: []
    }
    
    let osvjeziPretrage = function (divNekretnine) {
        for (let i = 0; i < osvjezavanje.nizNekretnina.length; i++) {
            const nekretnina = osvjezavanje.nizNekretnina[i];
            const kartice = divNekretnine.querySelectorAll(`#stanID #kartica-${nekretnina.id}, #kucaID #kartica-${nekretnina.id}, #ppID #kartica-${nekretnina.id}`);
            
            kartice.forEach(kartica => {
                const brojPretraga = kartica.querySelector(`#pretrage-${nekretnina.id} #brojPretraga`);
                if (brojPretraga && nekretnina.pretrage && nekretnina.pretrage !== 0) {
                    brojPretraga.innerHTML = nekretnina.pretrage;
                }
            });
        }
    }

    let osvjeziKlikove = function (divNekretnine) {

        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                osvjezavanje = JSON.parse(ajax.responseText)

                for (let i = 0; i < osvjezavanje.nizNekretnina.length; i++) {
                    const nekretnina = osvjezavanje.nizNekretnina[i];
                    const kartice = divNekretnine.querySelectorAll(`#stanID #kartica-${nekretnina.id}, #kucaID #kartica-${nekretnina.id}, #ppID #kartica-${nekretnina.id}`);
                    
                    kartice.forEach(kartica => {
                        const brojKlikova = kartica.querySelector(`#klikovi-${nekretnina.id} #brojKlikova`);
                        if (brojKlikova && nekretnina.klikovi && nekretnina.klikovi !== 0) {
                            brojKlikova.innerHTML = nekretnina.klikovi;
                        }
                    });
                }
                    
                osvjeziPretrage(divNekretnine)
            }      
            else if (ajax.readyState == 4) {   

            };
        }

        ajax.open('POST','/marketing/osvjezi');
        ajax.setRequestHeader('Content-Type', 'application/json');

        if (listaNekretnina.nizNekretnina.length == 0) {
            ajax.send();
        }
        else {
            ajax.send(JSON.stringify(listaNekretnina));
            listaNekretnina.nizNekretnina = []
        }
    }

    let novoFiltriranje = function (listaFiltriranihNekretnina) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                
            }            
            else if (ajax.readyState == 4) {     
            };
        }
        listaNekretnina = {
            nizNekretnina: listaFiltriranihNekretnina.map(nekretnina => nekretnina.id)
        };
        ajax.open('POST','/marketing/nekretnine');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(listaNekretnina)); 
    }
    
    let klikNekretnina = function (idNekretnine) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                osvjezavanje = listaNekretnina
            }            
            else if (ajax.readyState == 4) {     
            };
        }

        listaNekretnina = {
            nizNekretnina: []
        }
        listaNekretnina.nizNekretnina.push(idNekretnine)

        ajax.open('POST',`/marketing/nekretnina/${idNekretnine}`);
        ajax.send();

    }

    return {
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina
    };
})();