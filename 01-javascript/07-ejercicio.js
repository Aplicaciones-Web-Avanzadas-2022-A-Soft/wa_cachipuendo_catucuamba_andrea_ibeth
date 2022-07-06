function ejercicio(
    pathPrimerArchivo,
    pathSegundoArchivo,
    nombreNuevoArchivo
) {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                pathPrimerArchivo, // Nombre o path del archivo
                'utf-8', // codificacion
                (errorLecturaPrimerArchivo, contenidoPrimerArchivo) => {
                    if (errorLecturaPrimerArchivo) {
                        console.error(errorLecturaPrimerArchivo);
                        reject('Error leyendo primer archivo');
                    } else {

                        fs.readFile(
                            pathSegundoArchivo, // Nombre o path del archivo
                            'utf-8', // codificacion
                            (errorLecturaSegundoArchivo, contenidoSegundoArchivo) => {
                                if (errorLecturaSegundoArchivo) {
                                    console.error(errorLecturaSegundoArchivo);
                                    reject('Error leyendo primer archivo');
                                } else {
                                    const nuevoContenido = contenidoPrimerArchivo + contenidoSegundoArchivo;
                                    fs.writeFile(
                                        nombreNuevoArchivo,
                                        nuevoContenido,
                                        (errorEscritura) => {
                                            if (errorEscritura) {
                                                console.error(errorEscritura);
                                                reject('Error escribiendo nuevo archivo');
                                            } else {
                                                resolve('Completado');
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }

                }
            );
        }
    )
}