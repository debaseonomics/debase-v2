import styled, { css } from 'styled-components';

/* variants */
const variants = {
    default: css`
        border: 2px solid ${props => props.theme.colors[props.color]};
        background-color: ${props => props.theme.colors[props.color]}0D;

        &:hover {
            background-color: ${props => props.theme.colors[props.color]}26;
        }
    `,
    flat: css`
        background-color: transparent;

        &:hover {
            background-color: ${props => props.theme.colors[props.color]}1A;
        }
    `
};
/* sizes */
const sizes = {
    small: css`
        height: 18px;
        width: 18px;

        svg {
            height: 8px;
            width: 8px;
        }
    `,
    medium: css`
        height: 34px;
        width: 34px;

        svg {
            height: 16px;
            width: 16px;
        }
    `,
    large: css`
        height: 50px;
        width: 50px;

        svg {
            height: 24px;
            width: 24px;
        }
    `,
};
/* edges */
const edges = {
    smooth: css`
        border-radius: 10px;
    `,
    rounded: css`
        border-radius: 100px;
    `
};

export const StyledIconButton = styled.button`
    position: relative;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    appearance: none;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    outline: none;
    transition: .1s ease all;
    flex-shrink: 0;
    outline: none!important;
    color: ${ props => props.theme.colors.text };
    fill: ${ props => props.theme.colors.text };

    ${props => variants[props.variant] }
    ${props => edges[props.edge] }
    ${props => sizes[props.size] }
`;

export const StyledIcon = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    width: 100%;
    height: 100%;
`;