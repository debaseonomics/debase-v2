import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import Header from "./components/Header";
import { StyledContainer, StyledContent, StyledReadMore, StyledReadMoreText, StyledText, StyledIconsContainer, StyledIconLink, StyledIconImage } from "./home.styles";
import { IconGithubPNG, IconMediumPNG, IconTelegramPNG, IconTwitterPNG } from '@assets';

class Home extends React.Component {
    render() {
        return (
            <StyledContainer>
                <StyledContent>
                    <Header />
                    <StyledText>
                        <span style={{ color: '#F26373', letterSpacing: '-0.5px' }}>DEBASE</span> allows for building capital
                        <br/>efficient stablecoins on top of a
                        <br/>governable, decentralized protocol.
                    </StyledText>
                    <StyledReadMore>
                        <StyledReadMoreText href="https://www.notion.so/economicsdesign/Intro-to-Debase-b1cde830d5644cb58509368a8411b6af">
                            READ MORE
                        </StyledReadMoreText>
                    </StyledReadMore>
                </StyledContent>
                <StyledIconsContainer>
                    <StyledIconLink>
                        <StyledIconImage src={IconGithubPNG} />
                    </StyledIconLink>
                    <StyledIconLink>
                        <StyledIconImage src={IconMediumPNG} />
                    </StyledIconLink>
                    <StyledIconLink>
                        <StyledIconImage src={IconTelegramPNG} />
                    </StyledIconLink>
                    <StyledIconLink>
                        <StyledIconImage src={IconTwitterPNG} />
                    </StyledIconLink>
                </StyledIconsContainer>
            </StyledContainer>
        );
    }
}

export default Home;
