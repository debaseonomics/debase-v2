import React, { useState } from 'react';

import { IconButton, DisplayMedium } from '@domains/Dapp/components/layout/Topbar/@common';
import { clampNum } from 'utils';
import { CloseIcon, ResizeHorizontalIcon, PinIcon } from '@domains/Dapp/components/layout/Section/@assets';

import {
    StyledPanel,
    StyledPanelResizer,
    StyledPanelHeader,
    StyledPanelActions,
    StyledPanelContent
} from './sidepanel.styles';

const SidePanel = ({
    children,
    label,
    isPinnable,
    isResizable,
    initWidth,
    minWidth,
    maxWidth,
    onResizeStart,
    onResize,
    onResizeEnd,
    onMouseEnter,
    onMouseLeave
}) => {

    const [ width, setWidth ] = useState(initWidth);

    /*const renderPinButton = () => {
        const { active, isPinned } = ui.sidepanel;
        if (isPinnable) {
            return (
                <IconButton
                    variant="flat"
                    size="small"
                    edge="rounded"
                    active={ isPinned }
                    onClick={ () => console.log('pin') }
                >
                    <PinIcon />
                </IconButton>
            );
        }
    };*/

    const renderResizer = () => {
        if (!isPinnable && !isResizable) { return }
        return (
            <StyledPanelResizer onMouseDown={onDragStart}>
                <ResizeHorizontalIcon />
            </StyledPanelResizer>
        )
    };

    const onDragStart = ({ clientX: startX }) => {
        if (onResizeStart) { onResizeStart() }
        //viewportMethods.changeDisabledStatus(true);
        const startWidth = width;
        const onDrag = ({ clientX }) => {
            if (onResize) { onResize() }
            setWidth(clampNum(startWidth + (clientX - startX), minWidth, maxWidth));
        };
        const onDragEnd = () => {
            //viewportMethods.changeDisabledStatus(false);
            if (onResizeEnd) { onResizeEnd() }
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', onDragEnd);
        };
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    };

    return (
        <StyledPanel
            style={{
                width: width,
                minWidth: minWidth,
                maxWidth: maxWidth
            }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >   
            <StyledPanelHeader>
                <DisplayMedium>
                    {label}
                </DisplayMedium>
                <StyledPanelActions>
                    {/*renderPinButton()*/}
                    <IconButton
                        variant="flat"
                        size="small"
                        edge="rounded"
                        onClick={ () => console.log('close') }
                    >
                        <CloseIcon />
                    </IconButton>
                </StyledPanelActions>
            </StyledPanelHeader>
            <StyledPanelContent>
                {children}
            </StyledPanelContent>
            {renderResizer()}
        </StyledPanel>
    );
};

SidePanel.defaultProps = {
    label: 'Sidepanel',
    isPinnable: false,
    isResizable: false,
    initWidth: 250,
    minWidth: 250,
    maxWidth: 350
};

export default SidePanel;