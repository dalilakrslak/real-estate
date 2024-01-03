const MarketingAjax = (() => {
    var lista_osvjezi = 0

    var list = {
        nizNekretnina:[]
    }
    
    let osvjeziPretrage = function (divNekretnine) {
        lista_osvjezi.nizNekretnina.forEach(nekretnina => {
            const kartice = divNekretnine.querySelectorAll(`#stanID #kartica-${nekretnina.id}, #kucaID #kartica-${nekretnina.id}, #ppID #kartica-${nekretnina.id}`);
            
            kartice.forEach(kartica => {
                const brojPretraga = kartica.querySelector(`#pretrage-${nekretnina.id} #brojPretraga`);
                if (brojPretraga && nekretnina.pretrage && nekretnina.pretrage !== 0) {
                    brojPretraga.innerHTML = nekretnina.pretrage;
                    brojPretraga.style.display = "";
                }
            });
        });
    }

    let osvjeziKlikove = function (divNekretnine) {

        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                lista_osvjezi = JSON.parse(ajax.responseText)

                lista_osvjezi.nizNekretnina.forEach(nekretnina => {
                    const kartice = divNekretnine.querySelectorAll(`#stanID #kartica-${nekretnina.id}, #kucaID #kartica-${nekretnina.id}, #ppID #kartica-${nekretnina.id}`);
                    
                    kartice.forEach(kartica => {
                        const brojKlikova = kartica.querySelector(`#klikovi-${nekretnina.id} #brojKlikova`);
                        if (brojKlikova && nekretnina.klikovi && nekretnina.klikovi !== 0) {
                            brojKlikova.innerHTML = nekretnina.klikovi;
                            brojKlikova.style.display = "";
                        }
                    });
                });
                    
                osvjeziPretrage(divNekretnine)
            }            
            
            else if (ajax.readyState == 4){   

            };
            
        }

        ajax.open('POST','/marketing/osvjezi');
        ajax.setRequestHeader('Content-Type', 'application/json');

        
        if(list.nizNekretnina.length != 0){
            ajax.send(JSON.stringify(list));
            list.nizNekretnina = []
        }
        else{
            ajax.send();
        }
        
    }

    let novoFiltriranje = function (listaFiltriranihNekretnina) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                
            }            
            else if (ajax.readyState == 4){     
            };
        }
        list = {
            nizNekretnina: listaFiltriranihNekretnina.map(nekretnina => nekretnina.id)
        };
        ajax.open('POST','/marketing/nekretnine');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(list)); 
    }
    
    let klikNekretnina = function (idNekretnine) {
        const ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function(){
            if (ajax.readyState == 4 && ajax.status == 200){
                lista_osvjezi = list
            }            
            else if (ajax.readyState == 4){     
            };
        }

        list = {
        nizNekretnina:[]
        }
        list.nizNekretnina.push(idNekretnine)

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

