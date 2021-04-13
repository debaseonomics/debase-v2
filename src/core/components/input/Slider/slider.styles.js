import styled, { css } from 'styled-components';

export const StyledSlider = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 20px;
    user-select: none;

    ${ props => props.disabled ? css`
        opacity: .3;
        pointer-events: none;
    ` : '' }

    &:before {
        content: '';
        position: absolute;
        top: 7px;
        right: 0;
        bottom: 7px;
        left: 0;
        background-color: ${ props => props.theme.colors.off };
        border: 1px solid ${ props => props.theme.colors.border };
        border-radius: 12px;
        transition: .1s ease all;
    }
`;

export const StyledSliderRange = styled.div`
    position: absolute;
    top: 7px;
    right: 0;
    bottom: 7px;
    left: 0;
    border-radius: 12px;
    background-color: ${ props => props.theme.colors.primary };
`;

export const StyledIndicator = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateX(-50%) translateY(-50%);
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background-color: ${ props => props.theme.colors.primary };
    box-shadow: ${ props => props.theme.shadows.primarySmall };
    cursor: ew-resize;
    transition: .1s ease transform;

    &:hover {
        transform: translateX(-50%) translateY(-50%) scale(1.15);
    }
`;