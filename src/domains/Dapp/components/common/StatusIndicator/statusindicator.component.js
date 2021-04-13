/* import styles */
import { StyledStatusIndicator } from './statusindicator.styles';

const StatusIndicator = props => {
    
    const { status, size } = props;

    return (
        <StyledStatusIndicator 
            status={status}
            size={size}
        />
    );

};

StatusIndicator.defaultProps = {
    status: 'idle',
    size: 'medium'
};

export default StatusIndicator;