import styled from 'styled-components';
export const StyledContainer = styled.div`
    margin-top: 3px;
    display: flex;
    align-items: center;
`;
export const StyledDebaseLogo = styled.img`
    position: relative;
    width: 285px;
    height: 95px;
    @media only screen and (max-width: 1440px) {
        width: 212px;
    }
    @media only screen and (max-width: 1280px) {
        width: 190px;
    }
    @media only screen and (max-width: 1024px) {
        width: 153px;
    }
`;
export const StyledTextContainer = styled.div`
    margin-left: 10px;
    display: flex;
    
    @media only screen and (max-width: 1440px) {
        margin-left: 1px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 0px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 0px;
    }
`;
export const StyledText = styled.span`
    font-family: 'Segoe UI';
    font-size: 18px;
    
    @media only screen and (max-width: 1440px) {
        font-size: 14px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 13px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 10px;
    }
`;
export const StyledDocumentationLink = styled.a`
    font-family: 'Segoe UI';
    font-size: 24px;
    margin-left: auto;
    margin-bottom: 8px;
    width: 161px;
    text-align: left;
    color: gray;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 14px;
    }
`;
export const StyledAuditsLink = styled.a`
    font-family: 'Segoe UI';
    font-size: 24px;
    margin-left: 90px;
    margin-bottom: 8px;
    width: 68px;
    text-align: left;
    color: #FFFFFF;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
        margin-left: 26px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 16px;
        margin-left: 9px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 14px;
        margin-left: -27px;
    }
`;
export const StyledAppLink = styled.a`
    font-family: 'Segoe UI';
    font-size: 24px;
    color: #F26373;
    margin-left: 64px;
    margin-bottom: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: #F26373;
    height: 40px;
    width: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
        width: 111px;
        margin-left: 34px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 16px;
        width: 98px;
        margin-left: 24px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 14px;
        width: 78px;
        margin-left: 6px;
    }
`;
