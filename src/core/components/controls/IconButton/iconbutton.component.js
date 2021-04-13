import React from 'react';

import { StyledIconButton, StyledIcon } from './iconbutton.styles';

const IconButton = ({
    variant = 'default',
    color = 'secundary',
    size = 'medium',
    edge = 'smooth',
    isDisabled = false,
    isLoading = false,
    onClick,
    children
}) => {

    return (
        <StyledIconButton
            variant={variant}
            color={color}
            size={size}
            edge={edge}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={onClick}
        >   
            <StyledIcon>
                {children}
            </StyledIcon>
        </StyledIconButton>
    );

};

export default IconButton;