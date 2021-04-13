import React, { useState, useContext } from 'react';

import { IconButton, DisplayMedium, Tooltip } from '@domains/Dapp/components/layout/Topbar/@common';
import { UIContext, ViewportContext } from '@editor/contexts';
import { StyledPanel, StyledPanelResizer, StyledPanelHeader, StyledPanelActions, StyledPanelContent } from './sidepanel.styles';
import { CloseIcon, ResizeHorizontalIcon, PinIcon } from '@icons';
import { clampNum } from 'utils';

const SidePanel = props => {

    const { label, gutter, isPinnable, initWidth, minWidth, maxWidth, onResizeStart, onResize, onResizeEnd, onMouseEnter, onMouseLeave, children } = props;
    const { ui, uiMethods } = useContext(UIContext);
    const { viewportMethods } = useContext(ViewportContext);
    const [ width, setWidth ] = useState(initWidth);

    const renderPinButton = () => {
        const { active, isPinned } = ui.sidepanel;
        if (isPinnable) {
            return (
                <Tooltip
                    message={`${isPinned ? 'Unpin' : 'Pin'} sidepanel`}
                    position="bottom-center"
                >
                    <IconButton
                        variant="flat"
                        size="small"
                        edge="rounded"
                        active={ isPinned }
                        onClick={ () => uiMethods.changeSidePanel('current', !isPinned) }
                    >
                        <PinIcon />
                    </IconButton>
                </Tooltip>
            );
        }
    };

    const renderResizer = () => {
        if (!isPinnable) { return }
        return (
            <StyledPanelResizer onMouseDown={onDragStart}>
                <ResizeHorizontalIcon />
            </StyledPanelResizer>
        )
    };

    const onDragStart = ({ clientX: startX }) => {
        if (onResizeStart) { onResizeStart() }
        viewportMethods.changeDisabledStatus(true);
        const startWidth = width;
        const onDrag = ({ clientX }) => {
            if (onResize) { onResize() }
            setWidth(clampNum(startWidth + (clientX - startX), minWidth, maxWidth));
        };
        const onDragEnd = () => {
            viewportMethods.changeDisabledStatus(false);
            if (onResizeEnd) { onResizeEnd() }
            window.removeEventListener('mousemove', onDrag);
            window.removeEventListener('mouseup', onDragEnd);
        };
        window.addEventListener('mousemove', onDrag);
        window.addEventListener('mouseup', onDragEnd);
    };

    return (
        <StyledPanel
            style={{ width: width, minWidth: width }}
            pinned={ ui.sidepanel.isPinned }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >   
            <StyledPanelHeader>
                <DisplayMedium>
                    {label}
                </DisplayMedium>
                <StyledPanelActions>
                    {renderPinButton()}
                    <IconButton
                        variant="flat"
                        size="small"
                        edge="rounded"
                        onClick={ () => uiMethods.changeSidePanel('', ui.sidepanel.isPinned) }
                    >
                        <CloseIcon />
                    </IconButton>
                </StyledPanelActions>
            </StyledPanelHeader>
            <StyledPanelContent style={{ 'padding': gutter }}>
                {children}
            </StyledPanelContent>
            {renderResizer()}
        </StyledPanel>
    );
};

SidePanel.defaultProps = {
    label: 'sidepanel',
    gutter: 0,
    isPinnable: false,
    initWidth: 250
};

export default SidePanel;