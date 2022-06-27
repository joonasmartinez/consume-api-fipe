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
export const Form = styled.form`
    display:flex;
    height: 100%;
    background-color: white;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    width: 0%;
`

export const Options = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items:center;
    max-height: 30px;
    /* background-color: blue; */
`

export const OptionsSpace = styled.div`
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items:center;
    width: 100%;
    min-height: ${(props) => props.height};
    overflow-y:scroll;
    overflow-x:hidden;
    ::-webkit-scrollbar{
        width:0;
    }
    background-color:white;
    box-shadow: 0px 0px 5px black;
    margin-top: 5px;
`
export const CarSimilarSpace = styled.div`
    margin-left: 5px;
    max-height: 30px;
    width: 100%;

    :hover{
        cursor:pointer;
        background-color:#ebebeb;
    }
`