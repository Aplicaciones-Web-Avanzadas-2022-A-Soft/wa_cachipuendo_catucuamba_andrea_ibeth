import {useState} from 'react';
import {MonedasInterface} from "../constantes/monedas";

const useSelectMoneda = (label: string, opciones: MonedasInterface[]) => {
    // Usamos Hooks React (userState)
    // const [state, setState] = useState('VALOR')
    // const [valorEjemplo, setValorEjemplo] = useState('Christian Moran')
    const [valorMoneda, setValorMoneda] = useState('');
    const generarSelectMonedas = () => {
        return opciones.map(
            (moneda) => (
                <option key={moneda.id} id={moneda.id} value={moneda.id}> {moneda.nombre}</option>
            )
        )
    }
    const SelectMonedas = () => (
        <>
            <label className="form-label" htmlFor={label}>{label}</label>
            <select className="form-select"
                    name={label}
                    id={label}
                    value={valorMoneda}
                    onChange={e => setValorMoneda(e.target.value)}
            >
                <option value="">Seleccione opción</option>
                {generarSelectMonedas()}
            </select>
            {/*<label className="form-label" htmlFor="moneda">Moneda </label>*/}
            {/*<label className="form-label" htmlFor="ejemplo">Ejemplo </label>*/}
            {/*<p>El valor es: {valorEjemplo}</p>*/}
            {/*<input className="form-control"*/}
            {/*       value={valorEjemplo}*/}
            {/*       id="ejemplo"*/}
            {/*       onChange={(e)=>{*/}
            {/*           e.preventDefault();*/}
            {/*           setValorEjemplo(e.target.value)*/}
            {/*       }}*/}
            {/*       type="text"/>*/}
            {/*<button onClick={*/}
            {/*    (event)=>{*/}
            {/*        event.preventDefault();*/}
            {/*        setValorEjemplo('Christian '+new Date().getTime());*/}
            {/*    }*/}
            {/*}*/}
            {/*>Cambiar ejemplo</button>*/}
        </>
    )
    return [valorMoneda, SelectMonedas]
    // return [
    //     'hola',
    //     14,
    //     (<> <h1>Hola</h1> </>),
    //     () => {
    //         return (<> <h1>Mundo</h1></>)
    //     }
    // ]
}
export default useSelectMoneda