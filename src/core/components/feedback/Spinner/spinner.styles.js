import styled, { css } from 'styled-components';
import { rotate } from '@core/animations';

/* sizes */
const sizes = {
    xsmall: css`
        width: 14px;
        height: 14px;
    `,
    small: css`
        width: 24px;
        height: 24px;
    `,
    medium: css`
        width: 32px;
        height: 32px;
    `,
    large: css`
        width: 48px;
        height: 48px;
    `,
};

export const StyledSpinner = styled.div`
    display: flex;
    user-select: none;
    pointer-events: none;
    filter: drop-shadow(0 3px 4px ${props => props.theme.colors[props.color]}50);
    ${props => sizes[props.size]};
`;

export const StyledSpinnerSVG = styled.svg`
    position: relative;
    stroke: ${props => props.theme.colors[props.color]};
    stroke-width: 4px;
    stroke-dasharray: 50px;
    stroke-linecap: round;
    transform-origin: center center;
    animation: ${rotate} .9s linear infinite reverse;
`;
export const StyledCircle = styled.circle`
    position: relative;
`;