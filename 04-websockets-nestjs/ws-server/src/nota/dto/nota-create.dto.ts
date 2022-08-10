import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class NotaCreateDto{
    @IsNotEmpty()
    @IsString()
    usuario:string;

    @IsNotEmpty()
    @IsNumber()
    nota1:number;

    @IsNotEmpty()
    @IsNumber()
    nota2:number;

    @IsNotEmpty()
    @IsNumber()
    notaFinal:number;

    @IsNotEmpty()
    @IsString()
    comentario:string;

}