// 02-deber.js
const fs = require('fs');
const inquirer = require('inquirer');
const path = './RegistroDatos.txt';
let arrayObjResp = []

function leerArchivo(path){
    return new Promise(
        (
            resolve,
            reject
        ) => {
            fs.readFile(
                path,
                'utf-8',
                (error, contenido) => {
                    if(error){
                        reject('Error leyendo archivo.');
                    }else{
                        resolve(contenido);
                    }
                }
            );
        }
    )
}

function escribirArchivo(path, contenido){
    return new Promise(
        (
            resolve,
            reject
        ) => {
            fs.writeFile(
                path,
                contenido,
                (errorEscritura)=>{
                    if(errorEscritura){
                        reject('Error escribiendo archivo.');
                    }else{
                        resolve('Archivo escrito.');
                    }
                }
            );
        }
    )
}

async function alamacenarDatos(){
    try{
        await escribirArchivo(path, JSON.stringify(arrayObjResp));
    }catch (e) {
        console.log('Error en la escritura de los datos.');
    }
}

async function obtenerDatos(){
    let contenido;
    try{
        contenido = await leerArchivo(path);
        if(contenido !== 0){
            arrayObjResp = JSON.parse(contenido);
        }else{
            arrayObjResp = [];
        }
    }catch(e){
        console.log('Error en la lectura de los datos');
    }
}

async function guardarId(entidad){
    try{
        const resp = await inquirer.prompt(
            {
                type: 'input',
                name: 'id',
                message: 'Ingrese el id del'+ entidad +'ha actualizar o eliminar: '
            }
        )
        return resp.id;
    }catch (e) {
        console.log('Error al guardar el id');
    }
}

async function crearArtista(){
    try{
        await leerArtista();
        const resp = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Ingrese el id del artista:'
                },
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Ingrese el nombre del artista:'
                },
                {
                    type: 'input',
                    name: 'apellido',
                    message: 'Ingrese el apellido del artista:'
                },
                {
                    type: 'number',
                    name: 'edad',
                    message: 'Ingrese la edad del artista:'
                },
                {
                    type: 'input',
                    name: 'genero',
                    message: 'Ingrese el genero del artista:'
                },
                {
                    type: 'input',
                    name: 'nombreArtistico',
                    message: 'Ingrese el nombre artístico:'
                },

        ])
        const i = arrayObjResp.findIndex(
            elemento => elemento.id === resp.id
        )
        if(i !== -1){
            console.log('\n\nYa existe un artista con el mismo id.\n')
        }else{
            resp.cancion = [];
            resp.tipo = 'Artista';
            arrayObjResp.push(resp);
            console.log('\n\nArtista creado!!.\n')
            await leerArtista();
        }
    }catch (e) {
        console.log('\n\nError al crear un nuevo artista.');
    }
}

const leerArtista = () => {
    const arrayArt = arrayObjResp
        .filter(
            (valorActual, indiceActual, arregloCompleto)=>{
                return valorActual.tipo === 'Artista';
            }
        );
    if(arrayArt.length !== 0){
        console.log('\n\n\t\tListado de artistas');
        const array = arrayArt
            .map(
                (valorActual, indiceActual, arregloCompleto) => {
                    return {
                        id: valorActual.id,
                        nombre: valorActual.nombre,
                        apellido: valorActual.apellido,
                        cancion: JSON.stringify(valorActual.artista),
                        genero: valorActual.genero,
                        nombreArtistico: valorActual.nombreArtistico,

                    };
                }
            );
        console.log(array);
    }else{
        console.log('\n\nNo existen artistas.\n');
    }
}

