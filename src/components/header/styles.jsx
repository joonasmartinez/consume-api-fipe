import styled from "styled-components";

export const Nav = styled.div`
    display:flex;
    justify-content: space-around;
    align-items:center;
    width:100%;
    /* background-color: #747373; */
    background-color: #3791b4;
    height:65px;
`

export const Search = styled.input`
    outline: none;
    border:0;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding: 0px 10px;

`;

export const ButtonSearch = styled.button`
    /* margin-left:1px; */
    background-color: #eeeeee;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border: 0;
    padding:5px 5px;
    outline:none;
    color:black;
    font-size: 1rem;

    :hover{
        background-color:#292929;
        color:white;
        cursor:pointer;
    }
`;

 export const SearchSpace = styled.div`
    display:flex;
    height: 50%;
`


export const Title = styled.h2`

    color:white;

`

export const a = styled.a`

    text-decoration: none;
    color:white;

`