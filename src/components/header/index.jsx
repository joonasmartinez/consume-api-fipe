import React, { useEffect, useState, useRef } from 'react';
import * as C from './styles';
import Loading from '../loading';
import CarSimilarOption from '../CarSimilarOption';

const Header = ({ sendSearch }) => {

    const [marcas, setMarcas] = useState('');
    const [input, setInput] = useState('');
    const [busca, setBusca] = useState(['']);
    const [buscando, setBuscando] = useState(false);
    const [infoFet, setInfoFet] = useState({ marca: '', modelo: '', ano: '' })
    const [sending, setSending] = useState(false);
    const [searching, setSearching] = useState(false);
    const inputActual = useRef('');
    const buscaActual = useRef('');


    useEffect(() => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => {setMarcas(res)})
    }, [])

    const searchModelsClick = () => {

        if (infoFet.marca != "" && infoFet.modelo != "") {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos/${infoFet.modelo}/anos`, { method: 'GET' }).then(res => res.json()).then(res => { setInfoFet(prev => { return { ...prev, ano: res } }) })
        }

    }

    const searchOnAPI = () => {
        setBusca('')
        try{
            setSearching(true)
            if(searching){
                marcas.forEach(item => {
                    fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => {res.modelos.forEach(car => car.nome.toLocaleLowerCase().includes(inputActual.current.toLocaleLowerCase()) ? (setBusca(prev => [...prev, {marca:item, modelos:car}])) : '')})
                    setSearching(false)
                })

            }else{
                console.log('aguarde')
            }

        }catch(e){
            console.log('Não foi possível consultar.')
        }
    }

    useEffect(() => {
        if(infoFet.ano != '' && !sending) {
            setSending(true)
            sendSearch(infoFet);
        }
        

    }, [infoFet.ano])

    useEffect(() => {
        inputActual.current = input;
        setSending(false)
        if (input == '') {
            setInfoFet({ marca: '', modelo: '', ano: '' });
        }

        if (input != "") {
            
            if(searching === false){
                console.log(busca,'entrou')
                setTimeout(() => {
                    console.log(busca,'ativando searchOnAPI')
                    searchOnAPI()
                }, 1000);

            }
        }

    }, [input])

    useEffect(()=>{
        setSearching(false)
        // if(busca.length==1) searchModelsClick();
        if(busca.length == 0) setBuscando(true);
        if(busca.length != 0) setBuscando(false);
    }, [busca])

    return (
        <C.Nav>
            <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
            <C.Options>
                <C.SearchSpace>
                    <C.Form onSubmit={(e) => e.preventDefault()}>
                        <C.Search key={'searchInput'} placeholder='Buscar veículo...' onChange={(e) => {
                            setInput(e.target.value);
                            setBusca('')
                            if (input == '' && infoFet.marca == '') setBusca('')
                        }

                        } value={input} />

                        <C.ButtonSearch onClick={(e) => { e.defaultPrevented, setBusca(''),searchOnAPI()}}>Buscar</C.ButtonSearch>
                    </C.Form>
                </C.SearchSpace>
                {input != ""
                    ?
                    (busca.length > 1
                        ?

                        busca.length > 1
                            ?
                            <C.OptionsSpace height={'200px'} onBlur={()=>{setBusca('')}}>
                                {busca.map((item, index) =>
                                    <C.CarSimilarSpace key={index} onClick={() => {setInput(`${item.modelos.nome}`), setBusca(['']), setInfoFet(prev => { return { ...prev, marca:item.marca.codigo , modelo:item.modelos.codigo } }) }}>
                                        <CarSimilarOption key={index} Title={`${item.marca.nome}`} Model={`${item.modelos.nome}`} />
                                    </C.CarSimilarSpace>)}
                            </C.OptionsSpace>
                            : 
                            ''
                        :
                        buscando
                            ?
                            <C.OptionsSpace height={'30px'}><Loading /></C.OptionsSpace>
                            :
                            '')
                    :
                    ("")}
            </C.Options>
        </C.Nav>

    )
}
export default Header;