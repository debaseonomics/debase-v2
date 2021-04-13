import { StyledBackground, StyledGradient, StyledGrid } from './background.styles';

const Background = ({
    gridSize = 50
}) => {

    const patternSize = gridSize * 2;
    const patternPart = patternSize / 4;

    return (
        <StyledBackground>
            <StyledGradient />
            <StyledGrid>
                <svg width='100%' height='100%'>
                    <pattern id='grid-pattern' x='0' y='0' width={patternSize} height={patternSize} patternUnits='userSpaceOnUse'>
                        <line
                            x1={0}
                            y1={patternPart}
                            x2={patternSize}
                            y2={patternPart}
                            stroke="white"
                        />
                        <line
                            x1={0}
                            y1={patternPart * 3}
                            x2={patternSize}
                            y2={patternPart * 3}
                            stroke="white"
                        />
                        <line
                            x1={patternPart}
                            y1={0}
                            x2={patternPart}
                            y2={patternSize}
                            stroke="white"
                        />
                        <line
                            x1={patternPart * 3}
                            y1={0}
                            x2={patternPart * 3}
                            y2={patternSize}
                            stroke="white"
                        />
                    </pattern>
                    <rect x='0' y='0' width='100%' height='100%' fill='url(#grid-pattern)'></rect>
                </svg>
            </StyledGrid>
        </StyledBackground>
    );

};

export default Background;