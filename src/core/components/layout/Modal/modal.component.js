import React, { useState, useEffect, useContext, useRef } from 'react';

import { IconButton, DisplayMedium } from '@core/components';
import { CloseIcon } from '@assets';
import { clampNum } from '@utils';
import {
    StyledModal,
    StyledModalHeader,
    StyledModalContent,
    StyledModalFooter,
    StyledModalActions,
    StyledModalResizer
} from './modal.styles';
import useClickOutside from '@hooks';

const Modal = ({
    children,
    label,
    headerActions,
    headerDivider,
    footerContent,
    footerDivider,
    container,
    containerOffset,
    initPosX,
    initPosY,
    initWidth,
    initHeight,
    hasBackdrop,
    isCentered,
    isMovable,
    isResizable,
    handleClose
}) => {

    const modalRef = useRef(null);

    const [ width, setWidth ] = useState(initWidth);
    const [ height, setHeight ] = useState(initHeight || 'auto');
    const [ position, setPosition ] = useState({x: 0, y: 0});

    useDrag(onMove);
    useDrag(onResize);
    useClickOutside(modalRef);

    return (
        <React.Fragment>
            {hasBackdrop && (
                <Backdrop />
            )}

            <StyledModal 
                isResizable={isResizable}
                style={{
                    'top': position.x,
                    'left': position.y,
                    'width': width,
                    'height': height
                }}
            >
                <StyledModalHeader 
                    isMovable={isMovable}
                    onMouseDown={onMoveStart}
                    headerDivider={headerDivider}
                >
                    <DisplayMedium>
                        {label}
                    </DisplayMedium>
                    <StyledModalActions>
                        <IconButton
                            variant="flat"
                            size="small"
                            edge="rounded"
                            onClick={() => {handleClose()}}
                        >
                            <CloseIcon />
                        </IconButton>
                    </StyledModalActions>
                </StyledModalHeader>

                <StyledModalContent>
                    {children}
                </StyledModalContent>

                {footerContent && footerContent !== '' && (
                    <StyledModalFooter
                        footerDivider={footerDivider}
                    >
                        {footerContent}
                    </StyledModalFooter>
                )}
                
                {isResizable && (
                    <StyledModalResizer
                        onMouseDown={onResizeStart}
                    >
                        <ChevronRightIcon />
                    </StyledModalResizer>
                )}

            </StyledModal>
        </React.Fragment>
    );
};

Modal.defaultProps = {
    label: 'Modal',
    headerDivider: false,
    footerDivider: false,
    offset: 20,
    initPosX: 0,
    initPosY: 0,
    initWidth: 'auto',
    initHeight: 'auto',
    isMovable: false,
    isResizable: false
};

export default Modal;