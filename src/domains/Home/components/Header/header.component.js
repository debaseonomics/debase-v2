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
import { Dapp } from 'domains';

const appStyle = {
  fontFamily: 'Segoe UI',
  fontSize: '24px',
    color: '#F26373',
    marginLeft: '64px',
    marginBottom: '4px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#F26373',
    height: '42px',
    width: '148px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

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

                <Link style={appStyle} to="/dashboard">
                    APP
                </Link>
            </StyledContainer>
        );
    }
}

export default Header;
