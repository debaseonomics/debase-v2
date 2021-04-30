import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import Header from "./components/Header";
import {StyledContainer, StyledContent, StyledReadMore, StyledRectangle, StyledText} from "./home.styles";
import { rectangleSVG } from '@assets';

class Home extends React.Component {
    render() {
        return (
            <StyledContainer>
                <StyledContent>
                    <StyledRectangle src={rectangleSVG}></StyledRectangle>
                    <Header />
                    <StyledText>
                        <span style={{ color: '#F26373', letterSpacing: '-0.5px' }}>DEBASE</span> allows for building capital
                        <br/>efficient stablecoins on top of a
                        <br/>governable, decentralized protocol.
                    </StyledText>
                    <StyledReadMore
                        href="https://www.notion.so/economicsdesign/Intro-to-Debase-b1cde830d5644cb58509368a8411b6af"
                    >
                        READ MORE
                    </StyledReadMore>
                </StyledContent>
            </StyledContainer>
        );
    }
}

export default Home;
