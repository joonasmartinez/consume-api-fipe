import React, {useState} from "react";
import { useEffect } from "react";
import * as C from './styles'
import CardCar from '../cardsCar';

const TBody = (props)=>{
    
    const urlBase = "https://parallelum.com.br/fipe/api/v1/carros/marcas/"
    let requestUrl = '';
    
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [modelos, setModelos] = useState('');
    const [anos, setAnos] = useState('');
    const [carro, setCarro] = useState('');
    const [todosAnos, setTodosAnos] = useState([]);
    
    const loadRelacional = (url) => {
        const newArray = [];
        url.forEach(element => {
             fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${input}/modelos/${input2}/anos/${element.codigo}`, {method:'GET'}).then(res => res.json()).then(res => newArray.push(res));
        });
        setTodosAnos(newArray)
    }
    
    const load = async () =>{
        if(requestUrl == '') return;
        return await fetch(`${urlBase}${requestUrl}`, {method:'GET'}).then(res => res.json());
    }

    const reloadRelacional = () => {
        setTodosAnos([]);
    }


    
    useEffect( ()=>{

        // console.log(input, input2, input3)
        
        // requestUrl = '';

        if(input != '') {

            requestUrl = `${input}/modelos`;

            console.log(requestUrl)
            
            load().then(res => setModelos(res.modelos))
            
        }
        if(input2 != '') {

            requestUrl = `${requestUrl}/${input2}/anos`;
            load().then(res => {setAnos(res);});
            console.log(requestUrl)

        }
        if(input3 != '') {

            requestUrl = `${requestUrl}/${input3}`;
            load().then(res => setCarro(res))
            console.log(requestUrl)
        }


        try {

            if(input2 != '') load().then(res => {todosAnos.length == 0 ? loadRelacional(res) : ('');});
            
            
        } catch (e) {
            
        }

    }, [input, input2, input3, todosAnos])
    
    return(
        <>
        <C.Container>
            <h2>Selecione a marca</h2>
            <C.Input onChange={(e)=>{reloadRelacional(); setInput(props.data.filter(item => item.nome == e.target.value)[0].codigo)}}>{props.data ? props.data.map((item)=>(<option key={item.codigo}>{item.nome}</option>)) : (<option>Carregando...</option>)}</C.Input>
            <h2>Selecione o modelo</h2>
            <C.Input onChange={(e)=>{reloadRelacional(); setInput2(modelos.filter(item => item.nome == e.target.value)[0].codigo); load()}}>{modelos != '' ? modelos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option>Seleciona a marca</option>)}</C.Input>
            <h2>Selecione o ano</h2>
            <C.Input onChange={(e)=>{setInput3(anos.filter(item => item.nome == e.target.value)[0].codigo)}}>{anos != '' ? anos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option>Selecione o modelo</option>)}</C.Input>
            {(input3 != '') ? (<C.ContainerCardSelected><CardCar Title={`${carro.Marca} / ${carro.Modelo} (${carro.MesReferencia})`} Value={carro.Valor}/></C.ContainerCardSelected>) : ('')}
            <C.ContainerCard>{todosAnos.map((item, index) => (<CardCar key={index} Title={`${item.Modelo} (${item.AnoModelo})`} Value={item.Valor}/>))}
              </C.ContainerCard>
        </C.Container>
        </>
    )
}

export default TBody;