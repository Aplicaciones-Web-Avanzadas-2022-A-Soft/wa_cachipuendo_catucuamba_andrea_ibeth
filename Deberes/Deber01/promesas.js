const fs = require('fs'); //file system
//SegundoArchivo.txt->Hola

//1. Leer archivo PrimerArchivo.txt.txt, luego imprimir en consola
//2. Después del paso 1, Leer archivo:SegundoArchivo.txt, luego imprimir en consola
//3. Crear un nuevo archivo llamado ArchivoCreado.txt con el contenido de los otros dos archivos

function leerArchivo(archivo1, archivo2,nuevoarchivo){
    const miPrimerPromesa = new Promise(    //Definición de la promesa
        (
            resolve,    //funciòn return
            reject      //funciòn throw
        )=>{
            fs.readFile(
                archivo1,//1
                'utf-8',
                (error1, contenido1)=>{
                    if(error1){
                        throw new Error('Error leyendo primer archivo');
                    }else{
                        console.log('CONTENIDO 1: ',contenido1);
                        fs.readFile(
                            archivo2,//1
                            'utf-8',
                            (error2, contenido2)=>{
                                console.log('CONTENIDO 2: ',contenido2);
                                fs.writeFile(
                                    nuevoarchivo,
                                    contenido1+contenido2,
                                    (errorEscritura)=>{
                                        if(errorEscritura){
                                            console.log('Error en la escritura del archivo');
                                        }else{
                                            console.log('Archivo escrito con ÈXITO!!');
                                        }
                                    }
                                );
                            }
                        );
                    }

                }
            );
        }
    )
    return miPrimerPromesa
}
leerArchivo('./PrimerArchivo.txt','./SegundoArchivo.txt','ArchivoCreado.txt')
    .then(  //return
        (respuesta)=>{
            console.log('Respuesta', respuesta);
        }
    )
    .catch( //throw
        (error)=>{
            console.log('Error',error);
        }
    )
    .finally(   //finally
        ()=>{
            console.info('Fin');
        }
    )