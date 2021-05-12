import styled from 'styled-components';
export const StyledContainer = styled.div`
    margin-top: 11px;
    display: flex;
    align-items: center;
    @media only screen and (max-width: 1440px) {
        margin-top: -8px;
    }
    @media only screen and (max-width: 1366px) {
        margin-top: -11px;
    }
    @media only screen and (max-width: 1280px) {
        margin-top: -13px;
    }
    @media only screen and (max-width: 1024px) {
        margin-top: -20px;
    }
`;
export const StyledDebaseLogo = styled.img`
    position: relative;
    width: 285px;
    height: 95px;
    filter: drop-shadow(0px 0px 3px white);
    @media only screen and (max-width: 1440px) {
        width: 212px;
    }
    @media only screen and (max-width: 1366px) {
        width: 204px;
    }
    @media only screen and (max-width: 1280px) {
        width: 192px;
    }
    @media only screen and (max-width: 1024px) {
        width: 156px;
    }
`;
export const StyledTextContainer = styled.div`
    margin-left: 10px;
    display: flex;
    
    @media only screen and (max-width: 1440px) {
        margin-left: 14px;
    }
    @media only screen and (max-width: 1366px) {
        margin-left: 15px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 12px;
        margin-bottom: 6px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 13px;
        margin-bottom: 2px;
    }
`;
export const StyledText = styled.span`
    font-family: 'brandonlight';
    font-size: 18px;
    
    @media only screen and (max-width: 1440px) {
        font-size: 13px;
    }
    @media only screen and (max-width: 1366px) {
        font-size: 12px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 11px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 8px;
    }
`;
export const StyledDocumentationLink = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;
    margin-left: auto;
    margin-bottom: 8px;
    width: 161px;
    text-align: left;
    color: white;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
    }
    @media only screen and (max-width: 1366px) {
        font-size: 17px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 15px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 11px;
        margin-bottom: 4px;
    }
    @media only screen and (max-width: 360px) {
        display: none;
    }
`;
export const StyledAuditsLink = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;
    margin-left: 81px;
    margin-bottom: 8px;
    width: 68px;
    text-align: left;
    color: #FFFFFF;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
        margin-left: 23px;
        margin-top: 5px;
    }
    @media only screen and (max-width: 1366px) {
        font-size: 16px;
        margin-left: 15px;
        margin-top: 4px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 14px;
        margin-left: 3px;
        margin-top: 1px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 10px;
        margin-left: -30px;
        margin-bottom: 4px;
    }
    @media only screen and (max-width: 360px) {
        display: none;
    }
`;
export const StyledAppLink = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;
    color: #F26373;
    margin-left: 64px;
    margin-bottom: 4px;
    border-style: solid;
    border-width: 1px;
    border-color: #F26373;
    height: 48px;
    width: 148px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    @media only screen and (max-width: 1440px) {
        font-size: 18px;
        width: 112px;
        margin-left: 32px;
        height: 36px;
    }
    @media only screen and (max-width: 1366px) {
        font-size: 17px;
        width: 108px;
        margin-left: 24px;
        height: 36px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 15px;
        width: 101px;
        margin-left: 17px;
        height: 33px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 11px;
        width: 81px;
        margin-left: -1px;
        height: 26px;
    }
`;
