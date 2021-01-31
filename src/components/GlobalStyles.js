import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    padding:0;
    margin:0;
}
.App{
    font-family: 'Raleway', sans-serif;
}
.link{
    color:black;
    &:hover{
        color: black;
        text-decoration:none;
    }
}

`;

export default GlobalStyles;
