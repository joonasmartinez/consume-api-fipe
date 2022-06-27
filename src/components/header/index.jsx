import React, { useState } from 'react';
import * as C from './styles';
import Loading from '../loading';
import CarSimilarOption from '../CarSimilarOption';
import { CarSimilarSpace } from './styles';
import TBody from '../tbody';

const Header = () => {

    const [marca, setMarca] = useState(['']);
    const [modelo, setModelo] = useState(['']);
    const [input, setInput] = useState('');
    const [options, setOptions] = useState('');
    const [erro, setErro] = useState('');
    const [busca, setBusca] = useState(['']);
    const [buscando, setBuscando] = useState(false);

    const searchValues = async (termoBusca) => {
    
        termoBusca = termoBusca.split(' ')

        if(buscando === false){
            try {
                console.log("Buscando")
                await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, { method: 'GET' }).then(res => res.json()).then(res => res.filter(item => item.nome.toLowerCase() == termoBusca[0].toLowerCase() ?
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, { method: 'GET' }).then(res2 => res2.json()).then(res2 => {setBusca(''), res2.modelos.map(item => {setBusca(prev=> [...prev,item])})})
                    : setErro("Não foi possível localizar.")));
            } catch (e) {
                console.log("Erro na busca.")
            }
        }else{
            console.log("Aguarde, buscando...")
        }

    }

    const carregar = () =>{
        
    }
    carregar()
    const searchOptions = (termoBusca) => {
        searchValues(termoBusca)
        console.log(termoBusca)

    }
    console.log(buscando)
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
            {input != "" ? ( busca.length > 1  ?  <C.OptionsSpace height={'200px'} onBlur={()=>setBusca('')}>{busca.map((item, index) =><C.CarSimilarSpace onClick={()=>{setInput(item.nome), setBusca(['']), console.log(busca)}}><CarSimilarOption key={index} Title={`${item.nome}`}/></C.CarSimilarSpace>)}</C.OptionsSpace> : <C.OptionsSpace height={'30px'}><Loading/></C.OptionsSpace> ) : ("")}
            </C.Options>
        </C.Nav>

    )
}

export default Header;