import { createContext, useState } from 'react';
import _ from 'lodash';

import ModalManager from './modal-manager.component';

const ModalManagerContext = createContext({});

const ModalManagerProvider = ({ children }) => {

    const [ modals, setModals ] = useState([]);

    const openModal = data => {
        const { id } = data;
        if (isModalOpen(id)) return console.warn('SITEMANAGER UI: Modal with specified ID is already open');
        if (id) {
            const clonedModals = _.cloneDeep(modals);
            clonedModals.push(data);
            setModals(clonedModals);
        } else return console.warn('SITEMANAGER UI: Modals need an ID');
    };

    const closeModal = id => {
        const index = modals.findIndex(modal => modal.id === id);
        const clonedModals = _.cloneDeep(modals);
        clonedModals.splice(index, 1);
        setModals(clonedModals);
    };

    const isModalOpen = id => {
        return modals.includes(id);
    };

    return (
        <ModalManagerContext.Provider value={{ modals, openModal, closeModal, isModalOpen }}>
            <ModalManager />
            {children}
        </ModalManagerContext.Provider>
    );

};



export { ModalManagerContext, ModalManagerProvider };