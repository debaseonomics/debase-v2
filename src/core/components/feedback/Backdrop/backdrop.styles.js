import styled from 'styled-components';

export const StyledBackdrop = styled.div`
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${ props => props.theme.colors.text };
    opacity: .4;
    user-select: none;
    overflow: hidden;
`;