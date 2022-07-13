import styled from "styled-components";

export const Title = styled.h2`
    color:grey;
    font-size: 20px;
    opacity: 0.50;
    margin-right:5px;
    
    
    `

export const Model = styled.h2`
    color:grey;
    font-size: 20px;
    opacity: 0.80;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
    @media(max-width:500px) {
        
        /* background-color:green; */
        width: 70%;
        
    }
    `
export const Card = styled.div`
    display:flex;
    animation:entrada 0.5s linear forwards;
    @keyframes entrada {
     from{
        position:relative;
        left:-15px;
        opacity:0;
     }  
     to{
        position:relative;
        left:0px;
        opacity:1;
     } 

    }
`