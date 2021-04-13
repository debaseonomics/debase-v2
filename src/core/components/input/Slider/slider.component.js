import React, { useState, useEffect, useRef } from 'react';

import { clampNum } from 'utils';
import {
    StyledSlider,
    StyledSliderRange,
    StyledIndicator
} from './slider.styles';

const Slider = props => {

    const { value, min, max, disabled, onChangeStart, onChange, onChangeEnd } = props;

    const [ localValue, setLocalValue ] = useState(value);
    const [ range, setRange ] = useState(0);
    const sliderRef = useRef(null);

    const onDragStart = ({ clientX: startX }) => {
        if (onChangeStart) {onChangeStart(localValue)}
        const startRange = range;
        const onDrag = ({ clientX }) => {
            const deltaX = clientX - startX;
            const deltaXPercentage = deltaX / sliderRef.current.offsetWidth;
            const localRange = (startRange / 100) + deltaXPercentage;
            setLocalValue(clampNum(parseInt((max - min) * localRange), min, max));
        };
        const onDragEnd = () => {
            if (onChangeEnd) {onChangeEnd(localValue)}
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', onDragEnd);
        };
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    };

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    useEffect(() => {
        setRange(clampNum((localValue / (max - min)) * 100, 0, 100));
        if (onChange) {onChange(localValue)}
    }, [localValue]);

    return (
        <StyledSlider 
            ref={sliderRef}
            disabled={disabled}
        >
            <StyledSliderRange style={{ width: `${range}%` }} />
            <StyledIndicator 
                onMouseDown={e => onDragStart(e)}
                style={{ left: `${range}%` }}
            />
        </StyledSlider>
    );
};

Slider.defaultProps = {
    value: 5000,
    min: 0,
    max: 10000,
    disabled: false
};

export default Slider;