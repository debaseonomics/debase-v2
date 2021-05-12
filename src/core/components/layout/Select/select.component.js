import { useContext, useEffect, useState } from 'react';
import { StyledButton, StyledListContainer, StyledSelectItem, StyledSelectedItem } from './select.styles';
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({
    list,
    onChangedIndex,
    width=100,
    height=30,
    variant='default',
    color='secundary',
    size='medium',
    alignment='center',
    ...props
}) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(0);

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    };

    const selectItem = (item) => {
      setIsListOpen(false);
      setSelectedItem(item);
      onChangedIndex(item);
    };

    return (
        <div style={{ textAlign: 'center', width: `${width}px`, position: 'relative' }}>
            <StyledButton
                variant={variant}
                size={size}
                color={color}
                height={height}
                type="button"
                alignment={alignment}
                onClick={toggleList}
            >
                <StyledSelectedItem>
                    <div>{selectedItem}</div>
                    {isListOpen ?
                        <FontAwesomeIcon icon={faAngleUp} size="lg" /> :
                        <FontAwesomeIcon icon={faAngleDown} size="lg" />
                    }
                </StyledSelectedItem>
            </StyledButton>
            {isListOpen && (
                <StyledListContainer
                    variant={variant}
                    color={color}
                >
                    {list.map((ele, index) => (
                        <StyledSelectItem
                            key={ele + index}
                            onClick={() => selectItem(index)}
                            color={color}
                        >
                            {index}
                        </StyledSelectItem>
                    ))}
                </StyledListContainer>
            )}
        </div>
    );

};

export default Select;
