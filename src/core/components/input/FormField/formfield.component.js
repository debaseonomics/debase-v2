import React, { useState, useEffect, useRef } from 'react';

/* import components */
import { Input, Slider } from '../';
/* import styles */
import { StyledFormField, StyledFormFieldInput, StyledLabel, StyledLabelInfo } from './formfield.styles';

const FormField = props => {

    const { id, label, labelInfo, type, value, placeholder, adornments, slider, min, max, disabled, inputSize, forceLowerCase, forceRemoveSpecialChars, onChangeStart, onChange, onChangeEnd } = props;
    
    const [ localValue, setLocalValue ] = useState(value);
    const [ isInputFocused, setIsInputFocused ] = useState(false);
    const formFieldRef = useRef(null);

    const generateInputStyle = () => {
        let style = {};
        style.width = '100%';
        if (slider) {style.width = '60px'}
        return style;
    };

    const onSliderChangeStart = value => {
        setIsInputFocused(true);
    };

    const onSliderChange = value => {
        setLocalValue(value);
    };

    const onSliderChangeEnd = value => {
        setIsInputFocused(false);
    };

    const renderLabel = () => {
        if (!label) {return null}
        return (
            <StyledLabel htmlFor={id}>
                {label}
                <StyledLabelInfo>
                    {labelInfo}
                </StyledLabelInfo>
            </StyledLabel>
        );
    };

    const renderSlider = () => {
        if (!slider) {return null}
        return (
            <Slider 
                value={value}
                min={min}
                max={max}
                disabled={disabled}
                onChangeStart={onSliderChangeStart}
                onChange={onSliderChange}
                onChangeEnd={onSliderChangeEnd}
            />
        );
    };

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    return (
        <StyledFormField
            ref={formFieldRef}
        >
            {renderLabel()}
            <StyledFormFieldInput>
                {renderSlider()}
                <Input 
                    id={id}
                    value={localValue}
                    placeholder={placeholder}
                    adornments={adornments}
                    type={type}
                    min={min}
                    max={max}
                    size={inputSize}
                    forceLowerCase={forceLowerCase}
                    forceRemoveSpecialChars={forceRemoveSpecialChars}
                    isFocused={isInputFocused}
                    onFocus={onChangeStart}
                    onChange={onChange}
                    onBlur={onChangeEnd}
                    style={generateInputStyle()}
                />
            </StyledFormFieldInput>
        </StyledFormField>
    );
};

export default FormField;