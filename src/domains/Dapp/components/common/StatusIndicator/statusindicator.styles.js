import styled, { css } from 'styled-components';

/* statuses */
const statuses = {
    idle: css`
        background-color: ${ props => props.theme.colors.text };
        box-shadow: ${ props => props.theme.shadows.base };
    `,
    active: css`
        background-color: ${ props => props.theme.colors.successLight };
        box-shadow: ${ props => props.theme.shadows.success };
    `,
    inactive: css`
        background-color: ${ props => props.theme.colors.errorLight };
        box-shadow: ${ props => props.theme.shadows.error };
    `,
};

/* sizes */
const sizes = {
    small: css`
        height: 14px;
        width: 14px;
    `,
    medium: css`
        height: 20px;
        width: 20px;
    `,
    large: css`
        height: 32px;
        width: 32px;
    `,
};

export const StyledStatusIndicator = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${ props => props.theme.shadows.textSmall };
    border: 2px solid ${ props => props.theme.colors.text };
    border-radius: 50%;

    &:before {
        content: '';
        border-radius: 50%;
        height: 50%;
        width: 50%;
        ${props => statuses[props.status] }
    }

    ${props => sizes[props.size] }

    @media only screen and (max-width: 420px) {
        width: 10px;
        height: 10px;
        
        &:before {
            content: '';
            border-radius: 50%;
            height: 50%;
            width: 50%;
            padding-bottom: 1px;
            padding-right: 1px;
            ${props => statuses[props.status] }
        }
    }
`;