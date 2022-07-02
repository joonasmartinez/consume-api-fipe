import React, { useEffect, useState } from 'react';
import * as C from './styles';
import Loading from '../loading';
import CarSimilarOption from '../CarSimilarOption';
import { CarSimilarSpace } from './styles';

const Header = () => {

    const [marcas, setMarcas] = useState('');
    const [modelos, setModelos] = useState(['']);
    const [input, setInput] = useState('');
    const [options, setOptions] = useState('');
    const [busca, setBusca] = useState(['']);
    const [autoComplete, setAutoComplete] = useState('');
    const [buscando, setBuscando] = useState(false);
    const [infoFet, setInfoFet] = useState({ marca: '', modelo: '', ano: '' })
    const [data, setData] = useState({})

    useEffect(() => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => setMarcas(res))
    }, [])

    const searchValues = async (termoBusca) => {

        let find = false;

        termoBusca = termoBusca.split(' ');

        termoBusca.forEach(termo => { //Busca para cada palavra.
 
            setBuscando(true)
            autoCompleteSearch()

            marcas.forEach((item, index) => {

                if (termo.toLowerCase() == item.nome.toLowerCase()) {
                    find = true;
                    setInfoFet(prev => { return { ...prev, marca: item.codigo } })

                    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => { setModelos(res), res.modelos.forEach(item => setBusca(prev => [...prev, item])) })

                }

            })
        });

        if(!find){
            setBuscando(false)
        }
    }

    const autoCompleteSearch = () => {
        
        setAutoComplete('')
        console.log(autoComplete)
        if(modelos.length > 1) {

            console.log(input.split(''))
            modelos.forEach(item => {
                if(input.toLocaleLowerCase().split('')[1].some((a, index)=>{return  a == item.nome.toLocaleLowerCase()[index]})){
                    setAutoComplete(prev => [...prev, item])
                    console.log(autoComplete)
                }

            })


        }else{
            marcas.forEach(item => {
                if(input.toLocaleLowerCase().split('').every((a, index)=>{return  a == item.nome.toLocaleLowerCase()[index]})){
                    setAutoComplete(prev => [...prev, item])
                }

            })
        }

    }


    const searchInputClick = (code) => {
        console.log("Searching code...")
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos/${code}/anos`, { method: 'GET' }).then(res => res.json()).then(res2 => setInfoFet(prev => { return { ...prev, ano: res2 } }));
    }

    useEffect(() => {
        console.log(infoFet, "Marca")
        if(infoFet.marca != '') {
            setBusca('')
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => { setModelos(res), res.modelos.forEach(item => setBusca(prev => [...prev, item])) })
        }
        
    }, [infoFet.marca])
    
    useEffect(() => {
        console.log(infoFet, "modelo")

    }, [infoFet.modelo])

    useEffect(() => {
        console.log(infoFet, "Ano")

    }, [infoFet.ano])

    useEffect(() => {
        if (input == '') {
            setInfoFet({ marca: '', modelo: '', ano: '' });
        }
        
        if(input != "") {
            autoCompleteSearch()}
    }, [input])

    return (
        <C.Nav>
            <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
            <C.Options>
                <C.SearchSpace>
                    <C.Form onSubmit={(e) => e.preventDefault()}>
                        <C.Search key={'searchInput'} placeholder='Ex.: Hyundai HB20' onChange={(e) => {
                            setInput(e.target.value);
                            searchValues(e.target.value);
                            if(input == '') setBusca('')
                        }

                        } value={input} />

                        <C.ButtonSearch onClick={(e) => { e.defaultPrevented, searchValues(input) }}>Buscar</C.ButtonSearch>
                    </C.Form>
                </C.SearchSpace>
                {input != "" ?
                    (busca.length > 1 || autoComplete.length > 0 ?
                        
                        busca.length > 1 ? <C.OptionsSpace onBlur={() => { setBusca(''); setInput('') }} height={'200px'}>
                        {busca.map((item, index) =>
                            <C.CarSimilarSpace key={index} onClick={() => { setInput(item.nome), setBusca(['']), searchInputClick(item.codigo), setInfoFet(prev => { return { ...prev, modelo: item.codigo } }) }}>
                                <CarSimilarOption key={index} Title={`${item.nome}`} />
                            </C.CarSimilarSpace>)}
                    </C.OptionsSpace> : <C.OptionsSpace onBlur={() => { setBusca(''); setInput('') }} height={'100px'}>
                            {autoComplete.map((item, index) =>
                                <C.CarSimilarSpace key={index} onClick={() => { setInput(item.nome), setBusca(['']), setInfoFet(prev => { return { ...prev, marca: item.codigo } }) }}>
                                    <CarSimilarOption key={index} Title={`${item.nome}`} />
                                </C.CarSimilarSpace>)}
                        </C.OptionsSpace> : buscando ? <C.OptionsSpace height={'30px'}><Loading /></C.OptionsSpace> : '') : ("")}
            </C.Options>
        </C.Nav>

    )
}

export default Header;