import { useState, useEffect } from 'react';

const useMousePosition = () => {
    const [ position, setPosition ] = useState({ x: null, y: null });

    useEffect(() => {
        const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', setFromEvent);
        
        return () => {
            window.removeEventListener('mousemove', setFromEvent);
        };
    }, []);

    return position;
};

export default useMousePosition;