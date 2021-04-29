const useDrag = (onDrag, onDragStart, onDragEnd) => {

    const onMouseDown = e => {
        const { clientX: startX, clientY: startY } = e;
        onDragStart && onDragStart();
        const onMouseMove = ({ clientX, clientY }) => {
            const deltaX = clientX - startX;
            const deltaY = clientY - startY;
            onDrag && onDrag({ x: deltaX, y: deltaY });
        };
        const onMouseUp = () => {
            onDragEnd && onDragEnd();
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        }
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return {
        onMouseDown
    };
};

export default useDrag;