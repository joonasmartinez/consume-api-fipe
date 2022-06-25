import React, { useState } from 'react';
import * as C from './styles';
import Loading from '../loading';

const Header = () => {

    const [marca, setMarca] = useState(['']);
    const [modelo, setModelo] = useState(['']);
    const [input, setInput] = useState('');
    const [options, setOptions] = useState('');

    const searchValues = (termoBusca) => {
        console.log("Entrou")
        termoBusca = termoBusca.split(' ')

        try {
            console.log("Buscando")
            fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => res.filter(item => item.nome.toLowerCase() == termoBusca[0].toLowerCase() ?
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res2 => res2.json()).then(res2 => res2.modelos.map(item => console.log(item)))
                : ''));

        } catch (e) {
            console.log("Não foi possível buscar.")
        }

    }

    const searchOptions = () => {

        return (<Loading />)

    }

    return (
        <C.Nav>
            <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
            <C.Options>
                <C.SearchSpace>
                    <C.Form onSubmit={(e) => e.preventDefault()}>
                        <C.Search placeholder='Ex.: Hyundai HB20' onChange={(e) => {
                            setInput(e.target.value);
                            searchOptions();

                        }

                        } />

                        <C.ButtonSearch onClick={(e) => { e.defaultPrevented, searchValues(input) }}>Buscar</C.ButtonSearch>
                    </C.Form>
                </C.SearchSpace>
            {input != "" ? (<C.OptionsSpace><Loading/></C.OptionsSpace>) : ("")}
            </C.Options>
        </C.Nav>

    )
}

export default Header;