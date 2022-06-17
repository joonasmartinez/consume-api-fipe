import React from 'react';
import * as C from './styles';

const Header = () => {
    return (
    <C.Nav>
        <C.Title>Carros FIPE</C.Title>
        <C.SearchSpace>
            <C.Search placeholder='Buscar aqui' />
            <C.ButtonSearch>Buscar</C.ButtonSearch>
        </C.SearchSpace>
    </C.Nav>

    )
}

export default Header;