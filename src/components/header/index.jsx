import React from 'react';
import * as C from './styles';

const Header = () => {
    return (
    <C.Nav>
        <C.Title><C.a href=''>Carros FIPE</C.a></C.Title>
        <C.SearchSpace>
            <C.Search placeholder='Not working yet' disabled/>
            <C.ButtonSearch>Buscar</C.ButtonSearch>
        </C.SearchSpace>
    </C.Nav>

    )
}

export default Header;