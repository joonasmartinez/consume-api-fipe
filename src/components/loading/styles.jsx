import styled from "styled-components";

export const Loading = styled.div`

    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: black;
    animation: bounce 0.5s linear infinite;
    margin: 2px;

    @keyframes bounce {
        0%{
            margin-left: 0;
        }
        50%{
            margin-left: 2rem;
        }
        0%{
            margin-left: 0;
        }
    }

    `

export const CardLoading = styled.div`

`