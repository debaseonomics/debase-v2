import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import _ from 'lodash';
import {
    StyledAppLink, StyledAuditsLink,
    StyledContainer,
    StyledDebaseLogo,
    StyledDocumentationLink,
    StyledText,
    StyledTextContainer,
    StyledMobileContainer,
    StyledMobileLeftContainer,
    StyledMobileMiddleContainer,
    StyledMobileRightContainer,
    StyledMobileSideItem
} from "./header.styles";
import { debaseLogoSVG } from '@assets';

class Header extends React.Component {
    render() {
        return (
            <>
                <StyledContainer>
                    <StyledDebaseLogo
                        src={debaseLogoSVG}
                    />
                    <StyledTextContainer>
                        <StyledText>
                            Boundless Flexibility
                        </StyledText>
                    </StyledTextContainer>
                    <StyledDocumentationLink>
                        Documentation
                    </StyledDocumentationLink>
                    <StyledAuditsLink
                        href="https://github.com/debaseonomics/audits"
                    >
                        Audits
                    </StyledAuditsLink>

                    <StyledAppLink href="/dashboard">
                        APP
                    </StyledAppLink>
                </StyledContainer>
                <StyledMobileContainer>
                    <StyledMobileLeftContainer>
                        <StyledMobileSideItem />
                        <StyledMobileSideItem />
                        <StyledMobileSideItem />
                    </StyledMobileLeftContainer>
                    <StyledMobileMiddleContainer>
                        <StyledDebaseLogo
                            src={debaseLogoSVG}
                        />
                        <StyledText>
                            Boundless Flexibility
                        </StyledText>
                    </StyledMobileMiddleContainer>
                    <StyledMobileRightContainer>
                        <StyledAppLink href="/dashboard">
                            APP
                        </StyledAppLink>
                    </StyledMobileRightContainer>
                </StyledMobileContainer>
            </>
        );
    }
}

export default Header;
