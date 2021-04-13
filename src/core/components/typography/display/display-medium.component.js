import styled from 'styled-components';
import Display from './display.component';

const DisplayMedium = styled(Display).attrs(props => ({
    content: props.children,
}))`
    font-size: 26px;
    font-weight: 500;
    letter-spacing: 2px;
    text-transform: lowercase;
    text-shadow: ${props => props.color ? props.theme.shadows[props.color + 'Text'] : props.theme.shadows.base};
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${props => props.color ? props.theme.colors[props.color] : props.theme.colors.text};
`;

export default DisplayMedium;