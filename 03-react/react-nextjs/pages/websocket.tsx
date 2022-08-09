import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import io from "socket.io-client"
import {useForm} from "react-hook-form";
const servidorWebSocket = 'http://localhost:8080';
const socket = io(servidorWebSocket);



export default function WebSocket(){
    const [isConnected, setIsConnected] = useState(socket.connected)
    const [mensajes, setMensajes] = useState([] as MensajeChatProps[]);
    const {control, register, handleSubmit, formState: {errors, isValid}} = useForm({
        defaultValues: {
            salaId: '',
            nombre: '',
            mensaje:'',
        },
        mode: 'all'
    })
    useEffect(
        () => {
            socket.on('connect', () => {
                setIsConnected(true);
                console.log("Si está conectado");
            });
            socket.on('disconnect', () => {
                setIsConnected(false);
                console.log("No está conectado");
            });
            socket.on('escucharEventoHola',(data: {mensaje:string}) => {
                const nuevoMensaje:MensajeChatProps = {
                    mensaje:data.message,
                    nombre:'Sistema',
                    posicion:'I'
                };
                setMensajes((mensajeAnteriores)=>
                    [...mensajeAnteriores, nuevoMensaje]);
            });
        },
        []
    )

    const enviarEventoHola = () => {
        const nuevoMensaje:MensajeChatProps = {
            mensaje:data.message,
            nombre:'Sistema',
            posicion:'I'
        };
        socket.emit(
            'hola', // Nombre Evento
            nuevoMensaje, //  Datos evento
            (datosEventoHola) => { // Callback o respuesta del evefnto
                setMensajes((mensajesAnteriores) => [...mensajesAnteriores, nuevoMensaje]);
            }
        )
    }

    const unirseSala = (data) => {
        if(data.mensaje==''){
            const dataEventoUnirseSala={
                salaId:data.salaId,
                nombre:data.nombre,
            };
            socket.emit(
                'unirseSala',//NombreEvento
                dataEventoUnirseSala,   //DatosEvento
                ()=>{   //Callback o respuesta del evento
                    const nuevoMensaje:MensajeChatProps={
                        mensaje:'Bienvenido a la sala'+dataEventoUnirseSala.salaId,
                        nombre:'Sistema',
                        posicion:'I'
                    };
                    setMensajes((mensajesAnteriores)=>[...mensajesAnteriores,nuevoMensaje]);
                }
            )
        }
    }

    const enviarMensajeALaSala = (data) => {
        console.log(data);
    }
    return(
        <>
            <Layout title="WebSocket">
                <h1>Websockets</h1>
                <button className="btn btn-success" onClick={()=> enviarEventoHola()}>Enviar evento hola</button>
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit = {handleSubmit(unirseSala)}>
                            <div className="mb-3">
                                <label htmlFor="salaId" className="form-label">Sala Id</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="EJ: 1234"
                                       id="salaId"
                                       {...register('salaId',{
                                           required: {value: true, message: 'Requerido'},
                                           validate:{
                                               soloNumeros: (valorActual)=>{
                                                   if(Number.isNaN(+valorActual)){
                                                       return 'Ingrese solo números';
                                                   }else{
                                                       return true;
                                                   }
                                               }
                                           }
                                       })}
                                       aria-describedby="salaIdHelp"/>
                                <div id="salaIdHelp" className="form-text">
                                    Ingresa tu Id de sala.
                                </div>
                                {errors.salaId &&
                                    <div className="alert alert-warning" role="alert">
                                        Errores: {errors.salaId.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="EJ: Christian"
                                       id="nombre"
                                       {...register('nombre',{
                                           required: {value: true, message: 'Requerido'},
                                       })}
                                       aria-describedby="nombreHelp"/>
                                <div id="nombreHelp" className="form-text">
                                    Ingresa tu nombre.
                                </div>
                                {errors.nombre &&
                                    <div className="alert alert-warning" role="alert">
                                        Errores: {errors.nombre.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <button type="submit"
                                        disabled={!isValid}
                                        className="btn btn-warning">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6">
                        <form onSubmit = {handleSubmit(enviarMensajeALaSala)}>
                            <div className="mb-3">
                                <label htmlFor="salaId" className="form-label">Sala Id</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="EJ: 1234"
                                       id="salaId"
                                       {...register('salaId',{
                                           required: {value: true, message: 'Requerido'},
                                           validate:{
                                               soloNumeros: (valorActual)=>{
                                                   if(Number.isNaN(+valorActual)){
                                                       return 'Ingrese solo números';
                                                   }else{
                                                       return true;
                                                   }
                                               }
                                           }
                                       })}
                                       aria-describedby="salaIdHelp"/>
                                <div id="salaIdHelp" className="form-text">
                                    Ingresa tu Id de sala.
                                </div>
                                {errors.salaId &&
                                    <div className="alert alert-warning" role="alert">
                                        Errores: {errors.salaId.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input type="text"
                                       className="form-control"
                                       placeholder="EJ: Christian"
                                       id="nombre"
                                       {...register('nombre',{
                                           required: {value: true, message: 'Requerido'},
                                       })}
                                       aria-describedby="nombreHelp"/>
                                <div id="nombreHelp" className="form-text">
                                    Ingresa tu nombre.
                                </div>
                                {errors.nombre &&
                                    <div className="alert alert-warning" role="alert">
                                        Errores: {errors.nombre.message}
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <button type="submit"
                                        disabled={!isValid}
                                        className="btn btn-warning">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ul>
                    {mensajes.map((mensaje,indice)=>
                    //<li key={indice}>{mensaje.mensaje}</li>)}
                    <MensajeChat key={indice}
                        mensaje={mensaje.mensaje}
                        nombre={mensaje.nombre}
                        posicion={mensaje.posicion}
                    />
                </ul>
            </Layout>
        </>
    )
}
