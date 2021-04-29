import { useContext, useRef } from 'react';
 
import { Modal } from '@core/components';
import { ModalManagerContext } from './modal-manager.context';
import { StyledModalManager } from './modal-manager.styles';

const ModalManager = () => {
    
    const { modals, closeModal } = useContext(ModalManagerContext);
    const modalManagerRef = useRef(null)

    return (
        <StyledModalManager ref={modalManagerRef}>

            {modals && modals.length !== 0 && modals.map(modal => {
                const {
                    id,
                    label,
                    content,
                    headerButtons,
                    headerDivider,
                    footerContent,
                    footerDivider,
                    containerOffset,
                    initPosX,
                    initPosY,
                    minWidth,
                    minHeight,
                    hasBackdrop,
                    isCentered,
                    isMovable,
                    isResizable,
                } = modal;
                return (
                    <Modal
                        key={id}
                        label={label}
                        headerButtons={headerButtons}
                        headerDivider={headerDivider}
                        footerContent={footerContent}
                        footerDivider={footerDivider}
                        container={modalManagerRef.current}
                        containerOffset={containerOffset}
                        initPosX={initPosX}
                        initPosY={initPosY}
                        minWidth={minWidth}
                        minHeight={minHeight}
                        hasBackdrop={hasBackdrop}
                        isCentered={isCentered}
                        isMovable={isMovable}
                        isResizable={isResizable}
                        handleClose={() => closeModal(id)}
                    >
                        {content}
                    </Modal>
                );
            })}

        </StyledModalManager>
    );
};

export default ModalManager;