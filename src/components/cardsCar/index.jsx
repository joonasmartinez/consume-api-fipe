import React from 'react';
import * as C from './styles';

const CardCar = ({Title, Value}) => {
    return (
    <C.Card>
        <C.Title>{Title}</C.Title>
        <C.Value>{Value}</C.Value>
    </C.Card>

    )
}

export default CardCar;