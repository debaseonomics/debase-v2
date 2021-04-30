import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import _ from 'lodash';
import {
    StyledAppLink, StyledAuditsLink,
    StyledContainer,
    StyledDebaseLogo,
    StyledDocumentationLink,
    StyledText,
    StyledTextContainer
} from "./header.styles";
import { debaseLogoSVG } from '@assets';

class Header extends React.Component {
    render() {
        return (
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
        );
    }
}

export default Header;
