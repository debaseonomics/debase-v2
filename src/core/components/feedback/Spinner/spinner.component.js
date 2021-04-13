import React from 'react';

import {
    StyledSpinner,
    StyledSpinnerSVG,
    StyledCircle
} from './spinner.styles';

const Spinner = ({
    size = 'medium',
    color = 'text'
}) => {

    return (
        <StyledSpinner
            size={size}
            color={color}
        >
            <StyledSpinnerSVG
                color={color}
                width="100%"
                height="100%"
                viewBox="0 0 60 60"
            >
                <StyledCircle
                    cx="30"
                    cy="30"
                    r="24"
                    fill="transparent"
                />
            </StyledSpinnerSVG>
        </StyledSpinner>
    );

};

export default Spinner;