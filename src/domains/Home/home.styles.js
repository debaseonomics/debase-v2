import styled from "styled-components";
import { background1024, background1280, background1366, background1440, background1920, rectangleSVG, brandonGrotesqueLight } from '@assets';

export const StyledContainer = styled.div`
    width: 100%;
    background-image: url(${background1920});
    min-height: 1080px;
    
    @media only screen and (max-width: 1440px) {
        background-image: url(${background1440});
        min-height: 900px;
    }
    @media only screen and (max-width: 1366px) {
        background-image: url(${background1366});
        min-height: 768px;
    }
    @media only screen and (max-width: 1280px) {
        background-image: url(${background1280});
        min-height: 768px;
    }
    @media only screen and (max-width: 1024px) {
        background-image: url(${background1024});
        min-height: 768px;
    }
`;
export const StyledContent = styled.div`
    position: relative;
    margin-left: 219px;
    margin-right: 228px;

    @media only screen and (max-width: 1440px) {
        margin-left: 161px;
        margin-right: 162px;
    }
    @media only screen and (max-width: 1366px) {
        margin-left: 150px;
        margin-right: 155px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 139px;
        margin-right: 144px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 107px;
        margin-right: 110px;
    }
`;
export const StyledText = styled.p`
    position: absolute;
    font-family: 'brandonlight';
    font-size: 72px;
    line-height: 98px;  
    letter-spacing: -4.3px;
    margin-left: 17px;
    margin-top: 304px;
    z-index: 2;
    
    @media only screen and (max-width: 1440px) {
        margin-left: 12px;
        font-size: 54px;
        margin-top: 217px;
        line-height: 75px;
        letter-spacing: -3px;
    }
    @media only screen and (max-width: 1366px) {
        margin-left: 11px;
        font-size: 50px;
        margin-top: 205px;
        line-height: 68px;
        letter-spacing: -2.2px;
    }
    @media only screen and (max-width: 1280px) {
        margin-left: 11px;
        font-size: 47px;
        margin-top: 189px;
        line-height: 67px;
        letter-spacing: -2px;
    }
    @media only screen and (max-width: 1024px) {
        margin-left: 10px;
        font-size: 39px;
        margin-top: 199px;
        letter-spacing: -2.2px;
        line-height: 54px;
    }
`;

export const StyledReadMore = styled.a`
    font-family: 'brandonlight';
    font-size: 24px;
    width: 152px;
    height: 18px;
    margin-left: 23px;
    margin-top: 689px;
    text-align: left;
    color: #F26373;
    display: inline-block;
    
    @media only screen and (max-width: 1440px) {
        font-size: 17px;
        margin-top: 512px;
        margin-left: 20px;
    }
    @media only screen and (max-width: 1366px) {
        font-size: 15px;
        margin-top: 483px;
        margin-left: 22px;
    }
    @media only screen and (max-width: 1280px) {
        font-size: 14px;
        margin-top: 448px;
        margin-left: 22px;
    }
    @media only screen and (max-width: 1024px) {
        font-size: 10px;
        margin-top: 410px;
        margin-left: 21px;
    }
`;
