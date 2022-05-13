/*Prueba para graficar un arbol de asterisco al hacer click en el boton Arbol*/
var boton = document.getElementById('arbol');
var caja = document.getElementById('caja');

function grafico (){
    let ramas = parseInt(prompt('Ingrese el numero de ramas')) 
    for (let i = 1; i <= ramas; ++i){
        let arbol = '';

        for (let j = 1; j <= i; ++j){
            arbol += '* ';
        }
        document.getElementById('caja').innerHTML = arbol;
    }
   
}

boton.addEventListener('click',grafico,true)