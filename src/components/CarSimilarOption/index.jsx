import React from 'react';
import * as C from './styles';

const CarSimilarOption = ({Title, Model}) => {
    return (
        <C.Card>
            <C.Title>{Title}</C.Title>
            <C.Model>{Model}</C.Model>
        </C.Card>
        

    )
}

export default CarSimilarOption;