async function actualizarArtista(){
    await leerArtista();
    let idArtista = await guardarId(' artista ');
    const i = arrayObjResp.findIndex(
        elemento => elemento.id === idArtista
    )
    if(i !== -1){
        try{
            const resp = await inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'nombre',
                        message: 'Ingrese el nombre del artista:'
                    },
                    {
                        type: 'input',
                        name: 'apellido',
                        message: 'Ingrese el apellido del artista:'
                    },
                    {
                        type: 'number',
                        name: 'edad',
                        message: 'Ingrese la edad del artista:'
                    },
                    {
                        type: 'input',
                        name: 'genero',
                        message: 'Ingrese el genero del artista:'
                    },
                    {
                        type: 'input',
                        name: 'nombreArtistico',
                        message: 'Ingrese el nombre artístico:'
                    },
            ])
            arrayObjResp[i].nombre = resp.nombre;
            arrayObjResp[i].apellido = resp.apellido;
            arrayObjResp[i].edad = resp.edad;
            arrayObjResp[i].genero = resp.anio;
            arrayObjResp[i].nombreArtistico = resp.nombreArtistico;

            console.log('\n\nArtista actualizad.\n')
            await leerArtista();
        }catch (e) {
            console.log('\n\nNo se pudo actualizar el artista.')
        }
    }else{
        console.log('\n\nNo existe ningun artista con ese identificador.\n')
    }
}

async function borrarArtista(){
    await leerArtista();
    let idArtista = await guardarId(' artista ');
    const i = arrayObjResp.findIndex(
        elemento => elemento.id === idArtista
    )
    if(i !== -1){
        try{
            const resp = await inquirer.prompt(
                {
                    type: "confirm",
                    name: "confirmacion",
                    message: "¿Seguro desea eliminar el artista?"
                }
            )
            if(resp.confirmacion){
                arrayObjResp.splice(i, 1);
                console.log('\n\nArtista eliminado con éxito.\n');
                await leerArtista();
            }else{
                console.log('\n\nEliminacion cancelada.\n');
            }
        }catch (e) {
            console.log('\n\nError al eliminar artista.',e)
        }
    }else{
        console.log('\n\nNo existe ningun artista con el mismo identificador.\n')
    }
}

async function crearCancion(){
    try{
        await leerArtista();
        const resp = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Ingrese el id de la cancion:'
                },
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Ingrese el nombre de la cancion:'
                },
                {
                    type: 'input',
                    name: 'autor',
                    message: 'Ingrese el autor de la cancion:'
                },
                {
                    type: 'input',
                    name: 'genero',
                    message: 'Ingresa el genero de la cancion:'
                },
                {
                    type: 'number',
                    name: 'anio',
                    message: 'Ingresa el anio de lanzamiento:'
                },
                {
                    type: 'number',
                    name: 'clasificacion',
                    message: 'Ingrese la clasificación de la cancion:'
                },
                {
                    type:'number',
                    name:'idArtista',
                    message:'Ingrese el id del Artista: '
                }

        ])
        const i = arrayObjResp.findIndex(
            elemento => elemento.id === resp.id
        )
        if(i !== -1){
            console.log('\n\nYa existe una cancion con ese mismo id.\n')
        }else{
            resp.tipo = 'cancion';
            let obj = {idCancion: resp.id,nombre: resp.nombre}
            if(arrayObjResp[resp.idArtista-1].cancion=== undefined){
                arrayObjResp[resp.idArtista-1].cancion.push(obj);
            }else{
                arrayObjResp[resp.idArtista-1].cancion.push(obj);
            }
            arrayObjResp.push(resp);
            console.log('\n\nCancion creada con éxito.\n')
            await leerCancion();
        }
    }catch (e) {
        console.log('\n\nError al crear una cancion.');
    }
}

const leerCancion = () => {
    const arrayCancion = arrayObjResp
        .filter(
            (valorActual, indiceActual, arregloCompleto)=>{
                return valorActual.tipo === 'cancion';
            }
        );
    if(arrayCancion.length !== 0){
        console.log('\n\n\t\tListado de canciones');
        console.log(arrayCancion);
    }else{
        console.log('\n\nNo existen canciones.\n');
    }
}

