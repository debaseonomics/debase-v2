import { useContext } from 'react';
import _ from 'lodash';
 
import { Snackbar } from '@core/components';
import { SnackbarManagerContext } from './snackbar-manager.context';
import { StyledSnackbarManager } from './snackbar-manager.styles';

const SnackbarManager = () => {
    
    const { snackbars, closeSnackbar } = useContext(SnackbarManagerContext);

    return (
        <StyledSnackbarManager>

            {snackbars && snackbars.length !== 0 && snackbars.map(snackbar => {
                const { id, message, status } = snackbar;
                return (
                    <Snackbar
                        key={id}
                        message={message}
                        status={status}
                        handleClose={() => closeSnackbar(id)}
                    />
                );
            })}

        </StyledSnackbarManager>
    );
};

export default SnackbarManager;