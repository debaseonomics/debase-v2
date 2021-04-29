import { createContext, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
 
import SnackbarManager from './snackbar-manager.component';

const SnackbarManagerContext = createContext({});

const SnackbarManagerProvider = ({ children }) => {

    const [ snackbars, setSnackbars ] = useState([]);

    // Hacky solution to prevent closure data in timers
    const stateRef = useRef();
    stateRef.current = snackbars;

    const openSnackbar = ({ message, status, duration }) => {
        const clonedSnackbars = [...snackbars];
        clonedSnackbars.push({
            id: Date.now(),
            message,
            status,
            duration: duration ? duration : 3000,
            timer: null
        })
        setSnackbars(clonedSnackbars);
    };
    
    const closeSnackbar = id => {
        const snackbarToRemove = stateRef.current.find(snackbar => snackbar.id === id);
        const filteredSnackbars = stateRef.current.filter(snackbar => snackbar.id !== id);
        clearTimeout(snackbarToRemove.timer);
        setSnackbars(filteredSnackbars);
    };

    // Add timeout function to timer key when snackbars is updated
    // Only when timer was not set before
    useEffect(() => {
        if (snackbars && snackbars.length !== 0) {
            snackbars.forEach(snackbar => {
                const { id, duration } = snackbar;
                if (!snackbar.timer) {
                    snackbar.timer = setTimeout(() => {
                        closeSnackbar(id);
                    }, duration);
                }
            });
        }
    }, [snackbars])

    return (
        <SnackbarManagerContext.Provider value={{ snackbars, openSnackbar, closeSnackbar }}>
            <SnackbarManager />
            {children}
        </SnackbarManagerContext.Provider>
    );
};

export { SnackbarManagerContext, SnackbarManagerProvider };