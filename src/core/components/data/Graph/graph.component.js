import React, { Fragment, useState, useEffect, useRef, useContext } from 'react';
import _ from 'lodash';

import { formatNumToAbbreviation } from '@utils';
import {
    StyledGraph,
    StyledGraphTooltip,
    StyledGraphTooltipItem,
    StyledGrid,
    StyledGraphTooltipLabel,
    StyledGraphTooltipValue,
    StyledActiveLineX,
    StyledActiveLineY,
    StyledActiveDot,
    StyledGraphSVG,
    StyledPolygon } from './graph.styles';

const Graph = ({
    color,
    labelX,
    labelY,
    symbol,
    data,
    onChangeValueY
}) => {

    const [ gridSize, setGridSize ] = useState({ w: 0, h: 0 });
    const [ activeLineX, setActiveLineX ] = useState(null);
    const [ activeLineY, setActiveLineY ] = useState(null);
    const [ activeValueX, setActiveValueX ] = useState(null);
    const [ activeValueY, setActiveValueY ] = useState(null);

    const graphRef = useRef(null);
    const gridRef = useRef(null);

    const minY = _.minBy(data, arr => {return arr[1]})[1];
    const maxY = _.maxBy(data, arr => {return arr[1]})[1];

	//const maxGridY = maxY * 1.1;
	//const minGridY = minY * 0.9;
    const width = gridSize.w;
	const height = gridSize.h;
	const svgOffset = 2;

    const id = Math.random();

    const onGridMouseMove = e => {
        if (!gridRef || !gridRef.current) {return}
        const gridRect = gridRef.current.getBoundingClientRect();
        const gridRectLeft = parseInt(gridRect.left);
        const deltaX = e.clientX - gridRectLeft;
        const currentIndex = Math.floor(deltaX / (gridSize.w / data.length));
        if (currentIndex < data.length) {
            setActiveValueX(data[currentIndex][0]);
            setActiveValueY(data[currentIndex][1]);
            setActiveLineX(deltaX);
            setActiveLineY((1 - ((data[currentIndex][1] - minY) / (maxY - minY))) * height);
        }
    };
    
    const onGridMouseLeave = e => {
        setActiveValueX(data[data.length - 1][0]);
        setActiveValueY(data[data.length - 1][1]);
        setActiveLineX(null);
        setActiveLineY(null);
    };

    const calculatePoints = () => {
        const points = [];
        data.map((node, i, arr) => {
			const xAxisIncrement = (gridSize.w - svgOffset) / data.length;
            const YAxisScaledNode = (1 - ((node[1] - minY) / (maxY - minY))) * height;
			/* calc start x-axis polygon edge */
			if (i === 0) {
				points.unshift([ -svgOffset, YAxisScaledNode ]);
				points.unshift([ -svgOffset, height + svgOffset ]);
			}
			/* calc points from data */
            points.push([ xAxisIncrement * i, YAxisScaledNode ]);
            points.push([ xAxisIncrement * (i + 1), YAxisScaledNode ]);
			/* calc end x-axis polygon edge */
			if (i === arr.length - 1) {
				points.push([width + svgOffset, YAxisScaledNode]);
				points.push([width + svgOffset, height + svgOffset]);
			}
        });
        return points;
    };

    const renderSymbol = () => {
        if (!symbol) {return null}
        return symbol
    };
    const renderActiveIndicators = () => {
        if (!activeLineX) {return}
        return (
            <Fragment>
                <StyledActiveLineX
                    style={{
                        left: `${activeLineX}px`
                    }}
                />
                <StyledActiveLineY
                    style={{
                        top: `${activeLineY}px`
                    }}
                />
                <StyledActiveDot 
                    style={{
                        top: `${activeLineY}px`,
                        left: `${activeLineX}px`
					}}		
                />
                <StyledGraphTooltip 
                    style={{
						top: `${activeLineY}px`,
						left: `${activeLineX}px`
					}}
                >   
                    <StyledGraphTooltipItem>
                        <StyledGraphTooltipLabel>
                            {labelX}
                        </StyledGraphTooltipLabel>
                        <StyledGraphTooltipValue>
                            {activeValueX}
                        </StyledGraphTooltipValue>
                    </StyledGraphTooltipItem>
                    <StyledGraphTooltipItem>
                        <StyledGraphTooltipLabel>
                            {labelY}
                        </StyledGraphTooltipLabel>
                        <StyledGraphTooltipValue>
                            {formatNumToAbbreviation(activeValueY, 2)}
                            {renderSymbol()}
                        </StyledGraphTooltipValue>
                    </StyledGraphTooltipItem>
				</StyledGraphTooltip>
            </Fragment>
        );
    };

	/* resize observer */
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            if (!gridRef || !gridRef.current) {return}
            const { offsetWidth, offsetHeight } = gridRef.current;
            setGridSize({
                w: offsetWidth,
                h: offsetHeight
            });
        });
        resizeObserver.observe(gridRef.current);
        return () => {
            resizeObserver.disconnect();
        }
    }, []);
	
	/* data init */
	useEffect(() => {
		if (!data || data.length === 0) {return}
		setActiveValueX(data[data.length - 1][0]);
		setActiveValueY(data[data.length - 1][1]);
    }, [data]);
    
    /* pass y value to parent */
    useEffect(() => {
        onChangeValueY(activeValueY);
    }, [activeValueY]);

    return (
        <StyledGraph
            ref={graphRef}
        >   
            <StyledGrid
                ref={gridRef}
                onMouseLeave={e => onGridMouseLeave(e)}
                onMouseMove={e => onGridMouseMove(e)}
            >
                <StyledGraphSVG
                    width={gridSize.w}
                    height={gridSize.h}
                >   
                    <defs>
                        <linearGradient
                            id={id}
                            gradientTransform="rotate(90)"
                        >
                            <stop offset="0%" stopColor={`${color}33`} />
                            <stop offset="100%" stopColor={`${color}00`} />
                        </linearGradient>
                    </defs>
                    <StyledPolygon
                        points={calculatePoints()}
                        fill={`url(#${id})`}
                    />
                </StyledGraphSVG>
                {renderActiveIndicators()}
            </StyledGrid>
        </StyledGraph>
    );

};

export default Graph;