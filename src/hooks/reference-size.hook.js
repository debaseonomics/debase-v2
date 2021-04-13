import { useState, useEffect } from 'react';

export default reference => {

    const [ size, setSize ] = useState({ width: 0, height: 0 });

    const setReferenceSize = () => {
        if (!reference || !reference.current) return;
        const { offsetWidth, offsetHeight } = reference.current;
        const { width, height } = size;
        if (width !== offsetHeight || height !== offsetHeight) {
            setSize({ width: offsetWidth, height: offsetHeight });
        }
    };

    useEffect(() => {
        setReferenceSize({ width: 0, height: 0 });
        window.addEventListener('resize', setReferenceSize);
        return () => window.removeEventListener('resize', setReferenceSize);
    }, []);

    return size;
};