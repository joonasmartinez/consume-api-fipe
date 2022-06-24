import React from "react";

const SearchValues = (props) =>{
    
    
    props.termoBusca = props.termoBusca.split(' ')

    try{
        console.log("Buscando")
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`, {method:'GET'}).then(res => res.json()).then(res => res.filter(item => item.nome.toLowerCase() == termoBusca[0].toLowerCase() ? 
        fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${item.codigo}/modelos`, {method:'GET'}).then(res => res.json()).then(res => '')
        : console.log("Não foi possível")));

    }catch(e){
        console.log("Não foi possível buscar.")
}
    
    
    return(
       
        <h1>Exportado</h1>

    )
}

export default SearchValues;
