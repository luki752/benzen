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
button {
        background-color: white;
        padding: 1rem;
        width: 7rem;
        border: none;
        transition: 0.3s ease-in all;
        &:hover {
          background-color: black;
          color: white;
        }
        @media screen and (max-width: 1000px) {
          padding: 0.5rem;
          width: 3rem;
          font-size: 0.5rem;
          margin: 0rem 0.5rem;
        }
`;

export default GlobalStyles;
