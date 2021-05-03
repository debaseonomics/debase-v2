import { StyledSnackbar } from './snackbar.styles';

const Snackbar = ({
    message = 'This is a snackbar',
    status = 'warning',
    handleClose
}) => {

    return (
        <StyledSnackbar
            status={status}
            onClick={handleClose}
        >
            {message}
        </StyledSnackbar>
    );
};

export default Snackbar;