import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NotaEntity} from "./nota.entity";
import {NotaService} from "./nota.service";

// Modulo Usuario
@Module({
    imports: [
        TypeOrmModule.forFeature(
            [NotaEntity], //Entidad en este modulo
            'default' // nombre de la conexion
        )
    ],
    providers: [NotaService],
    exports: [],
})
export class NotaModule{

}