import React, { useEffect, useState } from 'react';
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


    useEffect(() => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => {setMarcas(res)})
    }, [])

    const searchModelsClick = () => {

        if (infoFet.marca != "" && infoFet.modelo != "") {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos/${infoFet.modelo}/anos`, { method: 'GET' }).then(res => res.json()).then(res => { setInfoFet(prev => { return { ...prev, ano: res } }) })
        }

    }

    const searchOnAPI = (termoBusca) => {
        try{
            setSearching(true)
            setBusca('')
            marcas.forEach(item => {
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => {res.modelos.forEach(car => car.nome.toLocaleLowerCase().includes(termoBusca.toLocaleLowerCase()) ? setBusca(prev => [...prev, {marca:item, modelos:car}]) : '')})
            })

        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        if(infoFet.ano != '' && !sending) {
            setSending(true)
            sendSearch(infoFet);
        }
        

    }, [infoFet.ano])

    useEffect(() => {
        setSending(false)
        if (input == '') {
            setInfoFet({ marca: '', modelo: '', ano: '' });
        }

        if (input != "") {
            setBusca('')

            console.log(searching, 'aqui')

            if(searching == false){

                searchOnAPI(input)

            }else{console.log('Buscando, aguarde querido!')}
        }
        console.log(searching,'dentro')
    }, [input])

    useEffect(()=>{
        setSearching(false)
        if(busca.length==1) searchModelsClick();
    }, [busca])

    return (
        <C.Nav>
            <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
            <C.Options>
                <C.SearchSpace>
                    <C.Form onSubmit={(e) => e.preventDefault()}>
                        <C.Search key={'searchInput'} placeholder='Ex.: Hyundai HB20' onChange={(e) => {
                            setInput(e.target.value);
                            if (input == '' && infoFet.marca == '') setBusca('')
                        }

                        } value={input} />

                        <C.ButtonSearch onClick={(e) => { e.defaultPrevented, setBusca(''),searchOnAPI(input)}}>Buscar</C.ButtonSearch>
                    </C.Form>
                </C.SearchSpace>
                {input != ""
                    ?
                    (busca.length > 1
                        ?

                        busca.length > 1
                            ?
                            <C.OptionsSpace height={'200px'}>
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