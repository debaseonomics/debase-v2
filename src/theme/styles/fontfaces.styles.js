import { createGlobalStyle } from 'styled-components';
import { bladerunnerWOFF } from '@assets';

const FontFaces = createGlobalStyle`
    @font-face {
        font-family: 'bladerunner';
        font-style: normal;
        font-weight: 500;
        src: url('${bladerunnerWOFF}') format('woff');
    }
`;

export default FontFaces;