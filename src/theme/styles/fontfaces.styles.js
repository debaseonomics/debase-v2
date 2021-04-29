import { createGlobalStyle } from 'styled-components';
import { bladerunnerWOFF, brandonGrotesqueLight } from '@assets';

const FontFaces = createGlobalStyle`
    @font-face {
        font-family: 'bladerunner';
        font-style: normal;
        font-weight: 500;
        src: url('${bladerunnerWOFF}') format('woff');
    }
    
    @font-face {
        font-family: 'brandonlight';
        font-style: normal;
        font-weight: 500;
        src: url('${brandonGrotesqueLight}') format('opentype');
    }
    
    @font-face {
        font-family: "Segoe UI";
        font-weight: 400;
        src: local("Segoe UI");
    }
`;

export default FontFaces;
