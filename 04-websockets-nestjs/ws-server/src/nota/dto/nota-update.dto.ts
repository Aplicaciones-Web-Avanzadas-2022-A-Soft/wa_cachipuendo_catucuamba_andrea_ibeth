import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class NotaUpdateDto{
    @IsNotEmpty()
    @IsString()
    usuario:string;

    @IsOptional()
    @IsNumber()
        nota1:number;

    @IsOptional()
    @IsNumber()
        nota2:number;

    @IsOptional()
    @IsNumber()
        notaFinal:number;

    @IsNotEmpty()
    @IsString()
    comentario:string;


}