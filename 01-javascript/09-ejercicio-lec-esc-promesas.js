// 09-ejercicio-lec-esc-promesas.js
const fs = require('fs');

/*
Hacer una funcion que me acepte como parametro una variable
con el path del primer archivo, el path del segundo archivo
y el path del nuevo archivo.
Vamos a crear dos funciona una promesaLectura y una promesaEscritura
promesaLectura va a aceptar path de lectura
promesaEscritura va a aceptar path nuevo archivo y el contenido
- Promesa de lectura
- Promesa de escritura
* */

function promesaLectura(path) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                path, // Nombre o path del archivo
                'utf-8', // codificacion
                (errorLectura, contenido) => {
                    if (errorLectura) {
                        reject(errorLectura)
                    } else {
                        resolve(contenido)
                    }
                }
            )
        }
    )
}

function promesaEscritura(path, contenidoArchivo) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                path,
                contenidoArchivo,
                (errorEscritura) => {
                    if (errorEscritura) {
                        reject(errorEscritura)
                    } else {
                        resolve('Completado');
                    }
                }
            );
        }
    )
}

function ejercicio(pathUno, pathDos, pathTres) {

    let contenido = '';
    promesaLectura(pathUno)
        .then(
            (primerContenido) => {
                contenido = contenido + primerContenido;
                return promesaLectura(pathDos)
            }
        )
        .then(
            (segundoContenido) => {
                contenido += segundoContenido;
                return promesaEscritura(pathTres, contenido);
            }
        )
        .then(
            (mensaje) => {
                console.log(mensaje);
            }
        )
        .catch(
            (error) => {
                console.error(error);
            }
        )


}

// ASYNC AWAIT
// REGLAS:
// 1) Estar dentro de una funcion (nombrada o anonima)
// 2) AGREGAR la palabra 'async' antes de la declaracion
//    de la funcion
// 3) AGREGAR la palabra 'await' antes de la declaracion
//    de una promesa
async function ejecutarPromesasAsyncAwait(pathUno, pathDos, pathTres) {
    try {
        const primerContenido = await promesaLectura(pathUno);
        const segundoContenido = await promesaLectura(pathUno);
        await promesaEscritura(pathTres, primerContenido + segundoContenido);
    } catch (error) {
        console.error(error);
    }
}








