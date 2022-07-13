import { createGlobalStyle} from "styled-components";

const Global = createGlobalStyle`

    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    body{
        background:whitesmoke;
        
    }

    .App{
        display:flex;
        flex-direction:column;
        align-items:center;
        min-height: 66.9vh;
        min-width: 460px;
    }

    @media(max-width:500px) {
    .App{
        width: 100%;
    }
}


`

export default Global;