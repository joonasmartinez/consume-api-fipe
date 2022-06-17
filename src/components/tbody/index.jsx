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

    
    useEffect(()=>{
        const load = async () =>{
            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${input}/modelos`, {method:'GET'}).then(res => res.json());
            setModelos(response);
            console.log(response.modelos)
        }
        load()
    }, [input])

    useEffect(()=>{
        const load = async () =>{
            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${input}/modelos/${input2}/anos`, {method:'GET'}).then(res => res.json());
            setAnos(response);
            console.log(response)
            console.log(anos)
        }
        load()
    }, [input2])

    useEffect(()=>{
        const load = async () =>{
            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${input}/modelos/${input2}/anos/${input3}`, {method:'GET'}).then(res => res.json());
            console.log(response)
            setCarro(response);
        }
        load()
    }, [input3])


    
    return(
        <C.Container>
            <h2>Selecione a marca</h2>
            <C.Input onChange={(e)=>{setInput(props.data.filter(item => item.nome == e.target.value)[0].codigo)}}>{props.data ? props.data.map((item)=>(<option key={item.codigo}>{item.nome}</option>)) : (<option>Carregando...</option>)}</C.Input>
            <h2>Selecione o modelo</h2>
            <C.Input onChange={(e)=>{setInput2(modelos.modelos.filter(item => item.nome == e.target.value)[0].codigo)}}>{modelos != '' ? modelos.modelos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option></option>)}</C.Input>
            <h2>Selecione o ano</h2>
            <C.Input onChange={(e)=>{setInput3(anos.filter(item => item.nome == e.target.value)[0].codigo)}}>{anos != '' ? anos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option></option>)}</C.Input>
            <C.ContainerCard>{(input2 != '' && input3 != '') ? (<CardCar Title={`${carro.Marca} / ${carro.Modelo} - ${carro.MesReferencia}`} Value={carro.Valor}/>) : (<CardCar Title="Aguardando" Value="..."/>)}</C.ContainerCard>
        </C.Container>
    )
}

export default TBody;