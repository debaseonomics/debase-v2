import React, { useState, useEffect, useContext, useRef } from 'react';
import _ from 'lodash';

import { RootContext } from 'contexts';
import { Backdrop, IconButton, DisplayMedium, Tooltip } from '@core/components';
import { CloseIcon, ChevronRightIcon } from '@assets/icons';
import { useDrag } from '@hooks';
import {
	StyledModal,
	StyledModalHeader,
	StyledModalContent,
	StyledModalFooter,
	StyledModalActions,
	StyledModalResizer
} from './modal.styles';

// TODO: add click outside listener hook
// TODO: improve centered calculation -> remove visual 'jumping'

const Modal = ({
	children,
	label = 'Modal',
	headerButtons = [],
	headerDivider = false,
	footerContent = null,
	footerDivider = false,
	container = null,
	containerOffset = 20,
	initPosX = 0,
	initPosY = 0,
	minWidth = 250,
	minHeight = null,
	hasBackdrop = false,
	isCentered = false,
	isMovable = true,
	isResizable = false,
	handleClose
}) => {
	const { rootNode } = useContext(RootContext);
	const modalRef = useRef(null);

	const [ size, setSize ] = useState({ w: minWidth, h: minHeight });
	const [ position, setPosition ] = useState({
		x: Math.max(containerOffset, initPosX),
		y: Math.max(containerOffset, initPosY)
	});

	const getContainerSize = () => {
		const containerNode = container ? container : rootNode;
		const containerRect = containerNode.getBoundingClientRect();
		return {
			w: parseInt(containerRect.width),
			h: parseInt(containerRect.height)
		};
	};

	const handleMove = ({ x: deltaX, y: deltaY }) => {
		const { x: startX, y: startY } = Object.assign({}, position);
		const { w: containerWidth, h: containerHeight } = getContainerSize();
		const { w: currentWidth, h: currentHeight } = size;
		setPosition({
			x: parseInt(_.clamp(startX + deltaX, containerOffset, containerWidth - currentWidth - containerOffset)),
			y: parseInt(_.clamp(startY + deltaY, containerOffset, containerHeight - currentHeight - containerOffset))
		});
	};

	const handleResize = ({ x: deltaX, y: deltaY }) => {
		const { w: containerWidth, h: containerHeight } = getContainerSize();
		const { w: currentWidth, h: currentHeight } = size;
		const { x: currentPosX, y: currentPosY } = position;
		setSize({
			w: parseInt(_.clamp(currentWidth + deltaX, minWidth, containerWidth - containerOffset - currentPosX)),
			h: parseInt(_.clamp(currentHeight + deltaY, minHeight, containerHeight - containerOffset - currentPosY))
		});
	};

	const { onMouseDown: onMoveStart } = useDrag(handleMove);
	const { onMouseDown: onResizeStart } = useDrag(handleResize);

	// Initialize size & position state values on first render
	useEffect(() => {
		const { width: initWidth, height: initHeight } = modalRef.current.getBoundingClientRect();
		const { w: containerWidth, h: containerHeight } = getContainerSize();
		setSize({
			w: parseInt(Math.max(initWidth, minWidth)),
			h: parseInt(Math.max(initHeight, minHeight))
		});
		setPosition({
			x: parseInt(
				isCentered
					? containerWidth / 2 - initWidth / 2
					: _.clamp(initPosX, containerOffset, containerWidth - initWidth - containerOffset)
			),
			y: parseInt(
				isCentered
					? containerHeight / 2 - initHeight / 2
					: _.clamp(initPosY, containerOffset, containerHeight - initHeight - containerOffset)
			)
		});
	}, []);

	return (
		<React.Fragment>
			{hasBackdrop && <Backdrop />}

			<StyledModal
				ref={modalRef}
				isResizable={isResizable}
				style={{
					top: position.y,
					left: position.x,
					width: size.w,
					height: size.h
				}}
			>
				<StyledModalHeader
					isMovable={isMovable}
					onMouseDown={isMovable ? onMoveStart : null}
					headerDivider={headerDivider}
				>
					<DisplayMedium>{label}</DisplayMedium>
					<StyledModalActions>
						{headerButtons &&
							headerButtons.length !== 0 &&
							headerButtons.map((button, i) => {
								const { icon, action, tooltipMessage, tooltipPosition } = button;
								return (
									<Tooltip
										key={`modalheader-button-${i}`}
										message={tooltipMessage}
										position={tooltipPosition}
									>
										<IconButton variant="flat" size="small" edge="rounded" onClick={action}>
											{icon}
										</IconButton>
									</Tooltip>
								);
							})}

						<IconButton variant="flat" size="small" edge="rounded" onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					</StyledModalActions>
				</StyledModalHeader>

				<StyledModalContent>{children}</StyledModalContent>

				{footerContent &&
				footerContent !== '' && (
					<StyledModalFooter footerDivider={footerDivider}>{footerContent}</StyledModalFooter>
				)}

				{isResizable && (
					<StyledModalResizer onMouseDown={isResizable ? onResizeStart : null}>
						<ChevronRightIcon />
					</StyledModalResizer>
				)}
			</StyledModal>
		</React.Fragment>
	);
};

export default Modal;
