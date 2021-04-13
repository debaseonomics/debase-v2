import React from 'react';

import { Spinner } from '@core/components';
import { StyledButton } from './button.styles';

const Button = ({
    children,
    variant = 'default',
    size = 'medium',
    color = 'secundary',
    alignment = 'center',
    isDisabled = false,
    isLoading = false,
    onClick,
    ...props
}) => {

    return (
        <StyledButton
            variant={variant}
            size={size}
            color={color}
            alignment={alignment}
            isDisabled={isDisabled}
            isLoading={isLoading}
            onClick={!isDisabled ? onClick : null}
            style={{ 
                pointerEvents: isDisabled ? 'none' : 'auto',
                opacity: isDisabled ? .5 : 1,
            }}
            {...props}
        >   
            {isLoading && <Spinner size="small" />}
            {children}
        </StyledButton>
    );

};

export default Button;