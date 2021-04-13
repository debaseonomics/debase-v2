import { StyledGrid } from './grid.styles';

const Grid = ({ children }) => {
    return (
        <StyledGrid>
            {children}
        </StyledGrid>
    );
};

export default Grid;