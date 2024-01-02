const MarketingAjax = (() => {

    let osvjeziPretrage = function (divNekretnine) {
    }

    let osvjeziKlikove = function (divNekretnine) {
    }

    let novoFiltriranje = function (listaFiltriranihNekretnina) {
        const ajax = new XMLHttpRequest();

        var list = {
            nizNekretnina:[]
        }

        listaFiltriranihNekretnina.forEach(nekretnina =>{
            list.nizNekretnina.push(nekretnina.id)
        })

        ajax.open('POST','/marketing/nekretnine');
        ajax.setRequestHeader('Content-Type', 'application/json');
        ajax.send(JSON.stringify(list)); 
    } 

    let klikNekretnina = function (idNekretnine) {
        const ajax = new XMLHttpRequest();
        
        ajax.onreadystatechange = function () {
            if (ajax.readyState === 4 && ajax.status === 200) {
            }
            else if (ajax.readyState === 4) {
            }
        }

        ajax.open('POST', '/marketing/nekretnina/' + idNekretnine)
        ajax.send()
    }

    return {
        osvjeziPretrage: osvjeziPretrage,
        osvjeziKlikove: osvjeziKlikove,
        novoFiltriranje: novoFiltriranje,
        klikNekretnina: klikNekretnina
    }
})();