import React, {useState} from 'react';
import * as C from './styles';

const Header = () => {

        const [marca, setMarca] = useState(['']);
        const [modelo, setModelo] = useState(['']);

        const searchValues = (termoBusca) =>{

            termoBusca = termoBusca.split(' ')

            try{
                console.log("Buscando")
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, {method:'GET'}).then(res => res.json()).then(res => res.filter(item => item.nome.toLowerCase() == termoBusca[0].toLowerCase() ? 
                fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, {method:'GET'}).then(res2 => res2.json()).then(res2 => res2.modelos.map(item => console.log(item)))
                : ''));
        
            }catch(e){
                console.log("Não foi possível buscar.")
        }

            


    }
    return (
    <C.Nav>
        <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
        <C.SearchSpace>
            <C.Search placeholder='Ex.: Hyundai HB20' onChange={(e) => searchValues(e.target.value)}/>
            <C.ButtonSearch>Buscar</C.ButtonSearch>
        </C.SearchSpace>
    </C.Nav>

    )
}

export default Header;