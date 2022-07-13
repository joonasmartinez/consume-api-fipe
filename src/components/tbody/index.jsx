import React, {useState, useEffect} from "react";
import * as C from './styles'
import CardCar from '../cardsCar';
import Loading from "../loading";

const TBody = ({data, fromSearch})=>{
    
    const urlBase = "https://parallelum.com.br/fipe/api/v1/carros/marcas/"
    let requestUrl = '';

    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [modelos, setModelos] = useState('');
    const [anos, setAnos] = useState('');
    const [carro, setCarro] = useState('');
    const [todosAnos, setTodosAnos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const loadRelacional = async (url) => {
        const newArray = [];
            url.forEach(element => {
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${input}/modelos/${input2}/anos/${element.codigo}`, {method:'GET'}).then(res => res.json()).then(res => newArray.push(res));
            });
            setTodosAnos(newArray)
            console.log(newArray)
    }
    
    const load = async () =>{
        if(requestUrl == '') return;
        return await fetch(`${urlBase}${requestUrl}`, {method:'GET'}).then(res => res.json());
    }

    const reloadRelacional = () => {
        setTodosAnos([]);
    }

    useEffect(() => {
        if(input != ''){
            setInput2('')
            setInput3('')
            requestUrl = `${input}/modelos`;

            load().then(res => {setModelos(res.modelos); res.modelos.unshift({nome:""})})
        }
    }, [input])

    useEffect(() => {
        if(input2 != '' && input2 != undefined){
            requestUrl = `${input}/modelos/${input2}/anos`;
            load().then(res => {setAnos(res),  res.unshift({nome:""})});
            setLoading(true)
            if(input2 != '') load().then(res => {todosAnos.length == 0 ? loadRelacional(res) : ('');setLoading(false)});
        }
    }, [input2, todosAnos])

    useEffect(() => {
        if(input3 != '' && input3 != undefined){
            requestUrl = `${input}/modelos/${input2}/anos/${input3}`;
            load().then(res => setCarro(res))
        }
    }, [input3])

    useEffect(()=>{
        setTodosAnos([]);
        setCarro('');
        setInput('');
        setInput2('');
        setInput3('');
        setModelos('');

        if(fromSearch.marca != '' && fromSearch.modelo != '' && fromSearch.ano != ''){
            const newArray = [];
            setLoading(true)
            setTodosAnos('')
            fromSearch.ano.forEach((item, index)=>{
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${fromSearch.marca}/modelos/${fromSearch.modelo}/anos/${item.codigo}`, {method:'GET'}).then(res => res.json()).then(res => {newArray.push(res);setLoading(false); setTodosAnos(prev => [...prev, res])});
            })
        }
    }, [fromSearch])

    
    return(
        <>
        <C.Container>

            <C.h3>Selecione a marca</C.h3>
            <C.Input onChange={(e)=>{
                reloadRelacional(); 
                setInput(data.filter(item => item.nome == e.target.value)[0].codigo)
                setInput2('')
                setLoading(false)
                }}>
                    {data ? data.map((item)=>(<option key={item.codigo}>{item.nome}</option>)) : (<option>Carregando...</option>)}</C.Input>

            <C.h3>Selecione o modelo</C.h3>
            <C.Input onChange={(e)=>{
                reloadRelacional()
                setInput2(modelos.filter(item => item.nome == e.target.value)[0].codigo)
                load();
                setInput3('');
                }}>
                    {modelos != '' ? modelos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option>Selecione a marca</option>)}</C.Input>

            <C.h3>Selecione o ano</C.h3>
            <C.Input onChange={(e)=>{
                setInput3(anos.filter(item => item.nome == e.target.value)[0].codigo)
                }}>
                    {anos != '' ? anos.map((item, index)=>(<option key={index}>{item.nome}</option>)) : (<option>Selecione o modelo</option>)}</C.Input>

            {/* Carregamento Modelo e Ano selecionados */}
            {(input3 != '') ? (<C.ContainerCardSelected><CardCar Title={`${carro.Marca} / ${carro.Modelo} (ref.:${carro.MesReferencia})`} Value={carro.Valor}/></C.ContainerCardSelected>) : ('')}
            
            <C.ContainerCard>{ loading ? (<Loading/>) : 
            (todosAnos.map((item, index) =>
                    (<CardCar key={index} Title={`${item.Modelo} (${item.AnoModelo})`} Value={item.Valor}/>)))
            }
              </C.ContainerCard>
        </C.Container>
        </>
    )
}

export default TBody;