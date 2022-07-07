import React, { useEffect, useState } from 'react';
import * as C from './styles';
import Loading from '../loading';
import CarSimilarOption from '../CarSimilarOption';
import { CarSimilarSpace } from './styles';

const Header = ({ sendSearch }) => {

    const [marcas, setMarcas] = useState('');
    const [modelos, setModelos] = useState([]);
    const [input, setInput] = useState('');
    const [busca, setBusca] = useState(['']);
    const [autoComplete, setAutoComplete] = useState('');
    const [activeAutoComplete, setActiveAutoComplete] = useState(false)
    const [buscando, setBuscando] = useState(false);
    const [infoFet, setInfoFet] = useState({ marca: '', modelo: '', ano: '' })

    useEffect(() => {
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => {setMarcas(res)})
    }, [])

    const searchValues = async (termoBusca) => {

        let find = false;

        termoBusca = termoBusca.split(' ');

        termoBusca.forEach(termo => { //Busca para cada palavra.

            setBuscando(true)
            autoCompleteSearch(termoBusca)
            if (infoFet.marca == '') {

                marcas.forEach(item => {

                    if (termo.toLowerCase() == item.nome.toLowerCase()) {
                        find = true;
                        setInfoFet(prev => { return { ...prev, marca: item.codigo } })

                        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => { setModelos(res), res.modelos.forEach(item => setBusca(prev => [...prev, item])) })

                    }

                })
            }
        });

        if (!find) {
            setBuscando(false)
        }
    }

    const autoCompleteSearch = (termoBusca) => {
        setBusca('')
        setAutoComplete('')
        if (infoFet.marca != '') {
            try {

                modelos.modelos.map(item => {
                    if (item.nome.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                        setAutoComplete(prev => [...prev, item])
                    }
                }

                )

            } catch (e) {
            }


        } else {
            marcas.forEach(item => {
                if (item.nome.toLocaleLowerCase().includes(input.toLocaleLowerCase())) {
                    setAutoComplete(prev => [...prev, item])
                }

            })
        }
        setActiveAutoComplete(true);
    }

    const searchModelsClick = () => {
        setAutoComplete('')
        if (infoFet.marca != "" && infoFet.modelo == "") {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => { setModelos(res), res.modelos.forEach(item => setBusca(prev => [...prev, item])) })
        }
        if (infoFet.marca != "" && infoFet.modelo != "") {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${infoFet.marca}/modelos/${infoFet.modelo}/anos`, { method: 'GET' }).then(res => res.json()).then(res => { setInfoFet(prev => { return { ...prev, ano: res } }) })
        }

    }

    const searchOnAPI = (termoBusca) => {
        marcas.forEach(item => {
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res => res.json()).then(res => res.modelos.forEach(car => car.nome.toLocaleLowerCase().includes(termoBusca.toLocaleLowerCase()) ? setBusca(prev => [...prev, {marca:item, car}]) : ''))
        })
    }
    
    // Object.values(infoFet).forEach(item => console.log(item, 'Aqui'))


    useEffect(() => {
        searchModelsClick();

    }, [infoFet.marca])

    useEffect(() => {
        setAutoComplete('')
        searchModelsClick();

    }, [infoFet.modelo])

    useEffect(() => {
        if(infoFet.ano != '') sendSearch(infoFet)
        

    }, [infoFet.ano])

    useEffect(() => {
        if (input == '') {
            setInfoFet({ marca: '', modelo: '', ano: '' });
        }

        if (input != "") {
            autoCompleteSearch()
            searchOnAPI(input)
        }
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
                            if (input == '' && infoFet.marca == '') setBusca('')
                        }

                        } value={input} />

                        <C.ButtonSearch onClick={(e) => { e.defaultPrevented, searchValues(input), setAutoComplete(''); sendSearch(infoFet)}}>Buscar</C.ButtonSearch>
                    </C.Form>
                </C.SearchSpace>
                {input != "" && activeAutoComplete
                    ?
                    (busca.length > 1 || autoComplete.length > 0
                        ?

                        busca.length > 1 && activeAutoComplete==true
                            ?
                            <C.OptionsSpace height={'200px'}>
                                {busca.map((item, index) =>
                                    <C.CarSimilarSpace key={index} onClick={() => { console.log('clicou');setInput(`${item.marca.nome} - ${item.car.nome}`), setBusca(['']), setAutoComplete(''), setInfoFet(prev => { return { ...prev, marca:Number(item.marca.codigo) , modelo:item.car.codigo } }) }}>
                                        <CarSimilarOption key={index} Title={`${item.marca.nome}`} Model={`${item.car.nome}`} />
                                    </C.CarSimilarSpace>)}
                            </C.OptionsSpace>
                            :
                            // <C.OptionsSpace onBlur={() => { setBusca(''); setInput('') }} height={'100px'}>
                            //     {autoComplete.map((item, index) =>
                            //         <C.CarSimilarSpace key={index} onClick={() => { console.log('autoCOmplete'),setActiveAutoComplete(false),setInput(item.nome), setBusca(''), setAutoComplete(['']), setInfoFet(prev => { return { ...prev, marca: item.codigo } }) }}>
                            //             <CarSimilarOption key={index} Title={`${item.nome}`} />
                            //         </C.CarSimilarSpace>)}
                            // </C.OptionsSpace>
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