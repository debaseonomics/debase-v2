import { createPortal } from 'react-dom';

const Portal = ({ children, container }) => {

    // TODO: create element type checker for container

    if (container) {
        return createPortal(children, container);
    } else return children;

};

export default Portal;