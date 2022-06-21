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
    }


`

export default Global;