async function actualizarCancion(){
    await leerCancion();
    let idCancion = await guardarId(' cancion ');
    const i = arrayObjResp.findIndex(
        elemento => elemento.id === idCancion
    )
    if(i !== -1){
        try{
            const resp = await inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'nombre',
                        message: 'Ingrese el nombre de la cancion:'
                    },
                    {
                        type: 'input',
                        name: 'autor',
                        message: 'Ingrese el autor de la cancion:'
                    },
                    {
                        type: 'input',
                        name: 'genero',
                        message: 'Ingresa el genero de la cancion:'
                    },
                    {
                        type: 'number',
                        name: 'anio',
                        message: 'Ingresa el anio de lanzamiento:'
                    },
                    {
                        type: 'number',
                        name: 'clasificacion',
                        message: 'Ingrese la clasificación de la cancion:'
                    },
            ])
            arrayObjResp[i].nombre = resp.nombre;
            arrayObjResp[i].autor = resp.autor;
            arrayObjResp[i].genero = resp.anio;
            arrayObjResp[i].anio = resp.anio;
            arrayObjResp[i].clasificacion = resp.clasificacion;
            console.log('\n\nCancion actualizada con éxito.\n')
            await leerCancion();
        }catch (e) {
            console.log('\n\nNo se pudo actualizar la cancion.',e)
        }
    }else{
        console.log('\n\nNo existe una cancion con ese mismo identificador.\n')
    }
}

async function borrarCancion(){
    await leerCancion();
    let idCancion = await guardarId(' cancion ');
    const i = arrayObjResp.findIndex(
        elemento => elemento.id === idCancion
    )
    if(i !== -1){
        try{
            const resp = await inquirer.prompt(
                {
                    type: "confirm",
                    name: "confirmacion",
                    message: "¿Seguro desea eliminar la cancion?"
                }
            )
            if(resp.confirmacion){
                let idArtista = arrayObjResp[i].idArtista;
                arrayObjResp.splice(i, 1);
                const indiceArray = arrayObjResp[idArtista-1].cancion.findIndex(
                    elemento => elemento.id === idCancion
                );
                arrayObjResp[idArtista-1].cancion.splice(indiceArray, 1);
                console.log('\n\nCancion eliminado con éxito.\n');
                await leerCancion();
            }else{
                console.log('\n\nEliminacion cancelada.\n');
            }
        }catch (e) {
            console.log('\n\nNo se pudo eliminar la cancion.',e)
        }
    }else{
        console.log('\n\nNo existe una cancion con ese mismo identificador.\n')
    }
}

async function menu(){
    await obtenerDatos();
    let opcion = -1;
    while(opcion !== 0){
        console.log(
            '\t\tMenu Principal\n'
            +'\n0. Salir.'
            +'\n1. Crear Artista.'
            +'\n2. Listar Artistas.'
            +'\n3. Actualizar Artista.'
            +'\n4. Borrar Artista.'
            +'\n5. Crear cancion.'
            +'\n6. Listar  canciones.'
            +'\n7. Actualizar canciones.'
            +'\n8. Borrar cancion.');
        try{
            const resp = await inquirer.prompt(
                {
                    type: 'number',
                    name: 'opcion',
                    messaje: 'Seleccione una opción: '
                }
            )
            opcion = resp.opcion;
            switch (opcion) {
                case 0:
                    await alamacenarDatos();
                    return;
                case 1:
                    await crearArtista();
                    break;
                case 2:
                    leerArtista();
                    break;
                case 3:
                    await actualizarArtista();
                    break;
                case 4:
                    await borrarArtista();
                    break;
                case 5:
                    await crearCancion();
                    break;
                case 6:
                    leerCancion();
                    break;
                case 7:
                    await actualizarCancion();
                    break;
                case 8:
                    await borrarCancion();
                    break;
                default:
                    console.log('No es una orden del menú.')
                    break;
            }
        }catch (e) {
            console.log('No se puede acceder al menú.', e);
        }
    }
}

menu();

