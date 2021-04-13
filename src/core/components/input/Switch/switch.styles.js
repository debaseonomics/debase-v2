import styled, { css } from 'styled-components';

export const StyledSwitch = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 40px;
    height: 20px;
    cursor: pointer;
    user-select: none;
    transition: .1s ease all;

    ${ props => props.disabled ? css`
        opacity: .3;
        pointer-events: none;
    ` : '' }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${ props => props.theme.colors.text };
        border-radius: 30px;
        opacity: .2;
        transition: .1s ease all;

        ${ props => props.active ? css`
            background-color: ${ props => props.theme.colors.primary };
            opacity: 1;
        ` : '' }

    }

    &:hover:before {
        opacity: .3;

        ${ props => props.active ? css`
            background-color: ${ props => props.theme.colors.primary };
            opacity: 1;
        ` : '' }

    }

    &:after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        top: 4px;
        left: 6px;
        background-color: ${ props => props.theme.colors.background };
        border-radius: 50%;
        transition: .1s ease all;

        ${ props => props.active ? css`
            left: 22px;
        ` : '' }
    }
`;