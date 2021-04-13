import styled, { css } from 'styled-components';

export const StyledFormField = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-top: 5px;
    padding-bottom: 15px;
`;
export const StyledFormFieldInput = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const StyledLabel = styled.label`
    display: flex;
    align-items: baseline;
    padding-bottom: 6px;
    font-size: 14px;
    font-weight: 700;
`;

export const StyledLabelInfo = styled.label`
    font-size: 11px;
    font-weight: 600;
    opacity: .6;
    padding-left: 6px;
`;