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

boton.addEventListener('click',grafico,true);

//Uso de ApiRest
//1. Crear funcion para recuperar texto de busqueda
const traerTextoBusqueda = () => {
    const botonBuscar = document.getElementById('botonBuscar');
    botonBuscar.addEventListener('click', (evento) => {
        //Funcion a ejecutar cuando se de clik en el boton
        const textoBuscar = document.getElementById('textoBuscar');
        valorTextoBuscar = textoBuscar.value;
        llamadaApi(valorTextoBuscar)
        //console.log(valorTextoBuscar);
    })   
}

const llamadaApi = async (valorTextoBuscar) => {
    const resultadoLlamada = await fetch('https://gateway.marvel.com:443/v1/public/characters?name='+valorTextoBuscar+'&ts=1&apikey=4f16045bf4fdd0a2d87d5bdbeb497f8c&hash=cac805bbdb216a6580c1177d1a13a6ef');
    const resultadoJson = await resultadoLlamada.json();

    const personaje = resultadoJson.data.results[0]['name'];
    const url_imagen = resultadoJson.data.results[0].thumbnail['path'];
    const url_extension = resultadoJson.data.results[0].thumbnail['extension'];
    const poster = url_imagen + '.' + url_extension;
    
    document.getElementById('imgRespuesta').src = poster;
    document.getElementById('nombreRepuesta').innerHTML = personaje;
}

traerTextoBusqueda();

/*Credenciales eh informacion API Marvel
Public Key: 4f16045bf4fdd0a2d87d5bdbeb497f8c
Private Key: 7a33f11d61372e236fb078452d0b27cb3bce5b53
hash md5:17a33f11d61372e236fb078452d0b27cb3bce5b534f16045bf4fdd0a2d87d5bdbeb497f8c
hash: CAC805BBDB216A6580C1177D1A13A6EF
ts:1
URL_principal: https://gateway.marvel.com/v1/public/characters?ts=1&apikey=4f16045bf4fdd0a2d87d5bdbeb497f8c&hash=cac805bbdb216a6580c1177d1a13a6ef
URL_busqueda_Name: https://gateway.marvel.com:443/v1/public/characters?name=3-D%20Man&ts=1&apikey=4f16045bf4fdd0a2d87d5bdbeb497f8c&hash=cac805bbdb216a6580c1177d1a13a6ef
Algunos Personajes con Imagen: 3-D Man, A-Bomb (HAS), A.I.M., Abomination (Emil Blonsky), Absorbing Man, Abyss, Abyss (Age of Apocalypse), Adam Warlock, Aegis (trey Rollins), Agatha Harkness, Agent Brand, Agent Zero, Agents of Atlas.
*/

//Uso de Vue
//API: http://api.mediastack.com/v1/news?access_key=ff0037ff9007b4d8a7fd94397b7f4a70&keywords={texto a buscar}   
const app = new Vue({
    el: '#app',
    data: {
        encabezadoPagina: 'Pruebas VUE usando API',
        textoAgregar: '',
        listaReproduccion: []
        //almacenamiento
    },
    methods: {
        async AgregarNoticiaMiLista(){
            let resultado = await fetch(`http://api.mediastack.com/v1/news?access_key=ff0037ff9007b4d8a7fd94397b7f4a70&keywords=${this.textoAgregar}&limit=1`);
            let resultadoJson = await resultado.json();

            //Verificar resultado (para cada JSON se debe revisar la condicion)(el resultado igual a 1 es para ver solo un resultado)
            if(resultadoJson.pagination["count"]==1)
            {
                //Agregar Noticia
                this.listaReproduccion.push
                (
                    {
                        titulo: resultadoJson.data[0]['title'],
                        descripcion:    resultadoJson.data[0]['description'],
                        url:    resultadoJson.data[0]['url'],
                        fecha: resultadoJson.data[0]['published_at'],
                        like: false,
                    }
                )
                
                localStorage.setItem('almacenamiento', JSON.stringify(this.listaReproduccion)); 

            } else {
                alert('No hay noticias con esta descripcion')
            }
            //con esto se quita el texto del imput luego de la busqueda
            this.textoAgregar = '';
        },
        marcarLike(posicion){
            //usa la funcion if corta [condicion ? opcion1 : opcion 2]
            this.listaReproduccion[posicion].like = this.listaReproduccion[posicion].like ? false: true;
            localStorage.setItem('almacenamiento', JSON.stringify(this.listaReproduccion));
        },
        eliminarDeLista(posicion){
            this.listaReproduccion.splice(posicion, 1);
            localStorage.setItem('almacenamiento', JSON.stringify(this.listaReproduccion));
        },
        
    },
    //para mantener la informacion manejada en las secion
    created(){
        let datosAlamcenados = JSON.parse(localStorage.getItem('almacenamiento'));
        if(datosAlamcenados == null){
            this.listaReproduccion = [];
        } else {
            this.listaReproduccion = datosAlamcenados;
        }
    }
})