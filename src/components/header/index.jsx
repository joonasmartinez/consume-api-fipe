import React, { useEffect, useState } from 'react';
import * as C from './styles';
import Loading from '../loading';
import CarSimilarOption from '../CarSimilarOption';
import { CarSimilarSpace } from './styles';

const Header = () => {

    const [marca, setMarca] = useState(['']);
    const [modelo, setModelo] = useState(['']);
    const [input, setInput] = useState('');
    const [options, setOptions] = useState('');
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState(['']);
    const [buscando, setBuscando] = useState(false);
    const [infoFet, setInfoFet] = useState({marca:'', modelo:'', ano:''})
    const [data, setData] = useState({})

    const searchValues = async (termoBusca) => {
    
        termoBusca = termoBusca.split(' ')

        if(buscando === false){
            try {
                setBuscando(true);
                await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => {res.filter(item => item.nome.toLowerCase() == termoBusca[0].toLowerCase() ?
                (fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res2 => res2.json()).then(res2 => {setBusca(''), res2.modelos.map(item => {setBusca(prev=> [...prev,item])})}), setInfoFet(prev => {return {...prev, marca:item.codigo}}))
                    : setErro("Não foi possível localizar.")), setBuscando(false)});
            } catch (e) {
                console.log("Erro na busca.")
            }
        }else{
            console.log("Aguarde, buscando...")
        }

    }
    const searchInputClick = (code) => {
        console.log("Searching code...")
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos/${code}/anos`, { method: 'GET' }).then(res => res.json()).then(res2 => setInfoFet(prev => {return{...prev, ano:res2}}));
    }

    const noResult = (time) => {
        setTimeout(()=>{
            console.log("Nada encontrado.")
            setInput('')
        }, time)
    }

    useEffect(()=>
    {
        console.log(infoFet, "Marca")
        
    }, [infoFet.marca])

    useEffect(()=>
    {
        console.log(infoFet, "modelo")
        
    }, [infoFet.modelo])

    useEffect(()=>
    {
        console.log(infoFet, "Ano")
        
    }, [infoFet.ano])

    useEffect(()=>{
        if(input == ''){
            setInfoFet({marca:'', modelo:'', ano:''});
        }
    }, [input])

    const searchOptions = (termoBusca) => {
        searchValues(termoBusca)

    }

    return (
        <C.Nav>
            <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
            <C.Options>
                <C.SearchSpace>
                    <C.Form onSubmit={(e) => e.preventDefault()}>
                        <C.Search key={'searchInput'} placeholder='Ex.: Hyundai HB20' onChange={(e) => {
                            setInput(e.target.value);
                            searchOptions(e.target.value);
                            setBusca('');
                        }

                        } value={input}/>

                        <C.ButtonSearch onClick={(e) => { e.defaultPrevented, searchValues(input) }}>Buscar</C.ButtonSearch>
                    </C.Form>
                </C.SearchSpace>
            {input != "" ? 
            ( busca.length > 1  ?  
                <C.OptionsSpace onBlur={()=>{setBusca(''); setInput('')}} height={'200px'}>
                    {busca.map((item, index) =>
                    <C.CarSimilarSpace key={index} onClick={()=>{setInput(item.nome), setBusca(['']), searchInputClick(item.codigo), setInfoFet(prev => {return {...prev, modelo:item.codigo}}) }}>
                        <CarSimilarOption key={index} Title={`${item.nome}`}/>
                    </C.CarSimilarSpace>)}
                </C.OptionsSpace> : buscando ? <C.OptionsSpace height={'30px'}><Loading /></C.OptionsSpace> : '' ) : ("")}
            </C.Options>
        </C.Nav>

    )
}

export default Header;