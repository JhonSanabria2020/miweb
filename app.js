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
        arbol += '<br>';
        document.getElementById('caja').innerHTML += arbol;
    }
   
}

boton.addEventListener('click',grafico,true)

//Uso de ApiRest
//1. Crear funcion para recuperar texto de busqueda
const traerTextoBusqueda = () => {
    const botonBuscar = document.getElementById('botonBuscar')
    botonBuscar.addEventListener('click', (evento) => {
        //Funcion a ejecutar cuando se de clik en el boton
        const textoBuscar = document.getElementById('textoBuscar');
        valorTextoBuscar = textoBuscar.value;
        llamadaApi(valorTextoBuscar)
        console.log(valorTextoBuscar)
    })
}

const llamadaApi = async (valorTextoBuscar) => {
    const resultadoLlamada = await fetch('https://gateway.marvel.com:443/v1/public/characters?name='+valorTextoBuscar+'&ts=1&apikey=4f16045bf4fdd0a2d87d5bdbeb497f8c&hash=cac805bbdb216a6580c1177d1a13a6ef');
    const resultadoJson = await resultadoLlamada.json();
    console.log(resultadoJson);
}



//API Marvel
//Public Key: 4f16045bf4fdd0a2d87d5bdbeb497f8c
//Private Key: 7a33f11d61372e236fb078452d0b27cb3bce5b53
//hash md5:17a33f11d61372e236fb078452d0b27cb3bce5b534f16045bf4fdd0a2d87d5bdbeb497f8c
//hash: CAC805BBDB216A6580C1177D1A13A6EF
//ts:1
//URL: https://gateway.marvel.com:443/v1/public/characters?name=3-D%20Man&ts=1&apikey=4f16045bf4fdd0a2d87d5bdbeb497f8c&hash=cac805bbdb216a6580c1177d1a13a6ef

