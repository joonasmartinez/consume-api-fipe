import React, {useState} from "react";
import { useEffect } from "react";
import * as C from './styles'
import CardCar from '../cardsCar';

const TBody = (props)=>{

    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [modelos, setModelos] = useState('');
    const [anos, setAnos] = useState('');
    const [carro, setCarro] = useState('');

    
    useEffect( ()=>{
        const urlBase = "https://parallelum.com.br/fipe/api/v1/carros/marcas/"
        let requestUrl = '';
        
        const load = async () =>{
            return await fetch(`${urlBase}${requestUrl}`, {method:'GET'}).then(res => res.json());
        }

        if(input != '') {

            requestUrl = `${input}/modelos`;
            
            load().then(res => setModelos(res.modelos))
            
        }
        if(input2 != '') {
            
            requestUrl = `${requestUrl}/${input2}/anos`;
            load().then(res => setAnos(res))

        }
        if(input3 != '') {

            requestUrl = `${requestUrl}/${input3}`;
            load().then(res => setCarro(res))
        }

    }, [input, input2, input3])


    
    return(
        <C.Container>
            <h2>Selecione a marca</h2>
            <C.Input onChange={(e)=>{setInput(props.data.filter(item => item.nome == e.target.value)[0].codigo)}}>{props.data ? props.data.map((item)=>(<option key={item.codigo-1}>{item.nome}</option>)) : (<option>Carregando...</option>)}</C.Input>
            <h2>Selecione o modelo</h2>
            <C.Input onChange={(e)=>{setInput2(modelos.filter(item => item.nome == e.target.value)[0].codigo)}}>{modelos != '' ? modelos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option>Seleciona a marca</option>)}</C.Input>
            <h2>Selecione o ano</h2>
            <C.Input onChange={(e)=>{setInput3(anos.filter(item => item.nome == e.target.value)[0].codigo)}}>{anos != '' ? anos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option>Selecione o modelo</option>)}</C.Input>
            {(input3 != '') ? (<C.ContainerCard><CardCar Title={`${carro.Marca} / ${carro.Modelo} (${carro.MesReferencia})`} Value={carro.Valor}/></C.ContainerCard>) : ('')}
        </C.Container>
    )
}

export default TBody;