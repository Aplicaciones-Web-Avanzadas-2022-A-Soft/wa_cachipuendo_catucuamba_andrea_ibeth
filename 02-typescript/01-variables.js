// 01-variables.ts
// npm install -g typescript
// tsc
// 01-variables.ts
var nombre = 'Adrian'; // primitivo
var nombre2 = 'Adrian2'; // Clase String
// nombre = 1;
nombre = 'Vicente';
var edad = 32;
var casado = false;
var fecha = new Date();
var sueldo;
sueldo = 12.4;
// Duck Typing
var apellido = 'Eguez'; // string ->
apellido = 'Adrian'; // igual a otros string
apellido.toUpperCase(); // metodos string
// apellido = 1; // Error, no es un string
var marihuana = 2;
marihuana = '2';
marihuana = true;
marihuana = function () { return '2'; };
var edadMultiple = '2'; // 2 / new Date()
edadMultiple = '2';
edadMultiple = 'dos';
edadMultiple = new Date();
edadMultiple = 2222;
var numeroUnico = 1; //  para igualar a otros se castea
numeroUnico = edadMultiple;
// edadMultiple = true;
// edadMultiple as Date;
// edadMultiple as string;
// edadMultiple as number;
// tsc nombre-archivo.ts
// tsc 01-variables.ts
