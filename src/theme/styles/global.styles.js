import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        position: relative;
        z-index: 0;
        margin: 0;
        padding: 0;
        height: 100vh;
        width: 100%;
        overflow: hidden;
        background-color: ${ props => props.theme.colors.background };
        color: ${ props => props.theme.colors.text };
        fill: ${ props => props.theme.colors.text };
        line-height: 1.15;
        font-family: 'Oswald', sans-serif;
        font-size: 1rem;
    }
    
    * {
      scrollbar-color: #06131B transparent ;
    }
    *::-webkit-scrollbar {
      width: 10px;
    }
    *::-webkit-scrollbar-track {
      background-color: transparent;
    }
    *::-webkit-scrollbar-thumb {
      background-color: #06131B;
      border-radius: 20px;
    }

    #root {
        position: relative;
        display: flex;
        height: 100%;
        width: 100%;
        overflow-x: hidden;
        overflow-y: scroll;

        a {
            text-decoration: none;
        }
    }

`;

export default GlobalStyle;
