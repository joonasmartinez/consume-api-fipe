import styled from "styled-components";


export const Card = styled.div`

    display:flex;
    padding: 15px;
    flex-direction:column;
    /* border-radius: 15px; */
    justify-content: space-between;
    background-color:  #ffffff;
    border-left: 3px solid #3791b4;
    margin: 5px 12px;
    box-shadow: 0px 0px 5px #b9b8b8;
    width: 200px;
    height: 150px;
    animation: aparecer 1s ease forwards;
    
    :hover{
        background-color: #eeeeee;
    }
    @keyframes aparecer {
        from{
            position: relative;
            left: -55px;
            opacity: 0%;
        }
        to{
            position: relative;
            left: 0px;
            opacity: 100%;
        }
    }


`

export const Title = styled.h3`

    text-align:center;
    /* color:white; */

`

export const Value = styled.h3`

    text-align:center;
    /* color:white; */

`
export const Form = styled.form`

`