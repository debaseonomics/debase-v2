import styled, { css } from 'styled-components';

export const StyledTabs = styled.div`
    position: relative;
    display: flex;
    width: 100%;

    ${ props => props.horizontal ? css`
        flex-direction: column;
    ` : '' }

    ${ props => props.vertical ? css`
        flex-direction: row;
    ` : '' }

`;

export const StyledTabsNavigation = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    ${ props => props.horizontal ? css`
        flex-direction: row;
    ` : '' }

    ${ props => props.vertical ? css`
        flex-direction: column;
    ` : '' }

    ${ props => props.outlined ? css`
        gap: 20px;
    ` : '' }

    ${ props => props.pills ? css`
        gap: 10px;
    ` : '' }
`;

export const StyledTabButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${ props => props.theme.colors.background };
    font-size: 14px;
    font-weight: 700;
    transition: .1s ease all;
    user-select: none;

    ${ props => props.outlined ? css`
        align-items: flex-start;
        height: 22px;
        opacity: .3;
        &:hover {
            opacity: 1;
        }
    ` : '' }

    ${ props => props.outlined && props.active ? css`
        align-items: flex-start;
        opacity: 1;
    ` : '' }

    ${ props => props.pills ? css`
        align-items: center;
        height: 28px;
        padding: 0 14px;
        font-weight: 600;
        border-radius: 50px;
        box-shadow: ${ props => props.theme.shadows.textSmall };

        &:hover {
            background-color: ${ props => props.theme.colors.input };
        }

    ` : '' }

    ${ props => props.pills && props.active ? css`
        background-color: ${ props => props.theme.colors.primary }!important;
        border: 1px solid ${ props => props.theme.colors.primary };
        color: ${ props => props.theme.colors.textInvert };
        fill: color: ${ props => props.theme.colors.textInvert };
        box-shadow: ${ props => props.theme.colors.shadows.primary };
    ` : '' }

`;

export const StyledTabContent = styled.div`
    position: relative;
    padding-top: 20px;
    flex-grow: 1;
    min-height: 0;
`;