import { StyledFlexBox } from './flexbox.styles';

const Flexbox = ({ direction, gap, children }) => {
    
    return (
        <StyledFlexBox
            direction={direction}
            gap={gap}
        >
            {children}
        </StyledFlexBox>
    );

};

Flexbox.defaultProps = {
    direction: 'column',
    gap: '10px'
}

export default Flexbox;