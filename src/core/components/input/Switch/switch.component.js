import React, { useState } from 'react';

/* import styles */
import { StyledSwitch } from './switch.styles';

const Switch = props => {

    const { active, disabled } = props;

    const [ localActive, setLocalActive ] = useState(false);

    return (
        <StyledSwitch 
            active={localActive}
            disabled={disabled}
            onClick={() => setLocalActive(!localActive)}
        />
    );

}

export default Switch;